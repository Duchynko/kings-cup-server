module.exports = {
  devServer: {
    host: 'localhost',
    proxy: 'http://localhost:8080',
    public: 'http://localhost:8080',
    watchOptions: {
      poll: true,
    },
  },
};
