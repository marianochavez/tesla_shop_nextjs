import {extendTheme} from "@chakra-ui/react";

export const lightTheme = extendTheme({
  colors: {
    primary: {
      default: "#1E1E1E",
    },
    secondary: {
      default: "#9B2C2C",
    },
  },
  components: {
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: "none",
        },
      },
    },
    Text: {
      variants: {
        h1: {
          fontSize: 30,
          fontWeight: 600,
        },
        h2: {
          fontSize: 20,
          fontWeight: 400,
        },
        subtitle1: {
          //? Subtitle1
          fontSize: 18,
          fontWeight: 600,
        },
      },
    },
    // Button: {
    //   baseStyle: {
    //     textTransform: "none",
    //     boxShadow: "none",
    //     borderRadius: 10,
    //     "&:hover": {
    //       backgroundColor: "rgba(0,0,0,0.05)",
    //       transition: "all 0.3s ease-in-out",
    //     },
    //   },
    // },
    Card: {
      baseStyle: {
        boxShadow: "0px 5px 5px rgba(0,0,0,0.05)",
        borderRadius: "10px",
      },
    },
  },
});
