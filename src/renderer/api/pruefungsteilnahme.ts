import { Pruefungsteilnahmen } from 'renderer/types/pruefungsteilnahme';
import api from './api';

export const getPruefungsteilnahme = async (
  pruefungsterminId: string
): Promise<Pruefungsteilnahmen> => {
  const get = await api.get(
    `/pruefungsteilnahme/pruefung/${pruefungsterminId}`
  );
  const data = await get.data;
  return data;
};

export type CreateOrUpdatePruefungsteilnahmeDto = {
  pruefungsterminId: string;
  studentId: string;
  versuch: string;
  pruefungsteilnahmeStatus: string;
};

export const createPruefungsteilnahme = async (
  dto: CreateOrUpdatePruefungsteilnahmeDto
) => {
  const post = await api.post(`/pruefungsteilnahme`, dto);
  const data = await post.data;
  return data;
};

export const updatePruefungsteilnahme = async (
  dto: CreateOrUpdatePruefungsteilnahmeDto,
  id: string
) => {
  const put = await api.put(`/pruefungsteilnahme/${id}`, dto);
  const data = await put.data;
  return data;
};

export default getPruefungsteilnahme;
