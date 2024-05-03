---
layout: search-base
title: 
permalink: /
---


  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Webex Contact Center Knowledge Hub</title>
  <script type="module" src="https://webexcc-sa.github.io/dist/hub-widgets/hub-widgets.esm.js"></script>
  <script nomodule src="https://webexcc-sa.github.io/dist/index.js"></script>
  <link rel="stylesheet" href="https://webexcc-sa.github.io/style.css">
<style> .page-inner{max-width:unset;} .hidden{display:none;}#book-search-input-inside{margin-left:auto;margin-right:auto;max-width:50%;}</style>

<body>
  <pagetitle>
    <h1>Webex Contact Center Knowledge Hub (beta)</h1>

  </pagetitle>

<div id="book-search-input-inside" role="search">
    <input type="text" placeholder="Type to search" />
</div>

  <k-hub-tiles t-list="https://webexcc-sa.github.io/tiles.json,https://webexcc-sa.github.io/tools/advertise/tiles.json"></k-hub-tiles>
  <k-hub-links l-list="https://webexcc-sa.github.io/links.json"></k-hub-links>
</body>

<script>const targetElement = document.querySelector('#book-search-results');

const callback = function(mutationsList, observer) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            if (mutation.target.classList.contains("open")){
			document.querySelector("k-hub-tiles").classList.add("hidden");
			document.querySelector("k-hub-links").classList.add("hidden");
			}else{
			document.querySelector("k-hub-tiles").classList.remove("hidden");
			document.querySelector("k-hub-links").classList.remove("hidden");
			}
            // Additional actions can be taken here
        }
    }
};

const observer = new MutationObserver(callback);

const config = {
    attributes: true,
    attributeOldValue: false,
    attributeFilter: ['class']
};

observer.observe(targetElement, config);
</script>