const { parse } = require('@postlight/mercury-parser');
const { JSDOM } = require('jsdom');
const { minify } = require('html-minifier');

exports.parseHTML = async (url) => {
  try {
    const site = await parse(url);
    let dom = new JSDOM(site.content);
    dom.serialize();
    const { document } = dom.window;

    Array.from(document.getElementsByTagName('a')).forEach((link) => {
      link.setAttribute('target', '_blank');
    });

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
