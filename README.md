---
layout: kh-bp-search-base
title: Webex Contact Center Blueprints
permalink: /
---



| Article | Created | Last Updated |
|:-:|:-:|:-:|
{% for post in collection.posts %}|
|<a href="." >{{ page.title | escape }}</a>|{{ page.created }}|{{page.updated}}
{% endfor %}