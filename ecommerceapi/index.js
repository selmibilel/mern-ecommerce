const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

// dotenv is obligation instanced here because it used from routes
app.use(cors());
dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname,"/images")))

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRouter = require("./routes/stripe");




mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=> console.log("DBconnection successfull !"))
.catch((err)=>console.log(err));

// UPLOAD IMAGES
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,"images");
    },
    filename:(req, file, cb)=>{
        // cb(null, file.originalname); SI ça ne marche pas donc cette methode est parfaite
        cb(null, req.body.name);
    }
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

const upload = multer({storage:storage, fileFilter:imageFileFilter});
app.post("/api/upload", upload.single("file"), (req, res) =>{
    res.status(200).json("File has been uploaded");
});



// ROUTES
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout",stripeRouter);

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend server is runing!");
});