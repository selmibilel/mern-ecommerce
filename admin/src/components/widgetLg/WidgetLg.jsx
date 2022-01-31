import { AccountBox } from "@material-ui/icons";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./widgetLg.css";
import {format} from "timeago.js";


export default function WidgetLg() {
  const [orders, setOrders] = useState([]);
  const [erreur, setErreur] = useState(null);
  const admin = useSelector(state=>state.user.currentUser);
  const TOKEN = admin.accessToken;

  useEffect(()=>{
    const getOrders = async () =>{
      try {
        const res = await axios.get("/orders",{
          headers:{token: `Bearer ${TOKEN}`}
        });
        setOrders(res.data);
      } catch (err) {
        setErreur(err);
      }
    };
    getOrders();
  },[TOKEN]);


  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <thead>
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        </thead>
        <tbody>
        {erreur?(
          <div>Erreur de chargement...</div>
        ):(
          orders.map((item, index)=>(
            <tr className="widgetLgTr" key={index}>
              <td className="widgetLgUser">
                <AccountBox />
                <span className="widgetLgName"> {item.userId} </span>
              </td>
              <td className="widgetLgDate"> {format(item.createdAt)} </td>
              <td className="widgetLgAmount">$ {item.amount} </td>
              <td className="widgetLgStatus">
                <Button type={item.status} />
              </td>
            </tr>
            ))
        )}
        
        </tbody>
      </table>
    </div>
  );
}
