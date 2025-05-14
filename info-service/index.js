const express = require('express');
const cors = require('cors');
const { Eureka } = require('eureka-js-client');
const info = require('./data/info.json');

const app = express();
const PORT = 4001;

app.use(cors());

app.get('/api/info', (req, res) => {
    res.json(info);
});

app.listen(PORT, () => {
    console.log(`Info-Service läuft auf http://localhost:${PORT}`);
});

// Eureka-Client hinzufügen
const eureka = new Eureka({
    instance: {
        app: 'info-service',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        port: {
            '$': PORT,
            '@enabled': true
        },
        vipAddress: 'info-service',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn'
        },
        statusPageUrl: `http://localhost:${PORT}/api/info`,
        homePageUrl: `http://localhost:${PORT}/`
    },
    eureka: {
        host: 'localhost',
        port: 8761,
        servicePath: '/eureka/apps/'
    }
});


eureka.start((err) => {
    if (err) {
        console.error('Fehler beim Start des Eureka-Clients:', err);
    } else {
        console.log('Info-Service wurde bei Eureka registriert');
    }
});
