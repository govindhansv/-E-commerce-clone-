
const { ObjectId } = require('mongodb');
const db = require('../connection');

const getAllProducts = async function (req, res) {
    let data = await db.get().collection('products').find().toArray()
    res.render('pages/allproducts', { data });
}

const getProductAddform = async function (req, res) {
    res.render('forms/addproduct');
}

const addProduct = async function (req, res) {
    let data = req.body
    await db.get().collection('products').insertOne(data)
    res.render('pages/product', { data })
}

const getProductEditform = async function (req, res) {
    let id = req.params.id
    let data = await db.get().collection('products').findOne({ _id: ObjectId(id) })
    res.render('forms/editproduct', { data });
}

const editProduct = async function (req, res) {
    let newdata = req.body
    let query = { _id: ObjectId(req.body.id) }
    var newvalues = { $set: { name: newdata.name, } };
    await db.get().collection('products').updateOne(query, newvalues)
    res.redirect(`/products/${req.body.id}`)
}

const deleteProduct = async function (req, res) {
    let id = req.params.id
    await db.get().collection('products').deleteOne({ _id: ObjectId(id) })
    res.redirect('back')
}

const getProductById = async function (req, res) {
    let id = req.params.id
    let data = await db.get().collection('products').findOne({ _id: ObjectId(id) })
    res.render('pages/product', { data });
}

exports.getAllProducts = getAllProducts;
exports.getProductAddform = getProductAddform;
exports.addProduct = addProduct;
exports.getProductEditform = getProductEditform;
exports.editProduct = editProduct;
exports.deleteProduct = deleteProduct;
exports.getProductById = getProductById;
