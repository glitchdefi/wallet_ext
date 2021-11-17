import { createGlobalStyle } from 'styled-components';
import { colors } from './colors';

export const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: IBM Plex Mono, monospace !important;
        background-color: #07111f;
        min-height: 600px;
    }

    a {
        &:hover {
            color: ${colors.primary} !important;
            opacity: 0.8;
        }
    }

    .modal-open {
        padding-right: 0px !important;
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

    @-webkit-keyframes hue {
        from {
          -webkit-filter: hue-rotate(0deg);
        }
        to {
          -webkit-filter: hue-rotate(-360deg);
        }
    }
`;
