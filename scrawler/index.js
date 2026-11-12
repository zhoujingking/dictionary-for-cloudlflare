import axios from 'axios';
import path from 'path';
import fs from 'fs';
// sort: time, alpha
const getWordList = async (sort = 'time') => {
  const cookie = 'i18n_redirected=zh; __yadk_uid=eJS55F77ajpXL9WwuB6ECsKbyPKC8grq; OUTFOX_SEARCH_USER_ID_NCOO=192039685.7714988; OUTFOX_SEARCH_USER_ID=-768364022@39.144.79.192; NTES_YD_SESS=ILia7wjdpcED4fdNRqJzzy0CuS47jlPOqU50aRqGaEnwYtclYUOmhkoMyoN71fgJDBptFtLj8rq16ruz.RvWIvHx6gqI7.n6MBwWRmVM3F4GZbllrCjx3UVx4ok3SCX9mHrRHpfhXwMImpMZy3COwZEiX2hIzZRO3QVFTkpAeLoohAkocqIIRvYl4QFOygG9MOgMw2Hj3a7LwG1BToozfPRqFfNj18TiQrtNwC1zRjJKD; NTES_YD_PASSPORT=9ltpi8WD68fbM4KpcsvtO0vAE2VHKdI.KxKkIrb_XeDXl.DwlvG8Q0q6Yq7ETCaBI2R.N.oKgUiya0OUzyDbt6bk0BYpHsQKXPigwKSKggOeKxeBGDQY9OPASaKzaUw5ErVN.Yb8b6GjiHLuCfSiBHP.Bg6DFXSt0iq0Zru8ZHkvkZ2uXzDLD73c0qgxRUbXoUBJ3xPeeosiYPDRNL3V22ERG24v4SCSs; S_INFO=1794377848|0|0&60##|13521780276; P_INFO=13521780276|1794377848|1|dict_logon|00&99|null&null&null#CN&null#10#0|&0||13521780276; DICT_SESS=v2|wgDPBEdKCwFkLQ4hLYA0eykfwSOLlfRUGPMOM6LJS0YMRfq46Lgz0T4kM64n4l5RlAOMw46M640JK6MPun4Ol0PF0HYYhMgZ0; DICT_PERS=v2|urs-phone-web||DICT||web||-1||1794377849691||223.104.42.232||urs-phoneyd.b90214f28ad34c2db@163.com||eBk4TykfYWRQKOLzEh46z0JK0MPyh4lW0kGkfpBPMO5ReLRLgunMz50lfP4OWPMgyR6F0HwBnHzW0PBh4OWhLwyR; DICT_LOGIN=3||1794377849694; DICT_UT=urs-phoneyd.b90214f28ad34c2db@163.com; _uetvid=859dbe00972f11ef9949338d4895ee0c; ___rl__test__cookies=1794465320016';
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
const saveJsonToFile = (json, fileName = 'dict.json') => {
  const jsonStr = JSON.stringify(json, null, 2);
  const filePath = path.join('public', fileName)
  fs.writeFile(filePath, jsonStr, (err) => {
      if (err) {
          console.error('Error writing file:', err);
      } else {
          console.log('File has been written successfully.');
      }
  });
}

const main = async () => {
  const timeWordList = await getWordList();
  saveJsonToFile(timeWordList);

  const alphaWordList = await getWordList('alpha');
  saveJsonToFile(alphaWordList, 'dict_alpha.json');
}
main();
