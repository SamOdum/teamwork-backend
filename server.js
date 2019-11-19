const express = require('express');
const cors = require('cors');
// const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

// **Intialize express**
const App = express();

// **Initialize middleware**
App.use(express.json({ extended: false }));
// const isProduction = process.env.NODE_ENV === 'production';
// const origin = {
//   origin: isProduction ? 'https://www.heroku.com' : '*',
// };

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 1 minute
  max: 20, // 5 requests,
});

App.use(limiter);
App.use(cors());
App.use(compression());
// App.use(helmet());

// **Routes**

App.use('/api', require('./routes/routes'));
// App.post('/api/v1/auth/create-user', require('./controllers/employees').create);
// App.post('/api/v1/auth/create-roles', require('./controllers/employees').create);
// App.post('/api/v1/auth/create-roles', require('./controllers/employees').create);

App.get('/', (req, res) => {
  res.status(200).json({ status: 'success', data: { info: 'Server up and running smoothly' } });
});

// **Initialize port & server**
const PORT = process.env.PORT || 5000;

const server = App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});

module.exports = { server, PORT };
