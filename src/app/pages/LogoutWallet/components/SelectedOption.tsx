import React, { useState } from 'react';
import styled from 'styled-components';

import { colors } from 'theme/colors';

// Components
import { Box, Flex } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { Button, ButtonShadow } from 'app/components/Button';
import { CircleCheckBox } from 'app/components/Form';

interface Props {
  values: { yes: boolean; no: boolean };
  onNext: (hasBackedUp: { yes: boolean; no: boolean }) => void;
  onCancel: () => void;
}

export const SelectedOption: React.FC<Props> = ({
  values,
  onNext,
  onCancel,
}) => {
  const [hasBackedUp, setHasBackedUp] = useState(values);

  return (
    <Box px="32px" pb="24px">
      <Box mt="32px">
        <Text>
          Once the current mnemonic phrase is removed from the Glitch wallet,
          all your accounts and funds still exists in the blockchain. As long as
          you still keep the mnemonic passphrase, you can always restore it in
          the future.
        </Text>
      </Box>

      <Box mt="32px">
        <CheckboxWrapper border={`1px solid ${colors.gray8}`} padding="12px">
          <CircleCheckBox
            id="yes"
            checked={hasBackedUp.yes}
            labelComponent="Yes, I have the Mnemonic phrase backup."
            onChange={() =>
              setHasBackedUp({
                no: false,
                yes: true,
              })
            }
          />
        </CheckboxWrapper>

        <CheckboxWrapper
          mt="16px"
          border={`1px solid ${colors.gray8}`}
          padding="12px"
        >
          <CircleCheckBox
            id="no"
            checked={hasBackedUp.no}
            labelComponent="No, I want to back up my Mnemonic phrase."
            onChange={() =>
              setHasBackedUp({
                no: true,
                yes: false,
              })
            }
          />
        </CheckboxWrapper>
      </Box>

      <Flex mt="100px">
        <Button width="50%" variant="cancel" mr="17px" onClick={onCancel}>
          Cancel
        </Button>
        {hasBackedUp.yes || hasBackedUp.no ? (
          <ButtonShadow onClick={() => onNext(hasBackedUp)} width="50%">
            Next
          </ButtonShadow>
        ) : (
          <Button width="50%" variant="disable-primary">
            Next
          </Button>
        )}
      </Flex>
    </Box>
  );
};

const CheckboxWrapper = styled(Flex)`
  &:hover {
    transition: all 0.3s;
    border: 1px solid ${colors.primary};
  }
`;
