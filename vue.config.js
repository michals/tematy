module.exports = {
  publicPath: './',
  pwa: {
    name: 'Tematy Liturgii Słowa',
    themeColor: '#ac2024',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // Configuration for workbox plugin, which is responsible for service worker generation
    workboxOptions: {
      // skipWaiting: true, // Automatically update the service worker in the background
      // clientsClaim: true, // Take control of uncontrolled clients as soon as the service worker is active
      // Exclude all JSON files except subjects-hlgd ones
      exclude: [
        // exclude old jsons
        /subjects-dd[hp]-.*\.json(\.gz)?/,
        // exclude all but hlgd (hhd, limit, gsmart, dictionary)
        /subjects-[^h]...\.json.*/,
        /subjects-.[^l]..\.json.*/,
        /subjects-..[^g].\.json.*/,
        /subjects-...[^d]\.json.*/,
        /x\/.*\.dat/,
      ],
    },
    iconPaths: {
      favicon32: 'img/icons/logo-32x32.png',
      favicon16: 'img/icons/logo-16x16.png',
      appleTouchIcon: 'img/icons/logo-152x152.png',
      maskIcon: 'img/icons/logo.svg',
      msTileImage: 'img/icons/logo-144x144.png',
    },
    manifestOptions: {
      icons: [
        {
          src: 'img/icons/logo-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'img/icons/logo-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  },

};
