import { CreateOrUpdateStudent, Students } from 'renderer/types/student';
import api from './api';

export const getStudents = async (): Promise<Students> => {
  const get = await api.get('/studenten');
  const data = await get.data;
  return data;
};

export const createStudent = async (values: CreateOrUpdateStudent) => {
  const post = await api.post('/studenten', {
    matrikelnummer: values.matrikelnummer,
    kursId: values.kursId,
    studentenStatus: values.studentenStatus,
  });
  const data = await post.data;
  return data;
};
