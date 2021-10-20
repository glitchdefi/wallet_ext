import { ResponseStatusTypes } from 'types';

// use below messages if no return message is needed
export const successfulResponse: ResponseStatusTypes = {
  status: 'success',
  message: 'success',
};

export const errorResponse: ResponseStatusTypes = {
  status: 'error',
  message: 'error',
};
