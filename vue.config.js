module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },

  devServer: {
    host: "localhost"
  },

  // publicPath: process.env.NODE_ENV === "production" ? "/LAB12/" : "/"
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "My Vue App";
        return args;
      })
  },

  transpileDependencies: [
    'vuetify'
  ]
};
