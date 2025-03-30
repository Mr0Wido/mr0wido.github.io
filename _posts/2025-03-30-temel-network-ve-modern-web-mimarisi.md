---
title: Temel Network ve Modern Web Mimarisi
layout: post
categories:
- Guide
tag: basic_network, modern-web, cyber-security
image: "/assets/img/HTTP-.gif"
image_alt: http
---

<br>
Elimden geldiğince ve öğrendiğim kadarıyla temel ağ yapısından ve modern web mimarisini anlatacağım. 

<br>


## Basic Networking - Temel Ağ 

Yanlış anladığım yerler veya eksik bilgilerim muhakkak vardır. Gözünüze çarpan veya üzerine eklemek istediğiniz şeyler olursa yazmaktan çekinmeyin lütfen. `Birbirimize destek olarak daha güzel öğreniriz.`

![dontshy](/assets/img/guide/temel_network/homelander.gif)

Konulara geçmeden önce şunu belirtmeliyim, ben konuları anlatırken internette çok kolay bir şekilde ulaşabileceğiniz terimleri dizip Türkçesini yazıp geçmeyeceğim. Ben nasıl kavradıysam o şekilde anlatmak istiyorum ve bu şekilde konuların daha anlaşılabilir olduğuna inanıyorum. Burada akademik makale yazmıyoruz sonuçta.

Son olarak konuyu öğrendiğim kaynaklardan bahsetmek istiyorum. Bence temel ağ konusu sadece okuyarak anlaması zor bir konu. Görerek öğrenmesinin daha kolay olduğunu düşünüyorum ve internette bu konuda inanılmaz sayıda güzel kaynaklar var. 

Benim öncelikli kaynağım ise şu :point_right: [Mdisec - Web Security 101 0x04](https://youtu.be/3AgDSw0I89A)
Bu video ile temel ağ yapısını ve modern web sistemini öğrendim.

Cloudflare'in de güzel bir eğitimi var, buna da bakabilirsiniz. :point_right: [Learning Center](https://www.cloudflare.com/learning/)

Anlamadığım veya detaya ihtiyacım olduğu noktalarda da yapay zekaya başvurdum. 

İşe yarıyabilceğini düşündüğüm farklı birkaç kaynak daha topladım. Burada :point_right: [Kaynaklar ve Lablar](#derlediğim-farklı-kaynaklar-ve-lablar)

Bu süreçte ortaya çıkan güvenlik açıklarından da ileride bahsediyorum :point_right: [Güvenlik Açıkları](#networkte-ortaya-çıkan-bazı-güvenlik-açıkları)


Gelelim konumuza, bugün birçok soruya cevap vermeye çalışacağım. Bu sorular kısaca şunlar;
-  ##### OSI Katmanları neler ve bu katmanlarda neler oluyor?
- ##### Bir internet sitesine girene kadar yaşananlar nelerdir?
- ##### Ortalama bir web sitesinin işleyişi nasıldır? Günümüz sisteminde.
- ##### Ve bu işleyişin her bir kısmından doğan zafiyetler nelerdir?

Her şeyi baştan ele aldığımızda, **`OSI (Open Systems Interconnection)`**  katmanları bize genel işleyişi gösteriyor. Bu katmanların ne olduğunu bilmek bu katmanlarda neler olduğunu bilmek bizim için önemli. Katmanlar üzerinden anlatarak ilerleyeceğim. 

**`Not: Bu katmanların çoğunu wireshark kullanarak bir sunucuya istek yollayıp izleyebilirsiniz.`**

<br>

### Konu İçin Oluşturduğum Görsel
![workflow](/assets/img/guide/temel_network/workflow.png)

<br>

### Physical Layer (Fiziksel Katman)

Bu katman basitçe fiziksel bağlantıların yapıldığı katmandır. Ethernet kablosunun bağlanması gibi.
Fiziksel donanımın başlatılması ilk katmanı aktive eder. Yani bilgisayarı başlattık.

### Data Link Layer (Veri Bağlantı Katmanı) ve Network Layer (Ağ Katmanı)

Şimdi A cihazı ve B cihazı olarak yerel ağda iki farklı cihaz düşünelim (Evinizdeki bir bilgisayar ve telefon olarak düşünebilirsiniz bu cihazları).  
- ##### Modem : Mac: x
- ##### A Cihazı : Mac: y
- ##### B Cihazı : Mac: z

Bu iki katman yerel ağdaki cihazların birbirleriyle iletişimini ve sonrasında nasıl bir IP adresine sahip olduklarını gösteren katmanlardır. Gelelim neler olduğuna.

**`MAC (Media Access Control):`**  Cihazın bilgilerini içeren benzersiz bir adrestir. Her cihazın özeldir ve değiştirilemez.

**Layer 2'de**  iletişim MAC bazlıdır. Cihazlar birbirlerinin MAC adreslerini bilmelidirler. 
Bunu öğrenmeleri için ise  **`ARP(Address Resolution Protocol)`**  devreye girer. ARP ile cihazlar birbirlerinin MAC adresini öğrenirler. Kısaca iki fazlıdır. 
- ##### A cihazı tüm ağa B cihazının kim olduğunu sorar. 
- ##### B cihazı da o benim diye atılır ve kendi MAC adresini söyler. 
- ##### Birbirlerini bir kere tanımaları yeterlidir ve her cihaz birbirlerinin bilgilerini `ARP tablolarında` tutar.

**`DHCP (Dynamic Host Configuration Protocol) ile IP Adresi Alma:`**

DHCP ağ ayarlarını otomatik olarak atayan bir protokoldür.
Cihaz bir yerel ağda IP almak için tüm yerel ağa bir sinyal yollar. Bu sinyal **`DHCP Discover'dır`** .  DHCP bu sinyale karşılık otomatik ayarlar atar. Bunlar;
- ##### IP adresi: 10.0.0.2
- ##### Gateway, Modem adresi : 10.0.0.1
- ##### DNS Sunucusu: 8.8.8.8
- ##### Subnet Mask : 255.255.255.0

Aslında DHCP süreci daha da uzun, iki tarafın birbirini onaylaması gibi durumlar var. Geçiyorum onları temelde IP'yi ve diğer ayarları otomatik nasıl aldığımızı bilmeniz yeterli. Ayrıca bu görevi modem, routerlar yönetir.

**`Notlar:`**

 - `Subnet Mask:` Ağ içerisinde yer alan cihazlar kendi aralarında düzenlenir ve aynı ağda oldukları anlaması sağlanır. Aynı ağda bulunan cihazlar birbirleri ile iletişim kurarken bundan faydalanırlar. Daha detaya burada girmeyeceğim fakat. `CIDR gösterimini` ve subnet maskı daha detaylı araştırabilirsiniz.

- `Subnetting:` Ağdaki cihazların farklı işlevleri olabilir, örneğin muhasebecilerin ağı veya satış elemanlarının bağlandıkları ağ gibi. Büyük şirketlerde bu şekilde ayırarak ağı yönetmek ağı daha güvenli ve hızlı hale getirir. 
- Özel IP adresi aralıkları,
	-  ##### 10.0.0.0   -> 10.255.255.255
	-  ##### 172.16.0.0 -> 172.31.255.255
	-  ##### 192.168.0.0 -> 192.168.255.255
	-  ##### 127.0.0.1 -> 127.255.255.255 Loopback adresi

<br>

### 4. Katman Transport Layer (Taşıma Katmanı)

Artık A cihazı ve B cihazı birer IP adresine sahipler.  
- ##### Modem : 10.0.0.1 - Mac: x
- ##### A : 10.0.0.2 - Mac: y
- ##### B : 10.0.0.3 - Mac: z


Verilerin paketlenip taşınma süreci bu katmanda olur. Örneğin bir mesaj bu katmandan gönderilir veya YouTube'a video yükleme süreci aynı şekilde bu katmanla gerçekleşir.
İki farklı protokol vardır. Bunlar `TCP(Transmission Control Protocol)` ve `UDP(User Datagram Protocol)`.

UDP'nin özellikleri;
- ##### İstemci doğrudan paketi gönderir. Sunucu paketi alırsa alır almazsa paket kaybolur.
- ##### Çok hızlıdır.
- ##### DNS sorgularında genelde UDP kullanılır. İnternetin daha hızlı yanıt vermesi sağlanır.
- ##### Online oyunlarda da kullanılır. 

TCP'nin özellikleri;
- ##### Veri aktarımını daha garanti ve güvenli hale getirmek için `Three Way Handshake(3'lü el sıkışma)` kullanılır. Konunun ilerisinde daha detaylı anlatacağım.
- ##### Paketler kaybolmaz. TCP tekrar yollayabilir.

Artık, bir web sitesine bağlanabiliriz değil mi? Hayır. Öncesinde gerçekleşecek daha birçok olay var. Diğer katmanlara geçmeden onlardan bahsedeyim.

`NAT`, Yerel ağın IP adresidir. Yerel ağdan çıkan isteklerin internete ulaşması sağlanır. Ve bu IP adresi yerel ağdaki her cihaz için aynıdır. `Bu IP adresi ile cihazlar yerel ağdan dışarı çıkar ve internetle iletişim kurar`. Örnek bir adres, 75.85.63.35.  

`Gateway`, yerel ağdan istekler gateway üzerinden internete çıkarlar ve aynı şekilde yerel ağa giriş yaparlar. Gateway giriş ve çıkışların kontrol edildiği noktadır. `Burada ağ istekleri incelenir`. 

`Firewall` da gatewaye benzerdir. `Giren çıkan istekleri kontrol eder, bu isteklerin güvenli olup olmadığına` bakarak sunucuyu ataklardan korur ve belirli kurallara göre kötü istekleri de engeller. Örneğin bir üniversitenin wi-fi ağında firewall denetimi olabilir. Bazı sitelere girişiniz engellenebilir.

Şimdi `DNS(Domain Name Server)` ile devam edelim.
İsteğimiz, `abc.com` adresine gitmek olsun. Fakat burada bir sıkıntımız var. Cihazımız abc.com'un kim olduğunu bilmiyor yani IP adresini bilmiyor. Doğrudan abc.com'a erişemeyiz. 

Biz bu isteği yaptığımızda, önce `UDP:53` ile `DNS sorgusu` yapılır. `"Daha hızlı olduğu için genelde UDP kullanılır fakat TCP ile de bu sorgular gerçekleştirilebilir."` Ardından bu web sunucusunun IP adresi bulunur. DHCP'nin bize otomatik verdiği DNS'i hatırlayın `8.8.8.8` Önce burada bir sorgu gerçekleşir bulunamazsa sorgu aşağıdaki şekilde devam eder.
- ##### TLD (Top-Level Domain): .com, .net, .org
- ##### Root DNS: En üst seviye DNS sunucuları
- ##### Recursive DNS: ISS (İnternet Servis Sağlayıcısı) tarafından sağlanan sunucu
- ##### Authoritative DNS: Web sitesinin gerçek IP adresini tutan sunucu

IP adresini çözdüğümüzde artık bağlantı kurabiliriz. Örneğin, web sitesini açmak isteyelim. HTTPS ile çalışan bir web sitesi olsun. `HTTPS 443` portunda çalışır. Bir istek yolluyoruz ve bu isteği de unutmayın TCP protokolü ile 443 portuna olcak şekilde yolluyoruz. Bu istek firewall'dan geçer ve web sunucusuna ulaşır. Burada `3-lü el sıkışma` dediğimiz olay gerçekleşir. 
- ##### SYN ile isteğimiz gönderdik. 
- ##### Sunucu SYN + ACK ile isteğimizi doğrular ve bize kabul sinyali yollar. Bağlanabilirsin diye.
- ##### ACK ile de bağlantıyı yerel ağda onaylar ve veri alışverişi başlatılır.

Artık rahatlıkla  web sitesiyle veri alışverişi yapabiliriz.

![int](/assets/img/guide/temel_network/rambow-internet.gif)

<br>
### Modern Web Sistemi
Şimdi biraz da modern webe bakalım. Burada vermek istediğim detaylar var.
Modern bir Web sitesinin temel bileşenleri şu şekilde olabilir,
- `Sunucular`, öncelikle web sunucusunun birden fazla kopyası oluşturulur. Bunlar aynı sistemin kopyalarıdır. Sistemde oluşabilecek çökmede direkt diğer sistem kullanılabilir.
- Bir de `web sitesinin` içinde olduğu `sunucuların kopyası` oluşturulur. Web sitesinin yükü azaltılır.
- `Yedek databaseler`, burada bilgiler ani çökmelerde veya veri kaybolmasını önlemek için yedek database sunucuları oluşturulur. 
- `Reverse Proxy`, istemcilerin doğrudan ana sunucuya bağlanmasını engelleyip, isteği kendisi karşılayan bir ara sunucudur. Bunu bir resepsiyon gibi düşünebilirsiniz:
	- ##### Otele gelen müşteri (istemci - kullanıcı) resepsiyona gidiyor.
	- ##### Resepsiyon (Reverse Proxy), müşterinin hangi odaya gitmesi gerektiğine karar veriyor.
	- ##### Müşteri direkt olarak odaya gidemiyor, önce resepsiyondan geçmek zorunda.
	- ##### Yük Dengeleme (Load Balancing), Gelen trafiği birden fazla sunucuya dağıtarak performansı artırır.
- `Session Servers`, kullanıcıların kaydedilen oturum bilgileri de birer yüktür. Farklı bir sunucuda tutmak bu yükü azaltır. Session bilgileri genellikle Redis, Memcached gibi hızlı veri tabanlarında saklanır.
- `CDN`, genellikle web sitelerinin statik dosyalarının, javascript vb tutulduğu yerdir. 
- `Mail sunucuları` olur.

Yukarıda saydıklarım temel olarak bir web sisteminin ağında bulunan sunuculardır. Daha fazlası da eklenebilir. Günümüzde işin içerisine cloud fazlaca kullanılıyor. Ve ` cloud security`  bu nedenle çok önem kazanmakta.


<br>
### Session Layer (Oturum Katmanı): 

İstemci ve sunucu arasındaki iletişim oturumlarını yönetir.
Kullanıcı web sitesine bağlandığında, sunucu ile bağlantı başlatılır. Ardından login olursunuz ve sizin için bir session başlatılır. ` Bu session bilgileri cookieleri oluşturur` . Bu sayede bağlantının kopmamasını sağlar. Kullanıcı çıkış yapınca veya bağlantı belirli bir süre boyunca kullanılmazsa, oturum sonlandırılır. 

<br>

### Presentation Layer (Sunum Katmanı): 

Bu katman, verinin gönderilmeden önce şifrelenmesi, sıkıştırılması ve doğru formatta kodlanmasını sağlar. 
- ##### Web sitesindeki metinlerin, HTML ve CSS olarak tarayıcıya sunulması.
- ##### HTTPS bağlantılarında, `TLS (Transport Layer Security)` bu katmanda çalışır.
- ##### SSL/TLS şifrelemesi ile web sitelerinin güvenli hale getirilmesi.
- ##### MP3, JPEG, MP4 gibi dosyaların kodlanması ve çözümlenmesi.

<br>

### Application Layer (Uygulama Katmanı)

Bu katman artık web uygulamasının arayüzüne ulaştığımız ve uygulamayı kullandığımız katmandır. Örnek bazı uygulamalar;

- #####  Google Chrome ile bir web sitesine girmek (HTTP/HTTPS)
- #####  Gmail ile e-posta göndermek (SMTP, IMAP, POP3)
- #####  WhatsApp, Discord gibi uygulamalarla mesajlaşmak (WebSocket, XMPP)
- #####  Spotify’dan müzik dinlemek (HTTP Streaming, RTSP)
- #####  Netflix’ten video izlemek (HLS, MPEG-DASH)
- #####  Dosya indirmek veya yüklemek (FTP, SFTP)

<br>

### Önemli Portlar
![ports](/assets/img/guide/temel_network/ports.webp)


<br>

### Network'te Ortaya Çıkan Bazı Güvenlik Açıkları
Her sistemin mutlaka manipüle edilmesinin bir yolu vardır. Bu katmanlarda da birçok güvenlik açığı doğar. Şimdi sırada bunlardan biraz bahsedelim.

- `Wi-Fi Saldırıları` 
Evil Twin Attack, sahte bir Wi-Fi noktası oluşturarak kullanıcıları kandırmak.
Deauthentication Attack, ullanıcıları ağdan düşürüp sahte bir ağa yönlendirmek.
 
- `ARP Spoofing`
Sahte MAC adresleriyle trafiği yönlendirme
Saldırgan, sahte bir MAC adresiyle kendisini bir ağ geçidi (gateway) gibi tanıtarak trafiği üzerine çeker.

- `BGP Hijacking (Border Gateway Protocol Saldırısı) `
Saldırgan, yanlış yönlendirme bilgileri yayarak internet trafiğini kendi yönettiği sunuculara çeker.

- `IP Spoofing` 
Bir saldırgan, kimliğini gizlemek veya saldırıları daha etkili hale getirmek için sahte bir IP adresi kullanabilir. DDoS saldırılarında sahte IP’lerle hedefi çökertebilir.

- `TCP SYN Flood`
Saldırgan, sürekli SYN paketleri göndererek sunucunun kaynaklarını tüketir ve sistemi çökertir.

- `UDP Spoofing `
Saldırgan, sahte UDP paketleri göndererek hedefi yanıltır ve trafiği şişirir.

- `Man-in-the-Middle (MitM)`
Saldırgan, istemci ile sunucu arasına girerek trafiği dinler ve değiştirir.

- `Zayıf Şifreleme Algoritmaları`
MD5, SHA-1 gibi eski ve kırılabilir algoritmalar kullanmak.

- `DNS Cache Poisoning (DNS Zehirleme)`
Saldırgan, DNS sunucusunu yanlış yönlendirerek kullanıcıları sahte sitelere gönderir.

- `DDoS (Distributed Denial of Service)`
Aşırı Yükleme Saldırısı, hedefe aşırı trafik göndererek hizmeti çökertir.

- `Bazı OWASP 10 açıkları, CSRF, XSS, SQLi gibi.`

<br>
<br>

**Okuduğunuz için teşekkür ederim, umarım konuyu anlamanıza yardımım dokunmuştur.  Bir sonraki konuda görüşmek üzere.**

![peaceout](/assets/img/guide/temel_network/peace-out.gif)



### Derlediğim Farklı Kaynaklar ve Lablar

- [BTKakademi - Temel Ağ Teknolojileri](https://www.btkakademi.gov.tr/portal/course/temel-ag-teknolojileri-14711)
- [Modern Web Mimarisi - @mehmetozanguven](https://medium.com/@mehmetozanguven/modern-web-mimarisi-be901b663f5f)
- [Modern Web App Architecture](https://acropolium.com/blog/modern-web-app-architecture/)
- [Basics Computer Networking - geeksforgeeks](https://www.geeksforgeeks.org/basics-computer-networking/)
- [Cybersecurity Networking - w3schools](https://www.w3schools.com/cybersecurity/cybersecurity_networking.php)
- [Networking - ibm](https://www.ibm.com/think/topics/networking)


**`LABS`**
- [Network Fundamentals Lab - networklessons](https://networklessons.com/labs/network-fundamentals-lab-1)
- [Network Fundamentals - TryHackMe](https://tryhackme.com/module/network-fundamentals)
- [Networking - TryHackMe](https://tryhackme.com/module/networking)
- [Intro to Network - TryHackMe](https://tryhackme.com/room/introtonetworking)

<br>
<br>
<br>
<br>
<br>
<br>
