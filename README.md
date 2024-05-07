---
layout: kh-bp-search-base
title: Webex Contact Center Blueprints
permalink: /
---

{% assign livepages = site.pages | where: "status", "live" %}

| Article | Created | Last Updated |
| :-: | :-: | :-: |
{% for page in livepages %} | [{{ page.title }}]({{site.baseurl}}{{page.url}}) | {{ page.created }} | {{page.updated}} | 
{% endfor %}

{{% livepages %}}

