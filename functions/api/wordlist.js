import axios from 'axios';
import { WORDLIST_KEY } from './constants';
const getWordList = async (cookie, sort = 'time') => {
  const { data: res } = await axios.get('https://dict.youdao.com/wordbook/webapi/v2/word/list', {
    params: {
      limit: 10000,
      offset: 0,
      sort
    },
    headers: {
      Cookie: cookie
    }
  })
  return res.data?.itemList || [];
}

// retrieve word list from KV
export async function onRequestGet(context) {
  const wordListStr = await context.env.KV.get(WORDLIST_KEY);
  if (!wordListStr) {
    const wordList = await getWordList(context.env.DICT_COOKIE);
    context.env.KV.put(WORDLIST_KEY, JSON.stringify(wordList));
    return Response.json(wordList);
  }
	return new Response(wordListStr);
}

// update word list from youdao
export async function onRequestPost(context) {
  const cookie = context.env.DICT_COOKIE;
  const wordList = await getWordList(cookie);
  await context.env.KV.put(WORDLIST_KEY, JSON.stringify(wordList));
	return Response.json(wordList);
}
