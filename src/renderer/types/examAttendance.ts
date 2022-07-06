export const enum ExamAttendanceStatus {
  BESTANDEN,
  NICHT_BESTANDEN,
  ANGERECHNET,
  KRANK_MIT_ATTEST,
  FEHLEN_OHNE_GRUND,
}

export const enum Try {
  ERSTVERSUCH,
  ZWEITVERSUCH,
  DRITTVERSUCH,
}

export type ExamAttendance = {
  id: string;
  studentId: string;
  pruefungsterminId: string;
  pruefungsteilnahmeStatus: ExamAttendanceStatus;
  versuch: Try;
};
