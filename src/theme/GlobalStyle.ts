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
        width: 1px;
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
          -webkit-filter: hue-rotate(180deg);
        }
    }

    @-webkit-keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    @keyframes rotate {
        0% {transform:rotate(0deg);}
        100% {transform:rotate(360deg);}
    }

    @media only screen and (min-width: 1028px) {
        body {
            padding-top: 60px;
            padding-bottom: 60px;
            min-height: 100%;
            overflow-x: hidden;
        }

        #root {
            height: calc(100vh - 120px);
        }
    }
`;
