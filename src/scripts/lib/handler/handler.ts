import { GlitchController } from '../../controllers/GlitchController';
import { successfulResponse, errorResponse } from './responseMessage';

type Request = { type: string; payload?: object };
type SendResponse = (response: any) => void;

export const createAccount = async (
  payload: { seed?: string; name?: string; password?: string },
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  // try {
  //   const { seed, name, password } = payload || {};
  //   const state = await controller.createAccount(seed, name, password);
  //   if (state) {
  //     sendResponse({ ...successfulResponse, state });
  //   }
  // } catch (error) {
  //   sendResponse({ ...errorResponse, error });
  // }
};

export const createWalletCompleted = async (
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  try {
    const state = await controller.createWalletCompleted();
    if (state) {
      sendResponse({ ...successfulResponse, state });
    }
  } catch (error) {
    sendResponse({ ...errorResponse, error });
  }
};

export const lockWallet = async (
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  try {
    const state = await controller.lockWallet();
    if (state) {
      sendResponse({ ...successfulResponse, state });
    }
  } catch (error) {
    sendResponse({ ...errorResponse, error });
  }
};

export const unlockWallet = async (
  payload: { password?: string },
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  // try {
  //   const { password } = payload || {};
  //   const state = await controller.unlockWallet(password);
  //   if (state) {
  //     sendResponse({ ...successfulResponse, state });
  //   }
  // } catch (error) {
  //   sendResponse({ ...errorResponse, error });
  // }
};

export const restoreWallet = async (
  payload: { seedPhrase?: string; name?: string; password?: string },
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  // try {
  //   const { seedPhrase, name, password } = payload || {};
  //   const state = await controller.restoreWallet(seedPhrase, name, password);
  //   if (state) {
  //     sendResponse({ ...successfulResponse, state });
  //   }
  // } catch (error) {
  //   sendResponse({ ...errorResponse, error });
  // }
};

export const logoutWallet = async (
  payload: { password?: string },
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  // try {
  //   const { password } = payload || {};
  //   const state = await controller.logoutWallet(password);
  //   if (state) {
  //     sendResponse({ ...successfulResponse, state });
  //   }
  // } catch (error) {
  //   sendResponse({ ...errorResponse, error });
  // }
};

export const backupWallet = async (
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  try {
    const state = await controller.backupWallet();
    if (state) {
      sendResponse({ ...successfulResponse, state });
    }
  } catch (error) {
    sendResponse({ ...errorResponse, error });
  }
};

export const resetState = async (
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  try {
    const state = await controller.setDefaultAppState();
    if (state) {
      sendResponse({ ...successfulResponse, state });
    }
  } catch (error) {
    sendResponse({ ...errorResponse, error });
  }
};

export const showSeedPhrase = async (
  payload: { password?: string },
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  // try {
  //   const { password } = payload || {};
  //   const state = await controller.showSeedPhrase(password);
  //   if (state) {
  //     sendResponse({ ...successfulResponse, state });
  //   }
  // } catch (error) {
  //   sendResponse({ ...errorResponse, error });
  // }
};

export const getBalance = async (
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  try {
    const state = await controller.getBalance();
    if (state) {
      sendResponse({ ...successfulResponse, state });
    }
  } catch (error) {
    sendResponse({ ...errorResponse, error });
  }
};

export const getTokenPrice = async (
  payload: { tokenName?: string; currency?: string },
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  // try {
  //   const { tokenName, currency } = payload || {};
  //   const state = await controller.getTokenPrice(tokenName, currency);
  //   if (state) {
  //     sendResponse({ ...successfulResponse, state });
  //   }
  // } catch (error) {
  //   sendResponse({ ...errorResponse, error });
  // }
};

export const addNewAccount = async (
  payload: { name?: string },
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  // try {
  //   const { name } = payload || {};
  //   const state = await controller.addNewAccount(name);
  //   if (state) {
  //     sendResponse({ ...successfulResponse, state });
  //   }
  // } catch (error) {
  //   sendResponse({ ...errorResponse, error });
  // }
};

export const changeAccount = async (
  payload: { address?: string },
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  // try {
  //   const { address } = payload || {};
  //   const state = await controller.changeAccount(address);
  //   if (state) {
  //     sendResponse({ ...successfulResponse, state });
  //   }
  // } catch (error) {
  //   sendResponse({ ...errorResponse, error });
  // }
};

export const importAccount = async (
  payload: { name?: string; privateKey?: string },
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  // try {
  //   const { name, privateKey } = payload || {};
  //   const state = await controller.importAccount(name, privateKey);
  //   if (state) {
  //     sendResponse({ ...successfulResponse, state });
  //   }
  // } catch (error) {
  //   sendResponse({ ...errorResponse, error });
  // }
};

export const showPrivateKeys = async (
  payload: { password?: string },
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  // try {
  //   const { password } = payload || {};
  //   const state = await controller.showPrivateKeysAccount(password);
  //   if (state) {
  //     sendResponse({ ...successfulResponse, state });
  //   }
  // } catch (error) {
  //   sendResponse({ ...errorResponse, error });
  // }
};

export const changeAccountName = async (
  payload: { name?: string },
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  // try {
  //   const { name } = payload || {};
  //   const state = await controller.changeAccountName(name);
  //   if (state) {
  //     sendResponse({ ...successfulResponse, state });
  //   }
  // } catch (error) {
  //   sendResponse({ ...errorResponse, error });
  // }
};

export const transfer = async (
  payload: { password?: string; toAddress?: string; amount?: any },
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  // try {
  //   const { password, toAddress, amount } = payload || {};

  //   await controller.transfer(
  //     password,
  //     toAddress,
  //     amount,
  //     (msg) => {
  //       sendResponse({
  //         ...successfulResponse,
  //         state: { isWrongPassword: false, status: false, message: msg },
  //       });
  //     },
  //     () => {
  //       sendResponse({
  //         ...successfulResponse,
  //         state: { isWrongPassword: false, status: true, message: null },
  //       });
  //     },
  //     () => {
  //       sendResponse({
  //         ...errorResponse,
  //         state: { isWrongPassword: true },
  //       });
  //     }
  //   );
  // } catch (error) {
  //   sendResponse({ ...errorResponse, error });
  // }
};

export const getEstimateFee = async (
  payload: { toAddress?: string; amount?: any },
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  // try {
  //   const { toAddress, amount } = payload || {};
  //   const fee = await controller.getEstimateFee(toAddress, amount);
  //   sendResponse({ ...successfulResponse, state: { fee } });
  // } catch (error) {
  //   sendResponse({ ...errorResponse, error });
  // }
};

export const fetchTransactions = async (
  payload: {
    params?: {
      pageIndex: number;
      pageSize: number;
      txStatus: number;
      txType: number;
      startTime: number;
      endTime: number;
    };
  },
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  // try {
  //   const { params } = payload || {};
  //   const state = await controller.getTransactionHistory(params);
  //   if (state) {
  //     sendResponse({ ...successfulResponse, state });
  //   }
  // } catch (error) {
  //   sendResponse({ ...errorResponse, error });
  // }
};

export const setAutoLockTimer = async (
  payload: { openTime?: number; duration?: number },
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  // try {
  //   const state = await controller.setAutoLockTimer(payload);
  //   if (state) {
  //     sendResponse({ ...successfulResponse, state });
  //   }
  // } catch (error) {
  //   sendResponse({ ...errorResponse, error });
  // }
};

export const handleDefault = (request: Request, sendResponse: SendResponse) => {
  const response = {
    ...errorResponse,
    message: `Invalid request. Check message type ${request.type}`,
  };

  sendResponse(response);
};

export const handleError = async (
  request: Request,
  sendResponse: SendResponse
) => {
  const response = {
    ...errorResponse,
    message: `Error while processing request. Check message type ${request.type}`,
  };

  sendResponse(response);
};
