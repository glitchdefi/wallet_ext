import { MESSAGE_ORIGIN_CONTENT } from 'constants/messages';
import { handleResponse, sendMessage } from './lib/page';
import EthereumProvider from './providers/ethereum/inject';
import { ProviderName, ProviderType } from './types/provider';
import { Message } from './types/Message';

// import { windowOnMessage, providerSendMessage } from '@/libs/messenger/window';

(window as Window).enkrypt = {
  providers: {},
};

console.log('enkrypt - window', window);

// Khởi tạo ethereum provider - để có thể tương tác với ethereum api
// Nhận vào một func sendMessage tới background và nhận response từ background
EthereumProvider(window, {
  name: ProviderName.ethereum,
  type: ProviderType.evm,
  sendMessageHandler: async (
    provider: ProviderName,
    message: string
  ): Promise<any> => {
    console.log('enkrypt - providerSendMessage', {
      provider,
      message,
    });

    const { method, params } = JSON.parse(message) || {};

    const _message =
      method === 'eth_accounts'
        ? 'pub(evm.eth_accounts)'
        : method === 'eth_chainId'
        ? 'pub(evm.eth_chainId)'
        : method === 'eth_requestAccounts'
        ? 'pub(evm.eth_requestAccounts)'
        : method === 'net_version'
        ? 'pub(evm.net_version)'
        : method === 'eth_estimateGas'
        ? 'pub(evm.eth_estimateGas)'
        : '';

    return await sendMessage(_message, { params });
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
