export type CreateOrUpdateCourse = {
  name: string;
};

export type Course = {
  id: string;
  name: string;
  studienende: string;
};

export type Courses = Course[];
