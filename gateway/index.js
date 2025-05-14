const express = require('express');
const { Eureka } = require('eureka-js-client');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 8080;

// Eureka-Client Setup
const eureka = new Eureka({
    instance: {
        app: 'api-gateway',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        port: { '$': PORT, '@enabled': true },
        vipAddress: 'api-gateway',
        dataCenterInfo: { '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo', name: 'MyOwn' }
    },
    eureka: {
        host: 'localhost',
        port: 8761,
        servicePath: '/eureka/apps/'
    }
});

eureka.start(err => {
    if (err) console.error(err);
    else console.log('Eureka-Client gestartet');
});

// Helper zum Suchen von Instanzen
function getServiceUrl(serviceName) {
    const instances = eureka.getInstancesByAppId(serviceName.toUpperCase());
    if (instances.length > 0) {
        const inst = instances[0];
        return `http://${inst.ipAddr}:${inst.port.$}`;
    }
    throw new Error(`Service ${serviceName} nicht gefunden`);
}

// Dynamische Routen
app.use('/info', (req, res, next) => {
    try {
        const target = getServiceUrl('info-service');
        createProxyMiddleware({
            target,
            changeOrigin: true,
            pathRewrite: { '^/info': '' }
        })(req, res, next);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.use('/shop', (req, res, next) => {
    try {
        const target = getServiceUrl('shop-service');
        createProxyMiddleware({
            target,
            changeOrigin: true,
            pathRewrite: { '^/shop': '' }
        })(req, res, next);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.use('/', (req, res, next) => {
    try {
        const target = getServiceUrl('recommend-service');
        createProxyMiddleware({
            target,
            changeOrigin: true,
            pathRewrite: { '^/': '' }
        })(req, res, next);
    } catch (err) {
        res.status(500).send(err.message);
    }
});



app.listen(PORT, () => {
    console.log(`Gateway läuft auf http://localhost:${PORT}`);
});
