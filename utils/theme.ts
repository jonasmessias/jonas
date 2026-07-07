export const theme = {
  colors: {
    primary: "#000000",
    secondary: "#ffffff",
    gray: {
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717"
    }
  },
  
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem"
  },
  
  typography: {
    fontFamily: {
      primary: "var(--font-ibm-plex-sans), sans-serif"
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem"
    }
  },
  
  borders: {
    radius: "0px", // Cantos quadrados
    width: "2px"
  },
  
  shadows: {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
  }
}

export const commonClasses = {
  button: {
    primary: "px-6 py-3 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-colors",
    secondary: "px-6 py-3 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-colors",
    outline: "px-6 py-3 bg-transparent text-black border-2 border-black hover:bg-black hover:text-white transition-colors"
  },
  
  card: {
    primary: "bg-white border-2 border-black p-6",
    secondary: "bg-black text-white border-2 border-white p-6"
  },
  
  text: {
    heading: "text-2xl font-bold text-black",
    body: "text-gray-600",
    caption: "text-sm text-gray-500"
  }
} 