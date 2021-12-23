import exactMath from 'exact-math';
import BN from 'bn.js';
import web3Utils from 'web3-utils';

export const formatNumberDownRoundWithExtractMax = (
  number: string | number,
  decimal: number
) => {
  if (number) {
    return exactMath
      .div(
        exactMath.floor(exactMath.mul(number, exactMath.pow(10, decimal))),
        exactMath.pow(10, decimal)
      )
      .toFixed(decimal);
  }
};

export function isValidAmountSend(amount: any, balance: any, fee: any) {
  try {
    if (Number(amount) <= 0) {
      return false;
    }

    const bigAmount = new BN(web3Utils.toWei(amount));
    const bigBalance = new BN(web3Utils.toWei(balance)).sub(
      new BN(web3Utils.toWei(fee))
    );

    return bigBalance.gte(bigAmount) && bigAmount.lte(bigBalance);
  } catch (err) {
    return false;
  }
}
