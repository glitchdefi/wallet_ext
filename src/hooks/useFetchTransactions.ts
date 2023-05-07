import useSWRMutation from 'swr/mutation';
import axios from 'axios';
import { useNetwork } from 'contexts/SettingsContext/hooks';
import { GlitchNetwork } from 'constants/networks';
import { useAccount } from 'contexts/WalletContext/hooks';

const fetcher = (
  url: string,
  {
    arg,
  }: {
    arg: {
      page_index: number;
      page_size: number;
      txStatus: number;
      txType: number;
      start_time: number;
      end_time: number;
    };
  }
) => {
  const { start_time, end_time, ...restArgs } = arg || {};
  const dateParams = start_time && end_time ? { start_time, end_time } : {};

  return axios.get(url, { params: { ...restArgs, ...dateParams } });
};

export const useFetchTransactions = () => {
  const network = useNetwork();
  const { address } = useAccount();
  const apiUrl = GlitchNetwork.find((n) => n.key === network).baseApiUrl;

  const { isMutating, trigger } = useSWRMutation(
    apiUrl && address ? `${apiUrl}/address/${address}/tx` : null,
    fetcher
  );

  return { isFetching: isMutating, fetchTransactions: trigger };
};
