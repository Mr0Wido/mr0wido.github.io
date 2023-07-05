---
title: TryHackMe - Corridor
layout: post
categories:
- TryHackMe
tag: security, idor, web
image: "/assets/img/corridor.png"
image_alt: corridor
---

Can you escape the Corridor?

You have found yourself in a strange corridor. Can you find your way back to where you came?

In this challenge, you will explore potential IDOR vulnerabilities. Examine the URL endpoints you access as you navigate the website and note the hexadecimal values you find (they look an awful lot like a hash, don't they?). This could help you uncover website locations you were not expected to access.

<br>

### 1. What is the flag?

Let's do a `Nmap` scan.

```
$ nmap -sSCV 10.10.186.148
```

![nmap](/assets/img/tryhackme/corridor/nmap.png)

As we see `80/tcp` port is open.

Let's visit that port.

Here, we find a homepage.

![home](/assets/img/tryhackme/corridor/home.png)

There's not much we can do on the main page.

So, let's check the `source page`.

![source](/assets/img/tryhackme/corridor/source.png)

`Interesting!` As you can see, there is a lot of hash in here. 
But we don't know what kind of hash these are. So let's use the `hash-identifier` tool.

![hash-id](/assets/img/tryhackme/corridor/hash-id.png)

These hashes are encrypted with the `MD5` algorithm.

Let's crack all of them.

![crack](/assets/img/tryhackme/corridor/crack.png)

The `first hash is 1`.  I kept cracking. And the `hashes go up to 13`.

![13](/assets/img/tryhackme/corridor/13.png)

These hashes are pages. We can `copy a hash and paste` the endpoint of the URL.  

Now, we can go to the page. Like this:

![first](/assets/img/tryhackme/corridor/first.png)

So, these `hashes equals a number`.

Let's try `encrypting the number 0 using MD5`.

![md5](/assets/img/tryhackme/corridor/md5.png)

Now, we have a hash. Let's `insert this hash` into the URL.

![zero](/assets/img/tryhackme/corridor/zero.png)

`Success!` We have found the flag.

<br>

It was nice CTF. I hope you learned something and had fun. But that’s it for now till next time take care :wave:

<br>
