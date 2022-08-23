import { Student, Students } from 'renderer/types/student';
import api from './api';

export const getStudents = async (kursId: string | null): Promise<Students> => {
  if (kursId) {
    const get = await api.get(`/studenten/kurs/${kursId}`);
    const data = await get.data;
    return data;
  }

  const get = await api.get('/studenten');
  const data = await get.data;
  return data;
};

export const getStudentsByCourse = async (id: string): Promise<Students> => {
  const get = await api.get(`/studenten/kurs/${id}`);
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
  try {
    const put = await api.put(`/studenten/${values.id}`, values);
    const data = await put.data;

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteStudent = async (id: string) => {
  const deleteRequest = await api.delete(`/studenten/${id}`);
  const data = await deleteRequest.data;
  return data;
};
