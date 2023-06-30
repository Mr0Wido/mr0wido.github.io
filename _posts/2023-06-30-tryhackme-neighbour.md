---
title: TryHackMe - Neighbour
layout: post
categories:
- TryHackMe
tag: web, idor, authentication
image: "/assets/img/neighbour.png"
image_alt: neighbour
---

Check out our new cloud service, Authentication Anywhere. Can you find other user's secrets?

Users can enter their username and password, for a totally secure login process! You definitely wouldn't be able to find any secrets that other people have in their profile, right?

Access this challenge by deploying both the vulnerable machine by pressing the green "Start Machine" button located within this task, and the TryHackMe AttackBox by pressing the  "Start AttackBox" button located at the top-right of the page.

Navigate to the following URL using the AttackBox: http://MACHINE_IP

Check out similar content on TryHackMe:

- [IDOR](https://tryhackme.com/room/idor)

<br>

### 1. Find the flag on your neighbor's logged in page!

Let's visit the website.

Here is a login page.

![login](/assets/img/tryhackme/neighbour/login.png)

The login page says you can log in as a guest. So let's do `CTRL+U`.

![guest](/assets/img/tryhackme/neighbour/guest.png)

So, we can log in as `guest:guest`. Let's log in.

![guest-login](/assets/img/tryhackme/neighbour/guest-login.png)

Yes, we are successfully login.

![in](/assets/img/tryhackme/neighbour/in.png)

Now, we must look at the `URL`. 

![url](/assets/img/tryhackme/neighbour/url.png)

Let's change the URL to this: `?user=admin`.

Huh! It was so easy. We are now an admin.

![admin](/assets/img/tryhackme/neighbour/admin.png)


<br>

It was nice CTF. I hope you learned something and had fun. But that’s it for now till next time take care :wave:

<br>
