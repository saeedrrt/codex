export const posts = [];
export let idCounter = 1;

export function getNextId() {
  return idCounter++;
}
