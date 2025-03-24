---
title: Bir Türk Genci ve Bug Bounty
layout: post
categories:
- Social
tag:
- security,
- bug-bounty
- social
image: "/assets/img/pic.jpg"
image_alt: money
---

Bir Türk Gencinin Çabası, Bug Bounty Nedir? Bug Bounty Yol Haritası  

<br>

## __Contents__
- [__Bug Bounty Nedir?__](#bug-bounty-nedir)
- [__Kendi Çabalarım__](#kendi-çabalarım)
- [__Bug Bounty Yol Haritası ve Kaynaklar__](#bug-bounty-yol-haritası-ve-kaynaklar)
    - [Araştırma](#araştırma)
    - [Temel Teknolojiler ve Terimler](#temel-teknolojiler-ve-terimler)
    - [Güvenlik Açıkları](#güvenlik-açıkları)
    - [Bug Bounty](#bug-bounty)
    - [Recon](#recon)
    - [Attack](#attack)
	- [Bug Bounty ile Alakalı Tüm Kaynaklar](#bug-bounty-ile-alakalı-tüm-kaynaklar)
	- [Lab Ortamları](#lab-ortamları)


<br>
<br>


## __Bug Bounty Nedir?__

Basitçe, şirketlerin belirlediği kurallar çerçevesinde bulduğunuz güvenlik açıkları karşılığında ödül aldığınız bir sistem. Bu sistemde aracı kuruluşlar var; HackerOne, Bugcrowd, Intigriti gibi ve kendi ülkemizde de olan Bugbounter gibi siteler. Hackerlar ile şirketler arasında bir bağlantı olurlar. Bizler de bu siteler aracılığıyla bulduğumuz güvenlik açıklarını raporlarız. Bu sayede de hem şirket fayda görür hem e biz ödül kazanabiliriz. 
## __Kendi Çabalarım__

Fakir ama gönlü zengin bir genç olarak Bug Bounty'den bahsedeceğim. Bunları anlatıyorsun peki sen hiç para kazandın mı derseniz eğer kazanamadım. Hala deniyorum, pes etmedim, pes etmeyeceğim.

![dontgivup](/assets/img/social/you-never-give-up-john-cena.gif)


İşin özüne gelirsek eğer, birkaç yıl oldu bu işi deneyeli ve o zamanlar çok fazla bilgi sahibi değildim. İlgileniyordum bu işlerle fakat küçük şeylerle uğraşıyordum, kendime websitesi falan yapıyordum. Ama bundan çok zevk alıyordum. Küçük bir şeyi tasarlayıp bitirdiğimde, o websitesi hiçbir şeye benzemese de başarmışlık hissinin verdiği haz farklı oluyordu. Bu haz bir süre bu işlerle uğraşmaya devam etmeni sağlar fakat zaman ilerlediğinde para kazanman gerçekliğiyle yüzleşeceksin. Ben de yüzleştim bu gerçekle ve kötü yola düşmeden :smile: bir hacker olarak para kazanmanın yollarını aradım.

Bu gerçek seni araştırmaya itiyo ve buluabileceğin en iyi sonuç freelancer çalışmak oluyor. İlgi alanına göre de ilerleyişin değişiyor tabi ki.

Bu sırada da ben bug bounty olayını duydum ve büyülendim. Dışarıda bu işin içerisinde on yıllarını vermiş insanlar, bu olayı anlattığında kolay bir işmiş gibi duruyor. Ben de bu iş çok iyimiş, hemen yaparım dedim. Fakat öyle değil. Çok fazla çaba ve öğrenme süreci var ve bu süreci karşılıksız yapmak çok zor. Çünkü hayatımızda bir çok sorun bir çok derdin yanında okul falan derken uzun bir öğrenme sürecinde hedefinizi kovalamanız gerekiyor. Bu sadece bug bounty için değil bizim ülkemizdeki her gencin herhangi bir hayali için geçerli.

__`Bu süreçte öğrenme faslını hızlıca geçmeye çalıştığında ve sadece para kazanmaya odaklı ilerlediğinde en büyük hatayı yapıyorsun. İşin aslını kaçırıp yıllarca kendini oyalamaktan başka hiçbir şey yapmıyorusun.`__

__`Bu süreçte herhangi bir başarmışlık hissi almayacaksın. Zamanını harcayacaksın bu işi herşeyin haline getireceksin. Getireceksin ki güncel kalabilesin. Çevre kurucaksın. Başarmak için kolay bir yol yok. Bir disiplinin olacak ve ona uyacaksın, keyfine düşkünsen bu işte başarılı olamazsın. Öğrenmekten, oturup araştırmaktan, bilgisayar başında bir şeyler okumaktan zevk almıyorsan bu işte başarılı olamazsın. Ben bunun bir örneğiyim.`__

__Eğer üçkağıtçı değilseniz, suçlu veya siyasetçi değilseniz kimsenin hakkını yemiyorsanız kolay para diye bir şey hiç bir yerde yok.__

- İş zor olacak, pes etmeyeceksin.
- Para kazanmadan önce çok fazla zamanını ayıracaksın.
- En temel bilgileri dahi okumaktan çekinmeyeceksin ve disiplinini bozmayacaksın.
- İngilizcen de iyi olacak okuduğunu aşağı yukarı anlıyacaksın.
- Gerisi sende

![gif](/assets/img/social/you-got-it-spongebob.webp)

<br>

## __Bug Bounty Yol Haritası ve Kaynaklar__

Her şeyi sıfırdan anlatmayacağım. Linux öğrenin vesaire diye. Bunlar her halükarda bilmeniz gereken en temel şeyler.

## __Araştırma__

Bu temel değil mi? Bu da temel ama herkesin atladığı bir temel. İnsanlara öğretmesi en zor olan şey araştırmak. Araştırma duygusuna sahip olun, bulabildiğiniz tüm kaynakları internette araştırın, öğrenmek istediğiniz şeyleri yazmaktan çekinmeyin en basit şeyi bile. Bilmemekten iyidir. Mesela uzak durulması gereken bir tür var bunlar her türlü +18 içeriği aratmasını bilir ama PDF nasıl dönüştürülür diye yazmaktan çekinir. :stop_sign: :facepunch:

Bunu neden söylüyorum? Bug bounty güncel bir iş. Yeni web siteleri, yeni teknolojiler demek, yeni güvenlik açıkları demek. Bu yüzden sürekli bilmediğiniz şeyler karşınıza çıkacak. `Bu yüzden araştırmak bizim için daha daha önemli.`

## __Temel Teknolojiler ve Terimler__

Bug bounty'e özel olmayan fakat bilginiz dahilinde olması gereken şeyler de mevcut.  Çok daha genel ve siber güvenlik kavramını kapsayan terimler. Bunun için kesinlikle önerim [Roadmap.sh'a](https://roadmap.sh/cyber-security) bakmanız. Burada çok kapsamlı bir bilgi ağacı var her biri çok değerli ve temelde sahip olmanız gereken bilgiler. Ve bu bilgileri kavramanız gerek.

Bence İngilizce bir şeyi okuyup anlamak ile o bilgiyi kavramak arasında çok fark var. Zaten orada yazanlara bağlı kalmamanızı ve orada gördüğünüz şeyleri ayrıca araştırmanız gerekeceğini söylememe gerek yoktur herhalde.

__`Benim bu konuda izlediğim yol ise websitesi açmak. Websitesi açmaktaki sebep ise anlatmak. Bir bilgiyi kavramadan anlatmanız imkansız. O bilgiyi anlayıp kafanızda oturttuğunuz zaman o konuda bir şeyler anlatabilir olursunuz. Araştırın, öğrenin ve anlatın.`__

## __Güvenlik Açıkları__

`Roadmap.sh'ta` yer alan temel her şeyi hallettiğinizde tabii ki her şeyi öğrenmiş olmuyorsunuz. __`Sizin için artık en önemli şey güvenlik açıklarını anlamak.`__ Roadmap'te her şey çok detaylı değil. Sizin de artık yeni ve daha detaylı kaynaklara geçmeniz gerekiyor, araştırmalar yapmanız gerekiyor.  Web security içerisindeki güvenlik açıklarının çoğuna hakim olmanız gerekiyor. En iyi kaynak sizin en iyi anladığınız olacaktır. Ben [Mehmet INCE abinin](https://youtube.com/playlist?list=PLwP4ObPL5GY940XhCtAykxLxLEOKCu0nT&si=0NJlE6NnsNZZZ7H6)  videolarını yalayıp yutmanızı öneririm. Videoları tek seferde yalayıp yutmak zor, tekrar tekrar izleyin ve kavrayın. Sonrasında siz de anlatmaya çalışın ister yazarak yapın ister videoya alın. Ayrıca bu tür içerik yaratmak da sizin kariyeriniz için çok iyi olacaktır.


__`Güvenlik açıklarını araştırıp okuyup, izleyip kavradıktan sonra lablarda bunları uygulamalı test edin.`__ TryHackMe benim en sevdiğim platform, arayüzü basit ve anlaşılır. Burada öğrendiğiniz güvenlik açıklarıyla alakalı labları bulun ve test edin. Bunun gibi birçok platform var. [Kaynaklar](#bug-bounty-ile-alakalı-tüm-kaynaklar) kısmından bakabilirsiniz.

İkinci önerim [PortSwigger](https://portswigger.net/web-security/all-labs) olacak daha detaylı güvenlik açıklarını test edebiliyorsunuz.

[testphp.vulnweb'de](http://testphp.vulnweb.com/)  benim en sevdiklerimden burada da birçok şeyi test edebilirsiniz.


## __Bug Bounty__

Gel gelelim Bug bounty metodolojisine, araştırmayı öğrendik, güvenlik açıklarına hakimiz artık para kazanabiliriz. Değil mi? Herhalde kazanırız,  inşallah kazanırız.

![hope](/assets/img/social/detective-pikachu-anime.gif)

Bug bounty'de para ödüllü sitelerde rakipleriniz çok olacağından güvenlik açığı bulmak daha zor olacaktır. Öncelikle ödül vermeyen sitelerde şansınızı deneyebilirsiniz. Ben hiç denemedim.

Bug Bounty metodolojisi olarak araştırdığınızda birçok farklı şey göreceksiniz ama olay temelde aynı; hedef hakkında bilgi toplayıp bulabildiğiniz bu bilgilerle güvenlik açığı yaratmak. 

Öncelikle hedefinizi belirleyin. Hedef belirleme önemli bir kısım. Kuralları dikkatli okuyun ve başlangıçta bol domainli sitelerde şanısnızı deneyin, ihtimallerinizi yükseltirsiniz.  Hedefinizi belirledikten sonra şunlar çok önemli; __`hedef sitenin yapısını anlamak, websitesinin amacını anlamak, ne yaptığını ve o site için ne olursa tehlikeli olur, bunları anlamak.`__  Bu saydıklarım öncelikli olarak bir websitesinde güvenlik açığı aramadan önce hakim olmanız gereken bilgilerdir.

Güvenlik testlerinde sizin için en iyi araç Burp Suite olacaktır. Alternatif olarak istekleri izleyebilceğiniz postman veya caido gibi uygulamalarda var. Kullanması size hangisi daha rahat geliyor ise onu kullanın. 
## Recon

Bilgi edinme olayına recon diyoruz ve recon içerisinde araç kullanmaktan çekinmemize gerek yok. Birçok araç var ve bunlarla bilgiler toplarsınız, bu konuda yazdığım [toolu](https://github.com/Mr0Wido/otorecon) kullanabilirsiniz. Recon için oluşturduğum metodolojimde şu şkilde;

![otorecon](/assets/img/social/otorecon.png)

## Attack

Bu bilgileri edindikten sonra bu bilgileri teker teker test etmek gerek. Güvenlik açığı testlerini otomatize etmek için toollar var fakat kesinlikle önermem. __`Toollar aptaldır.`__  Sadece verilen if-else'leri yaparlar. Akıllı olan biziz siteye göre ne arayacağımızı biliriz neye dikkat edeceğimizi biliriz, tool bilmez.

`Bu nedenle manuel olarak web sitesini test etmek bizim için çok daha verimli olacaktır. Bilgi toplamak için araç kullanabiliriz tespit ettiğimiz güvenlik açıklarını patlatmak için de araç kullanabiliriz ama güvenlik açığını tespit etmek için tool kullanmak bize hiçbir şey getirmez`.  Ama şu da var ki, bir Türk genci olmanın zorluğu olarak öğrenmeyi bekleyemiyecek durumda oluyoruz. Bu yüzden bir yandan toollarla şansınızı deneyip bir yandan da öğrenmeye devam etmeniz benim size önerim olur. Ben de bunu yapıyorum ve şu aracı ['otoattack'](https://github.com/Mr0Wido/otoattack) yeni bitirdim. Siz de deneyebilirsiniz. Belki şansınıza bulursunuz ve size öğrenmeye daha çok iter.

![otoattack](/assets/img/social/otoattack.png)

Güvenlik açıklarını raporlamak için de internette halka arz edilmiş birçok rapor var. Bulduğunuz güvenlik açıklarıyla alakalı raporlara bakın örnek ve güzel bir rapor yazın. Nasıl yazılacağı konusunda araştırmalar yapın.

Bunların haricinde anlatacak bir şey yok. Bu iş kesinlikle basit bir şey değil ve toolardan da fazla ümit etmeyin işin asıl kısmını öğrenmeyi halledin. Ve gerisi gelecektir. İnternet nasıl işler bilmiyorken ben bug bounty yapacağım demeyin.


 Bunlar bu konudaki genel görüşlerimdi. Umarım yardımı dokunur. Kendinize iyi bakın.  :wave:

## __Bug Bounty ile Alakalı Tüm Kaynaklar__

- [Bug Bounty Books](https://github.com/akr3ch/BugBountyBooks/tree/main)
- [@m0chan -  Bug Bounty Cheatsheet](https://m0chan.github.io/2019/12/17/Bug-Bounty-Cheetsheet.html)
- [Recon Like A Boss](https://bugbountytuts.wordpress.com/wp-content/uploads/2019/01/dirty-recon-1.pdf)
- [@six2dez - pentest-book](https://pentestbook.six2dez.com/)
- [Comprehensive Bug Bounty Hunting Methodology](https://infosecwriteups.com/comprehensive-bug-bounty-hunting-checklist-2024-edition-4abb3a9cbe66)
-  [The Bug Hunters Methodology v3](https://pentester.land/blog/levelup-2018-the-bug-hunters-methodology-v3/)
- [The Bug Hunter’s Methodology v4](https://hadariel.pp.ua/aboutme/ethical-hacking/files/TBHMv4%20Recon.pdf)
- [tbhm](https://github.com/jhaddix/tbhm/tree/master)
- [Resources-for-Beginner-Bug-Bounty-Hunters](https://github.com/nahamsec/Resources-for-Beginner-Bug-Bounty-Hunters/blob/master/assets/tools.md)
- [Bug-Bounty-Methodology](https://github.com/trilokdhaked/Bug-Bounty-Methodology)
- [websec101](https://github.com/LuNiZz/websec101)
- [Bugcrowd University](https://github.com/bugcrowd/bugcrowd_university)
- [CS 253 Web Security](https://web.stanford.edu/class/cs253/)
- [Bug-Bounty-Beginner-Roadmap](https://github.com/bittentech/Bug-Bounty-Beginner-Roadmap)
- [bug-bounty-reference](https://github.com/ngalongc/bug-bounty-reference)
- [awesome-security](https://github.com/sbilly/awesome-security)
- [PENTESTING-BIBLE](https://github.com/blaCCkHatHacEEkr/PENTESTING-BIBLE)
- [AllAboutBugBounty](https://github.com/daffainfo/AllAboutBugBounty)
- [awesome-web-security](https://github.com/qazbnm456/awesome-web-security)
- [awesome-pentest](https://github.com/enaqx/awesome-pentest)
- [Awesome-Hacking](https://github.com/Hack-with-Github/Awesome-Hacking)

__`TOOLS`__
- [awesome bugbounty tools](https://github.com/vavkamil/awesome-bugbounty-tools)
- [Bug Bounties With Bash](https://tomnomnom.com/talks/bash-bug-bounty.pdf)
- [Bug Bounty Forum](https://bugbountyforum.com/tools/)
- [WebHackersWeapons](https://github.com/hahwul/WebHackersWeapons?tab=readme-ov-file#tools)
- [One-Liners](https://github.com/0xPugal/One-Liners)
- [Awesome One-liner Bug Bounty](https://github.com/dwisiswant0/awesome-oneliner-bugbounty)
- [oneliner commands](https://github.com/twseptian/oneliner-bugbounty)
- [PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings)
- [Awesome Burp Extensions](https://github.com/snoopysecurity/awesome-burp-extensions)
- [KingOfBugBountyTips](https://github.com/KingOfBugbounty/KingOfBugBountyTips) 
- [Pentest-Cheat-Sheets](https://github.com/Kitsun3Sec/Pentest-Cheat-Sheets)
- [awesome-hacker-search-engines](https://github.com/edoardottt/awesome-hacker-search-engines)
- [bug-bounty-tools](https://github.com/Mr0Wido/bug-bounty-tools)
## __Lab Ortamları__

- [TryHackMe](https://tryhackme.com/dashboard)
- [cyberexam](https://learn.cyberexam.io/dashboard)
- [hacker101](https://ctf.hacker101.com/)
- [BugBountyHunter](https://www.bugbountyhunter.com/training/)
- [overthewire](https://overthewire.org/wargames/natas/)
- [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/)
- [hackinghub](https://app.hackinghub.io/hubs)
- [Nahamsec's Intro To Bug Bounty Labs](https://github.com/nahamsec/nahamsec.training)
- [vulnhub](https://www.vulnhub.com/)
- [Smash The Stack](https://www.smashthestack.org/main.html)
- [rootme](https://www.root-me.org/?lang=en)
- [pwnable](https://pwnable.xyz/)
- [pentesterlab](https://pentesterlab.com/)
- [legacy](https://legacy.hacking-lab.com/events/)
- [exploit-education](https://exploit.education/)
- [cryptohack](https://cryptohack.org/)
- [SecGen](https://github.com/cliffe/SecGen)
- [RootTheBox](https://github.com/moloch--/RootTheBox)
- [picoCTF](https://picoctf.com/)
- [CTFd](https://github.com/CTFd/CTFd)
- [ctftime](https://ctftime.org/)


<br>
<br>
<br>
