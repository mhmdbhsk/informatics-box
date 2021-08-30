export const dateFormatter = (date: string) => new Date(date);

export const datePastChecker = (firstDate: any, secondDate: any) =>
  firstDate - secondDate < 0;

export const dateRenderer = (date: string) =>
  new Date(date).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
