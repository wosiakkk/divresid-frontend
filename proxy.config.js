const proxy = [
    {
      context: '/api/auth',
      target: 'http://localhost:8080',
     // pathRewrite: {'^/api' : '/auth'}
    }
  ];
  module.exports = proxy;