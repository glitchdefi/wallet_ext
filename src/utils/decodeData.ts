import tokenSigs from 'scripts/providers/ethereum/libs/transaction/lists/tokenSigs';
import { bufferToHex, hexToBuffer } from './strings';
import funcSigs from 'scripts/providers/ethereum/libs/transaction/lists/4bytes';
import { rawDecode } from 'ethereumjs-abi';
import { DataDecodeResponse } from 'scripts/providers/ethereum/types';
import { toHex } from 'web3-utils';
import Web3Eth from 'web3-eth';
import { BigNumber } from 'ethers';
import { BN } from 'bn.js';

const getParams = (functionName: string): string[] => {
  const regExp = /\(([^)]+)\)/;
  const params = regExp.exec(functionName);
  if (!params || params?.length < 1) return [];
  return params[1].split(',');
};

export const decodeData = (web3: Web3Eth, data: string) => {
  const dataToBuffer = hexToBuffer(data);
  const functionSig = bufferToHex(dataToBuffer.slice(0, 4));
  const isTokenAction = Object.values(tokenSigs).includes(functionSig);
  const valueData = bufferToHex(dataToBuffer.slice(4));
  const types = ['address', 'uint256'];
  const inputValues = web3.abi.decodeParameters(types, data.slice(10));

  const sig = funcSigs[functionSig];
  if (!sig)
    return {
      decoded: false,
      values: [bufferToHex(dataToBuffer)],
      isToken: isTokenAction,
    };

  try {
    const params = getParams(sig[0]);
    const decoded = rawDecode(params, hexToBuffer(valueData));
    const decodedData: DataDecodeResponse = {
      decoded: true,
      values: decoded.map((a) => toHex(a)),
      function: sig[0],
      isToken: isTokenAction,
      amountToApprove: inputValues[1],
    };
    if (functionSig === tokenSigs.transfer) {
      decodedData.tokenValue = decodedData.values[1];
      decodedData.tokenTo = decodedData.values[0];
    } else if (functionSig === tokenSigs.transferFrom) {
      decodedData.tokenValue = decodedData.values[2];
      decodedData.tokenTo = decodedData.values[1];
    }
    return decodedData;
  } catch (e) {
    return {
      decoded: false,
      values: [bufferToHex(dataToBuffer)],
      function: sig[0],
      isToken: isTokenAction,
    };
  }
};
