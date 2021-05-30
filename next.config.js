module.exports = {
  future: {
    webpack5: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /ace-builds.*\/worker-.*$/,
      loader: 'file-loader',
      options: {
        esModule: false,
        name: 'deepak[name].[hash:8].[ext]',
      },
    })
    return config
  },
};
