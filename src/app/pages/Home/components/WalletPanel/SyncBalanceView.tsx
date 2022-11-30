import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import { colors } from 'theme/colors';

import { CloseIcon, InfoFilled } from 'app/components/Svg';
import { Box } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { Button } from 'app/components/Button';
import { SyncBalanceErrorModal } from './SyncBalanceErrorModal';
import { useAccount, useWallet } from 'contexts/WalletContext/hooks';

export const SyncBalanceView: React.FC = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const { address } = useAccount();
  const { onClaimEvmBalance } = useWallet();

  const onToggle = useCallback(() => {
    setIsPopoverOpen((prev) => !prev);
  }, []);

  const onSync = useCallback(() => {
    onClaimEvmBalance({ address });
    onToggle();
  }, [onClaimEvmBalance]);

  return (
    <>
      <StyledOverlayTrigger
        show={isPopoverOpen}
        trigger="click"
        placement="bottom-end"
        containerPadding={0}
        overlay={
          <StyledPopover id={`popover-positioned-bottom-start`}>
            <PopoverBody>
              <Box position="relative" p="24px" background={colors.gray2}>
                <Box position="absolute" right="24px" top="24px">
                  <Button p="0px" onClick={onToggle}>
                    <CloseIcon color={colors.gray5} width="9px" height="9px" />
                  </Button>
                </Box>

                <Text large fontWeight="600" mb="12px">
                  Sync balance between Substrate and EVM address
                </Text>

                <Text mb="24px" color={colors.gray6}>
                  Your balance is on Substrate address, click the button below
                  to sync balance between Substrate and EVM address.
                </Text>

                <Button
                  py="5px"
                  px="16px"
                  fontSize="14px"
                  variant="primary"
                  onClick={onSync}
                >
                  Sync balance
                </Button>
              </Box>
            </PopoverBody>
          </StyledPopover>
        }
      >
        <Box style={{ cursor: 'pointer' }} onClick={onToggle}>
          <InfoFilled width="24px" height="24px" />
        </Box>
      </StyledOverlayTrigger>

      <SyncBalanceErrorModal />
    </>
  );
};

const StyledOverlayTrigger = styled(OverlayTrigger)`
  .popover-arrow:after {
    border-bottom-color: ${colors.gray2};
  }
`;

const StyledPopover = styled(Popover)`
  font-family: IBM Plex Mono, monospace !important;
  border: none;
  border-radius: 0px;
  min-width: 311px;

  .popover-arrow {
    &:after {
      border-bottom-color: ${colors.gray2};
    }
  }
`;

const PopoverBody = styled(Popover.Body)`
  padding: 0px;
`;
