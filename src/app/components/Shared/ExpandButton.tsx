import React, { useCallback } from 'react';
import useIsPopup from 'hooks/useIsPopup';
import { windowOpen } from 'scripts/ui/messaging';
import { useToast } from 'hooks/useToast';

import { Flex } from '../Box';
import { Button } from '../Button';
import { ExpandIcon } from '../Svg';

const ExpandButton: React.FC = React.memo(() => {
  const { toastError } = useToast();
  const isPopup = useIsPopup();

  const onExpand = useCallback(() => {
    windowOpen('/').catch((error: Error) => toastError(null, error.message));
  }, []);

  if (!isPopup) return null;
  return (
    <Button p="0px" onClick={onExpand}>
      <Flex>
        <ExpandIcon />
      </Flex>
    </Button>
  );
});

export default ExpandButton;
