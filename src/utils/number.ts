import exactMath from 'exact-math';

export const formatNumberDownRoundWithExtractMax = (
  number: string | number,
  decimal: number
) => {
  return exactMath
    .div(
      exactMath.floor(exactMath.mul(number, exactMath.pow(10, decimal))),
      exactMath.pow(10, decimal)
    )
    .toFixed(decimal);
};
