// js/code-copy.js
var codeBlocks = document.querySelectorAll('div.highlighter-rouge');

codeBlocks.forEach(function (codeBlock) {
  var copyButton = document.createElement('button');
  copyButton.className = 'copy';
  copyButton.type = 'button';
  copyButton.ariaLabel = 'Copy code to clipboard';
  copyButton.innerText = 'Copy';

  codeBlock.append(copyButton);

  copyButton.addEventListener('click', function () {
    var code = codeBlock.querySelector('code').innerText.trim();
    window.navigator.clipboard.writeText(code);

    copyButton.innerText = 'Copied';
    var twoSeconds = 2000;

    setTimeout(function () {
      copyButton.innerText = 'Copy';
    }, twoSeconds);
  });
});