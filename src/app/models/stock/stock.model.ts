export interface Stock {
    id: string;
    symbol: string;
    quantity: string;
    date: Date;
    price: number;
    fee: number;
    operation: boolean;
}