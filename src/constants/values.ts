export const LOCK_TIME_LIST = [
  { key: 0, time: 60 * 1000, label: '1 minute' },
  {
    key: 1,
    time: 2 * 60 * 1000,
    label: '2 minutes',
  },
  { key: 2, time: 5 * 60 * 1000, label: '5 minutes' },
  {
    key: 3,
    time: 10 * 60 * 1000,
    label: '10 minutes',
  },
  { key: 4, time: 20 * 60 * 1000, label: '20 minute' },
  {
    key: 5,
    time: 60 * 60 * 1000,
    label: '1 hour',
  },
];

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
