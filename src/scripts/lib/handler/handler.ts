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
