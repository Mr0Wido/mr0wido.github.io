---
title: SQL INJECTION
layout: post
categories:
- Guide
tag: sql injection
image: "/assets/img/sqli.png"
image_alt: sqli
---

Learn how to detect and exploit SQL Injection.

## SQL INJECTION

Öncelikle temel olarak bilmemiz gereken şeyler var.

### Veritabanı Nedir?

Veritabanı, her türlü verilerin ve bilgilerin elektronik olarak depolandığı yerdir.

### Veritabanı Yönetim Sistemi (DBMS) Nedir?

Veritabanı genellikle bir veritabanı yönetim sistemi (DBMS) ile kontrol edilir. Bu sistem sayesinde veriler kolayca erişilebilir, yönetilebilir, değiştirilebilir, güncellenebilir ve organize edilebilir hale getirilir. Günümüzde çoğu veritabanında SQL kullanılır.

### SQL Nedir?

SQL verileri sorgulamak, değiştirmek, tanımlamak ve aynı zamanda erişim kontrolü sağlamak üzere veritabanlarında kullanılan bir programlama dilidir

<br>

## SQL Injection ve Türleri?

### SQL Injection Nedir?

Bir web uygulaması, veritabanında bulunan verileri kullanmak için SQL sorguları gönderir. Saldırgan ise bu SQL sorgularına kendi sorgularını enjekte etmesi ile ya da bu sorguları manupile etmesi ile veritabanında saklanan diğer bilgilere ulaşabilir. Bu duruma SQL Injecction açığı deriz.

### Union-Based SQLi

Union ifadesi kullanılarak birden fazla Select sorgusu yazılabilir. Bu durumda saldırgan kendi SELECT sorgusunu union ifadesi ile yazabilir. Fakat dikkat edilmesi gerekilen, union ifadesi kullanıldığında kolon sayılarının birbirine eşit olması gerekir.

### Error-Based SQLi

Gönderilen SQL sorgularında cevap olarak bir hata alınır. Saldırgan da bu hataya göre yeni sorgular gönderebilir, hatayı manipüle ederek çıktının içerisinden ulaşmak istediği bilgiye ulaşabilir.

### Boolean-Based SQLi

Gönderilen SQL sorgularına cevap olarak bir hata veya sorguda ulaşılmak istenen bilgiyi vermez. Bunların yerine doğru veya yanlış cevabını verir. Bu da işlemleri çok uzun hale getirir.

### Time-Based SQLi

Gönderilen SQL sorgularına cevap olarak hiçbirşey vermez. Fakat bu SQL sorgularına sleep() gibi fonksiyonlar eklenilerek. Sorgunun işe yarayıp yaramadığı anlaşılmaya çalışılır.

### Out-of-Ban SQLi

<video width="640" height="360" controls>
  <source src="/assets/video/Out-of-Band-SQLi.mp4" type="video/mp4">
</video>

<br>

<br>

Warning
Take care when injecting the condition OR 1=1 into a SQL query. Although this may be harmless in the initial context you're injecting into, it's common for applications to use data from a single request in multiple different queries. If your condition reaches an UPDATE or DELETE statement, for example, this can result in an accidental loss of data
