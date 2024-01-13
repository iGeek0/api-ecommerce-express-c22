const express = require('express');
require('dotenv').config();
const app = express();
const puerto = process.env.PORT;
// Sin esta linea cuando se suba a produccion no funcionaria.
const cors = require('cors');
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const { dbConnection } = require('./database/config');
// Middleware's
app.use(cors());
// sin esta linea no podriamos recibir datos en formato JSON en los POST
app.use(express.json());

(async () => {

    // Cargar base de datos
    await dbConnection();
    // Carga de rutas
    app.use(productRoutes);
    app.use(userRoutes);
    app.use(authRoutes);

})();

app.listen(puerto, () => {
    console.log('Servidor escuchando en http://localhost:' + puerto);
});