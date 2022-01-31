import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Success = () => {
    // const location = useLocation();
    // const data = location.state.data;
    // const cart = location.state.products;

    // const currentUser = useSelector((state) => state.user.currentUser);
    const [orderId, setOrderId] = useState(null);


    
    return (
        <div>
        <Navbar />
        <Announcement />
        <div
        style={{
                height: "70vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
            >
            {orderId
                ? `Order has been created successfully. Your order number is ${orderId}`
                : `Successfull. Your order is being prepared...`}
            <Link to='/' className='link'><button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button></Link>
        </div>
        <Footer/>
        </div>
    )
}

export default Success
