import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./newProduct.css";
import {GoDiffAdded} from "react-icons/go"
import axios from "axios";
import { addProduct } from "../../redux/apiCalls";


export default function NewProduct() {
  const admin = useSelector(state=>state.user.currentUser);
  const TOKEN = admin.accessToken;
  const dispatch = useDispatch();


  const [inputs, setInputs] = useState({inStock:true})
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState([])
  const [size, setSize] = useState([])
  const [colors, setColors] = useState([])

  const handleChange = (e) =>{
    setInputs(prev=>{
      return {...prev, [e.target.name]:e.target.value}
    })
  }

  const handleCat = (e) =>{
    setCat(e.target.value.split(","))
  }

  const handleSize = (e) =>{
    setSize(e.target.value.split(","))
  }

  const handleColor = (e)=>{
    setColors(e.target.value.split(","))
  }

  const handleClick = async (e) =>{
    e.preventDefault();
    const newProduct = {
      ...inputs,
      categories:cat,
      size:size,
      color:colors,
    }
    if(file){
      const data = new FormData();
      const filename = Date.now()+file.name;
      data.append("name", filename);
      data.append("file",file);
      newProduct.img= filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    addProduct(newProduct, TOKEN, dispatch)
    .then((res)=>{
      window.location.replace("/product/"+ res.data._id);
    })
    .catch((err)=>{
      console.log(err);
    })
    // console.log(newProduct);
  }
  

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">

        <div className="addProductItem">
          <label htmlFor="file">
            <GoDiffAdded />
          </label>
          {file?(
            <img 
            src={URL.createObjectURL(file)} 
            alt="" 
            className="productImg"
            />
          ):(null)}
          <input style={{display:"none"}} type="file" id="file" onChange={(e)=>setFile(e.target.files[0])} />
        </div>
        
        <div className="addProductItem">
          <label>Title</label>
          <input name="title" type="text" placeholder="Apple Airpods" onChange={handleChange} />
        </div>

        <div className="addProductItem">
          <label>Description</label>
          <input name="desc" type="text" placeholder="description..." onChange={handleChange} />
        </div>

        <div className="addProductItem">
          <label>Price</label>
          <input name="price" type="number" placeholder="100" onChange={handleChange} />
        </div>

        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans,skirts" onChange={handleCat} />
        </div>

        <div className="addProductItem">
          <label>Size</label>
          <input type="text" placeholder="XS,S,L" onChange={handleSize} />
        </div>

        <div className="addProductItem">
          <label>Colors</label>
          <input type="text" placeholder="white,yellow,black" onChange={handleColor} />
        </div>

        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        
        <button className="addProductButton" onClick={handleClick}>Create</button>
      
      </form>
    </div>
  );
}
