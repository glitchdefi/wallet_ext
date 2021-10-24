import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { SpaceProps } from 'styled-system';

import { colors } from 'theme/colors';

import { Flex, Box } from 'app/components/Box';
import { CheckIcon } from 'app/components/Svg';
import { Text } from 'app/components/Text';

interface Props {
  value?: string;
  onPassed?: (isPassed: boolean) => void;
}

type RuleTypes = {
  lowercase: boolean;
  uppercase: boolean;
  number: boolean;
  special: boolean;
  least8Char: boolean;
};

export const PasswordRulesTooltip: React.FC<Props> = ({ value, onPassed }) => {
  const [rules, setRules] = useState<RuleTypes>({
    lowercase: false,
    uppercase: false,
    number: false,
    special: false,
    least8Char: false,
  });

  useEffect(() => {
    setRules({
      ...rules,
      lowercase: /[a-z]/g.test(value),
      uppercase: /[A-Z]/g.test(value),
      number: /[0-9]/g.test(value),
      special: /[!@#$%^&*(),.?":{}|<>]/g.test(value),
      least8Char: value?.length >= 7,
    });
  }, [value]);

  useEffect(() => {
    const { lowercase, uppercase, number, special, least8Char } = rules;
    const isPassed = lowercase && uppercase && number && special && least8Char;
    onPassed(isPassed);
  }, [rules]);

  return (
    <Container>
      <ReactTooltip
        id="password-input"
        className="glch-tooltip"
        overridePosition={({ top }) => {
          return {
            left: 16,
            top,
          };
        }}
        place="bottom"
        backgroundColor={colors.gray2}
      >
        <Box>
          <Rule checked={rules.lowercase} label="One lowercase character" />
          <Rule checked={rules.number} mt="8px" label="One number" />
          <Rule
            checked={rules.least8Char}
            mt="8px"
            label="At least 8 characters"
          />
          <Rule
            checked={rules.uppercase}
            mt="8px"
            label="One uppercase character"
          />
          <Rule
            checked={rules.special}
            mt="8px"
            label="One special character"
          />
        </Box>
      </ReactTooltip>
    </Container>
  );
};

interface RuleProps extends SpaceProps {
  label: string;
  checked: boolean;
}

const Rule = ({ checked, label, ...rest }: RuleProps) => {
  return (
    <Flex alignItems="center" {...rest}>
      <CheckIcon color={checked ? colors.primary : colors.gray4} width="13px" />
      <Text
        fontSize="12px"
        ml="8px"
        color={checked ? colors.gray9 : colors.gray5}
      >
        {label}
      </Text>
    </Flex>
  );
};

const Container = styled.div`
  .glch-tooltip {
    padding: 12px;
    opacity: 1 !important;
  }
`;
