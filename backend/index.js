const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error } = require("console");
const { type } = require("os");

app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
mongoose.connect("mongodb+srv://2200004685:1234567890hay@cluster0.1mguv.mongodb.net/e-commerce")
.then(() => console.log("Connected to DB")) ;

// API Creation S

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

// Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

// Creating Upload Endpoint for images

app.use('/images',express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    console.log(req.file); // Kiểm tra xem tệp đã được upload hay chưa
    if (!req.file) {
        return res.status(400).json({ success: 0, message: "No file uploaded." });
    }
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Schema for Creating Products

const Product = mongoose.model("Product",{
    id:{
        type: String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:String,
        required:true,
    },
    old_price:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    avilable:{
        type:Boolean,
        default:true,
    },
})

app.post('/addproduct',async (req,res)=>{
    let products = await Product.find({});
    let id
    if(products.length > 0)
        {
            let last_product_array= products.slice(-1)
            let last_product = last_product_array[0]
            id = last_product.id + 1
        }
        else {
            id = 1
        }
    const product = new Product( {
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    try {
        await product.save();
        console.log("Saved");
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: "Database error"
        });
    }
});

// Creating API For deleting Product 

app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id})
    console.log("Removed")
    res.json({
        success:true,
        name:req.body.name
    })
}) 

// Creating API for getting all products
app.get('/allproducts',async(req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products)
})

app.listen(port,(error)=>{
    if (!error) {
        console.log("Server Running on Port " +port)
    }
    else
    {
        console.log("Eroror : " +error)
    }
})