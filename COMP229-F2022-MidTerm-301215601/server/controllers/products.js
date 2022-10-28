let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let product = require('../models/products');

module.exports.displayProducts = (req, res, next) => {
    product.find((err, products) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            
            res.render('products/details', {title: "Products", products: products});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('products/add', {title: 'Add Product'})          
}

module.exports.processAddPage = (req, res, next) => {
    let newProduct = product({
        "Productname": req.body.Productname,
        "Description": req.body.Description,
        "Price": req.body.Price
    });

    product.create(newProduct, (err, product) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the product's list
            res.redirect('/index');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Book.findById(id, (err, productToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('products/details', {title: 'Edit Product', product: productToEdit})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedProduct = product({
        "_id": id,
        "Productname": req.body.Productname,
        "Description": req.body.Description,
        "Price": req.body.Price
    });

    product.updateOne({_id: id}, updatedProduct, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the Product's list
            res.redirect('/index');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    product.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the book list
             res.redirect('/index');
        }
    });
}