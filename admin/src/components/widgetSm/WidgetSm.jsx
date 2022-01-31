import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { publicFile } from "../../shared/baseUrl";
import ProfileImg from "../../images/profile.png";
import { useSelector } from "react-redux";


export default function WidgetSm() {
  const [users, setUsers] = useState([]);
  const [erreur, setErreur] = useState(null);
  const admin = useSelector(state=>state.user.currentUser);
  const TOKEN = admin.accessToken;
  // console.log("admin : "+ TOKEN);

  useEffect(()=>{
    const getUsers = async () =>{
      try {
        const res = await axios.get("/users/?new=true",{
          headers:{token:`Bearer ${TOKEN}`}
        });
        setUsers(res.data);
      } catch (err) {
        setErreur(err);
      }
    }
    getUsers();
  },[TOKEN]);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {erreur?(
          <div>Erreur de chargement...</div>
        ):(
            users.map((item,index)=>(
              <li className="widgetSmListItem" key={index}>
                <img
                  src={item.img? publicFile+item.img : ProfileImg }
                  alt=""
                  className="widgetSmImg"
                />
                <div className="widgetSmUser">
                  <span className="widgetSmUsername"> {item.username} </span>
                  <span className="widgetSmUserTitle"> {item.isAdmin? "administrateur" : "utilisateur"} </span>
                </div>
                <button className="widgetSmButton">
                  <Visibility className="widgetSmIcon" />
                  Display
                </button>
              </li>
          ))
        )}
        
      </ul>
    </div>
  );
}
