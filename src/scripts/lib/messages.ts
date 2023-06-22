export const sendMessage = (message: {
  type: string;
  payload?: object;
}): Promise<any> => {
  const { runtime } = chrome;

  return new Promise((resolve, reject) => {
    runtime.sendMessage(message, (result) => {
      const err = runtime.lastError;
      if (!err) {
        resolve(result);
      }

      reject(err);
    });
  });
};
