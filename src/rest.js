import axios from 'axios';
export const getWordList = async (isAlpha = false) => {
  const { data : res } = await axios.get('/api/wordlist');
  return res || [];
}
