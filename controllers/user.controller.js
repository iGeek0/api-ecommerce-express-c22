const { response, request } = require('express');
const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 10;

const usersGet = async (req = request, res = response) => {

    const tokenInfo = req.user;
    const profileRaw = await User.findById(tokenInfo.id);
    const profile = {
        name: profileRaw.name,
        last_name: profileRaw.last_name,
        email: profileRaw.email,
        dob: profileRaw.dob
    };

    res.status(200).json({
        message: "Datos cargados correctamente",
        data: profile
    });

}

const usersPost = async (req = request, res = response) => {

    const body = req.body;
    let user = User(body);

    // aqui le realiamos hash al password
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.status(200).json({
        message: "Datos agregados correctamente",
        data: body
    });
}

const usersPut = async (req = request, res = response) => {
    const  id  = req.user.id;
    const userToEdit = req.body;

    if (userToEdit.password != null && userToEdit.password != "") {
        // hacer lo necesario....CORRRECTO
        userToEdit.password = await bcrypt.hash(userToEdit.password, salt);
    } else {
        delete userToEdit.password;
    }

    const updatedUser = await User.findByIdAndUpdate(id, userToEdit, { new: true });


    res.status(200).json({
        message: "Usuario actualizado",
        data: updatedUser,
        id: id,
        userToEdit: userToEdit
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

const loginPost = async (req = request, res = response) => {
    const body = req.body;

    const userInformationDb = await User.findOne({ email: body.email, active: true });

    if (userInformationDb == null) {
        res.status(400).json({
            message: "User not found or not active.",
            data: "null"
        });
        return;
    }

    // Aqui comparamos la password de db contra la del usuario plana
    const comparePassword = await bcrypt.compare(body.password, userInformationDb.password);

    if (comparePassword == false) {
        res.status(400).json({
            message: "Invalid Password",
            data: "null"
        });
        return;
    }

    const payload = {
        id: userInformationDb._id,
        full_name: `${userInformationDb.name} ${userInformationDb.last_name}`,
        email: userInformationDb.email
    };

    res.status(200).json({
        message: "Login success",
        data: jwt.sign(payload, process.env.JWT_SIGNATURE)
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    loginPost
}