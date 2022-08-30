import { Pruefungsteilnahme } from 'renderer/types/pruefungsteilnahme';
import {
  Pruefungstermin,
  Pruefungstermine,
} from 'renderer/types/pruefungstermin';
import api from './api';
import {
  getPruefungsteilnahme,
  createPruefungsteilnahme,
} from './pruefungsteilnahme';

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

export const getPruefungstermineByModuleId = async (
  id: string
): Promise<Pruefungstermine> => {
  const get = await api.get(`/pruefungstermine/modul/${id}`);
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

export const createPruefungsterminWithStudents = async (
  dto: CreateOrUpdatePruefungsterminDto,
  termin: Pruefungstermin
) => {
  const post = await createPruefungstermin(dto);
  const get = await getPruefungsteilnahme(termin.id);

  get.forEach(async (pruefungsteilnahme: Pruefungsteilnahme) => {
    if (
      pruefungsteilnahme.pruefungsteilnahmeStatus.toString() !== 'BESTANDEN' &&
      pruefungsteilnahme.pruefungsteilnahmeStatus.toString() !== 'ANGERECHNET'
    ) {
      await createPruefungsteilnahme({
        pruefungsterminId: post.id,
        studentId: pruefungsteilnahme.studentId,
        versuch: pruefungsteilnahme.versuch.toString(),
        pruefungsteilnahmeStatus:
          pruefungsteilnahme.pruefungsteilnahmeStatus.toString(),
      });
    }
  });
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
