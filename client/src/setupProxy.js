const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app){
    if(process.env.NODE_ENV === 'production'){
        app.use('/api', createProxyMiddleware({
            target: 'https://julogpage.herokuapp.com/',
            changeOrigin: true,
        }));
    }else{
        app.use('/api', createProxyMiddleware({
            target: `http://localhost:5000/`,
            changeOrigin: true,
        }));
    }
}