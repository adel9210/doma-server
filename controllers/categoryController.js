const Category = require("../models/Category");

exports.addCategory = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ status: false, message: "All fields are required" });
    }

    try {
        const category = new Category({
            name,
        });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.removeCategory = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ status: false, message: "Id is required" });
    }

    try {
        await Category.findByIdAndDelete(id);
        res.status(200).json({ status: true, message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
