import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
// import axios from "axios"


//import { popularProducts } from '../data'
import Product from './Product'

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap; //pour que les products retourne à la ligne
    justify-content: space-between;
`

const Products = ({cat, filters, sort}) => {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);


    // for category
    useEffect(()=>{
        const getProducts = async ()=>{
            try {
                const res = await axios.get(
                    cat ? 
                    `/products?category=${cat}`
                    : "/products"
                    );
                setProducts(res.data);
            } catch (err) {
                
            }
        }
        getProducts();
    },[cat]);


    // For filter
    useEffect(()=>{
        if(cat){
            setFilteredProducts(
                products.filter((item)=> 
                    Object.entries(filters).every(([key, value])=>
                        item[key].includes(value)
                    )
                )
            );
        }
    },[products, cat, filters]);

    // for sorting data
    useEffect(()=>{
        if(sort==="newest"){
            setFilteredProducts((prev)=>
                [...prev].sort((a,b)=> a.createdAt - b.createdAt)
            );
        } else if(sort==="asc"){
            setFilteredProducts((prev)=>
                [...prev].sort((a,b)=> a.price - b.price)
            );
        } else
        {
            setFilteredProducts((prev)=>
                [...prev].sort((a,b)=> b.price - a.price)
            );
        }
    },[sort])


    return (
        <Container>
            {cat 
                ? filteredProducts.map((item)=><Product item={item} key={item._id} />)
                : products.slice(0, 8).map((item)=><Product item={item} key={item._id} />)
            }
        </Container>
    )
}

export default Products
