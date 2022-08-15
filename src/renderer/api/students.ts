import { Student, Students } from 'renderer/types/student';
import api from './api';

export const getStudents = async (): Promise<Students> => {
  const get = await api.get('/studenten');
  const data = await get.data;
  return data;
};

export type CreateStudentDto = {
  name: string;
  matrikelnummer: string;
  studentenStatus: string;
  kursId: string;
};

export const createStudent = async (values: CreateStudentDto) => {
  const post = await api.post('/studenten', values);
  const data = await post.data;
  return data;
};

export const updateStudent = async (values: Student) => {
  const put = await api.put(`/studenten/${values.id}`, values);
  const data = await put.data;
  return data;
};
