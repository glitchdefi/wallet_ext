import React from 'react';

import { colors } from 'theme/colors';

import { Box, BoxProps } from '../../Box';
import { Text } from '../../Text';

interface LabelProps extends BoxProps {
  children: any;
}

function InputLabel(props: LabelProps) {
  const { children, ...rest } = props;
  return (
    <Box mb="8px" {...rest}>
      <Text color={colors.gray6}>{children}</Text>
    </Box>
  );
}

export default InputLabel;
