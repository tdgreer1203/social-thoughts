const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/social-thoughts', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(require('./routes/api'));
app.listen(PORT, () => console.log('Connected'));