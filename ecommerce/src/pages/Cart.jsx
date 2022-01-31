import React, { useEffect } from 'react'
import styled from 'styled-components'

import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'

import { Add, Remove, Cancel } from '@material-ui/icons'

// import Product1 from "../images/p3.png"
// import Product2 from "../images/p4.png"
import { mobile } from '../responsive'


import { deleteProduct } from '../redux/cartRedux'
import { useSelector, useDispatch } from 'react-redux'

import { publicFile } from '../shared/baseUrl'


import LOGO from "../images/p10.jpg";
import StripeCheckout from "react-stripe-checkout"
import { useState } from 'react'

import {REACT_APP_STRIPE} from "../shared/baseUrl";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Container = styled.div``

const Wrapper = styled.div`
    padding: 20px;
    ${mobile({padding:"10px"})};
`

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`

const TopButton = styled.button`
    font-weight: 600;
    padding: 10px;
    cursor: pointer;
    border: ${props=>props.type === "fielled" && "none"};
    background-color: ${props=>props.type === "fielled" ? "black" : "none"};
    color: ${props=>props.type === "fielled" && "white"};
`

const TopTexts = styled.div`
    ${mobile({display:"none"})};
`

const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection:"column"})};
`

const Info = styled.div`
    flex: 3;
`

const Product = styled.div`
    padding: 20px 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection:"column", padding:"0px"})};
`

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`

const Image = styled.img`
    width: 200px;
    height: 170px;
    object-fit: cover;
`

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const ProductName = styled.span``

const ProductId = styled.span``

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=>props.color};
`

const ProductSize = styled.span``

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({margin:"5px 15px"})};
`

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({marginBottom:"20px"})};
`
const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`

const SummaryTitle = styled.h1`
    font-weight: 200;
`

const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props=>props.type === "total" && "500"};
    font-size: ${props=>props.type === "total" && "24px"};
`

const SummaryItemText = styled.span``

const SummaryItemPrice = styled.span``

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;
`

const Cart = () => {
    const cart = useSelector(state=>state.cart);
    const user = useSelector(state=>state.user.currentUser);
    const TOKEN = user.accessToken;

    const dispatch = useDispatch();
    const [stripeToken, setStripeToken] = useState(null);
    const navigate = useNavigate();

    const onToken = (token) =>{
        setStripeToken(token);
    }

    useEffect(()=>{
        const makeRequest = async () =>{
            try {
                const res = await axios.post("/checkout/payment",{
                    tokenId:stripeToken.id,
                    amount:cart.total * 100,
                    headers:{token:`Bearer ${TOKEN}`},
                });
                //console.log(res.data);
                navigate("/success",{
                    state:{
                        data:res.data,
                        products:cart,
                    }
                });
            } catch (err) {
                console.log(err);
            }
        }
        if(stripeToken && cart.total > 0){
            makeRequest();
        } 
    },[stripeToken, cart, navigate]);

    const handleDelete = (prod, index)=>{
        dispatch(deleteProduct({...prod, index }))
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
                {/* cart component  */}

                <Wrapper>
                    <Title>YOUR BAG</Title>

                    {/* top */}
                    <Top>
                        <TopButton>CONTINUE SHOPPING</TopButton>
                        
                        <TopTexts>
                            <TopText>Shopping Bag (2)</TopText>
                            <TopText>Your Wishlist (0)</TopText>
                        </TopTexts>

                        <TopButton type='fielled'>CHECKOUT NOW</TopButton>
                    </Top>

                    {/* bottom */}
                    {stripeToken?(
                        <div style={{
                            marginTop:"20px",
                            color:"teal",
                            textAlign:"center",
                            fontSize:"24px",
                        }}>Processing, Please wait...</div>
                    ):(
                        <Bottom>
                        {/* Liste products map */}
                        <Info>
                            {cart.products?.map((p,i)=>(
                                <Product key={i}>
                                    <ProductDetail>
                                        <Image src={publicFile + p.img} />
                                        <Details>
                                            <ProductName> <b>Product:</b> {p.title}</ProductName>
                                            <ProductId> <b>ID:</b> {p._id}</ProductId>
                                            <ProductColor color={p.color} />
                                            <ProductSize> <b>Size:</b> {p.size} </ProductSize>
                                        </Details>
                                    </ProductDetail>
                                    <PriceDetail>
                                        <ProductAmountContainer>
                                            <Add />
                                            <ProductAmount>{p.quantity}</ProductAmount>
                                            <Remove />
                                        </ProductAmountContainer>
                                        <ProductPrice>$ {p.price * p.quantity}</ProductPrice>
                                    </PriceDetail>
                                    <Cancel style={{marginRight:"20px", cursor:"pointer"}} onClick={()=>handleDelete(p,i)} />
                                </Product>
                            ))}
                            <Hr />
                        </Info>

                        <Summary>
                            <SummaryTitle>ORDER SUMMARY</SummaryTitle> 

                            <SummaryItem>
                                <SummaryItemText>Subtotal</SummaryItemText>
                                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                            </SummaryItem>

                            <SummaryItem>
                                <SummaryItemText>Estimated Shipping</SummaryItemText>
                                <SummaryItemPrice>$ 5.9</SummaryItemPrice>
                            </SummaryItem>

                            <SummaryItem>
                                <SummaryItemText>Shipping Discount</SummaryItemText>
                                <SummaryItemPrice>$ -5.9</SummaryItemPrice>
                            </SummaryItem>

                            <SummaryItem type="total">
                                <SummaryItemText>Total</SummaryItemText>
                                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                            </SummaryItem>
                            
                            <StripeCheckout
                            name='Bilel Shop'
                            image={LOGO}
                            billingAddress
                            shippingAddress
                            description={`Your total is is $${cart.total}`}
                            amount={cart.total * 100}
                            token={onToken}
                            stripeKey={REACT_APP_STRIPE}
                            >
                                <Button>Pay Now</Button>
                            </StripeCheckout>

                        </Summary>

                    </Bottom>
                    )}
                    

                </Wrapper>

            <Footer />
        </Container>
    )
}

export default Cart
