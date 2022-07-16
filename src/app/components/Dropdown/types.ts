import React from 'react';

export type DropdownItemTypes = {
  icon?: React.ReactNode;
  key: string | number;
  label: string;
};

export interface CustomDropdownProps {
  onSelect?: (eventKey: any) => void;
  items: DropdownItemTypes[];
  toggleLabel?: string;
  customToggle?: React.ReactNode;
  align?: 'start' | 'end';
  activeKey?: string | number;
  showChecked?: boolean;
  renderItem?: (item: DropdownItemTypes) => React.ReactNode;
}
