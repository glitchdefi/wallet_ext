import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types';
import { useToast } from 'hooks/useToast';
import { slice } from './reducer';
import * as actions from './actions';

const useSettingsSelector = () =>
  useSelector((state: RootState) => {
    return state.settings;
  });

export const useAutoLockTimer = () => {
  const dispatch = useDispatch();
  const { autoLock } = useSettingsSelector();

  const onSetAutoLockTimer = useCallback(
    (openTime?: number, duration?: number) =>
      dispatch(actions.setAutoLockTimerAction(openTime, duration)),
    [dispatch]
  );

  return { ...autoLock, onSetAutoLockTimer };
};
