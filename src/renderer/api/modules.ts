import { Modules } from 'renderer/types/module';
import api from './api';

// eslint-disable-next-line import/prefer-default-export
export const getModules = async (): Promise<Modules> => {
  const get = await api.get('/module');
  const data = await get.data;
  return data;
};
