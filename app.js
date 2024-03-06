// app.js
const express=require('express');
app= express();
const PORT=3001;

const mongoose = require('mongoose');

const mongo='mongodb+srv://mouna:mouna123456@cluster0.wwhdyld.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(mongo);
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
});

// Middleware pour analyser le corps des requêtes en JSON
app.use(express.json());

// Routes pour les catégories
const categoryRoutes = require('./routes/categoryRoutes');
app.use('/categories', categoryRoutes);

// Routes pour les produits
const productRoutes = require('./routes/productRoutes');
app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
