export function shuffleArray<T>(arr: Array<T>): Array<T> {
  const copy = [...arr];

  const randomIndex = () => Math.floor(Math.random() * arr.length);

  for (let i = 0; i < arr.length; i++) {
    const a = randomIndex();
    const b = randomIndex();
    if (a !== b) {
      const tmp = copy[a];
      copy[a] = copy[b];
      copy[b] = tmp;
    }
  }

  return copy;
}
