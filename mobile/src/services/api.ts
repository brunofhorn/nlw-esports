import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://nlw-esports-duo.vercel.app/api',
});
