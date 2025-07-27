function wrapTextNodes(element) {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (node.parentNode && node.parentNode.matches('script, style, noscript, iframe')) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const textNodes = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  for (const node of textNodes) {
    const span = document.createElement("span");
    span.className = "_hide-text-extension";
    node.parentNode.insertBefore(span, node);
    span.appendChild(node);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => wrapTextNodes(document.body));
} else {
  wrapTextNodes(document.body);
}
