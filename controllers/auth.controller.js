const { response, request } = require('express');
const Usuario = require('../models/User.model');
const authModel = require('../models/auth.model');
const bcrypt = require('bcrypt');


const login = async (req = request, res = response) => {
    const { email, password } = req.body;
    const userInformationDB = await Usuario.findOne({ email: email, active: true });
    if (userInformationDB === null) {
        return res.status(401).json({
            msg: 'User not found or inactive',
        });
    }
    const validPassword = await await bcrypt.compare(password, userInformationDB.password);

    if (validPassword) {
        const token = authModel.generarToken(
            {
                id: userInformationDB._id,
                full_name: `${userInformationDB.name} ${userInformationDB.last_name}`,
                email: userInformationDB.email,
                active: userInformationDB.active
            }
        );
        res.status(200).json({
            msg: 'Login success',
            data: {
                token,
                user: {
                    id: userInformationDB._id,
                    full_name: `${userInformationDB.name} ${userInformationDB.last_name}`,
                    email: userInformationDB.email,
                }
            }
        });
    } else {
        res.status(401).json({
            msg: 'Invalid password',
        });
    }

};

const verify = async (req = request, res = response) => {
    const token = req.headers.authorization.split(' ')[1];
    if (authModel.validarToken(token)) {
        const { data } = authModel.decodeToken(token);
        const userInformationDB = await Usuario.findOne({ email: data.email, active: true });
        if (userInformationDB === null) {
            return res.status(401).json({
                msg: 'User not found or inactive',
            });
        }
        res.status(200).json({
            msg: 'Token valid',
            data: null
        });
    } else {
        res.status(401).json({
            msg: 'Invalid token',
        });
    }
};


module.exports = {
    login,
    verify
};