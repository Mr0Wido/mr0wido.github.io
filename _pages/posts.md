---
layout: page
title: Posts
permalink: /posts/
---
{% for post in site.posts %}
  <div class="post-list">
    <ul class="post-list__list">
        <li class="post-list__item">
          <h3 class="post-list__item-title"><a href="{{ post.url }}">{{ post.title }}</a></h3>
          <p class="post-list__item-meta">{{ post.date | date: "%d %B %Y" }}</p>
          <p class="post-list__item-excerpt">{{ post.excerpt | split:'\n\n' | first }}</p>
        </li>
    </ul>
  </div>
{% endfor %}

