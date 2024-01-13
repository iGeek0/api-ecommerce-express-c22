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

const productsPut = async (req = request, res = response) => {
    const {id} = req.query;
    const productToEdit = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, productToEdit, {new: true});


    res.status(200).json({
        message:"Producto actualizado",
        data: updatedProduct
    });
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