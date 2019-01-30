module.exports = ({file, options, env}) => ({
  plugins: {
    'autoprefixer': {
      'browsers': '>0.25%, not dead, not ie <= 11',
    },
  }
});
