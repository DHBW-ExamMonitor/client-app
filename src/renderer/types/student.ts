export const enum StudentType {
  IMMATRIKULIERT,
  EXMATRIKULIERT,
}

export type CreateOrUpdateStudent = {
  matrikelnummer: string;
  studentenStatus: StudentType;
  kursId: string;
};

export type Student = {
  id: string;
  matrikelnummer: string;
  studentenStatus: StudentType;
  kursId: string;
};

export type Students = Student[];
