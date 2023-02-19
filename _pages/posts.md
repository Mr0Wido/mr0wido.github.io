---
layout: page
title: Posts
pagination:
  enabled: true
  collection: posts
  permalink: /page/:num/
  per_page: 3
  sort_field: date
  sort_reverse: true
  trail:
    before: 1 # The number of links before the current page
    after: 3  # The number of links after the current page
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


