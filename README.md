---
layout: kh-bp-search-base
title: Webex Contact Center Blueprints
permalink: /
---



<!-- | Article | Created | Last Updated |
| :-----: | :-----: | :----------: |

 {% for page in collection.pages %}
| <a href="." >{{ page.title }}</a> | {{ page.created }} | {{page.updated}} |
{% endfor %} -->

<table>
  <tr>
    <th>Article</th>
    <th>Created</th>
    <th>Last Updated</th>
  </tr>
   {% for page in collection.pages %}
   <tr>
   <th><a href="{{ page.url }}" >{{ page.title }}</th>
   <th> {{ page.created }} </th>
   <th>{{page.updated}} </th>
< /tr>
{% endfor %}
</table>