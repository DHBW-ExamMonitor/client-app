export const enum StudentType {
  IMMATRIKULIERT = 'IMMATRIKULIERT',
  EXMATRIKULIERT = 'EXMATRIKULIERT',
}

export type CreateOrUpdateStudent = {
  matrikelnummer: string;
  studentenStatus: StudentType;
  kursId: string;
};

export type Student = {
  id: string;
  name: string;
  matrikelnummer: string;
  studentenStatus: StudentType;
  kursId: string;
};

export type Students = Student[];
