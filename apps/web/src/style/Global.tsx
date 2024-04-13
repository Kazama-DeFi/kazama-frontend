import { createGlobalStyle } from 'styled-components';

import { KazamaTheme } from '@kazamaswap/uikit';

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends KazamaTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: Flama;
    font-size: 15px;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};
    -ms-overflow-style: none;
    scrollbar-width: none;
    overflow-y: scroll;
    img {
      height: 100%;
      max-width: 100%;
      gif {
        width: 97%;
        border-radius: 10px;
      }
    }
    icon {
      max-width: 100%;
    }
  }

body::-webkit-scrollbar {
    display: none;
}

  .swiper {
    width: 51.5rem;
    height: 100%;
  }

  .senshi-swiper {
    width: 100%;
    height: 100%;
  }
  
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  
  .top-side-bar img {
    display: block;
    width: 100%;
    height: calc(100% - 2px);
    border-radius: 10px;
    object-fit: cover;
    background: radial-gradient(50% 100% at 50% 0,rgba(200,53,78,.12) 0,rgba(200,53,78,0) 100%);
  }

  .swiper-pagination {
    margin-top: 10px;
    margin-bottom: 15px;
  }

  .img-slider-box .swiper-pagination-bullet {
    background: #201c29;
    width: 14px;
    height: 14px;
  }

  .show-gif {
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .gif-preview {
    height: 150px;
    object-fit: contain;
  }

  .top-side-bar .swiper-pagination-bullet {
    border: 2px solid #1d1c22;
    height: 1rem;
    width: 1rem;
    background: #201c29;
    margin: 0 0.5rem;
    cursor: pointer;
    border-radius: 8px;
    position: relative;
  }

  .tv-lightweight-charts {
    height: 100% !important;
  }

  .top-side-bar .swiper-pagination-bullet::after {
    background: #201c29;
    border-radius: 6px;
    content: "";
    height: 0.5rem;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 0.5rem;
  }

  .top-side-bar .swiper-pagination-bullet-active {
    background: #EE1A78;
  }

  .top-side-bar .swiper-button-prev::after, .top-side-bar .swiper-button-next::after {
    font-size: 1.1875em;
    color: #FFFFFF;
  }

  .top-side-bar {
    border-radius: 4px;   
  }

  .swiper-pagination-bullet {
    opacity: 1;
}

  .swiper-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet, .swiper-pagination-horizontal.swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 8px;
}

  .top-side-bar .swiper-button-prev, .top-side-bar .swiper-button-next {
    background: #2e293a;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 6px;
    transition: background-color .15s ease-out;
    padding-bottom: 2px;
    padding-left: 4px;
    top: 50%;
  }

  .top-side-bar {
    max-width: 920px;
    border-radius: 10px;
    height: 385px;
  }

  .slider-graphic {
    animation-fill-mode: forwards;
    background-size: contain!important;
    position: absolute;
    z-index: 6;
  }
  .slider-graphic-1 {
    animation: delay 0.79s;
    background: url('/images/Senshi-NFT.png') no-repeat 50%;
    height: 23.5625rem;
    left: 0rem;
    top: 0;
    transform: scale(1);
    width: 15.125rem;
    margin-left: 15px;
    transition: transform 0.25s;
    -webkit-filter: drop-shadow(50px 50px 50px 50px rgba(46, 43, 58, 0.938));
  }
  .slider-graphic-1:hover {
    transform: scale(1.04);
    transition: transform 0.25s;
}

.slider-graphic-farm-1 {
  animation: delay 0.79s;
  background: url('/images/Senshi-Farmer-NFT.png') no-repeat 50%;
  height: 23.5625rem;
  left: 0rem;
  top: 0;
  transform: scale(1);
  width: 15.125rem;
  margin-left: 15px;
  transition: transform 0.25s;
  -webkit-filter: drop-shadow(50px 50px 50px 50px rgba(46, 43, 58, 0.938));
}
.slider-graphic-farm-1:hover {
  transform: scale(1.04);
  transition: transform 0.25s;
}

  .slider-graphic-2 {
    animation: delay 6s;
    background: url('/images/KazamaTokenV2.png') no-repeat 50%;
    height: 8.5625rem;
    left: 0rem;
    bottom: 0;
    transform: scale(1);
    width: 30.125rem;
    -webkit-filter: drop-shadow(12px 12px 7px rgba(46, 43, 58, 0.788));
  }
  .slider-graphic-3 {
    animation: delay 0.99s;
    background: url('/images/Senshi-NFT-Right.png') no-repeat 50%;
    height: 23.5625rem;
    right: 0rem;
    top: 0;
    transform: scale(1);
    width: 15.125rem;
    margin-right: 15px;
    transition: transform 0.25s;
    -webkit-filter: drop-shadow(50px 50px 50px 50px rgba(46, 43, 58, 0.938));
  }
  .slider-graphic-3:hover {
    transform: scale(1.04);
    transition: transform 0.25s;
}

.slider-graphic-pool {
  animation: delay 0.99s;
  background: url('/images/SenshiHeader-Right.png') no-repeat 50%;
  height: 16.5rem;
  margin-top: 37px;
  right: 0rem;
  top: 0;
  transform: scale(1);
  width: 15.125rem;
  margin-right: 65px;
  transition: transform 0.25s;
  filter: drop-shadow(1px 0px 6px #4444dd);
  -webkit-filter: drop-shadow(50px 50px 50px 50px rgba(46, 43, 58, 0.938));
}

  .slider-graphic-4 {
    animation: fadein-data-v-ccdbb6a2 .3s ease-in-out 3.5s;
    background: url('/images/home/KazamaToken/KazamaRight.png') no-repeat 50%;
    height: 10.5625rem;
    right: 0rem;
    bottom: 0;
    transform: scale(1);
    width: 10.125rem;
    -webkit-filter: drop-shadow(12px 12px 7px rgba(46, 43, 58, 0.788));
  }


  @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes scale {
    0% {
      transform: scale(0)
    }
    100% {
      transform: scale(1)
    }
  }
  @keyframes delay {
    0% {
      transform: scale(0)
    }
    50% {
      transform: scale(0)
    }
    100% {
      transform: scale(1)
    }
  }

  .timer-info {
    display: grid;
    -moz-column-gap: .5rem;
    column-gap: 0.5rem;
    grid-auto-flow: column;
    font-family: Inter;
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 2.5rem;
  }

  .timer-topbar-info {
    display: grid;
    -moz-column-gap: .5rem;
    column-gap: 0.1rem;
    grid-auto-flow: column;

    align-items: center;
    padding-right: 5px;
  }

  .timer-info-col {
    display: grid;
    grid-auto-flow: column;
    -moz-column-gap: .25rem;
    column-gap: 0.25rem;
    position: relative;
  }

  .timer-info-col .value {
    border-radius: 5px;
    width: 2.5rem;
    color: #fff;
    text-align: center;
    position: relative;
    background: #EE1A78;
    background-size: cover;
    background-position: 50%;
  }

  .timer-info-col .label {
    position: absolute;
    width: 100%;
    bottom: -2.25rem;
    font-size: .85rem;
    font-weight: 500;
    color: #f0f0f0;
    opacity: .85;
    text-align: center;
  }




  .timer-info {
    display: grid;
    -moz-column-gap: .5rem;
    column-gap: 0.5rem;
    grid-auto-flow: column;
    font-family: Inter;
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 2.5rem;
  }

  .timer-topbar-info {
    display: grid;
    -moz-column-gap: .5rem;
    column-gap: 0.1rem;
    grid-auto-flow: column;

    align-items: center;
    padding-right: 5px;
  }

  .timer-distribution-col {
    display: grid;
    grid-auto-flow: column;
    -moz-column-gap: .25rem;
    column-gap: 0.25rem;
    position: relative;
  }

  .timer-distribution-col .value {
    border-radius: 5px;
    width: 2.5rem;
    color: #fff;
    text-align: center;
    position: relative;

    background-size: cover;
    background-position: 50%;
  }

  .timer-distribution-col .label {
    position: absolute;
    width: 100%;
    bottom: -2.25rem;
    font-size: .85rem;
    font-weight: 500;
    color: rgba(255, 255, 255, .7);
    opacity: .85;
    text-align: center;
  }




  .raffle-unit {
    // background: #242329;
  }

  .raffle-hero-unit {
    text-align: center;
    // background-color: #241f2e;
    position: relative;
  }

  .timer-shadow {
    background: linear-gradient(89.92deg, rgb(238, 26, 121) 50%, rgb(247, 147, 24) 50%);
    opacity: 0.35;
    filter: blur(50px);
    border-radius: 190.145px;
    width: 300px;
    height: 317px;
    position: absolute;
    top: -90px;
    left: 0;
    margin-left: 50px;
  }

  .timer-shadow-right {
    background: linear-gradient(89.92deg, rgb(238, 26, 121) 50%, rgb(247, 147, 24) 50%);
    opacity: 0.35;
    filter: blur(50px);
    border-radius: 190.145px;
    width: 300px;
    height: 317px;
    position: absolute;
    top: -132px;
    right: 0;
    margin-right: 50px;
  }


  .raffle-hero-unit .inner {
    // background: rgba(36,35,41,.92);

    width: 100%;
    height: 100%;

    overflow: hidden;
    display: inline-grid;
    justify-content: center;
  }

  .raffle-hero-unit .inner .big-text {
    font-family: Rubik;
    font-weight: 900;
    text-transform: uppercase;
    color: #fe617c;
    font-size: 5rem;
    line-height: 5.25rem;
  }
  .raffle-hero-unit .inner .medium-text {
    font-family: Rubik;
    font-weight: 900;
    text-transform: uppercase;
    color: #fff;
    font-size: 2.4rem;
    line-height: 2.75rem;
  }
  .raffle-hero-unit .inner .small-text {
    max-width: 35rem;
    color: #f0f0f0;
    font-size: 14px;
    font-weight: 400;
    margin-top: 1rem;
  }
  .raffle-hero-unit .left-graphics {
    position: absolute;
    left: 0;
    width: 24rem;
    height: 24rem;
    margin-left: 0px;
    bottom: -160px;
  }
  .raffle-hero-unit .right-graphics {
    position: absolute;
    right: 0;
    width: 24rem;
    height: 24rem;
    margin-left: 0px;
    bottom: -160px;
  }
  .raffle-hero-unit .left-graphics .tree {
    background: url('/images/Kazama_Lottery.png') no-repeat;
    background-size: contain;
    width: 100%;
    height: 100%;
  }
  .raffle-hero-unit .left-graphics .snow {
    background: url('/images/snow.svg') no-repeat;
    background-size: contain;
    background-position: 0 100%;
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: -2rem;
  }
  .raffle-hero-unit .left-graphics .tree:before {
    content: "";
    position: absolute;
    left: 0;
    background: url('/images/tree_blur.svg') no-repeat;
    background-size: contain;
    background-position: 0 100%;
    width: 100%;
    height: 100%;
  }
  .raffle-hero-unit .right-graphics .gifts {
    background: url('/images/Kazama_Lottery.png') no-repeat;
    background-size: contain;
    width: 100%;
    height: 100%;
  }
  .raffle-hero-unit .right-graphics .gifts:before {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    background: url('/images/gifts_blur.svg') no-repeat;
    background-size: contain;
    background-position: 100% 100%;
    width: 100%;
    height: 100%;
  }
  .raffle-hero-unit .right-graphics .snow {
    background: url('/images/snow.svg') no-repeat;
    background-size: contain;
    background-position: 100% 100%;
    transform: scaleX(-1);
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: -2rem;
  }
  .raffle-countdown {
    width: 100%;
    display: grid;
    justify-content: center;
    text-align: center;
    padding-bottom: 1.25rem;
    margin: 1rem 0;
  }

  .topbar-timer-main {
    width: 100%;
    display: grid;
    justify-content: center;
    text-align: center;
    margin: 1rem 0;
  }

  @media (max-width: 1215px) {
    .raffle-hero-unit .inner .small-text {
      max-width: 30rem;
    }
    .raffle-hero-unit .left-graphics {
      width: 12.5rem;
      height: 8.25rem;
    }
    .raffle-hero-unit .right-graphics {
      width: 12.5rem;
      height: 8.25rem;
    }
    .raffle-hero-unit .left-graphics .snow {
      bottom: -1.25rem;
    }
    .raffle-hero-unit .right-graphics .snow {
      bottom: -1.25rem;
    }
  }
  @media (max-width: 1023px) {
    .raffle-hero-unit .inner .small-text {
      max-width: 25rem;
      font-size: .9rem;
    }
    
    .raffle-hero-unit .left-graphics {
      width: 10em;
      height: 6.66rem;
    }
    .raffle-hero-unit .right-graphics {
      width: 10em;
      height: 6.66rem;
    }
  }
  @media (max-width: 767px) {
    .raffle-hero-unit .inner .big-text {
      font-size: 2rem;
      line-height: 2rem;
      margin-bottom: 1rem;
    }
    .raffle-hero-unit .inner .medium-text {
      font-size: 2rem;
      line-height: 2rem;
      margin-bottom: 1rem;
    }
    .raffle-hero-unit .inner .small-text {
      margin: 1rem auto 0;
      max-width: 80%;
      text-shadow: none;
      font-size: .9rem;
    }
    .raffle-hero-unit .left-graphics {
      width: 7.5rem;
      height: 4.95rem;
    }
    .raffle-hero-unit .right-graphics {
      width: 7.5rem;
      height: 4.95rem;
    }
    .raffle-hero-unit .left-graphics .snow {
      bottom: -1rem;
    }
    .raffle-hero-unit .right-graphics .snow {
      bottom: -1rem;
    }
  }

  @media (max-width: 479px) {
    .raffle-hero-unit .inner .small-text {
      margin: 1rem auto 1.25rem;
      max-width: 70%;
    }
  }

  .userIconContainer {
    display: flex;
    align-items: center;
    justify-content: center
  }

  .styledUserIcon {
    flex-basis: 40%
  }

  ::placeholder {
    color: #fff;
    font-size: 15px;
  }

  input:focus
{
    outline-offset: 0px;
    outline: none;
}

.EmojiPickerReact {
  overflow: hidden;
}

.chat-messages {
  -webkit-mask-image: linear-gradient(to top, rgb(32, 28, 41) 87%, transparent 100%);
  mask-image: linear-gradient(to top, rgb(32, 28, 41) 87%, transparent 100%);
  padding-bottom: 15px;
  overflow-y: auto;
  }

.rankIcon {
  position: absolute;
  right: 0;
}

.page-id-6 .edgtf-page-header .edgtf-menu-area {
  height: 120px !important;
  box-shadow: 0px 5px 10px 0px rgb(0 0 0 / 35%);
}

.edgtf-header-divided .edgtf-page-header .edgtf-menu-area {
  opacity: 0;
}
.edgtf-menu-area-border-disable .edgtf-page-header .edgtf-menu-area {
  border: none;
}
.edgtf-page-header .edgtf-menu-area {
  position: relative;
  height: 90px;
  background-color: #17161a;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.edgtf-header-divided .edgtf-page-header .edgtf-vertical-align-containers .edgtf-position-left {
  text-align: right;
}

.edgtf-vertical-align-containers .edgtf-position-left {
  position: relative;
  float: left;
  z-index: 2;
  height: 100%;
}

.GifPickerReact {
  --gpr-bg-color: #21252b !important;
  --gpr-picker-border-color: #0D131C !important;
  margin-bottom: 10px;
  padding-bottom: 15px;
  height: 320px;
  --gpr-search-input-placeholder-color: #fff !important;
  --gpr-category-border-color-hover: none !important;
}

.GifPickerReact .gpr-search-container .gpr-icn-search {

}


.GifPickerReact .gpr-search-container input.gpr-search {
  background-color: #111923 !important;
  border: 1px solid #111923 !important;
  border-radius: var(--gpr-search-input-border-radius);
  color: #fff !important;
  font-size: 15px;
  height: var(--gpr-search-input-height);
  outline: none;
  padding: var(--gpr-search-input-padding);
  transition: all .2s ease-in-out;
  width: 100%;
}

.GifPickerReact .gpr-header {
  border-bottom: 0px solid var(--gpr-picker-border-color) !important;
  min-height: 0;
  padding: 10px !important;
}

.GifPickerReact .gpr-category-list {
  grid-gap: var(--gpr-category-list-padding);
  display: grid;
  flex: 1;
  grid-auto-rows: min-content;
  grid-template-columns: 1fr 1fr;
  overflow-y: scroll;
  padding: 10px !important;
}

.GifPickerReact .gpr-category img {
  background-color: transparent !important;
  border-radius: 10px !important;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  width: 100%;
}

.GifPickerReact .gpr-category-overlay {
  align-items: center;
  background-color: rgba(0,0,0,var(--gpr-category-background-opacity));
  border-radius: 10px !important;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  transition: background-color .15s ease-in-out;
  width: 100%;
}

.EmojiPickerReact {
  background-color: #21252b !important;
  overflow: hidden;
}

aside.EmojiPickerReact.epr-main {
  border-color: #0D131C !important;
  border-radius: 10px !important;
  border-style: solid;
  border-width: 1px;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 15px !important;
  font-family: 'Flama', sans-serif !important;
}

.EmojiPickerReact li.epr-emoji-category>.epr-emoji-category-label {
  align-items: center;
  -webkit-backdrop-filter: blur(3px);
  backdrop-filter: blur(3px);
  background-color: #1a1e23 !important;
  color: #fff !important;
  font-weight: 500 !important;
  display: flex;
  font-family: 'Flama', sans-serif !important;
  font-size: 15px !important;
  height: var(--epr-category-label-height);
  padding: var(--epr-category-label-padding);
  position: -webkit-sticky;
  position: sticky;
  text-transform: capitalize;
  top: 0;
  width: 100%;
  z-index: var(--epr-category-label-z-index);
}

.EmojiPickerReact .epr-preview {
  display: none !important;
}

.EmojiPickerReact .epr-search-container input.epr-search {
  background-color: #111923 !important;
  border: 1px solid #111923 !important;
  border-radius: var(--epr-search-input-border-radius);
  color: var(--epr-search-input-text-color);
  height: var(--epr-search-input-height);
  outline: none;
  padding: var(--epr-search-input-padding);
  transition: all .2s ease-in-out;
  width: 100%;
  font-family: '', sans-serif !important;
  color: #fff !important;
  font-size: 15px !important;
}

.EmojiPickerReact {
  --epr-highlight-color: #007aeb;
  --epr-hover-bg-color: #f1f8ff;
  --epr-focus-bg-color: #1c2532 !important;
  --epr-text-color: #fff !important;
  --epr-search-input-bg-color: #f6f6f6;
  --epr-picker-border-color: #e7e7e7;
  --epr-bg-color: #fff;
  --epr-category-icon-active-color: #fff !important;
  --epr-skin-tone-picker-menu-color: #ffffff95;
  --epr-horizontal-padding: 10px;
  --epr-picker-border-radius: 8px;
  --epr-search-border-color: var(--epr-highlight-color);
  --epr-header-padding: 15px var(--epr-horizontal-padding);
  --epr-active-skin-tone-indicator-border-color: #fff !important;
  --epr-active-skin-hover-color: #fff !important;
  --epr-search-input-bg-color-active: var(--epr-search-input-bg-color);
  --epr-search-input-padding: 0 30px;
  --epr-search-input-border-radius: 8px;
  --epr-search-input-height: 40px;
  --epr-search-input-text-color: var(--epr-text-color);
  --epr-search-input-placeholder-color: var(--epr-text-color);
  --epr-search-bar-inner-padding: var(--epr-horizontal-padding);
  --epr-category-navigation-button-size: 30px;
  --epr-emoji-variation-picker-height: 45px;
  --epr-emoji-variation-picker-bg-color: var(--epr-bg-color);
  --epr-preview-height: 70px;
  --epr-preview-text-size: 14px;
  --epr-preview-text-padding: 0 var(--epr-horizontal-padding);
  --epr-preview-border-color: var(--epr-picker-border-color);
  --epr-preview-text-color: var(--epr-text-color);
  --epr-category-padding: 0 var(--epr-horizontal-padding);
  --epr-category-label-bg-color: #ffffffe6;
  --epr-category-label-text-color: var(--epr-text-color);
  --epr-category-label-padding: 0 var(--epr-horizontal-padding);
  --epr-category-label-height: 40px;
  --epr-emoji-size: 30px;
  --epr-emoji-padding: 5px;
  --epr-emoji-fullsize: calc(var(--epr-emoji-size) + var(--epr-emoji-padding)*2);
  --epr-emoji-hover-color: #273345 !important;
  --epr-emoji-variation-indicator-color: var(--epr-picker-border-color);
  --epr-emoji-variation-indicator-color-hover: var(--epr-text-color);
  --epr-header-overlay-z-index: 3;
  --epr-emoji-variations-indictator-z-index: 1;
  --epr-category-label-z-index: 2;
  --epr-skin-variation-picker-z-index: 5;
  --epr-preview-z-index: 6;
}

epr-btn epr-cat-btn {
  color: red !important;
  :hover {
    cursor: pointer;
    fill: rgba(255, 255, 255, 0.884) !important;
  }
}

.recharts-text .recharts-cartesian-axis-tick-value {
  color: red !important;
}

.dropshadow {
  position: relative;
  transform-style: preserve-3d;
  border-radius: 16px;
}
.dropshadow sh {
  position: absolute;
  inset: calc(-100px - 0px - 0px);
  border: calc(100px + 0px + 0px) solid #0000;
  border-radius: calc(100px + 0px + 0px + 16px);
  -webkit-mask: linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
          mask-composite: exclude;
  transform: translateZ(-1px);
  pointer-events: none;
}
.dropshadow sh::before {
  content: "";
  position: absolute;
  inset: 0px;
  border-radius: 16px;
  background: conic-gradient(from 90deg at 40% -25%, #ffd700, #f79d03, #ee6907, #e6390a, #de0d0d, #d61039, #cf1261, #c71585, #cf1261, #d61039, #de0d0d, #ee6907, #f79d03, #ffd700, #ffd700, #ffd700);
  filter: blur(100px);
  transform: translate(0px,0px);
}

.loader{
  display: block;
  position: relative;
  height: 12px;
  width: 80%;
  border: 1px solid rgba(0,0,0,0.35);
  border-radius: 4px;
  overflow: hidden;
}
.loader::after {
  content: '';
  width: 40%;
  height: 100%;
  background: rgba(0,0,0,0.35);
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  animation: animloader 2s linear infinite;
}

@keyframes animloader {
  0% {
    left: 0;
    transform: translateX(-100%);
  }
  100% {
    left: 100%;
    transform: translateX(0%);
  }
}






















.kazama-crash-container {
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 0.8fr 1.2fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 10px 10px;
  grid-auto-flow: row;
  grid-template-areas:
    "crashbox crashbox current-bets"
    "crashbox crashbox current-bets"
    "user-dash user-dash current-bets";
}

.crashbox { 
  grid-area: crashbox;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  display: flex;
  height: 100%;
  max-height: 500px;
}

.current-bets { 
  grid-area: current-bets;
  background: #21252b;
  border: 1px solid rgba(0, 0, 0, 0.35);
  border-radius: 8px;
  overflow-y: scroll;
  height: 85vh;
}

.user-dash {
  grid-area: user-dash;
  background: #1a1e23;
  border: 1px solid rgba(0, 0, 0, 0.35);
  padding: 25px;
}

.kazama-crash-container * {
  position: relative;
}

.kazama-crash-container *:after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
}

.Kazama__toast-container--top-right {
  top: 70px;
  right: 8px;
}

.Kazama__close-button {
  color: #fff;
  background: transparent;
  outline: none;
  border: none;
  padding: 0;
  cursor: pointer;
  opacity: 0.7;
  transition: 0.3s ease;
  align-self: flex-start;
  z-index: 1;
  margin-top: 8px;
  margin-right: 5px;
}






















.App {
  text-align: center;
  color: #fff
}

.pringles {
  color: blue;
  display: flex;
  justify-content: space-evenly;
}

.flexbox-container {
  display: flex;
  background-color: red;
  justify-content: space-evenly;
  align-items: flex-start;
}

.flexbox-item {
  width: 200px;
  margin: 10px;
  border: 3px solid black;
  background-color: lightgrey;
}

.flexbox-item-1 {
  min-height: 100px;
}

.flexbox-item-2 {
  min-height: 200px;
}

.flexbox-item-3 {
  min-height: 300px;
}

img {
  max-width: 100%;
}

.container {
  padding-left: 30px;
  padding-right: 20px;
  margin: 0 auto;
}

.navbar {
  background: #303436;
  color: #fff;
  height: 60px
}

.navbar .logo {
  font-size: x-large;
  font-weight: bold;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.navbar a {
  color: #fff;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
}

.navbar ul {
  display: flex;
}

ul {
  list-style-type: none;
}

.navbar ul li {
  margin-left: 20px;
}

.navbar a:hover {
  color: lightblue
}

.navbar span:hover {
  color: red
}

.header {
  background-color: #3474e6;
  color: #fff;
  min-height: 400px;
}

.header h1 {
  font-size: 3rem;
  font-weight: bold;
  line-height: 1.2;
}

.header img {
  max-width: 400px;
}

.header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item {
  background: steelblue;
  color: #fff;
  font-size: 20px;
  padding: 20px;
  border: darkred 1px solid;
}

.item:nth-of-type(1) {
  background-color: black;
}

.grid-elements {
  background-color: #393e40;
  color: #fff;
  border: #303436 1px solid;
  padding: 20px;
  min-width: 0px;
  min-height: 0px;
}

.grid-container-main {
  display: grid;
  margin: 5px;
  gap: 10px;
  grid-template-columns: 1fr 1fr 0.5fr;
  grid-template-rows: 1fr 1fr;
  height: 93vh;
  margin-top: 0;
  margin-left: 10px;
}

.grid-elements:nth-of-type(3) {
  grid-column: 3/4;
  grid-row: 1/3;
  padding-right: 0px;
}

@font-face {
  font-family: 'SKR';
  src: URL('SKR.ttf') format('truetype');
}

.grid-elements:nth-of-type(4) {
  overflow-y: scroll;
  padding: 10px;
  font-weight: 100;
}

.grid-elements:nth-of-type(5) {
  padding: 10px;
}

@media (max-width:500px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}

.auth_error_message {
  color: red
}

.multipler_crash_value_message {
  color: rgb(255, 90, 95);
}

.minions {
  background-color: darkgreen
}

.heythere {
  display: flex;
  width: 600px;
  height: 300px;
}

/* BUTTONS STUFF */
.css-button-3d--grey {
  min-width: 130px;
  width: 70%;
  height: 40px;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  border: none;
  background: #e58929;
  box-shadow: 0 5px #ad6215;
  margin-top: 10px;
}

.css-button-3d--grey:hover {
  background: #c36f18;
  top: 1px;
}

.css-button-3d--grey:active {
  box-shadow: 0 0 #ad6215;
  top: 5px;
}

.bet_for_next_round_active {
  opacity: 0.5;
}

.input_box {
  display: flex;
  flex-grow: 2;
  -webkit-box-align: center;
  align-items: center;
  min-height: 40px;
  width: 70%;
  padding: 6px 5px 6px 15px;
  border-radius: 10px 0px 0px 10px;
  border: 1px solid transparent;
  background: #21252b;
  transition: background 0.1s ease 0s;
  position: relative;
  height: auto;
  color: #fff;
  font-size: 15px;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.input_box_for_chat {
  margin-top: 10px;
  width: 99%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: .375rem .75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: #fff;
  background-color: transparent;
  background-clip: padding-box;
  border: 1px solid rgb(221, 139, 32);
  border-radius: .25rem;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  margin-bottom: 5px;
}

.chat-box-wrapper {
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 92%;
  width: 100%;
}

.chat-box-rectangle {}

.individual-chat-message {
  margin-bottom: 3px;
}

.message_top {
  position: relative;
  float: left
}

.message_top_time {
  float: right;
  margin-right: 10px;
  color: #939a9e;
}

.message_bottom {
  display: flex;
  justify-content: flex-start;
  color: darkgrey;
  text-align: left;
}

.container-crash-history {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0px;
}

h2 {
  font-size: 26px;
  margin: 20px 0;
  text-align: center;
}

h2 small {
  font-size: 0.5em;
}

@keyframes fadeInOpacity {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

.history-table li {
  width: fit-content;
  border-radius: 3px;
  padding: 2px 30px;
  display: flex;
  justify-content: space-between;
}

.history-crash-label li {
  width: fit-content;
  border-radius: 3px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
}

.history-crash-label .table-row-blue {
  min-width: 75px;
  max-width: 75px;
  background: rgba(46, 204, 112, 0.171);
  color: rgb(46, 204, 113);
  font-size: 16px;
}

.history-crash-label .table-row-red {
  min-width: 75px;
  max-width: 75px;
  background: rgba(236, 72, 153, 0.2);
  color: rgb(236 72 153);
  font-size: 15px;
}


.history-table .history-table-header {
  background-color: #393e40;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  border-radius: 8px 8px 0px 0px;
}

.history-table .table-row-blue {
  background-color: #fff;
  border: 2px solid #4396e8;
  color: #4396e8;
  font-size: 16px;
  font-weight: 600;
  background-color: #393e40;
}

.history-table .table-row-red {
  background-color: #fff;
  border: 2px solid #ce4975;
  color: #ce4975;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Open Sans', sans-serif;
  background-color: #393e40;
}

.row-history-wrapper {
  margin-bottom: 5px;
}

.history-table .col-1 {
  flex-basis: 40%;
}

.history-table .col-2 {
  flex-basis: 30%;
}

.history-table .col-3 {
  flex-basis: 10%;
}

.history-table .col-4 {
  flex-basis: 20%;
}

.active-bet-table li {
  padding: 2px 30px;
  display: flex;
  justify-content: space-between;
}

.active-bet-table .active-bet-table-header {
  background-color: #393e40;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  min-height: 32px;
  vertical-align: middle;
  line-height: 32px;  
  border-radius: 8px 8px 0px 0px;
}

.active-bet-table .table-row {
  color: #a6a7aa;
  min-height: 32px;
  vertical-align: middle;
  line-height: 32px;
}

.active-bet-table .table-row-green {
  background-color: #fff;

  border: 2px solid #43e8da;
  color: #43e8da;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Open Sans', sans-serif;
  background-color: #393e40;
}

.active-bet-table .table-row-red {
  background-color: #fff;
  border: 2px solid #ce4975;
  color: #ce4975;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Open Sans', sans-serif;
  background-color: #393e40;
}

.row-bet-wrapper {
  margin-bottom: 0px;
}

.active-bet-table .col-1 {
  flex-basis: 25%;
}

.active-bet-table .col-2 {
  flex-basis: 25%;
  text-align: center;
}

.active-bet-table .col-3 {
  flex-basis: 25%;
  text-align: center;
}

.active-bet-table .col-4 {
  flex-basis: 25%;
  text-align: right;
}

.basically-the-graph {
  z-index: 10;
}

.effects-box {
  margin: 0 auto;
  position: relative;
  height: 90%;
  width: 90%;

  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  border-radius: 20px;
  z-index: 1;
  margin-top: 2.5%;
}

.effects-box h2 {
  color: #fff;
  font-size: 10em;
  z-index: 10;
}

.effects-box::before {
  content: '';
  position: relative;
  width: 20%;
  height: 250%;
  background: linear-gradient(#00ccff, #d400d4);
  animation: animate 2s linear infinite;
}

.effects-box::after {
  content: '';
  position: absolute;
  inset: 4px;
  background-color: #393e40;
  border-radius: 16px;
}

@keyframes animate {
  0% {
    transform: rotate(0deg)
  }

  100% {
    transform: rotate(360deg)
  }
}

.register_errors {
  color: rgb(236, 86, 86);
  font-weight: bold;
}

.makeshift-input-group {
  text-align: center;
  width: 100%;
  padding: 15px;
  font-size: 0.875rem;
  font-weight: 400;
  color: #fff;
  background-color: transparent;
  background-clip: padding-box;

  font-weight: 600;
}

.quickLoginOrRegister {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  color: #e58938;
}

.quickLoginOrRegister:hover {
  color: red
}

@media (max-width: 700px) {
  .grid-container-main {
    width: 600px;
    height: 600px;
    display: flex;
    flex-direction: column;
  }

  .grid-elements {
    width: 100%;
    min-height: 350px;
    gap: 10px
  }

  .grid-elements:nth-of-type(5) {
    overflow-y: hidden;
  }

  .grid-elements:nth-of-type(3) {
    height: 200px;
    padding-bottom: 60px;
    order: 6;
  }

  .grid-elements:nth-of-type(1) {
    height: 60%;
  }
}

@media (max-width: 1200px) {
  .grid-elements:nth-of-type(3) {
    order: 6;
  }

  .message_top_time {
    display: none;
  }

  .Toastify__progress-bar--kazama {
    background-image: linear-gradient(to right,#743ad5,#ee1a78);
}


@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes blink {
  50% { opacity: 0; }
}

.animated-text {
  opacity: 0; /* Initially hidden */
  animation-fill-mode: forwards; /* Keeps the state of the last animation frame when finished */
}

.animate {
  animation: fadeIn 1s, blink 1s 2, fadeOut 1s 3s; /* Fade in, blink twice, then fade out */
}













.glowing-progress-bar {
  position: relative;
}

.glowing-progress-bar::before {
  content: '';
  position: absolute;
  top: -5px; /* Adjust to your liking */
  right: 0;
  bottom: -5px; /* Adjust to your liking */
  left: -5px; /* Adjust to your liking */
  background: rgba(255, 255, 255, 0.5); /* Glow color */
  border-radius: 2px; /* Same as your progress bar */
  z-index: -1;
  animation: glowEffect 2s infinite alternate; /* Animation for the glow effect */
}

@keyframes glowEffect {
  from {
    box-shadow: 0 0 5px 2px #ffffff, 0 0 10px 2px #ffffff, 0 0 15px 2px #ffffff, 0 0 20px 2px #ffffff; /* Adjust the shadow size and color to your liking */
  }
  to {
    box-shadow: 0 0 15px 5px #ffffff, 0 0 20px 5px #ffffff, 0 0 25px 5px #ffffff, 0 0 30px 5px #ffffff; /* Adjust the shadow size and color to your liking */
  }
}





`



export default GlobalStyle

