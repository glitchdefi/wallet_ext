import { GlitchToken } from 'constants/tokens';
import GlitchCommon from '@glitchdefi/common';
import {
  decodeAddress,
  encodeAddress,
  randomAsU8a,
} from '@polkadot/util-crypto';
import { isHex, u8aToHex, hexToU8a } from '@polkadot/util';
import { decrypt, encrypt } from '@metamask/browser-passworder';

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

export const checkIsValidAddress = (
  address: string,
  toAddress: string
): boolean => {
  try {
    if (toAddress.trim().length !== GlitchToken.wallet_address_length) {
      return false;
    }

    return (
      GlitchCommon.ecc.validateAddress(toAddress) &&
      (GlitchCommon.codec.isBankAddress(toAddress) ||
        GlitchCommon.codec.isRegularAddress(toAddress)) &&
      address !== toAddress
    );
  } catch (error) {
    return false;
  }
};

export function isHexSeed(seed: string): boolean {
  return isHex(seed) && seed.length === 66;
}

export function privateKeyValidate(privateKey: string): boolean {
  return isHexSeed(privateKey);
}

export const isValidAddressPolkadotAddress = (
  fromAddress: string,
  toAddress: string
): boolean => {
  try {
    const isValid = encodeAddress(
      isHex(toAddress) ? hexToU8a(toAddress) : decodeAddress(toAddress)
    );

    return isValid && fromAddress !== toAddress;
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

export const decryptMessage = async (encrypted: string, secret: string) => {
  // Decrypt the message
  const messageDecrypted = await decrypt(secret, encrypted);

  return messageDecrypted;
};
