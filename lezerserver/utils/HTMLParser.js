const { parse } = require('@postlight/mercury-parser');
const { JSDOM } = require('jsdom');
const { minify } = require('html-minifier');

exports.parseHTML = async (url) => {
  try {
    const site = await parse(url);
    let dom = new JSDOM(site.content);
    dom.serialize();
    dom = minify(dom.window.document.documentElement.outerHTML, {
      collapseBooleanAttributes: true,
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: true,
      preserveLineBreaks: true,
      preventAttributesEscaping: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      sortAttributes: true,
      sortClassName: true,
    });
    return { dom, site };
  } catch (error) {
    return error;
  }
};
// const lazifyImages = async (url) => {
//   const page = await parse(url);
//   const dom = new JSDOM(page.content);
//   dom.serialize();
//   const { document } = dom.window;

//   Array.from(document.getElementsByTagName('img')).forEach((img) => {
//     img.classList.add('lazy');
//     img.setAttribute('data-src', img.src);
//     img.removeAttribute('src');
//     img.removeAttribute('alt');
//     img.removeAttribute('srcset');
//   });
//   return { dom: dom.window.document.documentElement.outerHTML, page };
// };

// const splitHTML = (dom) => {
//   const { document } = dom.window;
//   const pages = [];

//   Array.from(document.getElementsByTagName('article')).forEach((article) => {
//     pages.push(article.innerHTML);
//   });
//   return pages;
// };
