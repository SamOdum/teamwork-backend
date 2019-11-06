const express = require('express');
const cors = require('cors');

// **Intialize express**
const App = express();

// **Initialize middleware**
App.use(express.json({ extended: false }));
App.use(cors());

// **Routes**
App.get('/', (req, res) => {
  res.status(200).json({ info: 'Server up and running smoothly' });
});
App.post('/api/v1/auth/create-user', require('./src/controllers/employees').create);

// **Initialize port & server**
const PORT = process.env.PORT || 5000;

const server = App.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = { server, PORT };
