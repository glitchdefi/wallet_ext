import { useMemo } from 'react';

export default function useIsPopup(): boolean {
  return useMemo(() => {
    return !!chrome.extension.getViews({ type: 'popup' })?.length;
  }, []);
}
