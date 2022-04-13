import exactMath from 'exact-math';
import BN from 'bn.js';
import {
  toWei,
  toBN,
  fromWei,
  isHexStrict,
  hexToNumberString,
} from 'web3-utils';
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
    if (
      parseFloat(balance) <= 0 &&
      parseFloat(amount) <= 0 &&
      parseFloat(fee) <= 0
    ) {
      return false;
    }

    const bigAmount = new BN(toWei(amount));
    const bigBalance = new BN(toWei(balance)).sub(new BN(toWei(fee)));

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

const toNumber = (num: any) => {
  if (num == 0) return '0';
  if (!num) return null;

  const numToStr = num?.toString();

  if (numToStr?.includes('e')) {
    return Number(numToStr).toLocaleString().replaceAll(',', '');
  }

  return numToStr;
};

export function numberWithCommas(n: any) {
  var parts = n?.toString()?.split('.');
  return (
    parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    (parts[1] ? '.' + parts[1] : '')
  );
}

export const formatWei = (number: any, isFormatNumber = true) => {
  if (isHexStrict(number)) {
    number = hexToNumberString(number);
  }
  const num = toNumber(number);
  if (num == 0) return '0';
  if (!num) return '0';

  const numWei = fromWei(num, 'ether');

  return isFormatNumber ? numberWithCommas(numWei) : numWei;
};

export const calcTotalBalance = (balance: {
  freeBalance?: any;
  reservedBalance?: any;
}): any => {
  const { freeBalance = '0', reservedBalance = '0' } = balance || {};

  return formatWei(
    toBN(toWei(formatWei(freeBalance, false))).add(
      toBN(toWei(formatWei(reservedBalance, false)))
    ),
    false
  );
};
