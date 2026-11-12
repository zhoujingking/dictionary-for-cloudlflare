import axios from 'axios';
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

export async function onRequest(context) {
  const cookie = context.env.DICT_COOKIE;
  const wordList = await getWordList(cookie);

	return Response.json(wordList);
}
