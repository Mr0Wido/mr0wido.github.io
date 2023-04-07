---
title: TryHackMe - Pickle Rick
layout: post
categories:
- TryHackMe
tag:
- ctf,
- gobuster,
- linux
image: "/assets/img/picle_rick.jpeg"
image_alt: pickle-rick
---

This is an easy CTF. This Rick and Morty themed challenge requires you to exploit a webserver to find 3 ingredients that will help Rick make his potion to transform himself back into a human from a pickle. 
Deploy the virtual machine on this task and explore the web application: "http://target-ip/"

<br>

### 1. What is the first ingredient Rick needs?

First, we run a **`nmap`** scan as usual.

```
$ nmap -sSV 10.10.125.149
```

![nmap](/assets/img/tryhackme/pickle_rick/nmap.png)

As you can see there are 2 ports running. 

Let's visit the website and see what we can find.
On the homepage, we see such an article.

![home](/assets/img/tryhackme/pickle_rick/home.png)

In summary, Rick needs 3 ingredients to get back to his old self. The names of these ingredients are located inside the target machine. First of all, we need to find rick's password and username and login into the target.

Now let's do a **`gobuster`** scan and see if we can find anything.

```
$ gobuster dir -u http://10.10.125.149/ -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-small.txt
```

![gobuster](/assets/img/tryhackme/pickle_rick/gobuster.png)

Nothing came out.

Let's do a **`nikto`** scan and see if we can find anything there.

```
$ nikto -h http://10.10.125.149/
```

![nikto](/assets/img/tryhackme/pickle_rick/nikto.png)

Yes, we found something important here. **`login.php`** is most likely the place where we should log in.

We return to the homepage. We will take a look at the source codes of the pages.

![source](/assets/img/tryhackme/pickle_rick/source.png)

Yes, we found Rick's username. 
**`R1ckRul3s`**

I checked the source code of the login page, but nothing came up.

We check what is there in robots.txt, which is one of the classic control points. And we find an article I'm not sure about, but this article may be the password.

![robot](/assets/img/tryhackme/pickle_rick/robot.png)

I go back to the login page and try username and password.

**Username: `R1ckRul3s`**

**Password: `************`**

![login](/assets/img/tryhackme/pickle_rick/login.png)

And we are inside.
A command panel appears directly in front of us. 

![whoami](/assets/img/tryhackme/pickle_rick/whoami.png)

Let's take a look at the /home directory, who are our users?

![whois](/assets/img/tryhackme/pickle_rick/whois.png)

I'm looking to see what's in the directory we're in. **`ls -la`**

![ls](/assets/img/tryhackme/pickle_rick/ls.png)

And it looks like there are important files here.

First, let's take a look at what's inside the clue.txt. **`cat clue.txt`**

![cat](/assets/img/tryhackme/pickle_rick/cat.png)

The cat command is blocked. We can use less instead. Let's do it. **`less clue.txt`**

![less](/assets/img/tryhackme/pickle_rick/less.png)

_clue.txt: Look around the file system for the other ingredient._

Yes the less command worked.

Now we can look at our first ingredient. **`less Sup3rS3cretPickl3Ingred.txt`**

![first](/assets/img/tryhackme/pickle_rick/first.png)

**Answer : `**********`**

<br>

### 2. Whats the second ingredient Rick needs?

You remember the rick directory in /home from the previous question. Most likely the second ingredient is here and the third is in the root directory.
I tried going to the/rick directory but it didn't work so I can't change the directory from the command panel. To solve this, we can run a reverse shell on the system and enter the target machine directly.

First I set up a netcat listener on my own machine.

```
$ nc -nlvp 4444
```
I go to the pentest monkey cheat sheet [here](https://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet).
And I'm trying the codes on the page. Those two are working.

![shell](/assets/img/tryhackme/pickle_rick/shell.png)

And we are inside.

![nc](/assets/img/tryhackme/pickle_rick/nc.png)

Now we can go to the rick directory.

```
$ cd /home/rick
$ cat second\ ingredients
```

![second](/assets/img/tryhackme/pickle_rick/second.png)

**Answer : `*************`**

<br>

### 3. Whats the final ingredient Rick needs? 

For the third ingredient, we need to get root privileges.

![privesc](/assets/img/tryhackme/pickle_rick/privesc.png)

No password is set for root.

```
$ sudo -l
$ sudo bash
```

Now we can reach the third ingredient and save rick.

```
$ ls -la /root
$ cat /root/3rd.txt
```

![3rd](/assets/img/tryhackme/pickle_rick/3rd.png)

**Answer : `**********`**

<br>

It was such a fun CTF. I hope you learned something and had fun too. But that’s it for now till next time take care.

<br>
