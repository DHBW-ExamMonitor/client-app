import { Course } from './course';
import { ExamAttendance } from './examAttendance';
import { Module } from './module';

export type Pruefungstermin = {
  id: string;
  name: string;
  hilfsmittel?: string;
  modul: Module;
  raeume: string;
  aufsichtsPersonen: string;
  notizen: string;
  dateTime: Date;
  kurse: Course[];
  pruefungsteilnahmen: ExamAttendance[];
};

export type Pruefungstermine = Pruefungstermin[];
