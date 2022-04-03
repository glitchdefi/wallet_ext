import React from 'react';
import styled from 'styled-components';

import { Box } from 'app/components/Box';
import { Text } from 'app/components/Text';
import { colors } from 'theme/colors';
import { ProgressBar } from '../../components/Shared/StepProgressLayout/ProgressBar';
import { ButtonShadow, Button } from 'app/components/Button';
import { MessageBox } from 'app/components/MessageBox';

const Authorize: React.FC = () => {
  return (
    <Box>
      <Box p="16px">
        <Text color={colors.white} fontSize="20px" bold>
          Authorize
        </Text>
        <ProgressBar mt="16px" height="3px" percentage={100} />
      </Box>

      <Box px="16px">
        <StyledText large>
          An application, self-identifying as{' '}
          <a href={'123'} rel="noopener noreferrer" target="_blank">
            <span className="tab-url">{origin}</span>
          </a>{' '}
          is requesting access from{' '}
          <a href={'123'} rel="noopener noreferrer" target="_blank">
            <span className="tab-url">"123"</span>
          </a>
        </StyledText>

        <MessageBox
          mt="32px"
          message="Only approve this request if you trust the application. Approving gives the application access to the addresses of your accounts."
        />

        <ButtonShadow mt="32px" width="100%" onClick={() => {}}>
          Yes, allow this application access
        </ButtonShadow>
        <Button mt="24px" width="100%" variant="warning" onClick={() => {}}>
          Reject
        </Button>
      </Box>
    </Box>
  );
};

const StyledText = styled(Text)`
  a {
    color: ${colors.primary};
  }
`;

export default Authorize;
