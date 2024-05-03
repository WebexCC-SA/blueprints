targetElement = document.querySelector('#book-search-results');

let callback = function(mutationsList, observer) {
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

let observer = new MutationObserver(callback);

let config = {
    attributes: true,
    attributeOldValue: false,
    attributeFilter: ['class']
};

observer.observe(targetElement, config);
console.log("boop")
