---
layout: default
---

<h1>Bu web sitesi hakkında</h1>

Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.

---------------------------------------------------------------------
<div class="post-list">
  <h2 class="post-list__title">Recent Post</h2>

  <ul class="post-list__list">
    {% for post in site.posts limit:5 %}
      <li class="post-list__item">
        <h3 class="post-list__item-title"><a href="{{ post.url }}">{{ post.title }}</a></h3>
        <p class="post-list__item-meta">{{ post.date | date: "%d %B %Y" }}</p>
        <p class="post-list__item-excerpt">{{ post.excerpt | split:'\n\n' | first }}</p>
      </li>
    {% endfor %}
  </ul>
</div>
