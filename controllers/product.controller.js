const {response, request} = require('express');

const productsGet = (req = request, res = response) => {
    res.send('GET /products');
}

const productsPost = (req = request, res = response) => {
    res.send('POST /products');
}

module.exports = {
    productsGet,
    productsPost
}