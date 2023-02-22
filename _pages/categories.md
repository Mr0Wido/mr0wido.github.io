---
layout: default
title: Categories
permalink: /categories/
---
<div id="archives__head">
  {% for category in site.categories %}
  <div class="archive__group-head">
    {% capture category_name %}{{ category | first }}{% endcapture %}
    <a href="#{{ category_name | slugize }}" > <p class="category__head"><i class="fas fa-fw fa-folder-open" aria-hidden="true"></i> {{ category_name }} <span class="count_head"> {{ category | last | size }}</span></p></a>
  </div>
  {% endfor %}
</div>

<div id="archives">
  {% for category in site.categories %}
    <div class="archive-group">
      {% capture category_name %}{{ category | first }}{% endcapture %}
        <div id="#{{ category_name | slugize }}"></div>
        <br>
        <h3 class="category-head">{{ category_name }}</h3>
        <a name="{{ category_name | slugize }}"></a>
        {% for post in site.categories[category_name] %}
          <article class="archive-item">
            <h4><a href="{{ post.url }}">{{ post.title }}</a></h4>
            <p class="post-list__item-meta"><i class="fas fa-fw fa-calendar-alt" aria-hidden="true"></i>{{ post.date | date: "%d %B %Y" }}</p>
            <p class="post-list__item-excerpt">{{ post.excerpt | truncatewords: 10 }}</p>
          </article>
        {% endfor %}
    </div>
    <hr>
  {% endfor %}
</div>
