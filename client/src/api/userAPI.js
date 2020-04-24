import { fetchWithDelay } from './fetch';

const fetchUsers = (url) => fetchWithDelay(url);

export const userAPI = {
  fetchUsers,
};