export type TimeLog = {
  name?: string;
  sHr: string;
  sMin: string;
  sAA: string;
  eHr: string;
  eMin: string;
  eAA: string;
  date?: string;
  breaks?: Array<TimeLog>;
  totalBreaks?: number;
  totalHours?: number;
  totalWorkedHours?: number;
};
