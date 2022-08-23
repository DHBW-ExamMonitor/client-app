import { Course } from './course';
import { Pruefungsteilnahme } from './pruefungsteilnahme';
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
  pruefungsteilnahmen: Pruefungsteilnahme[];
};

export type Pruefungstermine = Pruefungstermin[];
