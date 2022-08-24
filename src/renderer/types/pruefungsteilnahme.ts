export enum TeilnahmeStatus {
  KEIN_STATUS,
  BESTANDEN,
  NICHT_BESTANDEN,
  ANGERECHNET,
  KRANK_MIT_ATTEST,
  FEHLEN_OHNE_GRUND,
}

export enum Versuch {
  ERSTVERSUCH,
  ZWEITVERSUCH,
  DRITTVERSUCH,
}

export type Pruefungsteilnahme = {
  id: string;
  studentId: string;
  pruefungsterminId: string;
  pruefungsteilnahmeStatus: TeilnahmeStatus;
  versuch: Versuch;
  notizen?: string;
};

export type Pruefungsteilnahmen = Pruefungsteilnahme[];
