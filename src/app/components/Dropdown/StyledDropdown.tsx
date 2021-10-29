import styled from 'styled-components';
import { colors } from 'theme/colors';

export const StyledDropdown = styled.div`
  .glch-dropdown {
    .dropdown-toggle {
      background-color: transparent !important;
      border: none !important;
      padding: 0px;
      &::after {
        display: none;
      }
    }
    .dropdown-menu {
      background-color: ${colors.gray2};
      border-radius: 0px;
      border: none;
      padding: 0px;
      box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.12);

      .dropdown-item {
        color: ${colors.gray7};
        padding: 8px 12px;
        font-size: 14px;
        background-color: ${colors.gray2};
        &:hover {
          background-color: ${colors.gray8};
        }
      }
      .dropdown-item.active,
      .dropdown-item:active {
        background-color: transparent;
        color: ${colors.primary};
      }
    }

    .btn-check:focus + .btn-primary,
    .btn-primary:focus {
      box-shadow: none;
    }
  }
`;
