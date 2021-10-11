import React from 'react';

import { colors } from '../../../theme/colors';

// Components
import { Box, Flex } from '../Box';
import { Button } from '../Button';
import { LeftArrowIcon } from '../Svg';
import { Text } from '../Text';
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
    <div>
      <Box pt="16px" px="16px">
        <Flex alignItems="center">
          <Button padding="0px" onClick={onBack}>
            <LeftArrowIcon />
          </Button>
          <Text color={colors.white} ml="16px" fontSize="20px" bold>
            {title}
          </Text>
        </Flex>
        <ProgressBar mt="32px" height="3px" percentage={stepProgress} />

        <Flex mt="32px" alignItems="flex-start">
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
        <Box mt="32px">{children}</Box>
      </Box>
    </div>
  );
}

export default StepProgressLayout;
