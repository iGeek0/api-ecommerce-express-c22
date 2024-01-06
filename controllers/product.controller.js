const {response, request} = require('express');
const Product = require('../models/Product.model');

const productsGet = async (req = request, res = response) => {

    const products = await Product.find();

    res.status(200).json({
        message:"Datos cargados correctamente",
        data: products
    });

}

const productsPost = async (req = request, res = response) => {

    const body = req.body;
    let product = Product(body);
    await product.save();

    res.status(200).json({
        message:"Datos agregados correctamente",
        data: body
    });
}

const productsPut = (req = request, res = response) => {
    // Tarea
    //  Realizar el put(actualizacion de registro)
    // Crear modelo, rutas y controller de usuarios.
    res.send('PUT /products');
}

const productsDelete = async (req = request, res = response) => {
    const {id} = req.query;
    await Product.findByIdAndDelete(id);
    res.status(200).json({
        message:"Registro eliminado correctamente",
        data: id
    });
}

module.exports = {
    productsGet,
    productsPost,
    productsPut,
    productsDelete
}