export interface Debt {
  _id: string;
  debtAmount: number;
  debtDate: string;
  debtorInfo: string;
  debtorName: string;
  dueDate?: string | null;
  isReturned: boolean;
  lenderId: string;
  refundAmount: number;
  withoutDetails: boolean;
  __v: number;
}
