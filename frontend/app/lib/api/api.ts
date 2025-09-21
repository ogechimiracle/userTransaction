
import axios from "axios";

export interface Transaction {
  transactionId: string;
  type: string;
  amount: number;
  currency: string;
  date: string;
}


const api = axios.create({
  baseURL: "http://localhost:1200/api", 
});


export const getTransactions = async (): Promise<Transaction[]> => {
  const res = await api.get<Transaction[]>("/transaction/");
  return res.data;
};
