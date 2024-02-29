---
title: Bug Bounty Methodology, Otorecon
layout: post
categories:
- Guide
tag: bug_bounty, bug_bounty-tools, otorecon
image: "/assets/img/otorecon.png"
image_alt: otorecon
---

<h1 align="center">
<a href="https://github.com/Mr0Wido/otorecon"><img src="https://i.hizliresim.com/s1vb4eu.png" alt="otorecon"/>
	</a>
	</h1>

# [OTORECON](https://github.com/Mr0Wido/otorecon)

I am building a tool for my bug bounty methodology. I will explain the tool, but first I want to explain myself and my methodology. You can get to the tool by clicking on the title.

First of all, I'm not a bugbounter, I don't actually have a title in cybersecurity. But I want to have one because I'm very interested in cybersecurity. So I decided to try to get a bugbounter title first and that is my goal for now. But doing bug bounty for a job looks hard. Anyway, we use a lot of different tools and different codes in bug bounty. So I just want to combine different tools together to create and control in just one tool. Then I create __`otorecon`__ tool. 
I want to do this because I believe it could be useful and good work for my portfolio.

I hope you like this article and the tool I created.

Let's continue. Now I'm going to explain my bug bounty methodology to you, I don't have any results yet and I don't know if the methodology works or not, but I believe it does. The first thing I want to say is that this methodology doesn't have a lot of detail because I created this methodology for the tool. So it's more basic and probably has a lot of things missing, but that's not important. I can improve this project with feedback. So I will wait for your feedback.

<br>

----

<br>
<br>

### Otorecon Workflow
![otorecon_workflow](https://i.hizliresim.com/lsc6sux.jpg)


<br>

----

<br>
<br>
### Basic Scan 
Basic scan fuction include theese tools, [dnmasscan](https://github.com/Mr0Wido/dnmasscan) and [whatweb](https://github.com/urbanadventurer/WhatWeb). This fuction purpose is getting basic information about target domain. You can run this command for __`basic scan`__. 

```
$ python3 otorecon.py -bs all/tools -d example.com
```

First I use __masscan__ for the find open ports. I chose __masscan__ because it's fastest than __nmap__. 

```
$ python3 dnmasscan.py <domain_file> <out_file>
```

Then I use __whatweb__ for getting a lot of information about target. 

```
whatweb -v 
```

Now we have bunch of information about target.Basic scan function save results as txt and html format. 

<br>

----

<br>
<br>

### Subdomain Scan
Subdomain scan include theese tools; 
[subfinder](https://github.com/projectdiscovery/subfinder), [assetfinder](https://github.com/tomnomnom/assetfinder), [findomain](https://github.com/Findomain/Findomain), [sublist3r](https://github.com/aboul3la/Sublist3r), 
[theHarvester](https://github.com/laramies/theHarvester?tab=readme-ov-file), 
[shuffledns](https://github.com/projectdiscovery/shuffledns), [dnsgen](https://github.com/ProjectAnte/dnsgen), 
[altdns](https://github.com/infosec-au/altdns), 
[crtsh](https://github.com/Mr0Wido/crtsh.py) and 
[wfuzz](https://github.com/xmendez/wfuzz) 

I use a lot of tool and I use bunch of wordlists for scan. But I didn't use some popular tools in `otorecon` because they are too slow. These tools are;  amass, subbrute.py, subdominizer it's a good tool but it's too slow. But I will write all of them.
Beside that this function have __`out of scope`__ option. Remember I create this tool for bugbounty. So you can write out of scope domains in a file and try __`-os`__ parameter. It's required option. And if you want you can choose __`a tool`__ for scan or __`all`__ for all tools.
You can run this command for __`subdomain scan`__

```
$ python3 otorecon.py -subs all/tools -d example.com
```

```
$ python3 otorecon.py -subs subfinder/all -d example.com -os out.txt
```

<br>

----

<br>
<br>

### Hard Subdomain Scan Tools

`Crtsh` is a usefull website you can go visit [here](https://crt.sh/) . And I write a code for getting crtsh results in terminal my code is in my github page you can download [here](https://github.com/Mr0Wido/crtsh.py)

```
$ python3 crtsh.py -d example.com
```

`theHarvester`, have very usefull results. You can download [here](https://github.com/laramies/theHarvester?tab=readme-ov-file) 

```
$ theHarvester -d example.com -b anubis,crtsh,dnsdumpster,rapiddns,otx,urlscan,yahoo -f theHarvester_out'
```

`submass`, I call that submass because we use subbrute.py and massdns. You can download subbrute [here](https://github.com/TheRook/subbrute) and you can download massdns [here](https://github.com/blechschmidt/massdns).

```
$ python3 subbrute.py example.com names.txt | massdns -r resolvers.txt -o S -w results.txt'
```

`dnsgen`, This time we use dnsgen tool(download) and massdns. You can use domains file. I saw this code in one source which I don't remember. I don't know "dnsgen -" mean. But I use in my function. You can downlad [here](https://github.com/ProjectAnte/dnsgen)

```
$ cat domain.file | dnsgen - | massdns -r resolvers.txt  -t A -o J --flush 2>/dev/null -w result.txt'
```

`wfuzz`, I use all.txt t's jason haddix's wordlists. You can download [here](https://github.com/xmendez/wfuzz). Also I write a tool for subdomain bruteforcing you can downlad [here](https://github.com/Mr0Wido/bff-subdomains)

```
$ wfuzz -f result.txt -Z -w fierce.txt/all.txt -sc 200,202,204,301,302,403 example.com
```

`altdns` you can download tool [here](https://github.com/infosec-au/altdns).

```
$ altdns -i domain.file -o result.txt -w words.txt'
```

`Subdomainizer`, you can download [here](https://github.com/nsonaniya2010/SubDomainizer) this tool have usefull results like theHarvester. 

```
$ subdomanizer -h
```

`Shuffledns` You can download [here](https://github.com/projectdiscovery/shuffledns)

```
$ shuffledns -d {domain_name} -w /names.txt -r resolvers.txt -silent'
```

Now we will get results. Subdomain Scan function save results as txt and html. Also this time theHarvester can result interesting information so I save them to.


<br>

----

<br>
<br>
### Filtering

I use [httpx](https://github.com/projectdiscovery/httpx) tool for filtering but if you want you can use [httprobe](https://github.com/tomnomnom/httprobe) to.

```
$ python3 otorecon.py -fl subdomains.txt
```
`httpx`, you can download [here](https://github.com/projectdiscovery/httpx)

```
$ httpx -l <domainlist.txt> -p 443,8443,80,8080 -mc 200,202,204,301,307,403 -status-code -title 
```

<br>

----

<br>
<br>
### Crawling URL's

I use a lot of tool for this scan. And I parse the results of the scan. Then I have two result file. One of them just include js files. First I take this file end scan with endpointer.py. Second I take other file and use clean_subs.py this like paramspider tool.

All tools;
- [crawler.py](https://github.com/Mr0Wido/urlcrawler.py)
- waymac.py
- [cocrawl.py](https://github.com/Mr0Wido/commoncrawl.py)
- [archive.py](https://github.com/Mr0Wido/webarchive.py)
- [waybackurls](https://github.com/tomnomnom/waybackurls)
- [gau](https://github.com/lc/gau)
- [getJS](https://github.com/003random/getJS)
- [katana](https://github.com/projectdiscovery/katana)
- [cariddi](https://github.com/edoardottt/cariddi)
- [hakrawler](https://github.com/hakluke/hakrawler)
- [golinkFinder](https://github.com/0xsha/GoLinkFinder)


```
$ python3 otorecon.py -cs all -cl subdomain_list.txt -cp
```

----
<br>
<br>
### Get Screenshots

I use [gowitness](https://github.com/sensepost/gowitness) for this scan. 

```
$ python3 otorecon.py -gcs domain_list.txt
```

<br>

----

<br>
<br>
### Dirsearch Scan

I use [gobuster]() for this scan. And I use 4 wordlists. Theese are;
- rd1000.txt
- raft.txt
- dirm2_3.txt
- dirsearch.txt

```
$ python3 otorecon.py -ds raft -dl subdomain_list.txt
```

<br>

----

<br>
<br>

### Full Scan

Otorecon have full scan option. This option combine all scans each other.

```
$ python3 otorecon.py -fs example.com
```

<br>

----

<br>
<br>
