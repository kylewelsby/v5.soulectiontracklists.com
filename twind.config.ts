import { Options } from "$fresh/plugins/twind.ts";
import * as colors from "twind/colors";
import { apply } from "twind";
import { asset } from "$fresh/runtime.ts";

const SIZES = [10, 12, 32, 48, 84, 160];
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
        16: "4rem",
        18: "4.5rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
        84: "42rem",
        160: "80rem",
      },
      minHeight: {
        12: "3rem",
        16: "4rem",
        18: "4.5rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
        84: "42rem",
        160: "80rem",
      },
      maxWidth: {
        12: "3rem",
        16: "4rem",
        18: "4.5rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
        84: "42rem",
        160: "80rem",
      },
      maxHeight: {
        12: "3rem",
        16: "4rem",
        18: "4.5rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
        84: "42rem",
        160: "80rem",
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
        src: `local('Conthrax SemiBold'), url('${
          asset(
            "/fonts/conthrax-sb.woff",
          )
        }') format('woff')`,
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
    "p a": apply`text(sm) underline`,
    "h1,h2,h3,h4,h5,h6": null,
    h1: apply`font(bold) text(white 3xl)`,
    h2: apply`font(normal) text(white 2xl)`,
    h3: apply`font(bold) text(white xl)`,
    h4: apply`font(bold) text(white lg)`,
    h5: apply`font(bold) text(white base)`,
    h6: apply`font(bold) text(white sm)`,
  },
  plugins: {
    btn: apply`
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
      focus:(outline-none ring-2 ring-offset-2 ring-gray-700)
    `,
    "btn-white": apply`
      bg-white
      transition
      rounded-full
      text(black sm)
      px-6
      py-2
      font-medium
      flex
      flex-row
      justify-center
      items-center
      hover:(bg-gray-200)
    `,
  },
} as unknown as Options;
