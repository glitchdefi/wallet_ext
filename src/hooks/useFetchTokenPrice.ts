import useSWRMutation from 'swr/mutation';
import axios from 'axios';

const fetcher = (
  url: string,
  { arg }: { arg: { ids: string; vs_currencies: string } }
) => axios.get(url, { params: { ...arg } });

export const useFetchTokenPrice = () => {
  const { isMutating, trigger } = useSWRMutation(
    `https://api.coingecko.com/api/v3/simple/price`,
    fetcher
  );

  return { isFetching: isMutating, fetchTokenPrice: trigger };
};
