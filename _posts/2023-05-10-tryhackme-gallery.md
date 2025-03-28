---
title: TryHackMe - Gallery
layout: post
categories:
- TryHackMe
tag: sqli, rce, cms
image: "/assets/img/gallery.png"
image_alt: gallery
---

Try to exploit our image gallery system.

<br>

## 1. Deploy and get a Shell 

Our gallery is not very well secured.

Designed and created by [Mikaa](https://twitter.com/mika_sec)!

<br>

### 1.1 How many ports are open?

Let's do a `nmap` scan.

```
$ nmap -sSCV 10.10.35.177
```     

![nmap](/assets/img/tryhackme/gallery/nmap.png)

Two ports are open. These are `80/tcp HTTP, 8080/tcp HTTP`

**`Answer : 2`**

<br>

### 1.2 What's the name of the CMS?

Let's visit the website running on `80/tcp` port.

An `Apache2 default` page appears.

Let's look at the websie runining on `8080/tcp` port.

A login page appears.

![login](/assets/img/tryhackme/gallery/login.png)

**`Answer : Simple Image Gallery`**

<br>

### 1.3 What's the hash password of the admin user?

The Website is using `Simple image gallery`. I'm looking to see if I can find anything in [exploit-db](https://www.exploit-db.com).

I found four results in `exploit-db`.

I'm going through the first and second results, separately.

First [Simple Image Gallery 1.0 - Remote Code Execution](https://www.exploit-db.com/exploits/50214)

![rce1](/assets/img/tryhackme/gallery/rce1.png)

I tried downloading and running the exploit first, but it didn't work.

When I looked through the code, I saw this.

![rce2](/assets/img/tryhackme/gallery/rce2.png)

It seems we can access the admin login with SQLi.

We need to write this to the username; `admin' or '1'='1'#`

Let's try.

![rce3](/assets/img/tryhackme/gallery/rce3.png)

Yes it works.

![home](/assets/img/tryhackme/gallery/home.png)

We were able to log in to the site as an admin. I've been browsing the site for a bit, let's see what I can find.

It seems we can upload files. Maybe we can upload a reverse shell.

But first, I want to examine the other page in exploit-db.
[Simple Image Gallery System 1.0 - 'id' SQL Injection](https://www.exploit-db.com/exploits/50198)

![sql1](/assets/img/tryhackme/gallery/sql1.png)

The page explains what to do.

![sql2](/assets/img/tryhackme/gallery/sql2.png)

We need to capture the request for a picture with Burp Suite.
Right click > Save item and we need to save the request and run it in sqlmap.

Let 's do it.

```
$ sqlmap -r text.req --dbs
```

There are `Boolean Based` and `Time Based` vulnerabilities of SQLi types on the site.

![kind](/assets/img/tryhackme/gallery/kind.png)

With the `--dbs` tag, sqlmap will give us the database names.

![databases](/assets/img/tryhackme/gallery/databases.png)

Now that we know the database names, let's get the tables.

```
$ sqlmap -r test.req -D <database-name> --tables 
```

I dumped the tables for `gallery_db`.

![tables](/assets/img/tryhackme/gallery/tables.png)

Now I will empty the columns of the `users` table.

```
$ sqlmap -r test.req -D gallery_db -T users --columns
```

![columns](/assets/img/tryhackme/gallery/columns.png)

Now let's dump the `id, username, firstname, and password`.

```
$ sqlmap -r test.req -D gallery_db -T users -C id,username,firstname,password --dump
```

![dump](/assets/img/tryhackme/gallery/dump.png)


<br>

### 1.4 What's the user flag?

Let's do a `gobuster` scan.

```
$ gobuster dir -u http://10.10.35.177/gallery/  -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-small.txt -x php,html,txt
```

![gobuster](/assets/img/tryhackme/gallery/gobuster.png)

The `/uploads` directory caught my attention. Maybe I can run the `reverse shell` that I will upload from this directory.

Let's try.

First, go to albums, then create a new album, then you can upload files from inside the album.

Let's create and upload our reverse shell. [Pentestmonkey's PHP Reverse Shell](https://github.com/pentestmonkey/php-reverse-shell/blob/master/php-reverse-shell.php)

![upload](/assets/img/tryhackme/gallery/upload.png)

Now I'm setting up a `netcat` listener on my own machine.

```
$ nc -nlvp 4444
```

Now let's go to the `/uploads` directory and find the file we uploaded.

![shell](/assets/img/tryhackme/gallery/shell.png)

Yes it works.

![in](/assets/img/tryhackme/gallery/in.png)

I see two folders named `mike` and `ubuntu` in my `/home` directory.

![users](/assets/img/tryhackme/gallery/users.png)

We need Mike's password for `user.txt`.

![denied](/assets/img/tryhackme/gallery/denied.png)

I didn't know what to do and decided to run [linpeas.sh](https://github.com/carlospolop/PEASS-ng/blob/master/linPEAS/README.md) on the target machine.  

![mikepass](/assets/img/tryhackme/gallery/mikepass.png)

We found a password as you can see in the picture, but I don't know who it belongs to.

Let's try it for Mike.

![sumike](/assets/img/tryhackme/gallery/sumike.png)

And it worked. If you get an error, run the following codes on the target machine.

![term](/assets/img/tryhackme/gallery/term.png)

```
$ python3 -c 'import pty;pty.spawn("/bin/bash")'
CTRL + Z
$ stty raw -echo;fg
$ reset
$ xterm
```

Let's get the user flag.

![user-flag](/assets/img/tryhackme/gallery/user-flag.png)


<br>

---

<br>


## 2.  Escalate to the root user 

Good luck with the last step !

<br>

### 2.1 What's the root flag?

Let's try the `sudo -l` command.

![sudol](/assets/img/tryhackme/gallery/sudol.png)

It seems we can run `rootkit.sh` with root privileges without requiring a password.

Let's see what's in it.

![rootkit](/assets/img/tryhackme/gallery/rootkit.png)

This means that we can use the `nano` to get root.

I'm looking at [GTFOBins](https://gtfobins.github.io/gtfobins/nano/) to see if I can find anything about nano. 

Let's try this.

![gtf](/assets/img/tryhackme/gallery/gtf.png)

```
$ export TERM=xterm
$ sudo /bin/bash /opt/rootkit.sh
$ read
```

![opt](/assets/img/tryhackme/gallery/opt.png)

After typing `read`, nano will open. Then we will do the following in order:

``` 
   ^R^X
   reset; sh 1>&0 2>&0
```

![execute](/assets/img/tryhackme/gallery/execute.png)

And we are `root`. Yes!

![rootin](/assets/img/tryhackme/gallery/rootin.png)

Let's get the root flag.

![root-flag](/assets/img/tryhackme/gallery/root-flag.png)

<br>

It was such a fun CTF. I hope you learned something and had fun too. But that’s it for now till next time take care :wave:

<br>
