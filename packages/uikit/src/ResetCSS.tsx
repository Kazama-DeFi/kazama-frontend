import { createGlobalStyle } from 'styled-components';

const ResetCSS = createGlobalStyle`
  /* prettier-ignore */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  /* prettier-ignore */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
    font-size: 15px;
    overflow: hidden;
  }
  ol,
  ul {
    list-style: disc;
    list-style-position: inside;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0px 0px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  [role="button"] {
    cursor: pointer;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  * {
    font-family: Flama;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Number */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
  }

  ::-webkit-scrollbar {
    width: 9px;
    height: 9px;
}

::-webkit-scrollbar-corner,
::-webkit-scrollbar-track {
    background-color: transparent;
}

::-webkit-scrollbar-thumb {
    background-color: rgb(30, 38, 56);
    background-clip: padding-box;
    border: 1px solid transparent;
    border-radius: 0px !important;
}

::-webkit-scrollbar-thumb:hover {
    background-color: rgb(34, 46, 65);
}

::-webkit-scrollbar-thumb:active {
    background-color: rgb(34, 46, 65);
}

/* Buttons */
::-webkit-scrollbar-button:single-button {
    background-color: transparent;

    display: block;
    background-size: 9px;
    background-repeat: no-repeat;
}

/* Up */
::-webkit-scrollbar-button:single-button:vertical:decrement {
    height: 12px;
    width: 16px;
    background-position: center 4px;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(35, 45, 66)'><polygon points='50,00 0,50 100,50'/></svg>");
}

::-webkit-scrollbar-button:single-button:vertical:decrement:hover {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(34, 46, 65)'><polygon points='50,00 0,50 100,50'/></svg>");
}

::-webkit-scrollbar-button:single-button:vertical:decrement:active {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(34, 46, 65)'><polygon points='50,00 0,50 100,50'/></svg>");
}

/* Down */
::-webkit-scrollbar-button:single-button:vertical:increment {
    height: 12px;
    width: 16px;
    background-position: center 2px;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(35, 45, 66)'><polygon points='0,0 100,0 50,50'/></svg>");
}

::-webkit-scrollbar-button:single-button:vertical:increment:hover {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(34, 46, 65)'><polygon points='0,0 100,0 50,50'/></svg>");
}

::-webkit-scrollbar-button:single-button:vertical:increment:active {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(34, 46, 65)'><polygon points='0,0 100,0 50,50'/></svg>");
}

/* Left */
::-webkit-scrollbar-button:single-button:horizontal:decrement {
    height: 12px;
    width: 12px;
    background-position: 3px 3px;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(35, 45, 66)'><polygon points='0,50 50,100 50,0'/></svg>");

}

::-webkit-scrollbar-button:single-button:horizontal:decrement:hover {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(34, 46, 65)'><polygon points='0,50 50,100 50,0'/></svg>");
}

::-webkit-scrollbar-button:single-button:horizontal:decrement:active {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(34, 46, 65)'><polygon points='0,50 50,100 50,0'/></svg>");
}

/* Right */
::-webkit-scrollbar-button:single-button:horizontal:increment {
    height: 12px;
    width: 12px;
    background-position: 3px 3px;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(35, 45, 66)'><polygon points='0,0 0,100 50,50'/></svg>");
}

::-webkit-scrollbar-button:single-button:horizontal:increment:hover {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(34, 46, 65)'><polygon points='0,0 0,100 50,50'/></svg>");
}

::-webkit-scrollbar-button:single-button:horizontal:increment:active {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='rgb(34, 46, 65)'><polygon points='0,0 0,100 50,50'/></svg>");
}


  /* Slider */ 
  input[type=range] {
    -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
    width: 100%; /* Specific width is required for Firefox. */
    background: transparent; /* Otherwise white in Chrome */
  }
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
  }
  input[type=range]:focus {
    outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
  }
  input[type=range]::-ms-track {
    width: 100%;
    cursor: pointer;
    /* Hides the slider so custom styles can be added */
    background: transparent; 
    border-color: transparent;
    color: transparent;
  }  

  .label {
    position: relative; 
    width: 130px;
    text-align: center;
    font-family: sans-serif;
    .icon {
      top: -127px;
      left: 37px;
      position: absolute;
      width: 46px;
      height: 46px;
      margin-left: auto; 
      margin-right: auto; 
    background-size: contain;
    }

`;

export default ResetCSS;
