import { Latest } from "./latest.model";
import { History } from "./history.model";

export interface Position {
    symbol: string;
    name: string;
    cnpj: string;
    quantity: number;
    history: History[];
    latest: Latest;
  }