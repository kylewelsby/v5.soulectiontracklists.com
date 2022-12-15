import { Options } from "$fresh/plugins/twind.ts";
import * as colors from "twind/colors";
import { apply } from "twind";

const SIZES = [10, 12, 32, 48, 84];
const whitelistSizes = [""];
SIZES.forEach((size) => {
  whitelistSizes.push(`w-${size}`);
  whitelistSizes.push(`h-${size}`);
  whitelistSizes.push(`min-w-${size}`);
  whitelistSizes.push(`min-h-${size}`);
  whitelistSizes.push(`max-w-${size}`);
  whitelistSizes.push(`max-h-${size}`);
});

export default {
  selfURL: import.meta.url,
  darkMode: true,
  safeList: whitelistSizes,
  theme: {
    extend: {
      minWidth: {
        12: "3rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
      },
      minHeight: {
        12: "3rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
      },
      maxWidth: {
        12: "3rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
      },
      maxHeight: {
        12: "3rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
      colors: {
        yellow: {
          50: "#FFFCF3",
          100: "#FEFAE7",
          200: "#FEF2C2",
          300: "#FDE99D",
          400: "#FBD954",
          500: "#F9C90A",
          600: "#E0B509",
          700: "#957906",
          800: "#705A05",
          900: "#4B3C03",
        },
        gray: {
          50: "#F7F7F7",
          100: "#EFEFEF",
          200: "#D8D8D8",
          300: "#C0C0C0",
          400: "#919191",
          500: "#626262",
          600: "#585858",
          700: "#3B3B3B",
          800: "#2C2C2C",
          900: "#1D1D1D",
        },
      },
      fontFamily: {
        header: "Conthrax SemiBold",
      },
    },
  },
  preflight: {
    "@font-face": [
      {
        fontFamily: "Conthrax SemiBold",
        fontStyle: "normal",
        fontWeight: "normal",
        src:
          "local('Conthrax SemiBold'), url('/fonts/conthrax-sb.woff') format('woff')",
        fontDisplay: "swap",
      },
    ],
    body: apply`bg-[#151515] text-white`,
    a: {
      color: colors.gray[100],
      textDecoration: "inherit",
      "&:hover": {
        color: colors.white,
      },
    },
    "h1,h2,h3,h4,h5,h6": null,
    h1: apply`font(bold) text(white 3xl)`,
    h2: apply`font(normal) text(white 2xl)`,
    h3: apply`font(bold) text(white xl)`,
    h4: apply`font(bold) text(white lg)`,
    h5: apply`font(bold) text(white md)`,
    h6: apply`font(bold) text(white sm)`,
  },
  plugins: {
    "btn": apply`
      inline-flex
      items-center
      px-5 py-2
      border
      border(transparent)
      text(base white)
      font(medium)
      bg-gray-700
      rounded-full
      shadow-sm
      hover:(bg-gray-800)
      focus:(ouline-none ring-2 ring-offset-2 ring-gray-700)
    `,
  },
} as unknown as Options;
