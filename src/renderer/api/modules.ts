import { Module, Modules } from 'renderer/types/module';
import api from './api';

export const getModules = async (): Promise<Modules> => {
  const get = await api.get('/module');
  const data = await get.data;
  return data;
};

export type CreateModuleDto = {
  name: string;
  vorlesungen: string;
};

export const createModule = async (values: CreateModuleDto) => {
  const create = await api.post('/module', {
    name: values.name,
    vorlesungen: values.vorlesungen,
  });
  const data = await create.data;
  return data;
};

export const updateModule = async (values: Module) => {
  const update = await api.put(`/module/${values.id}`, {
    name: values.name,
    vorlesungen: values.vorlesungen,
    aktiv: values.aktiv,
  });
  const data = await update.data;
  return data;
};

export const deleteModule = async (id: string) => {
  const deleteModuleById = await api.delete(`/module/${id}`);
  const data = await deleteModuleById.data;
  return data;
};
