import React from "react";
import { ThemeProvider } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      main: string;
      mainLighter: string;
      white: string;
    };
  }
}

const theme = {
  colors: {
    main: "#036ef9",
    mainLighter: "#358bfa",
    white: "snow",
  },
  effects: {
    hoverFullColor: `
		opacity: 0.5;
		transition: opacity 0.2s;
		&:hover {
			opacity: 1;
		}
	`,
  },
};

const Theme: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
