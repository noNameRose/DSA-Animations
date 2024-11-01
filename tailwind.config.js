/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    },
    fontSize: {
      lgFont: "0.8rem",
      mdFont: "0.5rem",
      smFont: "0.3rem",
    },
    borderWidth: {
      chainThickNess: "0.27em",
    },
    colors: {
      mainText: "#113C51",
      buttonHover: "#477186",
      nodeTheme: "#113C51",
      nodeText: "white",
      contentThem: "#477186",
      nodeBorderColor: "#27556C",
      inputTextColor: "white",
      buttonTheme: "#477186",
      nullTheme: "#477186",
      tail_head_theme: "#113C51",
      currentTheme: "#352d4d",
      currentBorder: "#6d6192",
      previousTheme: "#303242",
      previousBorder: "#394359"
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
    
  },
  plugins: [],
}