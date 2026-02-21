const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;

module.exports = {
  theme: {
    extend: {
      screens: {
        'xs': '375px',  // iPhone SE, 12 mini
        // XR is 414px width, falls between xs and sm
      },
    },
  },
}