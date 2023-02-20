---
layout: default
title: Search Results
permalink: /search/
---

{% include search_input.html %}

{% if site.simple_search_results %}
  <h2>Search Results</h2>
  <ul>
    {% for result in site.simple_search_results %}
      <li><a href="{{ result.url }}">{{ result.title }}</a></li>
    {% endfor %}
  </ul>
{% else %}
  <p>No results found.</p>
{% endif %}
