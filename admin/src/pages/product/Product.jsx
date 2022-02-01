import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
// import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { publicFile } from "../../shared/baseUrl";
import React, {useState} from "react"
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/apiCalls";

export default function Product() {
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [pStats, setPStats] = useState([]);
    

    const admin = useSelector(state=>state.user.currentUser);
    const TOKEN = admin.accessToken;


    const product = useSelector((state)=>state.product.products.find(product=>product._id === productId));

    const [dataIsSet, setDataIsSet]= useState(false);
    const [productName, setProductName] = useState(null);
    const [productDesc, setProductDesc] = useState(null);
    const [productPrice, setProductPrice] = useState(null);
    const [productInStock, setProductInStock] = useState(null);
    const dispatch = useDispatch();

    useEffect(()=>{
        setProductName(product.title);
        setProductDesc(product.desc);
        setProductPrice(product.price);
        setProductInStock(product.inStock);
        setDataIsSet(true);
    },[product])

    const MONTHS = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];

      useEffect(()=>{
        const getStats = async ()=>{
          try {
            const res = await axios.get("/orders/income?pid="+productId,{
              headers:{token:`Bearer ${TOKEN}`}
            });
            // debut trier 
            const list = res.data.sort((a,b)=>{
                return b._id - a._id
            });
            //fin trier
            list.map((item)=>
              setPStats((prev)=>[
                ...prev,
                { name: MONTHS[item._id - 1], Sales: item.total },
              ])
            );
          } catch (err) {
            console.log(err);
          }
        };
        getStats();
      },[TOKEN]);
    
      const handleUpdate = (e)=>{
          e.preventDefault();
            const newProduct = {
                _id:product._id,
                title:dataIsSet===true?productName:product.title,
                price: dataIsSet===true?productPrice:product.price,
                inStock: dataIsSet===true?productInStock:product.inStock,
                img: "p1.png",
                desc: dataIsSet===true?productDesc:product.desc,
                color:["white","black"],
                size:["XS", "S"],
                categories:["tshirt","man","women"],
                createdAt: "2021-12-28T00:59:27.992Z"
            }
            // console.log(newProduct);
          updateProduct(productId, newProduct, TOKEN, dispatch);
      }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={pStats} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product?publicFile+product.img:null} alt="" className="productInfoImg" />
                  <span className="productName"> {product?product.title:null} </span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id: </span>
                      <span className="productInfoValue"> {product?product._id:null}  </span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">5123</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue"> {product.inStock?"Yes":"NO"}  </span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input 
                  type="text" 
                  placeholder={product?product.title:""} 
                  onChange={(e)=>setProductName(e.target.value)}/>
                  
                  <label>Product Description</label>
                  <input 
                  type="text" 
                  placeholder={product?product.desc:""} 
                  onChange={(e)=>setProductDesc(e.target.value)}/>
                  
                  <label>Product Price</label>
                  <input 
                  type="text" 
                  placeholder={product?product.price:""} 
                  onChange={(e)=>setProductPrice(e.target.value)} />
                  
                  <label>In Stock</label>
                  <select name="inStock" id="idStock">
                      <option value="true"> Yes </option>
                      <option value="false"> No </option>
                  </select>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img 
                      src={publicFile+product.img} 
                      className="productUpdateImg" 
                      alt=""
                      />
                      <label htmlFor="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                    <button
                    type="submit"
                    className="productButton"
                    onClick={handleUpdate}
                    >
                      Update
                    </button>
              </div>
          </form>
      </div>
    </div>
  );
}
