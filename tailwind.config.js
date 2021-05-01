module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{ts,tsx}"],
  darkMode: false, // 'media' or 'class'
  theme: { extend: {} },
  variants: {
    extend: {
      backgroundColor: ["focus"],
      borderColor: ["focus"],
      borderWidth: ["focus"],
    },
  },
  plugins: [],
};
