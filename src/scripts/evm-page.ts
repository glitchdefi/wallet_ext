import { MESSAGE_ORIGIN_CONTENT } from 'constants/messages';
import { handleResponse, sendMessage } from './lib/page';
import EthereumProvider from './providers/ethereum/inject';
import { ProviderName, ProviderType } from './types/provider';
import { Message } from './types/Message';
import { log } from 'utils/log-config';

(window as Window).enkrypt = {
  providers: {},
};

log.info('enkrypt - window', window);

// Khởi tạo ethereum provider - để có thể tương tác với ethereum api
// Nhận vào một func sendMessage tới background và nhận response từ background
EthereumProvider(window, {
  name: ProviderName.ethereum,
  type: ProviderType.evm,
  sendMessageHandler: async (
    provider: ProviderName,
    message: string
  ): Promise<any> => {
    log.info('enkrypt - sendMessageHandler', {
      provider,
      message,
    });

    const { method, params } = JSON.parse(message) || {};

    const _message =
      method === 'eth_accounts'
        ? 'pub(evm.eth_accounts)'
        : method === 'eth_requestAccounts'
        ? 'pub(evm.eth_requestAccounts)'
        : method === 'eth_sendTransaction'
        ? 'pub(evm.eth_sendTransaction)'
        : method?.includes('eth_signTypedData')
        ? 'pub(evm.eth_signTypedData)'
        : 'pub(evm.eth_clientRequest)';

    return new Promise(async (resolve) => {
      sendMessage(_message, { method, params }).then((res) => {
        log.info('enkrypt - sendMessageHandler (res)', {
          res,
        });

        resolve(res);
      });
    });
  },
});

window.addEventListener('message', ({ data, source }: Message): void => {
  // only allow messages from our window, by the loader
  if (source !== window || data.origin !== MESSAGE_ORIGIN_CONTENT) {
    return;
  }

  if (data.id) {
    handleResponse(data);
  } else {
    console.error('Missing id for response.');
  }
});

// Lắng nghe từ background, các sự kiện khi user tương tác trên UI như thay đổi account,
// thay đổi chainId sẽ sendMessage tới đây, và sẽ để Provider xử lý tương tác với ethereum API
// Nếu không tương tác với UI sẽ không chạy vào func này
// windowOnMessage(async (msg): Promise<void> => {
//   console.log('enkrypt - windowOnMessage', {
//     provider: msg.provider,
//     message: msg.message,
//   });
//   window['enkrypt']['providers'][msg.provider].handleMessage(msg.message);
// });
