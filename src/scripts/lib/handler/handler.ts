import { GlitchController } from '../../controllers/GlitchController';
import { successfulResponse, errorResponse } from './responseMessage';

type Request = { type: string; payload?: object };
type SendResponse = (response: any) => void;

export const createNewWallet = async (
  payload: { password?: string },
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  try {
    const { password } = payload || {};

    const state = await controller.createNewWallet(password);
    if (state) {
      sendResponse({ ...successfulResponse, state });
    }
  } catch (error) {
    sendResponse({ ...errorResponse, error });
  }
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

export const unlockWallet = async (
  payload: { password?: string },
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  try {
    const { password } = payload || {};

    const state = await controller.unlockWallet(password);
    if (state) {
      sendResponse({ ...successfulResponse, state });
    }
  } catch (error) {
    sendResponse({ ...errorResponse, error });
  }
};

export const checkIsValidSeedPhrase = async (
  payload: { seedPhrase?: string },
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  try {
    const { seedPhrase } = payload || {};

    const state = controller.checkIsValidSeedPhrase(seedPhrase);
    if (state) {
      sendResponse({ ...successfulResponse, state });
    }
  } catch (error) {
    sendResponse({ ...errorResponse, error });
  }
};

export const restoreWallet = async (
  payload: { seedPhrase?: string; password?: string },
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  try {
    const { seedPhrase, password } = payload || {};

    const state = await controller.restoreWallet(seedPhrase, password);
    if (state) {
      sendResponse({ ...successfulResponse, state });
    }
  } catch (error) {
    sendResponse({ ...errorResponse, error });
  }
};

export const addNewAccount = async (
  payload: { name?: string },
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  try {
    const { name } = payload || {};

    const state = await controller.addNewAccount(name);
    if (state) {
      sendResponse({ ...successfulResponse, state });
    }
  } catch (error) {
    sendResponse({ ...errorResponse, error });
  }
};

export const changeAccount = async (
  payload: { address?: string },
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  try {
    const { address } = payload || {};

    const state = await controller.changeAccount(address);
    if (state) {
      sendResponse({ ...successfulResponse, state });
    }
  } catch (error) {
    sendResponse({ ...errorResponse, error });
  }
};

export const importAccount = async (
  payload: { name?: string; privateKey?: string },
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  try {
    const { name, privateKey } = payload || {};

    const state = await controller.importAccount(name, privateKey);
    if (state) {
      sendResponse({ ...successfulResponse, state });
    }
  } catch (error) {
    sendResponse({ ...errorResponse, error });
  }
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
