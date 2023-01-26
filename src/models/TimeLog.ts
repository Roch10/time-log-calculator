export type TimeLog = {
  name?: string;
  sHr: string;
  sMin: string;
  sAA: string;
  eHr: string;
  eMin: string;
  eAA: string;
  breaks?: Array<TimeLog>;
};
