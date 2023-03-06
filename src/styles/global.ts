import { globalCss } from "./index";

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },

  body: {
    "-webkit-font-smoothing": "antialiased",
    color: "$gray100",
    backgroundColor: "$gray900",
  },

  "body,input,textArea,button": {
    fontFamily: "Roboto",
    fontWeight: 400,
  },
});
