// routes/categoryRoutes.js

const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// Route pour créer une nouvelle catégorie
router.post('/', async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route pour récupérer toutes les catégories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route pour récupérer une catégorie par son ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }
    res.send(category);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route pour mettre à jour une catégorie existante
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }
    res.send(category);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route pour supprimer une catégorie
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }
    res.send({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
