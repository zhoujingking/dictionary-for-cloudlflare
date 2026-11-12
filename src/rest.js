import axios from 'axios';
export const getWordList = async () => {
  const { data : res } = await axios.get('/api/wordlist');
  return res || [];
}

export const updateWordList = async () => {
  return axios.post(`/api/wordlist`);
}
