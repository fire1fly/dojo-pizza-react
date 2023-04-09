export default function reduceBy<T>(arr: T[], callback: (item: T) => number) {
  return arr.reduce((sum, item) => {
    return sum + callback(item);
  }, 0)
}