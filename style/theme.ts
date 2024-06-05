import { DefaultTheme } from 'styled-components';

// Define your color palette
const colors = {
  primary: '#151515',
  white: '#F9F9F9',
  secondary: '#231f24',
};

const text = {
  primary: '#F9F9F9',
  secondary: '#151515',
};

const font_family = {
  primary: 'Inter Tight, sans-serif',
  secondary: 'Kode Mono, sans-serif',
};

// Define the theme interface
interface ThemeInterface extends DefaultTheme {
  colors: typeof colors;
  text: typeof text;
  font_family: typeof font_family;
}

// Create your theme object
const theme: ThemeInterface = {
  colors,
  text,
  font_family,
};

// Export the theme
export default theme;