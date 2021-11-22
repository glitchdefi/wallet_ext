import React from 'react';

import { colors } from 'theme/colors';

// Components
import { Box, Flex } from 'app/components/Box';
import { Button } from 'app/components/Button';
import { LeftArrowIcon } from 'app/components/Svg';
import { Text } from 'app/components/Text';
import { ProgressBar } from './ProgressBar';

interface Props {
  children: React.ReactNode;
  title: string;
  stepTitle: string;
  stepDescription: string;
  step: number | string;
  stepProgress: number;
  onBack: () => void;
}

function StepProgressLayout({
  children,
  onBack,
  title,
  step,
  stepProgress,
  stepTitle,
  stepDescription,
}: Props) {
  return (
    <Flex flexDirection="column" flex={1} pt="16px" pb="24px">
      <Box px="16px">
        <Flex alignItems="center">
          <Button padding="0px" onClick={onBack}>
            <LeftArrowIcon />
          </Button>
          <Text color={colors.white} ml="16px" fontSize="20px" bold>
            {title}
          </Text>
        </Flex>
        <ProgressBar mt="16px" height="3px" percentage={stepProgress} />
      </Box>

      <Flex px="16px" mt="24px" alignItems="flex-start">
        <Flex>
          <Text color={colors.secondary} large bold>
            [
          </Text>
          <Text color={colors.primary} large bold>
            {step}
          </Text>
          <Text color={colors.secondary} large bold>
            ]
          </Text>
        </Flex>
        <Box ml="8px">
          <Text color={colors.gray7} large bold>
            {stepTitle}
          </Text>
          <Text mt="4px" fontSize="12px" color={colors.gray5}>
            {stepDescription}
          </Text>
        </Box>
      </Flex>
      <Flex flex={1} flexDirection="column" mt="24px">
        {children}
      </Flex>
    </Flex>
  );
}

export default StepProgressLayout;
