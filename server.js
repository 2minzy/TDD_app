const express = require('express');
const PORT = 5000;
const app = express();
// import routes.js file
const productRoutes = require('./routes');
const config = require('./config/dev');
const mongoose = require('mongoose');

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// don't need to install bodyParser on latest express anymore(included)
app.use(express.json());

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT);
console.log(`Running on port ${PORT}`);

module.exports = app;
