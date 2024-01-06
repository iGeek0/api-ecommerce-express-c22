const express = require('express');
require('dotenv').config();
const app = express();
const puerto = process.env.PORT;
// Sin esta linea cuando se suba a produccion no funcionaria.
const cors = require('cors');
const productRoutes = require('./routes/product.routes');
// Middleware's
app.use(cors());
// sin esta linea no podriamos recibir datos en formato JSON en los POST
app.use(express.json());

// app.get('/', (req, res) => {
//     res.send('¡Hola, Express!');
// });

// app.get('/products', (req, res) => {
//     res.send('GET /products');
// });

// app.post('/products', (req, res) => {
//     res.send('POST /products');
// });

// app.put('/products', (req, res) => {
//     res.send('PUT /products');
// });

// app.delete('/products', (req, res) => {
//     res.send('DELETE /products');
// });

(async ()=> {
// ....dejamos async porque queremos usar await en algun momento

// Carga de rutas
app.use(productRoutes);

})();

app.listen(puerto, () => {
    console.log('Servidor escuchando en http://localhost:' + puerto);
});