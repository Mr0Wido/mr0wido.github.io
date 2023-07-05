---
title: Insecure Direct Object References (IDOR) Guide
layout: post
categories:
- Guide
tag: idor, idor guide
image: "/assets/img/idor1.png"
image_alt: idor
---

In this article, I will provide an explanation of  `Insecure Direct Object References (IDOR)` to the best of my ability.

I shared many [resources](#sources) and [labs](#labs) in this article, check them out. 

I hope you find this article useful.


### Topics

- [IDOR](#idor) <br>
- [IDOR Sources](#sources) <br>
- [IDOR Labs](#labs) <br>



<br>

![sqli](/assets/video/idor-guide/idor.png)

### What is an IDOR? {#idor}
An `Insecure Direct Object Reference (IDOR)` is a vulnerability that enables unauthorized access and the execution of actions on a targeted web application by an attacker.

Web applications often include `functions` that users can perform within their accounts, such as profile editing. However, to `prevent IDOR vulnerabilities`, proper `authorization checks` should be implemented for these functions. For instance, when a user with an `ID of 10` attempts to use the profile editing function, the web application should verify if this `action belongs to the user` with ID 10. `IF NOT`, the user may be able to `manipulate different IDs`, gaining unauthorized access to and editing profiles of other users. This is an example of an `IDOR`.

IDOR is a `dangerous and critical` vulnerability. Although a common vulnerability, it can be `much more complex and hard to detect`. The reason for this web applications get more complex as they grow. These complications lead to increased vulnerability. And because of these complications, it is difficult to detect the vulnerability.

Let's continue with an example from `Web Security Academy`.

<br>

<video width="640" height="360" controls>
  <source src="/assets/video/idor-guide/IDOR.mp4" type="video/mp4">
</video>


<br>

### IDOR Sources {#sources}

- [PwnFuction (Video) - Insecure Direct Object Reference (IDOR) Explained](https://www.youtube.com/watch?v=rloqMGcPMkI)
- [InsiderPhD (Video) - Finding Your First Bug: Manual IDOR Hunting)](https://www.youtube.com/watch?v=gINAtzdccts)
- [STÖK (Video) - Burp Suite tutorial: IDOR vulnerability automation using Autorize and AutoRepeater (bug bounty)](https://www.youtube.com/watch?v=3K1-a7dnA60&t=260s)
- [Mehmet D.INCE (Video) - Web Security 101 0x02, IDOR Insecure Direct Object Reference Zafiyetleri Hakkında Her şey](https://youtu.be/TsJ2XPuGe1k)
- [Web Security Academy - IDOR](https://portswigger.net/web-security/access-control/idor)
- [OWASP - IDOR](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/05-Authorization_Testing/04-Testing_for_Insecure_Direct_Object_References)
- [Intigriti - IDOR](https://blog.intigriti.com/hackademy/idor/)
- [Bugcrowd - How-To: Find IDOR Vulnerabilities for Large Bounty Rewards](https://www.bugcrowd.com/blog/how-to-find-idor-insecure-direct-object-reference-vulnerabilities-for-large-bounty-rewards/)
- [Ayşe Bilgi Gündüz - Everything You Need to Know About IDOR](https://medium.com/@aysebilgegunduz/everything-you-need-to-know-about-idor-insecure-direct-object-references-375f83e03a87)
- [Geeksforgeeks - IDOR](https://www.geeksforgeeks.org/insecure-direct-object-reference-idor-vulnerability/?ref=gcse)
- [HackTricks - IDOR](https://book.hacktricks.xyz/pentesting-web/idor)
- [Secjuice - IDOR ](https://www.secjuice.com/idor-insecure-direct-object-reference-definition/)
- [Thehackerish - IDOR Tutorial](https://thehackerish.com/idor-tutorial-hands-on-owasp-top-10-training/)
- [Aditya Soni - Automating BURP to find IDORs](https://medium.com/cyberverse/automating-burp-to-find-idors-2b3dbe9fa0b8)
- [ProfessorXSS - IDOR is Everywhere 😁 You need to find them](https://cyberweapons.medium.com/idor-is-everywhere-you-need-to-find-them-3ed12435c9de)
- [Gonzalo Carrasco - Fuzzing + IDOR = Admin TakeOver](https://medium.com/@gonzalocarrascosec/fuzzing-idor-admin-takeover-5343bb8f436e)
- [Mukul Trivedi (M0hn1sh) - All About Getting First Bounty with IDOR](https://infosecwriteups.com/all-about-getting-first-bounty-with-idor-849db2828c8)
- [Swapmaurya - A Simple IDOR to Account Takeover](https://medium.com/@swapmaurya20/a-simple-idor-to-account-takeover-88b8a1d2ec24)
- [Aseem Shrey - Attention to Details : Finding Hidden IDORs](https://aseem-shrey.medium.com/attention-to-details-a-curious-case-of-multiple-idors-5a4417ba8848)
- [Vickie Li - Intro to IDOR](https://vickieli.medium.com/intro-to-idor-9048453a3e5d)
- [Vickie Li - All About IDOR Attacks](https://betterprogramming.pub/all-about-idor-attacks-64c4203b518e)
- [Vickie Li - How to find more IDORs](https://vickieli.medium.com/how-to-find-more-idors-ae2db67c9489)
- [Sagar Sajeev - Business Logic Vulnerability via IDOR](https://sagarsajeev.medium.com/business-logic-vulnerability-via-idor-6d510f1caea9)
- [Jerry Shah (Jerry) - IDOR - Inside the Session Storage](https://shahjerry33.medium.com/idor-inside-the-session-storage-88af485fc899)
- [Daniel Hunt - A Bug Bounty Hunter’s Guide to IDOR Vulnerabilities](https://medium.com/techiepedia/an-bug-bounty-hunters-guide-to-idor-vulnerabilities-27012bbccd7)
- [Graham Zemel - Bug Hunting 101: IDORs for Beginners](https://thegrayarea.tech/bug-hunting-101-idors-for-beginners-40a43f7055ea)
- [JunoonBro - $$$$ IDOR’s — How to find IDORs in Ecommerce sites?](https://junoonbro.medium.com/idors-how-to-find-idors-in-ecommerce-sites-d112bd946fcf)
- [Swapmaurya - 3 Step IDOR in HackerResume](https://medium.com/@swapmaurya20/3-step-idor-in-hackerresume-a365f2632996)
- [c0d3x27 - What is IDOR Vulnerability, and how does it affect you?](https://infosecwriteups.com/what-is-idor-vulnerability-and-how-does-it-affect-you-85431d10f8fb)
- [Thexssrat - IDORs: What are they and how do you test for them?](https://thexssrat.medium.com/idors-what-are-they-and-how-do-you-test-for-them-885c9df4af36)
- [Mohammad Mohsin - Insecure Direct object Reference](https://ms-official5878.medium.com/insecure-direct-object-reference-6cbe6dc2f47e)
- [Prajit Sindhkar - Insecure Direct Object Reference](https://sapt.medium.com/insecure-direct-object-reference-cyber-sapiens-internship-task-18-986a5824c797)
- [nynan - What I learnt from reading 220* IDOR bug reports.](https://medium.com/@nynan/what-i-learnt-from-reading-220-idor-bug-reports-6efbea44db7)
- [Ozgur Alp - A Less Known Attack Vector, Second Order IDOR Attacks](https://ozguralp.medium.com/a-less-known-attack-vector-second-order-idor-attacks-14468009781a)
- [jedus0r - IDOR “Insecure direct object references”, my first P1 in Bugbounty](https://medium.com/@jedus0r/idor-insecure-direct-object-references-my-first-p1-in-bugbounty-fb01f50e25df)
- [Dhanush - Leveraging Burp Suite extension for finding IDOR(Insecure Direct Object Reference).](https://infosecwriteups.com/leveraging-burp-suite-extension-for-finding-idor-insecure-direct-object-reference-2653f9b89fd4)
- [Steiner254 - Insecure Direct Object References (IDOR)](https://medium.com/@Steiner254/insecure-direct-object-references-idor-16bf0b981b90)
- [Sathvika - Insecure Direct Object Reference](https://medium.com/@sathvika03/insecure-direct-object-reference-2506ecd37a83)
- [Shellmates Club - Insecure direct object references (IDOR) vulnerability](https://shellmates.medium.com/insecure-direct-object-references-idor-vulnerability-aa48ad99b8c8)
- [Chetan Conikee - Insecure Direct Object Reference](https://chetan-conikee.medium.com/insecure-direct-object-reference-c33bb851da05)


<br>

### IDOR Labs {#labs}

- [Web Security Academy - Lab: Insecure direct object references](https://portswigger.net/web-security/access-control/lab-insecure-direct-object-references)
- [TryHackMe - Web Application Security](https://tryhackme.com/room/introwebapplicationsecurity)
- [TryHackMe - Corridor](https://tryhackme.com/room/corridor) - [My Writeup :punch:](https://mr0wido.github.io/tryhackme-corridor/)
- [TryHackMe - Neighbour](https://tryhackme.com/room/neighbour) - [My Writeup :punch:](https://mr0wido.github.io/tryhackme-neighbour/)


<br>
<br>
I hope you liked my article. See you in my other articles:hand:
