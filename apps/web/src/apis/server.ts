import axios from 'axios';
import { cookies } from 'next/headers';

export const serverApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

serverApi.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  config.headers.Cookie = cookieStore.toString();
  return config;
});

serverApi.interceptors.response.use((response) => response.data.data);
