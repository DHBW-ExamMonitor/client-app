export type Module = {
  id: string;
  name: string;
  vorlesungen: string;
  pruefungstermine?: string[];
  aktiv: boolean;
};

export type Modules = Module[];
