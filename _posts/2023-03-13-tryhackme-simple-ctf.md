---
title: TryHackMe - Simple CTF
layout: post
categories:
- TryHackMe
tag:
- security,
- enumeration,
- privesc
image: assets/img/simple.png
image_alt: simple
---

This is an easy CTF. Let's start. 

<br>

### 1. How many services are running under port 1000?

We first run a `nmap` scan to find running ports.

```
$ nmap -sSV 10.10.22.97
```
![nmap](/assets/img/tryhackme/simple_ctf/nmap.png)

As you can see, a total of 3 ports are running. These are `21/tcp FTP`, `80/tcp HTTP`, `and 2222/tcp SSH.`

**Answer : `2`**

<br>

### 2. What is running on the higher port?

As you will remember from the previous question, the highest port is 2222/tcp. And SSH is running on this port.

**Answer : `SSH`**

<br>

### 3. What's the CVE you're using against the application? 

When we visit the website, we see the default page of apache.

![apache](/assets/img/tryhackme/simple_ctf/apache.png)

First of all, I did a `nikto` scan, but no results came out. Now let's do a directory scan with `gobuster`.

```
$ gobuster dir -u http://10.10.22.97/ -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-small.txt
```

![gobuster](/assets/img/tryhackme/simple_ctf/gobuster.png)

Yes, we discovered the `/simple/` directory here. Let's see what it contains.

![cms](/assets/img/tryhackme/simple_ctf/cms.png)

A CMS page appears. This is the app the question tells us.
At the bottom of the page, we find the CMS version. 

![version](/assets/img/tryhackme/simple_ctf/version.png)

Now, we're looking for any CMS Made Simple vulnerability in exploit-db, and let's not forget that the version is `2.2.8`.

![db](/assets/img/tryhackme/simple_ctf/db.png)

As a result of the search, we detect the vulnerability that is suitable for the CMS version of our target. 
[https://www.exploit-db.com/exploits/46635](https://www.exploit-db.com/exploits/46635)

![exploit](/assets/img/tryhackme/simple_ctf/exploit.png)

**Answer : `CVE- 2019-9053 `**

<br>

### 4. To what kind of vulnerability is the application vulnerable?

As you can see in the previous question, the vulnerability is `SQL Injection`.

**Answer : `sqli`**

<br>

### 5. What's the password?

_Hint: You can use /usr/share/seclists/Passwords/Common-Credentials/best110.txt to crack the pass_

We need to download the exploit in exploit-db and run it as it says.

![how](/assets/img/tryhackme/simple_ctf/how.png)

```
 $ python3 46635.py -u http://10.10.52.237/simple/ --crack -w /usr/share/seclists/Passwords/Common-Credentials/best110.txt
```

We want to run it but we can't. I guess we cannot run this code because it is written in the python2 script, and we encounter many errors. I fixed it as best I could, you can download and run it from [here](/assets/img/tryhackme/simple_ctf/46635.py). If you want to fix it, you can ask in the comments.

![pass](/assets/img/tryhackme/simple_ctf/pass.png)

**Answer : `secret`**

<br>

### 6. Where can you login with the details obtained?

We may use these credentials to login against ssh `(running on port 2222)`

**Answer : `ssh`**

<br>

### 7. What's the user flag?

Using the information we collect, we login to `ssh` and then we get the `user.txt`. 

```
 $ ssh mitch@10.10.52.237 -p 2222
 $ whoami
 $ cat user.txt
```
![login](/assets/img/tryhackme/simple_ctf/login.png)

**Answer : `G00d j0b, keep up!`**

<br>

### 8. Is there any other user in the home directory? What's its name?

We go to the /home directory and look at the users with the `ls -al` command.

![users](/assets/img/tryhackme/simple_ctf/users.png)

**Answer : `sunbath`**

<br>

### 9. What can you leverage to spawn a privileged shell?

First, we run the `sudo -l` command. We notice that Vim can run without the need for a root password.

**Answer : `vim`**

<br>

### 10. What's the root flag?

Now we can get root privileges using vim. The code we will run is as follows.

```
$ sudo vim -c '!sh'
$ whoami
$ cat /root/root.txt
```
![root](/assets/img/tryhackme/simple_ctf/root.png)

**Answer : `W3ll d0n3. You made it!`**

<br>

It was such a fun CTF. I hope you learned something and had fun too. But that’s it for now till next time take care.

<br>
