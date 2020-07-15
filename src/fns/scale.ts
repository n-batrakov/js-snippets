export const scale = (
  (xmin: number, xmax: number) =>
    (from: number, to: number) =>
      (x: number) => {
        let factor = (x - xmin) / (xmax - xmin)
        return from + (to - from) * factor
      }
)
