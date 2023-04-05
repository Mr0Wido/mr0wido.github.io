---
title: TryHackMe - Cyber Heroes
layout: post
categories:
- TryHackMe
tag: ctf, security, credential
image: "/assets/img/cyber-heroes.png"
image_alt: cyber-heroes
---

Want to be a part of the elite club of CyberHeroes? Prove your merit by finding a way to log in!

<br>

## 1. CyberHeroes     

<br>


### 1.1 Uncover the flag!

Let's do a nmap scan.

```
$ nmap -sSV 10.10.39.168
```

![nmap](/assets/img/tryhackme/cyber-heroes/nmap.png)

Two ports are open. Theese are `22/tcp SSH and 80/tcp HTTP`. 

Let's visit the website running on `80/tcp` port. 

I found three pages on the website. These are `Home, About, and Login`.

Let's look at them all.

- _**`Home`**_ 

    ![home](/assets/img/tryhackme/cyber-heroes/home.png)

    I check the source page but I don't see anything significant.

- _**`About`**_ 

    I don't see anything significant on the page.

- _**`Login`**_ 

    ![login](/assets/img/tryhackme/cyber-heroes/login.png)

    I check the source page and I found this script.

    ![source](/assets/img/tryhackme/cyber-heroes/source.png)

    As I understand it `username: h3ck3rBoi` and `password: RevereString("54321@terceSrepuS")`.

    We need to write the password in reverse. So, `password: SuperSecret@12345`

Now that we've found the username and password, let's log in.

And the flag is here.

![flag](/assets/img/tryhackme/cyber-heroes/flag.png)

<br>

It was such a fun CTF. I hope you learned something and had fun too. But that’s it for now till next time take care.

<br>
