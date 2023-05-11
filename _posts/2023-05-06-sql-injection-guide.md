---
title: SQL Injection Guide
layout: post
categories:
- Guide
tag: sql injection, sqli guide
image: "/assets/img/sqli.png"
image_alt: sqli
---

In this article, I intended to explain SQL injection in the most basic and most easily understandable way. Because the resources, I tried to learn were often too detailed for the beginner level and not very clear for the beginner level.  So, I preferred a shorter and clearer explanation.

But it would not be right for me to give only the basic information in my article. I want you to understand the basics, and let the SQL injection fit your logic. So, there are many [resources](#sources) that I have shared in this article, check them out. There are many [labs](#labs) where you can practice your knowledge. I also shared a lot of [cheat sheets](#chs) as a helper.

I hope the article is useful to you. It helps you to learn SQL injection :worried:


### Topics

- [Basic First](#bft) <br>
- [SQL Injection and Types](#sit) <br>
- [SQL Injection Labs](#labs) <br>
- [SQL Injection Sources](#sources) <br>
- [SQL Injection Cheat Sheats](#chs) <br>

<br>

![sqli](/assets/video/sqli-guide/sqli-attack.png)

### Basic First {#bft}

### What is a Database?

A `database` is where all kinds of data and information are stored electronically.

### What is Database Management System (DBMS)?

The database is usually controlled by a `Database Management System (DBMS)`. Thanks to this system, data can be easily accessed, managed, changed, updated, and organized.

Most databases today use `SQL`.

### What is SQL?

`SQL` is a programming language used in databases to query, manipulate and define data, as well as to provide access control.

<br>

### SQL Injection and Types {#sit}

A web application sends SQL queries to use data found in the database. The attacker can inject their own queries into these SQL queries or manipulate the queries. In this case, it can access other information stored in the database. We call this situation the `SQL Injection` vulnerability.

A successful `SQL injection` attack can result in unauthorized access to sensitive data, such as passwords, credit card details, or personal user information.  In some cases, an attacker can obtain a persistent backdoor into an organization's systems, leading to a long-term compromise that can go unnoticed for an extended period.

<br>
### Error-Based SQLi

An error is received in response to submitted SQL queries. The attacker can also send new queries according to this error, or by manipulating the error, he can reach the information he wants to reach from within the output.

<br>
### Union-Based SQLi

Multiple `Select` queries can be written using the `Union` operator. In this case, the attacker can write his own SELECT query with a union operator. But it should be noted that when the union expression is used, the `number of columns must be equal` to each other.

<video width="640" height="360" controls>
  <source src="/assets/video/sqli-guide/Union-Based-SQLi.mp4" type="video/mp4">
</video>

<br>

### Boolean-Based SQLi

It does not return an error or requested information in response to submitted SQL queries. Instead, it gives a `true or false` answer. This makes the process very long.

<video width="640" height="360" controls>
  <source src="/assets/video/sqli-guide/Boolean-Based-SQLi.mp4" type="video/mp4">
</video>
<br>

### Time-Based SQLi

It doesn't return anything in response to submitted SQL queries. However, the attacker tries to see if the query works by adding functions such as `sleep()` to these SQL queries.

<video width="640" height="360" controls>
  <source src="/assets/video/sqli-guide/Time-Based-SQLi.mp4" type="video/mp4">
</video>
<br>

### Out-of-Ban SQLi

None of the techniques described so far will work. The application's response doesn't depend on whether the query returns any data, on whether a database error occurs or on the time taken to execute the query. In this situation, it is often possible to exploit the blind SQL injection vulnerability by triggering out-of-band network interactions with a system that you control. These can be triggered conditionally, depending on an injected condition, to infer information one bit at a time. But more powerfully, data can be exfiltrated directly within the network interaction itself.

Various network protocols can be used for this purpose, but typically the most effective is DNS.

<video width="640" height="360" controls>
  <source src="/assets/video/sqli-guide/Out-of-Band-SQLi.mp4" type="video/mp4">
</video>
<br>

### Warning

Take care when injecting the condition OR 1=1 into a SQL query. Although this may be harmless in the initial context you're injecting into, it's common for applications to use data from a single request in multiple different queries. If your condition reaches an UPDATE or DELETE statement, for example, this can result in an accidental loss of data.

<br>

### SQL Injection Labs {#labs}

- [Web Security Academy - All Labs](https://portswigger.net/web-security/all-labs)
- [TryHackMe - SQL Injection Lab](https://tryhackme.com/room/sqlilab)
- [TryHackMe - OWASP Juice Shop](https://tryhackme.com/room/owaspjuiceshop)
- [TryHackMe - SQL Injection](https://tryhackme.com/room/sqlinjectionlm)
- [TryHackMe - Sqlmap](https://tryhackme.com/room/sqlmap)
- [TryHackMe - Game Zone](https://tryhackme.com/room/gamezone)
- [TryHackMe - Poster](https://tryhackme.com/room/poster)
- [TryHackMe - Chill Hack](https://tryhackme.com/room/chillhack) - [My Writeup :punch:](https://mr0wido.github.io/tryhackme-chill-hack/)
- [TryHackMe - Gallery](https://tryhackme.com/room/gallery666) - [My Writeup :punch:](https://mr0wido.github.io/tryhackme-gallery/)
- [TryHackMe - Avengers Blog](https://tryhackme.com/room/avengers)
- [TryHackMe - The Marketplace](https://tryhackme.com/room/marketplace) - [My Writeup :punch:](https://mr0wido.github.io/tryhackme-the-marketplace/)
- [TryHackMe - Wekor](https://tryhackme.com/room/wekorra)
- [TryHackMe - Zeno](https://tryhackme.com/room/zeno)
- [TryHackMe - SQHell](https://tryhackme.com/room/sqhell)
- [TryHackMe - Olympus](https://tryhackme.com/room/olympusroom)
- [TryHackMe - Revenge](https://tryhackme.com/room/revenge)
- [TryHackMe - Metamorphosis](https://tryhackme.com/room/metamorphosis)
- [TryHackMe - WWBuddy](https://tryhackme.com/room/wwbuddy)
- [TryHackMe - Unstable Twin](https://tryhackme.com/room/unstabletwin)
- [TryHackMe - Daily Bugle](https://tryhackme.com/room/dailybugle) - [My Writeup :punch:](https://mr0wido.github.io/tryhackme-daily-bugle/)
- [TryHackMe - Year of the Dog](https://tryhackme.com/room/yearofthedog)
- [TryHackMe - Year of the Pig](https://tryhackme.com/room/yearofthepig)
- [TryHackMe - M4tr1x: Exit Denied](https://tryhackme.com/room/m4tr1xexitdenied)
- [PentesterLab - From SQL Injection to Shell](https://pentesterlab.com/exercises/from_sqli_to_shell/course)
- [PentesterLab - From SQL Injection to Shell: PostgreSQL Edition](https://pentesterlab.com/exercises/from_sqli_to_shell_pg_edition/course)
- [CTFLearn - Basic Injection](https://ctflearn.com/challenge/88)
- [CTFLearn - Inj3ction Time](https://ctflearn.com/challenge/149)

<br>

### SQL Injection Sources {#sources}

- [Web Security Academy - SQL injection](https://portswigger.net/web-security/sql-injection)
- [TryHackMe - SQL Injection](https://tryhackme.com/room/sqlinjectionlm)
- [HackerRank - SQL](https://www.hackerrank.com/domains/sql)
- [OWASP - SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection)
- [Niveet Palan - Handbook for SQL Injection](https://systemweakness.com/handbook-for-sql-injection-2c12ec29d7ee)
- [Graham Zemel - Step by Step Guide to SQL Injection](https://thegrayarea.tech/p1-bug-hunting-a-step-by-step-guide-to-sql-injection-76f95c8986b0)
- [Raj Chandel’s Blog - Manual SQL Injection Exploitation Step by Step](https://www.hackingarticles.in/manual-sql-injection-exploitation-step-step/)
- [Atmanand Nagpure - A technique that a lot of SQL injection beginners don’t know](https://infosecwriteups.com/a-technique-that-a-lot-of-sql-injection-beginners-dont-know-atmanand-nagpure-write-up-abdc7c269dd5)
- [goswamiijaya - Identifying & Exploiting SQL Injections: Manual & Automated](https://infosecwriteups.com/identifying-exploiting-sql-injection-manual-automated-79c932f0c9b5)
- [daffainfo - SQL Injection](https://github.com/daffainfo/AllAboutBugBounty/blob/master/SQL%20Injection.md)
- [Security Lit Limited - Definitive Guide to SQL Injection](https://infosecwriteups.com/definitive-guide-to-sql-injection-df5ac445eef1)
- [goswamiijaya - Exploiting Error Based SQL Injections & Bypassing Restrictions](https://infosecwriteups.com/exploiting-error-based-sql-injections-bypassing-restrictions-ed099623cd94)
- [Lee Chun How - Out-of-Band (OOB) SQL Injection](https://infosecwriteups.com/out-of-band-oob-sql-injection-87b7c666548b)
- [Mcry - First step to an SQL-Injection](https://infosecwriteups.com/first-steps-to-sql-injection-45fc0d9aae21)
- [Secpy Community - SQL Injection: An Overview](https://infosecwriteups.com/sql-injection-an-overview-1057c5729dc5)
- [Frost - What is SQL Injection and How Does it Work](https://infosecwriteups.com/what-is-sql-injection-6985c298ea20)
- [Kontra Application Security - SQL Injection](https://application.security/free-application-security-training/owasp-top-10-sql-injection)
- [Start - SQL Injections](https://www.hacksplaining.com/exercises/sql-injection#/start)
- [CTFlearn - SQL Injection](https://ctflearn.com/lab/SQL-Injection-Part-1)
- [Imperva - What is SQL Injection](https://www.imperva.com/learn/application-security/sql-injection-sqli/)
- [Edward Low - Edward Low](https://python.plainenglish.io/pentesting-introduction-to-sql-injection-attack-part-1-5166e4617b71)
- [Sudarshan S - SQL INJECTION: IMPORTANT...](https://systemweakness.com/sql-injection-important-things-you-need-to-know-right-now-b173cdea0610)
- [Arth Detroja - SQL Injection](https://systemweakness.com/sql-injection-6348398d6651)
- [A51F221B - Web penetration testing guide](https://a51f221b.medium.com/web-penetration-testing-guide-3a5162731fe6)
- [W3Schools - SQL Tutorial](https://www.w3schools.com/sql/default.asp)
- [Codecademy - Learn SQL](https://www.codecademy.com/learn/learn-sql)
- [Programiz - Learn SQL: SQL Tutorial for Beginners](https://www.programiz.com/sql)
- [TutorialsPoint - SQL Tutorial](https://www.tutorialspoint.com/sql/index.htm)
- [Cyber Security Roadmap](https://roadmap.sh/cyber-security)

<br>

### SQL Injection Cheat Sheets {#chs}

- [Web Security Academy - SQL Injection Cheat Sheet](https://portswigger.net/web-security/sql-injection/cheat-sheet)
- [Ismail Tasdelen - SQL Injection Payload List](https://infosecwriteups.com/sql-injection-payload-list-b97656cfd66b)
- [NetSPI SQL Injection Wiki](https://sqlwiki.netspi.com/)
- [Pentestmonkey - Oracle SQL Injection Cheat Sheet](https://pentestmonkey.net/cheat-sheet/sql-injection/oracle-sql-injection-cheat-sheet)
- [Pentestmonkey - MySQL SQL Injection Cheat Sheet](https://pentestmonkey.net/cheat-sheet/sql-injection/mysql-sql-injection-cheat-sheet)
- [Pentestmonkey - Postgres SQL Injection Cheat Sheet](https://pentestmonkey.net/cheat-sheet/sql-injection/postgres-sql-injection-cheat-sheet)
- [Pentestmonkey - Informix SQL Injection Cheat Sheet](https://pentestmonkey.net/cheat-sheet/sql-injection/informix-sql-injection-cheat-sheet)
- [Pentestmonkey - MSSQL Injection Cheat Sheet](https://pentestmonkey.net/cheat-sheet/sql-injection/mssql-sql-injection-cheat-sheet)
- [Pentestmonkey - DB2 SQL Injection Cheat Sheet](https://pentestmonkey.net/cheat-sheet/sql-injection/db2-sql-injection-cheat-sheet)
- [Pentestmonkey - Ingres SQL Injection Cheat Sheet](https://pentestmonkey.net/cheat-sheet/sql-injection/ingres-sql-injection-cheat-sheet)
- [Codecademy - Preventing SQL Injection Attacks](https://www.codecademy.com/learn/defending-express-applications-from-sql-injection-xss-csrf-attacks/modules/preventing-sql-injection-attacks/cheatsheet)
- [Exploiting hard filtered SQL Injections](https://websec.wordpress.com/2010/03/19/exploiting-hard-filtered-sql-injections/)
- [MS Access SQL Injection Cheat Sheet](http://web.archive.org/web/20080822123152/http://www.webapptest.org/ms-access-sql-injection-cheat-sheet-EN.html)
- [Yazılım Kodlama - SQL Sorguları ve SQL Sorgu Örnekleri](https://www.yazilimkodlama.com/sql-server-2/sql-sorgulari-ve-ornekleri/)
- [Cheatography - Injection SQL Cheat Sheet by Neolex](https://cheatography.com/neolex/cheat-sheets/injection-sql/)
- [Cheatography - SQL CheatSheet Cheat Sheet by nimakarimian](https://cheatography.com/nimakarimian/cheat-sheets/sql-cheatsheet/)
- [INVICTI - SQL Injection Cheat Sheet](https://www.invicti.com/blog/web-security/sql-injection-cheat-sheet/)
- [Deadly Hacker - List of google dorks for sql injection](https://deadlyhacker.wordpress.com/2013/05/09/list-of-google-dorks-for-sql-injection/)
- [Perspective Risk - MySQL SQL Injection Practical Cheat Sheet](https://perspectiverisk.com/mysql-sql-injection-practical-cheat-sheet/)
- [MySQL Injection Cheat Sheet](https://www.asafety.fr/mysql-injection-cheat-sheet/)


<br>
<br>
I hope you liked my article. See you in my other articles:hand:
