const Category = require("../models/Category");

class CategoryController {

  async categoryRegisterer(req, res, next) {
    const category = new Category({
      name: req.body.name,
    });
    try {
      const newCategory = await category.save();
      res.status(201).send(newCategory);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  async categoryDelete(req, res, next) {
    try {
      const categoryDelete = await Category.deleteOne({
        _id: req.body.idCategory,
      });
      res.status(201).send(categoryDelete);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  async getAllCategories(req, res, next) {
    try {
      const categories = await Category.find();
      res.status(201).send(categories);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  async updateCategory(req, res, next) {
    const category = await Category.findById({ _id: req.params.id });

    if (!category) {
      res.status(405).send({ message: "Category not found" });
    } else {
      category.name = req.body.name;
      try {
        const updatedCat = await category.save();
        res.status(200).send(updatedCat);
      } catch (error) {
        res.status(400).send({ message: error.message });
      }
    }
  };
}

module.exports = new CategoryController()

