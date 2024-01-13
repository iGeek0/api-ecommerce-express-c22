const {response, request} = require('express');
const User = require('../models/User.model');

const usersGet = async (req = request, res = response) => {

    const users = await User.find();

    res.status(200).json({
        message:"Datos cargados correctamente",
        data: users
    });

}

const usersPost = async (req = request, res = response) => {

    const body = req.body;
    let user = User(body);
    await user.save();

    res.status(200).json({
        message:"Datos agregados correctamente",
        data: body
    });
}

const usersPut = async (req = request, res = response) => {
    const {id} = req.query;
    const userToEdit = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, userToEdit, {new: true});


    res.status(200).json({
        message:"Usuario actualizado",
        data: updatedUser
    });
}

const usersDelete = async (req = request, res = response) => {
    const {id} = req.query;
    await User.findByIdAndDelete(id);
    res.status(200).json({
        message:"Registro eliminado correctamente",
        data: id
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}