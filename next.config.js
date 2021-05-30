module.exports = {
  future: {
    webpack5: true,
  },
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/json-format-or-validate': { page: '/json-format-or-validate' },
      '/text-difference': { page: '/text-difference' }
    };
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
