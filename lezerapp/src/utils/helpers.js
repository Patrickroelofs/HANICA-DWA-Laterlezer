import { useLocation } from 'react-router-dom';
import { contrast } from 'chroma-js';
import axios from 'axios';

export const setContrast = (color) => ((color) && (contrast(color, 'white') > 2) ? 'white' : 'black');

export const useQuery = () => new URLSearchParams(useLocation().search);

export const useInterceptor = (username) => axios.interceptors.request.use((config) => {
  if (username) config.headers.Username = username;
  return config;
});

export default null;
