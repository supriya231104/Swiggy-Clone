/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        gilroy: ["Gilroy", "Arial", '"Helvetica Neue"', "sans-serif"],
      },
      screens: {
        
        
      
        
        first:{
          max:'1250px'
        },
        betFirstAndSecond:{
          max:'1032px'
        },

        second:{
          max:'950px'
        },
        betSecondandThird:{
          max:'800px'
        },
        third:{
          max:'850px'
        },
        fourth:{
          max:'700px'
        },
        betsmmd: {
          max: "500px",
        },

        small:{
          max:'768px'
        },
        exsmall:{
          max:'570px'
        },
        vsmall:{
          max:'450px'
        },
        upto700:{
          max:'700px'
        }


      },
    },
  },
  plugins: [],
};
