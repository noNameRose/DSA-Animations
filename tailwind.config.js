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

      //This size for mainpage
     

      // This size for Linked List
      lgFont: "0.8rem",
      mdFont: "0.5rem",
      smFont: "0.3rem",

      // This size for control and menu bar
      lgMenuFont: "1.2rem",
      mdMenuFont: "1rem",
      smMenuFont: "0.8rem",



    },
    borderWidth: {
      chainThickNess: "0.27em",
    },
    colors: {
      mainText: "#2a2438",
      navBarColor: "#2a2438",
      mainPageColor: "#dbd8e3",



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
      previousBorder: "#394359",


      //Stack
      stackMainTheme: "08073B",
      stackMenuText: "#774936",
      stackInputText: "#edc4b3",
      stackMenuButton: "#9d6b53",

      stackNodeTheme: "#9d6b53",
      stackNodeText: "#774936",
      stackNodeBorder: "#c38e70",
      stackBorderColor: "#cd9777"
    },
    gap: {
      gapHeadNode: "3em",
      gapTailNode: "3em",
    },
    screens: {

      'xsm': '0px',
       // => @media (min-width: 640px) { ... }

      'hsm': '320px',
      // => @media (min-width: 640px) { ... }
      
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