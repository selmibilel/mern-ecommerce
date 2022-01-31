import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
// import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useState } from "react";
// import { useMemo } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Home() {
  const [userStats, setUserStats] = useState([])
  const admin = useSelector(state=>state.user.currentUser);
  const TOKEN = admin.accessToken;


  // const MONTHS = useMemo(
  //   ()=>[
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Agu",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec"
  //   ]
  // );

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
  ]

  useEffect(()=>{
    const getStats = async ()=>{
      try {
        const res = await axios.get("/users/stats",{
          headers:{token:`Bearer ${TOKEN}`}
        });
        res.data.map((item)=>
          setUserStats((prev)=>[
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  },[TOKEN]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
