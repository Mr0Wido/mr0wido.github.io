---
title: TryHackMe - Olympus
layout: post
categories:
- TryHackMe
tag: vhost, upload, sqli, enumeration
image: "/assets/img/olympus.jpeg"
image_alt: olympus
---

Hey!

Start the VM here and start enumerating! The machine can take some time to start. Please allow up to 5 minutes (Sorry for the inconvenience). Bruteforcing against any login page is out of scope and should not be used.

If you get stuck, you can find hints that will guide you on my [GitHub repository](https://github.com/PetitPrinc3/TryHackMe-rooms/blob/main/Olympus/Hints.md).

Well... Happy hacking ^^ 

Petit Prince

Created by [PetitPrinc3](https://tryhackme.com/p/PetitPrinc3) 

<br>

### What is Flag 1?


Let's do a `Nmap` scan to gather information about the target.

```
$ nmap -sSCV 10.10.35.164
```

![nmap](/assets/img/tryhackme/olympus/nmap.png)

As you can see `22/tcp and 80/tcp` ports are open.

Let's explore the website but we need to add `"olympus.thm"` to the `/etc/hosts` file.

![etc](/assets/img/tryhackme/olympus/etc.png)

Here is a homepage. It seems `nothing` in there.

![home](/assets/img/tryhackme/olympus/home.png)

Let's do a `gobuster` scan. 

```
$ gobuster dir -u http://olympus.thm/  -w /usr/share/seclists/Discovery/Web-Content/common.txt -x php,html,txt
```

![gobuster](/assets/img/tryhackme/olympus/gobuster.png)

Now, let's navigate to the `/~webmaster` page and explore its contents.

![webmaster](/assets/img/tryhackme/olympus/webmaster.png)

On this page, we can see `posts shared by Root`, a `search` bar, a `login` bar, and several `categories`. There are several potential points on the page where `SQLi` can be attempted.

First, we'll capture the a categories page request and save it using `BurpSuite` `(Right Click > Save Item)`.

![request](/assets/img/tryhackme/olympus/request.png)

Then we'll do a `sqlmap scan` on the captured request.

```
$ sqlmap -r ol.req --dbs
```

![dbs](/assets/img/tryhackme/olympus/dbs.png)

We found the `olympus database`. 

```
$ sqlmap -r ol.req -D olympus --tables
```

![tables](/assets/img/tryhackme/olympus/tables.png)

Let's get the flag.

```
$ sqlmap -r ol.req -D olympus -T flag --dump
```

![flag](/assets/img/tryhackme/olympus/flag.png)

Well done! We find the `first flag`.


<br>

### What is Flag 2?

Now, let's examine the `"users"` table.

```
$ sqlmap -r ol.req -D olympus -T users --dump
```

![users](/assets/img/tryhackme/olympus/users.png)

We find `three users` and their corresponding `hashes`. Additionally, there is a `subdomain` mentioned: `chat.olympus.thm`

First, let's `crack these hashes`.

![crack](/assets/img/tryhackme/olympus/crack.png)

After cracking the hashes, we found `only Prometheus' password`.

Now, let's return to the website and log in as Prometheus.

![admin](/assets/img/tryhackme/olympus/admin.png)

An `admin page` appears.  I tried uploading a `reverse shell`, but it didn't work. The admin page does not seem to provide any useful information.

Let's go to the `chat.olympus.thm` we found earlier.

To access it, we need to `add the subdomain` to the `/etc/hosts` file.

![etc-2](/assets/img/tryhackme/olympus/etc-2.png)

We are presented with a `login page`.

![login](/assets/img/tryhackme/olympus/login.png)

Let's `login as Prometheus`.

![chat](/assets/img/tryhackme/olympus/chat.png)

An interesting chat application awaits us. 

`Zeus says` an interesting thing here. If we upload a file, the file name gets changed to a `random string`. However, let's upload a [reverse shell](https://github.com/pentestmonkey/php-reverse-shell/blob/master/php-reverse-shell.php).

![shell](/assets/img/tryhackme/olympus/shell.png)

Now, let's do a `gobuster` scan.

```
$ gobuster dir -u http://chat.olympus.thm/  -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-small.txt -x php,html,txt
```

![gobuster-2](/assets/img/tryhackme/olympus/gobuster-2.png)

We navigate to the `"uploads"` directory, hoping to find the `shell.php` file we uploaded earlier.

![white](/assets/img/tryhackme/olympus/white.png)

Unfortunately, `there is nothing` of interest here.

Let's go back to the Olympus database.

![tables-2](/assets/img/tryhackme/olympus/tables-2.png)

Let's `dump the chats` table.

![chats](/assets/img/tryhackme/olympus/chats.png)

We found the `shell.php` file and the file name is changed. However, we need to set up a `netcat listener`. Then we can go `/uploads/filename`.

![url](/assets/img/tryhackme/olympus/url.png)

And we are in!

![in](/assets/img/tryhackme/olympus/in.png)

Let's get the `flag 2`.

![flag-2](/assets/img/tryhackme/olympus/flag-2.png)

<br>

### What is Flag 3?

Now, let's examine the `zeus.txt` file.

![txt](/assets/img/tryhackme/olympus/txt.png)

It appears that Prometheus may have placed a `backdoor in Olympus`. And according to what he said, `he got root privileges` this way. We need to find this file but first, let's explore the server.

```
$ find / -type f -perm -04000 -ls 2>/dev/null
```

![find](/assets/img/tryhackme/olympus/find.png)

We found interesting things here. Unlike others, `Cputils` can be run with Zeus privileges.

Let's run. 

![cputils](/assets/img/tryhackme/olympus/cputils.png)

Let's copy the `id_rsa` to our own machine.

![copy](/assets/img/tryhackme/olympus/copy.png)

Then, we use `ssh2john` to `crack the RSA key`.

```
$ ssh2john zeus.rsa > zeus.hash
$ john --wordlist=/usr/share/wordlists/rockyou.txt zeus.hash
```

![ssh2](/assets/img/tryhackme/olympus/ssh2.png)

Now, we can access `Zeus with ssh`.

```
$ chmod 600 zeus.rsa
$ ssh -i zeus.rsa zeus@10.10.35.164
```

![ssh-zeus](/assets/img/tryhackme/olympus/ssh-zeus.png)

Now that we know Prometheus uploaded a backdoor. So I searched a lot and I found the file.  It is an `interesting file` located in the `/var/www/html/` directory.

![var](/assets/img/tryhackme/olympus/var.png)

Let's look at the `VIGQFQFMYOST.php` file and what's in it.

![phfile](/assets/img/tryhackme/olympus/phfile.png)

There is `password information`. More importantly, we can have root privileges with this file, so I think `suid_bd` is more interesting. Let's try.

```
$ uname -a; w; /lib/defended/libc.so.99
```
![root](/assets/img/tryhackme/olympus/root.png)

Success! We now have `root access`. 

Let's get the `root flag` from the `root directory`.

![root-flag](/assets/img/tryhackme/olympus/root-flag.png)

<br>

### What is Flag 4?

__`The flag is located in /etc/`__

According to `hint`, the last flag is `located in /etc`. We can search for it using `grep`.


```
$ grep -r flag /etc
```

![last-flag](/assets/img/tryhackme/olympus/last-flag.png)

`Success!` We found `bonus flag`.

<br>

`Congratulations!` We have successfully completed the steps to find all the flags. It was nice CTF. I hope you learned something and had fun. But that’s it for now till next time take care :wave:

<br>
