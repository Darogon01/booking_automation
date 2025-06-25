import { CLIENT_RENEG_LIMIT } from "tls";



export const formatDate = (year: number, month: number, day: number) =>
  `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

formatDate(1345, 1, 3)
console.log(formatDate)
