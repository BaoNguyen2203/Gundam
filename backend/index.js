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
        type: Number,
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
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
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

// Schema creating for Useer mode

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],  // Trạng thái chỉ có thể là 'Active' hoặc 'Inactive'
        default: 'Active',  // Giá trị mặc định là 'Active'
    },
})

// API cập nhật trạng thái người dùng
app.put('/updatestatus/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const newStatus = req.body.status;  // Nhận trạng thái mới từ request

        await Users.findByIdAndUpdate(userId, { status: newStatus });
        res.json({ success: true, message: 'Trạng thái người dùng đã được cập nhật' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


// Creating Endpoint for registering the user 
app.post('/signup',async (req,res)=>{

    let check = await Users.findOne({email:req.body.email});
    if (check) {
        return res.status(400).json({success:false,error:"người dùng hiện tại được tìm thấy có cùng địa chỉ email"})
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token});
})

// Creating endpoint for user login
app.post('/login', async (req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else {
            res.json({success:false,errors:"Sai mật khẩu"});
        }
    }
    else {
        res.json({success:false,errors:"Sai Địa chỉ Email"})
    }
})

// Creating endpoint for newcollection data
app.get('/newcollections', async (req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("Newcollection Fetched");
    res.send(newcollection);
})

// Creating endpoint for sản phẩm bán chạy
app.get('/bestseller', async (req,res)=>{
    let products = await Product.find({category:"gundam"});
    let best_seller = products.slice(0,4);
    console.log("Bestseller fetched");
    res.send(best_seller);
})

// Creating middelware to fetch user
const fetchUser = async (req,res,next) => {
    const token = req.header('auth-token');
    if(!token) {
        return res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else {
        try {
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        } catch(error) {
            res.status(401).send({errors:"Please authenticate using valid token"})
        }
    }
} 

// Creating endpoint for adding products in cartdata
app.post('/addtocart',fetchUser ,async (req,res)=>{
    console.log("added",req.body.itemID);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemID] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")

})


// creating endpoint to remove product from cartdata
app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log("removed",req.body.itemID);
    let userData = await Users.findOne({_id:req.user.id});
    if (userData.cartData[req.body.itemID]>0) 
    userData.cartData[req.body.itemID] +=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
}) 

// API để lấy danh sách người dùng
app.get('/listusers', async (req, res) => {
    try {
        const users = await Users.find({});
        res.json(users);  // Trả về danh sách người dùng
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});


// API để xóa người dùng
app.delete('/deleteuser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        await Users.findByIdAndDelete(userId);  // Xóa người dùng theo _id
        res.json({ success: true, message: 'Người dùng đã được xóa' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


// creating endpoint to get cartdata
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("GetCart")
    let userData = await Users.findOne({_id:req.user.id})
    res.json(userData.cartData)
})

// Schema for creating Orders
const Order = mongoose.model("Order", {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', // Tham chiếu đến model người dùng
        required: true
    },
    items: [
        {
            productId: { type: Number, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});


// Creating API for checkout
app.post('/checkout', fetchUser, async (req, res) => {
    try {
        const { items } = req.body;

        // Tính tổng số tiền thanh toán
        let totalAmount = 0;
        for (const item of items) {
            const product = await Product.findOne({ id: item.productId });
            totalAmount += product.new_price * item.quantity;
        }

        // Tạo đơn hàng mới
        const newOrder = new Order({
            userId: req.user.id,
            items: items,
            totalAmount: totalAmount
        });

        await newOrder.save();

        res.status(200).json({ success: true, message: "Thanh toán thành công!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Có lỗi xảy ra khi thanh toán" });
    }
});


// API để lấy tất cả đơn hàng
app.get('/admin/orders', async (req, res) => {
    try {
        const orders = await Order.find({}).populate('userId', 'name email'); // Lấy thông tin người dùng
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Không thể lấy đơn hàng" });
    }
});



app.listen(port,(error)=>{
    if (!error) {
        console.log("Server Running on Port " +port)
    }
    else
    {
        console.log("Eroror : " +error)
    }
})