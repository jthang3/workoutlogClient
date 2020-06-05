import React,{useState,useEffect} from 'react';
import SiteBar from "./home/Navbar";
import Auth from "../src/auth/Auth";
import WorkoutIndex from './workouts/WorkoutIndex';


function App() {
  const [sessionToken,setSessionToken] = useState("");

  useEffect(()=>{
    if(localStorage.getItem("token" !== undefined || localStorage.getItem("token")!== "")){
      setSessionToken(localStorage.getItem("token"));
    }
  },[]);

    //logout function
const clearToken = ()=>{
  localStorage.clear();
  setSessionToken("");
}
const protectedViews = ()=>{
  return (sessionToken === localStorage.getItem("token")?<WorkoutIndex token = {sessionToken}/>: <Auth updateToken = {updateToken}/>)
}

  const updateToken = (newToken)=>{
    //store key value pair. No experiation date.
    localStorage.setItem("token",newToken);
    setSessionToken(newToken);
    console.log(setSessionToken);
  }
  const title = ()=>{
    document.title = "Workout Log Client";
  }
  return (
    <div>
        {title()}
        <SiteBar clickLogout = {clearToken}/>
        {protectedViews()}
    </div>
  );
}

export default App;
