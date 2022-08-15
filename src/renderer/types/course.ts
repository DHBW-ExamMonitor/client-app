export type CreateOrUpdateCourse = {
  name: string;
};

export type Course = {
  id: string;
  name: string;
  jahrgang: string;
};

export type Courses = Course[];
