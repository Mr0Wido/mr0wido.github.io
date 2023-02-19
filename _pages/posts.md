---
layout: page
title: Posts
pagination:
  enabled: true
  permalink: /posts/
  paginate: 5
---
{% for post in paginator.posts %}
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

{% include pagination.html %}

