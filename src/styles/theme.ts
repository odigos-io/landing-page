import { DefaultTheme } from 'styled-components';

const colors = {
  black: '#0F0F0F',
  black_light: '#131313',
  black_lighter: '#191919',
  white: '#F9F9F9',
  off_white: '#E2E2E2',
  grey: '#A39BA0',
  grey_darker: '#454545',
  grey_darkest: '#2A2A2A',
  grey_cold: '#242023',
  tonik_blue: '#444AD9',
  green: '#33DCA7',
  cyan: '#50F6E8',
  purple: '#8B55FF',
  purple_darker: '#7434FF',
  purple_darkest: '#3D2670',
  pink: '#FF7CA9',
};

const font_family = {
  primary: 'Inter, sans-serif',
};

const sizes = {
  innerContentMaxWidth: '1080px',
};

export const theme: DefaultTheme = {
  colors,
  font_family,
  sizes,
};
