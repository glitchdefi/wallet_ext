import { variants } from './types';
import { colors } from 'theme/colors';

export const styleVariants = {
  [variants.PRIMARY]: {
    color: colors.gray1,
    backgroundColor: colors.primary,
  },
  [variants.SECONDARY]: {
    color: colors.primary,
    border: `1px solid ${colors.primary}`,
  },
  [variants.CANCEL]: {
    color: colors.gray9,
    border: `1px solid ${colors.gray4}`,
  },
  [variants.WARNING]: {
    color: colors.gray9,
    backgroundColor: colors.red,
  },
  [variants.DISABLE_PRIMARY]: {
    color: colors.gray4,
    backgroundColor: colors.gray,
    cursor: 'not-allowed !important',
  },
  [variants.DISABLE_SECONDARY]: {
    color: colors.gray4,
    backgroundColor: colors.gray2,
    border: `1px solid ${colors.gray4}`,
    cursor: 'not-allowed !important',
  },
};
