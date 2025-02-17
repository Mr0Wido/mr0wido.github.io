// al pre.highlight tags on the page
const pres = document.querySelectorAll("pre.highlight");

// reformat html of pre.highlight tags
if (pres !== null) {
  for (let i = 0; i < pres.length; i++) {
    // insert code and copy element
    pres[i].innerHTML = `<div class="copy">copy</div><code class="${getLanguage(pres[i].className)}">${pres[i].innerHTML}</code>`
  }
}

// create clipboard for every copy element
const clipboard = new ClipboardJS('.copy', {
  target: (trigger) => {
    return trigger.nextElementSibling;
  }
});

// do stuff when copy is clicked
clipboard.on('success', (event) => {
  event.trigger.textContent = 'copied!';
  setTimeout(() => {
    event.clearSelection();
    event.trigger.textContent = 'copy';
  }, 2000);
});

// helper function
function getLanguage(className) {
  const match = className.match(/language-(\w+)/);
  if (match && match[1]) {
    return match[1];
  }
  return '';
}
