import { Average } from "./average.model";
import { Fee } from "./fee.model";

export interface History {
    startDate: Date;
    endDate: Date | null;
    fee: Fee;
    profitLoss: number;
    average: Average;
  }