import {
  decodeAddress,
  encodeAddress,
  randomAsU8a,
} from '@polkadot/util-crypto';
import { isHex, u8aToHex, hexToU8a } from '@polkadot/util';
import { decrypt, encrypt } from '@metamask/browser-passworder';
import { utils } from 'ethers';

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
