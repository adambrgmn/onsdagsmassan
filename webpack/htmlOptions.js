export default {
  mobile: true,
  inject: false,
  chunksSortMode: 'dependency',
  googleFonts: 'https://fonts.googleapis.com/css?family=Cabin:400,400i,500,500i|EB+Garamond',
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
  },
};
