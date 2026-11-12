import axios from 'axios';
import dictAlpha from '../public/dict_alpha.json'
import dict from '../public/dict.json'

export const getWordList = async (isAlpha = false) => {
  // const cookie = 'OUTFOX_SEARCH_USER_ID=-523919072@223.104.40.254; OUTFOX_SEARCH_USER_ID_NCOO=721630013.3922983; __yadk_uid=pGkH2CaRI3MJzcOKSTis6f2Lg9rl1mia; P_INFO=13521780276|1731411322|1|dict_logon|00&99|null&null&null#CN&null#10#0|&0|null|13521780276; DICT_PERS=v2|urs-phone-web||DICT||web||-1||1731411322765||223.104.41.88||urs-phoneyd.b90214f28ad34c2db@163.com||OMk4Y5nMYM0llh4pzhMgu0JSOM6Ln4kMRYMnLzm0MYA0wuO4qyRLUW0qy0LOlOMY5RJLOfqKO4qBRg4nMlEkf6LR; DICT_UT=urs-phoneyd.b90214f28ad34c2db@163.com; DICT_SESS=v2|GFpk7iI5YT4hMwFPLkMRlf0MwFkLzGRQyhMJLkfJB0zG0HwZ6LYM0pZ64OMhfOERqBk4JykfU50l50LwuhHQFRJBk4TyRMlGR; i18n_redirected=zh; _uetvid=859dbe00972f11ef9949338d4895ee0c; ___rl__test__cookies=1741591434109; DICT_LOGIN=3||1741592150756';
  // const { data: res } = await axios.get('https://dict.youdao.com/wordbook/webapi/v2/word/list', {
  //   params: {
  //     limit: 10000,
  //     offset: 0,
  //     sort: 'time'
  //   },
  //   headers: {
  //     Cookie: cookie
  //   }
  // })
  // return res.data?.itemList || [];

  // const path = isAlpha ? '/dictionary/dict_alpha.json' : '/dictionary/dict.json';
  // const { data } = await axios.get(path);
  return isAlpha ? dictAlpha : dict;
}