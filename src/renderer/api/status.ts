import api from './api';

export const getStatus = async (): Promise<string> => {
  const get = await api.get('/status');
  const data = await get.data;
  return data;
};

export default getStatus;
