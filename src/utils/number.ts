import exactMath from 'exact-math';
import BN from 'bn.js';
import web3Utils from 'web3-utils';
import numbro from 'numbro';

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

export const isValidAmountSend = (amount: any, balance: any, fee: any) => {
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
};

export const formatCurrencyAmount = (num: any, digits = 2, round = true) => {
  if (num === 0) return '0.00';
  if (!num) return '-';
  if (num < 0.001) {
    return '<0.001';
  }
  return numbro(num).format({ average: round, mantissa: digits });
};

export const formatDollarAmount = (num: any, digits = 2, round = true) => {
  if (num == 0) return '$0.00';
  if (!num) return '-';
  if (num < 0.001) {
    return '<$0.001';
  }
  return numbro(num).formatCurrency({ average: round, mantissa: digits });
};
