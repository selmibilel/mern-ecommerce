import React from 'react'
import styled from 'styled-components'
import {Search, ShoppingCartOutlined} from '@material-ui/icons'
import { Badge } from '@material-ui/core'

import {mobile} from '../responsive'
import { Link } from 'react-router-dom'

// Pour redux pour la carte
import {useSelector} from "react-redux"
import { useDispatch } from 'react-redux'
import { logout } from '../redux/userRedux'



const Container = styled.div`
    height: 60px;
    ${mobile({height:"50px"})};
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({padding:"10px 0px"})};
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({display:"none"})};
`

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`

const Input = styled.input`
    border:none;
    :focus{
        outline: none;
    };
    ${mobile({width:"50px"})};

`


const Center = styled.div`
    flex: 1;
    text-align: center;
`

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({fontSize:"24px"})};
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({flex:"2",justifyContent:"center"})};
`

const RightLink = styled.div`
    display: flex;
`

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({fontSize:"12px",marginLeft:"10px"})};
`


const Navbar = () => {
    const quantity = useSelector(state=>state.cart.quantity);
    const user = useSelector(state=>state.user.currentUser);
    const dispatch = useDispatch();

    const handleLogout = ()=>{
        dispatch(logout());
    }

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder='Search' />
                        <Search style={{color:"gray",fontSize:16}}/>
                    </SearchContainer>
                </Left>
                <Center>
                    <Link to="/" className='link'>
                        <Logo>BILEL.</Logo>
                    </Link>
                </Center>
                <Right>
                    {user?(
                        <RightLink>
                            <span
                            style={{
                                fontSize:"14px",
                                fontStyle:"italic",
                                padding:"0px 20px",
                                borderRight: "1px solid lightgray",
                            }}
                            >
                                welcom ,{user.username} 
                            </span>
                            <Link to="/" className='link' onClick={handleLogout}>
                                <MenuItem>LOGOUT</MenuItem>
                            </Link>
                        
                        </RightLink>
                    ):(
                        <RightLink>
                            <Link to="/register" className='link'>
                                <MenuItem>REGISTER</MenuItem>
                            </Link>
                            <Link to="/login" className='link'>
                                <MenuItem>SIGN IN</MenuItem>
                            </Link>
                        </RightLink>
                    )}
                    <Link to="/cart" className="link">
                        <MenuItem>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
