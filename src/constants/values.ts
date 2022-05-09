import { KeypairType } from '@polkadot/util-crypto/types';
import moment from 'moment';

export const CONNECTED_DAPP_KEY = 'CONNECTED_DAPP_KEY';

export const LOCK_TIME_LIST = [
  { key: 0, time: null, label: 'Never' },
  { key: 1, time: 60 * 1000, label: '1 minute' },
  {
    key: 2,
    time: 2 * 60 * 1000,
    label: '2 minutes',
  },
  { key: 3, time: 5 * 60 * 1000, label: '5 minutes' },
  {
    key: 4,
    time: 10 * 60 * 1000,
    label: '10 minutes',
  },
  { key: 5, time: 20 * 60 * 1000, label: '20 minutes' },
  {
    key: 6,
    time: 60 * 60 * 1000,
    label: '1 hour',
  },
];

export const DEFAULT_TYPE: KeypairType = 'sr25519';
export const UPDATE_TIME = 5000;
export const PAGE_SIZE = 1000;
export const KIND_OF_TXN_LIST = [
  {
    label: 'All',
    key: 0,
  },
  {
    label: 'Send',
    key: 2,
  },
  {
    label: 'Receive',
    key: 1,
  },
];

export const STATUS_TYPE_LIST = [
  {
    label: 'All',
    key: 2,
  },
  {
    label: 'Success',
    key: 1,
  },
  {
    label: 'Failed',
    key: 0,
  },
];

export const DATE_LIST = [
  {
    label: 'All',
    key: 0,
    startTime: null,
    endTime: null,
  },
  {
    label: '1 week',
    key: 1,
    startTime: moment().subtract(1, 'week').startOf('day').valueOf(),
    endTime: moment().endOf('day').valueOf(),
  },
  {
    label: '1 month',
    key: 2,
    startTime: moment().subtract(1, 'month').startOf('day').valueOf(),
    endTime: moment().endOf('day').valueOf(),
  },
  {
    label: '3 months',
    key: 3,
    startTime: moment().subtract(3, 'months').startOf('day').valueOf(),
    endTime: moment().endOf('day').valueOf(),
  },
];
