import { GlitchToken } from 'constants/tokens';
import GlitchCommon from '@glitchdefi/common';

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
