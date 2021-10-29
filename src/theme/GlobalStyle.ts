import { createGlobalStyle } from 'styled-components';
import { colors } from './colors';

export const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: IBM Plex Mono, monospace !important;
        background-color: #07111f;
    }

    .modal-open {
        padding-right: 0px !important;
    }

    .modal-backdrop.show {
        opacity: 0.1;
    }

    ::-webkit-scrollbar {
        height: 5px;
        width: 2px;
      }
      
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px ${colors.gray1};
        border-radius: 10px;
    }
      
    ::-webkit-scrollbar-thumb {
        background: ${colors.primary};
        border-radius: 10px;
    }
`;
