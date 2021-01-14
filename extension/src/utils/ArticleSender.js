import { post } from 'axios';
import { parse } from '@postlight/mercury-parser';

const postArticle = async (postBody, user, preParsed) => {
  await post('http://localhost:3000/api/articles', { preParsed, ...postBody }, {
    headers: {
      Username: user,
    },
  });
};

export default async (postBody, user, fetchLoad) => {
  if (!fetchLoad) {
    chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT }, (tabs) => {
      chrome.tabs.executeScript(tabs[0].id, {
        code: 'window.document.documentElement.outerHTML',
      }, async (res) => {
        const parsedHtml = await parse(postBody.url, { html: res });
        postArticle(postBody, user, parsedHtml);
      });
    });
  } else {
    await postArticle(postBody, user);
  }
};
