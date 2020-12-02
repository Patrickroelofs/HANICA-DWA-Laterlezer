const { parse } = require('@postlight/mercury-parser');
const { JSDOM } = require('jsdom');

exports.parseHTML = (url) => parse(url);

exports.serializeHTML = (html) => {
  const dom = new JSDOM(html);
  dom.serialize();
  const { document } = dom.window;

  Array.from(document.getElementsByTagName('img')).forEach((img) => {
    img.classList.add('lazy');
    img.setAttribute('data-src', img.src);
    img.removeAttribute('src');
    img.removeAttribute('alt');
    img.removeAttribute('srcset');
  });
  return dom.window.document.documentElement.outerHTML;
};
