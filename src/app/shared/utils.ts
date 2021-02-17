export const zip = (arrays: Array<any>[]) => {
  return arrays[0].map((_, i) => {
    return arrays.map((array) => {
      return array[i];
    });
  });
};
