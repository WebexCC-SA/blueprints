---
layout: kh-bp-search-base
title: Webex Contact Center Blueprints
permalink: /
---



| Article | Created | Last Updated |
| :-: | :-: | :-: |
{% for page in site.pages | where: "status", "live" %} | [{{ page.title }}]({{site.baseurl}}{{page.url}}) | {{ page.created }} | {{page.updated}} | 
{% endfor %}

