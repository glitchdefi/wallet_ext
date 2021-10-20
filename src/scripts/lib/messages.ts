import log from 'loglevel';

log.setDefaultLevel('info');

export const sendMessage = (message: {
  type: string;
  payload?: object;
}): Promise<any> => {
  const { runtime } = chrome;
  log.info('UI sendMessage: ', message);

  return new Promise((resolve, reject) => {
    runtime.sendMessage(message, (result) => {
      const err = runtime.lastError;
      if (!err) {
        log.info('UI Receive: ', result);
        resolve(result);
      }

      reject(err);
    });
  });
};

export const getManifest = () => {
  const { runtime } = chrome;
  return new Promise((resolve, reject) => {
    try {
      resolve(runtime.getManifest());
    } catch (err) {
      reject(err);
    }
  });
};
