/* eslint-disable no-undef */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#13b38f',
          secondary: '#2091d9',
          accent: '#ff6347',
          neutral: '#3d4451',
          'base-100': '#ffffff',
          error: 'red',
        },
      },
      'light',
      'cupcake',
    ],
  },
  plugins: [require('daisyui')],
};
