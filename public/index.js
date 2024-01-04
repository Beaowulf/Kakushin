new Glide(".glide").mount();

new Glide(".glide", {
  type: "carousel",
  perView: 3,
  breakpoints: {
    1400: {
      perView: 2,
    },
    1200: {
      perView: 1,
    },
  },
}).mount();
