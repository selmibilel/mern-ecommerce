import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const admin = useSelector(state=>state.user.currentUser);
  const TOKEN = admin.accessToken;

  useEffect(()=>{
    const getIncome = async ()=>{
      try {
        const res = await axios.get("/orders/income",{
          headers:{token:`Bearer ${TOKEN}`}
        });
        setIncome(res.data);
        setPerc(((res.data[0].total * 100) / res.data[1].total) - 100);
      } catch (err) {
        console.log(err);
      }
    };
    getIncome();
  },[TOKEN]);

  // console.log(perc);
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[0]?income[0].total:0}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc)}
            {perc>0?(
              <ArrowUpward  className="featuredIcon"/>
            ):(
              <ArrowDownward  className="featuredIcon negative"/>
            )} 
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
