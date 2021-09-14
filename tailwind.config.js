module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.jsx"],
  darkMode: false, // or 'media' or 'class'
  mode: "jit",
  theme: {
    extend: {
      cursor: {
        grab: "grab",
        grabbing: "grabbing",
      },
    },
  },
  variants: {
    extend: {
      cursor: ["hover", "focus", "active"],
    },
  },
  plugins: [],
};
