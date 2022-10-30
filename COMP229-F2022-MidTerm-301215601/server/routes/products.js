// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the product model
let product = require("../models/products");

/* GET products List page. READ */
router.get("/", (req, res, next) => {
  
  // find all products in the products collection
  product.find((err, products) => 
  {
    if (err) 
    {
      return console.error(err);
    } 
    else 
    {
      res.render("products/index", {title: "Products", products: products});
    }
  });
});

//  GET the Product Details page in order to add a new Product
router.get("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   res.render("products/add", {
    title: "Add Product" })
});

// POST process the Product Details page and create a new Product - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let newProduct = product({
    "Productname": req.body.Productname,
     "Description": req.body.Description,
     "Price": req.body.Price
  });
  product.create(newProduct, (err, product) => {
  if(err)
  {
    console.log(err);
    res.end(err);
  }
  else{
    //Refresh the product-list(index.ejs)
    res.redirect('/index');
  }
 
});

});

// GET the Product Details page in order to edit an existing Product
router.get("/details/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;
  product.findById(id, (err, productToEdit) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else{
      //show the edit view
      res.render("products/details", {title: 'Edit Product', product: productToEdit})
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/details/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id
  let updatedProduct = product({
  "Productid": id,
  "Productname": req.body.Productname,
  "Description": req.body.Description,
  "Price": req.body.Price

  });

  product.updateOne({Productid: id}, updatedProduct, (err) =>{
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
       //Refresh the product list(index)
    res.redirect("products/details");

    }
  });
});

// GET - process the delete
router.get("/delete/", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;
  product.remove({_id: id}, (err) =>{
    if(err)
    {
      console.log(err);
      res.end(err);
    }

    {
      // refresh the book list
      res.redirect('/index');
 }
   
  });
  
  });

module.exports = router;

