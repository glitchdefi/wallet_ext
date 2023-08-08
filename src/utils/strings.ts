import {
  decodeAddress,
  encodeAddress,
  randomAsU8a,
} from '@polkadot/util-crypto';
import { isHex, u8aToHex, hexToU8a } from '@polkadot/util';
import { decrypt, encrypt } from '@metamask/browser-passworder';
import { ethers, utils } from 'ethers';
import { stripHexPrefix, toBN } from 'web3-utils';

export const truncateAddress = (
  address: string,
  startLength = 8,
  endLength = 8
) => {
  if (address)
    return `${address.substring(0, startLength)}...${address.substring(
      address.length - endLength
    )}`;

  return '';
};

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isHexSeed(seed: string): boolean {
  return (
    (seed.length === 64 && isHex(`0x${seed}`)) ||
    (seed.length === 66 && isHex(seed))
  );
}

export const formatPrivateKey = (pk: string) => {
  if (utils.isHexString(pk)) {
    return pk;
  } else {
    if (pk.length === 64) {
      return `0x${pk}`;
    }
  }
};

export const isValidAddressPolkadotAddress = (toAddress: string): boolean => {
  try {
    const isValid = encodeAddress(
      isHex(toAddress) ? hexToU8a(toAddress) : decodeAddress(toAddress)
    );

    return !!isValid;
  } catch (error) {
    return false;
  }
};

export const messageEncryption = async (
  msg: string
): Promise<{ encrypted: string; secret: string }> => {
  const secret = u8aToHex(randomAsU8a());

  // Encrypt the message
  const encrypted = await encrypt(secret, msg);
  return { encrypted, secret };
};

export const decryptMessage = async (
  encrypted: string,
  secret: string
): Promise<unknown> => {
  // Decrypt the message
  const messageDecrypted = await decrypt(secret, encrypted);

  return messageDecrypted;
};

export const validateNameExist = (
  accounts: any,
  name: string,
  address: string
): boolean => {
  let isError = false;

  Object.keys(accounts).map(function (key: string) {
    if (accounts[key]?.name === name && accounts[key]?.address !== address) {
      isError = true;
    }
  });

  return isError;
};

export const bufferToHex = (
  buf: Buffer | Uint8Array,
  nozerox = false
): string =>
  nozerox
    ? Buffer.from(buf).toString('hex')
    : `0x${Buffer.from(buf).toString('hex')}`;

export const hexToBuffer = (hex: string): Buffer =>
  Buffer.from(
    stripHexPrefix(hex).length % 2 === 1
      ? `0${stripHexPrefix(hex)}`
      : stripHexPrefix(hex),
    'hex'
  );

export function isEtherFormat(input: string): boolean {
  try {
    // Chuyển đổi chuỗi số thành đối tượng BigNumber
    const bigNumber = ethers.BigNumber.from(input);
    // Kiểm tra xem đối tượng BigNumber có phải là một số nguyên không âm và không có phần thập phân
    return (
      bigNumber.gte(0) && bigNumber.mod(ethers.constants.WeiPerEther).eq(0)
    );
  } catch (error) {
    return false;
  }
}

const zero = toBN(0);
const negative1 = toBN(-1);

/**
 * Returns value of unit in Wei
 *
 * @method getValueOfUnit
 * @param {number} decimals the unit to convert to, default ether
 * @returns {BN} value of the unit (in Wei)
 * @throws error if the unit is not correct:w
 */
const getValueOfUnit = (decimals: number) => toBN(10).pow(toBN(decimals));

export const fromBase = (
  weiInput: string,
  decimals: number,
  optionsInput?: any
): string => {
  let wei = toBN(weiInput);
  const negative = wei.lt(zero);
  const base = getValueOfUnit(decimals);
  const baseLength = base.toString().length - 1 || 1;
  const options = optionsInput || {};

  if (negative) {
    wei = wei.mul(negative1);
  }

  let fraction = wei.mod(base).toString(10);

  while (fraction.length < baseLength) {
    fraction = `0${fraction}`;
  }
  if (!options.pad) {
    // eslint-disable-next-line prefer-destructuring
    fraction = (fraction.match(/^([0-9]*[1-9]|0)(0*)/) as string[])[1];
  }

  let whole = wei.div(base).toString(10);

  if (options.commify) {
    whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  let value = `${whole}${fraction === '0' ? '' : `.${fraction}`}`;

  if (negative) {
    value = `-${value}`;
  }

  return value;
};
