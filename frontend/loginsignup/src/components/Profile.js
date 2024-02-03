import { useNavigate } from "react-router-dom";
import React,{ useState} from "react";
import axios from "axios";
import "../CSS/Profile.css";
import { Link } from "react-router-dom";
import ProfilePageValidation from "../components/ProfilePageValidation";
function Profile()
{
    const navigate= useNavigate();
    const [profileData,setprofileData]=useState({
        age:0,
        gender:"",
        DOB:"",
        MobileNumber:""
    })
    const [ErrorValidation,setErrorValidation]=useState({ })
   const [updateState,setUpdateState]=useState("");
    function handleInput(event)
    {
        setprofileData((prev)=>({...prev,[event.target.name]: event.target.value}));
    }
    function handleSubmit(event)
    {  
        event.preventDefault(); 
        const ProfileValidationCheck=ProfilePageValidation(profileData);
        setErrorValidation(ProfileValidationCheck);
        if(ProfileValidationCheck.age==="" && ProfileValidationCheck.gender==="" && ProfileValidationCheck.MobileNumber==="")
        {   
            axios.post("https://loginsignup-production.up.railway.app/profile", profileData).then((res)=>
            {
                setUpdateState("Updated");
            }).catch((err)=>
                {
                    window.alert(err);
                })
        }
    }


    return(<div>
  
        <div className="container">
            <div className="outerLoginContainer">
                <div className="loginContainer">
                    <form action="" onSubmit={handleSubmit} className="profileform">
                    <div>{updateState && <span>{updateState}</span>}</div>
                        <div>Profile Update</div>
                        <div className="inputBox">
                            <input type="text" className="input" onChange={handleInput} placeholder="Age" name="age"></input>
                            <i class='bx bxs-user'></i>
                        </div>
                        <div>{ErrorValidation.age && <span>{ErrorValidation.age} </span> }</div>
                        <div className="inputBox">
                            <input className="input" type="text" onChange={handleInput} placeholder="Gender" name="gender"/>
                            <i class='bx bxs-user'></i>
                        </div>
                        <div>{ErrorValidation.gender && <span>{ErrorValidation.gender} </span> }</div>
                        <div className="inputBox">
                                <input className="input" onChange={handleInput} type="date"  placeholder="Date of Birth" name="DOB"/>
                                <i class='bx bxs-calendar'></i>  
                        </div>
                        <div>{ErrorValidation.DOB && <span>{ErrorValidation.DOB} </span> }</div>
                        <div className="inputBox">
                            <input name="MobileNumber" onChange={handleInput} className="input" type="text"  placeholder="Mobile Number" inputMode="numeric" maxLength={10} minLength={10} required/>
                            <i class='bx bxs-contact' ></i> 
                        </div>
                        <div>{ErrorValidation.MobileNumber && <span>{ErrorValidation.MobileNumber} </span> }</div>
                        <button className="updatebutton" type="submit">Update</button>
                    </form>
                    <div>
                        <Link to="/" className="Logoutbutton">Log-Out</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
export default Profile;