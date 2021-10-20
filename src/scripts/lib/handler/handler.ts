import { GlitchController } from '../../controllers/GlitchController';
import { successfulResponse, errorResponse } from './responseMessage';

type Request = { type: string; payload?: object };
type SendResponse = (response: any) => void;

export const createSeedWords = async (
  controller: GlitchController,
  sendResponse: SendResponse
) => {
  try {
    const seedPhrases = controller.createSeedWords();
    if (seedPhrases) {
      sendResponse({ ...successfulResponse, seedPhrases });
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
