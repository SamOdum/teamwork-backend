const express = require('express');

// **Intialize express**
const App = express();

// **Initialize middleware**
App.use(express.json({ extended: false }));

App.use('/', (req, res) => {
  res.json({ info: 'Server up and running smoothly' });
});

// **Initialize port & server**
const PORT = process.env.PORT || 5000;

App.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
