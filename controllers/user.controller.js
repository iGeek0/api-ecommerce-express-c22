const { response, request } = require('express');
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const e = require('express');

const usersGet = async (req = request, res = response) => {

    const users = await User.find();

    res.status(200).json({
        message: "Datos cargados correctamente",
        data: users
    });

}

const usersPost = async (req = request, res = response) => {

    const body = req.body;
    let user = User(body);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    res.status(200).json({
        message: "Datos agregados correctamente",
        data: body
    });
}

const usersPut = async (req = request, res = response) => {
    const { id } = req.query;
    const body = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID de usuario no válido' });
    }

    const existingUser = await User.findById(id);

    if(existingUser.password !== body.password){
        body.password = await bcrypt.hash(body.password, 10);
    }

    if (!existingUser) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

    //   const updatedUser = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true });

      const updatedUser = await User.findByIdAndUpdate(id, body, { new: true});


    res.status(200).json({
        message: "Datos actualizados correctamente",
        data: updatedUser
    });
}

const usersDelete = async (req = request, res = response) => {
    const { id } = req.query;
    await User.findByIdAndDelete(id);
    res.status(200).json({
        message: "Registro eliminado correctamente",
        data: id
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}

// https://www.npmjs.com/package/bcrypt
// https://www.npmjs.com/package/jsonwebtoken