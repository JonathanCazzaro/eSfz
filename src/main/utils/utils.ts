export const generateId = (digits: number): number => {
  let id = '';
  for (let i = 0; i < digits; i++) {
    id += Math.floor(Math.random() * 10);
  }
  return parseInt(id, 10);
};
