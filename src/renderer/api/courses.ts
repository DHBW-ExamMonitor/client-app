import { Course, Courses } from 'renderer/types/course';
import api from './api';

export const getCourses = async (): Promise<Courses> => {
  const get = await api.get('/kurse');
  const data = await get.data;
  return data;
};

export const getCourse = async (id: string): Promise<Course> => {
  const get = await api.get(`/kurse/${id}`);
  const data = await get.data;
  return data;
};

export type CreateCourseDto = {
  name: string;
  studienende: Date;
};

export const createCourse = async (course: CreateCourseDto) => {
  const post = await api.post('/kurse', course);
  const data = await post.data;
  return data;
};

export const updateCourse = async (course: Course) => {
  const put = await api.put(`/kurse/${course.id}`, course);
  const data = await put.data;
  return data;
};

export const deleteCourse = async (id: string) => {
  const deleteRequest = await api.delete(`/kurse/${id}`);
  const data = await deleteRequest.data;
  return data;
};
