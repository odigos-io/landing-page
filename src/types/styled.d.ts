import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      black: string;
      black_light: string;
      black_lighter: string;
      white: string;
      off_white: string;
      grey: string;
      grey_darker: string;
      grey_darkest: string;
      grey_cold: string;
      tonik_blue: string;
      green: string;
      cyan: string;
      purple: string;
      purple_darker: string;
      purple_darkest: string;
      pink: string;
    };
    font_family: {
      primary: string;
    };
    sizes: {
      innerContentMaxWidth: string;
    };
  }
}
