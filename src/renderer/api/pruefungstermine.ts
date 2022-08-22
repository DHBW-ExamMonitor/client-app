import {
  Pruefungstermin,
  Pruefungstermine,
} from 'renderer/types/pruefungstermin';
import api from './api';

export const getPruefungstermine = async (): Promise<Pruefungstermine> => {
  const get = await api.get('/pruefungstermine');
  const data = await get.data;
  return data;
};

export const getPruefungstermin = async (
  id: string
): Promise<Pruefungstermin> => {
  const get = await api.get(`/pruefungstermine/${id}`);
  const data = await get.data;
  return data;
};

export type CreateOrUpdatePruefungsterminDto = {
  name: string;
  hilfsmittel?: string;
  raeume?: string;
  aufsichtsPersonen?: string;
  notizen?: string;
  dateTime: Date;
  modul: string;
  kurse: string[];
};

export const createPruefungstermin = async (
  values: CreateOrUpdatePruefungsterminDto
) => {
  const create = await api.post('/pruefungstermine', {
    ...values,
  });
  const data = await create.data;
  return data;
};

export const updatePruefungstermin = async (
  values: CreateOrUpdatePruefungsterminDto,
  id: string
) => {
  const update = await api.put(`/pruefungstermine/${id}`, {
    ...values,
  });
  const data = await update.data;
  return data;
};

export const deletePruefungstermin = async (id: string) => {
  const deleteById = await api.delete(`/pruefungstermine/${id}`);
  const data = await deleteById.data;
  return data;
};
