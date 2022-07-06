import { Course } from './course';
import { ExamAttendance } from './examAttendance';
import { Module } from './module';

export type ExamDate = {
  id: string;
  module: Module;
  raeume: string[];
  dateTime: Date;
  kurse: Course[];
  pruefungsteilnahmen: ExamAttendance[];
};
