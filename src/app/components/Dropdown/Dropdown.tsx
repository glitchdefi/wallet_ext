import React from 'react';
import RBDropdown from 'react-bootstrap/Dropdown';
import { colors } from 'theme/colors';
import { Flex } from '../Box';
import { CheckIcon } from '../Svg';
import { Text } from '../Text';
import { StyledDropdown } from './StyledDropdown';
import { CustomDropdownProps } from './types';
function CustomDropdown(props: CustomDropdownProps) {
  const {
    items,
    align,
    toggleLabel,
    activeKey,
    customToggle,
    showChecked,
    renderItem,
    ...rest
  } = props;

  return (
    <StyledDropdown>
      <RBDropdown className="glch-dropdown" {...rest}>
        <RBDropdown.Toggle>{toggleLabel || customToggle}</RBDropdown.Toggle>
        <RBDropdown.Menu align={align}>
          {items?.map((o) => (
            <RBDropdown.Item
              active={activeKey == o.key}
              key={o.key}
              eventKey={o.key}
              as="button"
            >
              {renderItem ? (
                renderItem(o)
              ) : (
                <Flex alignItems="center" justifyContent="space-between">
                  <Flex>
                    {React.isValidElement(o.icon) &&
                      React.cloneElement(o.icon, { mr: '12px' })}
                    <Text color={colors.gray7}>{o.label}</Text>
                  </Flex>

                  {activeKey == o.key && showChecked && (
                    <CheckIcon width="14px" color={colors.primary} />
                  )}
                </Flex>
              )}
            </RBDropdown.Item>
          ))}
        </RBDropdown.Menu>
      </RBDropdown>
    </StyledDropdown>
  );
}

CustomDropdown.defaultValues = {
  items: [],
};

export default CustomDropdown;
