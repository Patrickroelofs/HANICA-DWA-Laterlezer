const { parse } = require('@postlight/mercury-parser');
const { JSDOM } = require('jsdom');

const lazifyImages = (dom) => {
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

const splitHTML = (dom) => {
  const { document } = dom.window;
  const pages = [];

  Array.from(document.getElementsByTagName('article')).forEach((article) => {
    pages.push(article);
  });
  return pages;
};

exports.returnHTML = async (url) => {
  try {
    const site = await parse(url);
    const dom = new JSDOM(site.content);
    dom.serialize();
    const lazifyiedDom = lazifyImages(dom);
    const pages = splitHTML(new JSDOM(lazifyiedDom));
    return { pages, site, dom: lazifyiedDom };
  } catch (error) {
    return error;
  }
};
