import React,{useState,useEffect} from "react";
import { useNavigate,Link } from "react-router-dom";
import "../CSS/changepassword.css";
import SignupValidation from "./SignupValidation";
import axios from "axios";
export default function Changepassword()
{
    const [existingEmail,setExistingEmail]=useState([]);
    let bool=true;
    useEffect(()=>
    {
       if(bool)
       {
        axios.get("https://loginsignup-production.up.railway.app/changepassword").then((response)=>
        {  
         for(let i=0;i<response.data.length;i++)
         {
            setExistingEmail((prev)=>
            {
                return [...prev,response.data[i]];
            })
            console.log(response);
         }
        }).catch((err)=>
        {
            console.log(err);
        })
       }
       bool=false;
       
    },[])
    
    const [changepassworddata,setchangepassworddata]=useState({
        email:"",
        password:"",
        confirmpassword:""
    })
    const [ErrorValidation,setErrorValidation]=useState({ })
    const navigate= useNavigate();
    
    function handleInput(event)
    {
        setchangepassworddata((prev)=>({...prev,[event.target.name]: event.target.value}));
    }
    const [updateStates,setupdateStates]=useState("");
    function handleSubmit(event)
    {  
        event.preventDefault(); 
        const SignupValidationCheck=SignupValidation(changepassworddata);
        setErrorValidation(SignupValidationCheck);
        for(let i=0;i<existingEmail.length;i++)
        {
            
            if(existingEmail[i].email==changepassworddata.email)
            {
                if(SignupValidationCheck.email==="" && SignupValidationCheck.password==="" && SignupValidationCheck.confirmpassword==="" )
                {   
                    axios.post("https://loginsignup-production.up.railway.app/changepassword", changepassworddata).then(res=>
                    {
                        setupdateStates("Password updated");
                    }).catch((err)=>
                        {
                            window.alert(err);
                            console.log(err);
                        })
        
                }
            }
            else
            {
                setupdateStates("Email not exist");
            }

        }

    }

    function handleCheck()
    {
        let Password=document.getElementById("newPassword");
        if(Password.type==="password")
        {
            Password.type="text";
        }
        else{
            Password.type="password";
        }
    }
    function handleClick()
    {
        let Password=document.getElementById("confirmpassword");
        if(Password.type==="password")
        {
            Password.type="text";
        }
        else{
            Password.type="password";
        }
    }
    return(<div>
  
        <div className="container">
            <div className="outerLoginContainer">
                <div className="loginContainer">
                    <form action="" onSubmit={handleSubmit} className="changepasswordform">
                        <div>{updateStates && <span>{updateStates}</span>}</div>
                        <div>Change password</div>
                        <div className="inputBox">
                            <input className="input" type="email" onChange={handleInput} placeholder="Type your mail-ID" name="email" required/>
                            <i class='bx bxs-envelope' ></i>
                        </div>
                        <div>{ErrorValidation.email && <span>{ErrorValidation.email} </span> }</div>
                        <div className="inputBox">
                                <input className="input" onChange={handleInput} type="password" id="newPassword" placeholder="Enter a new password" name="password" maxLength={20} minLength={6} required/>
                                <i class='bx bxs-lock-alt' ></i>     
                        </div>
                        <div className="checkpassword"><input type="checkbox"  onClick={handleCheck}/>check password</div>
                        <div>{ErrorValidation.password && <span>{ErrorValidation.password}</span> }</div>
                        <div className="inputBox">
                            <input name="confirmpassword" onChange={handleInput} className="input" type="password" id="confirmpassword" placeholder="Confirm password" maxLength={20} minLength={6} required/>
                            <i class='bx bxs-lock-alt' ></i>  
                        </div>
                        <div className="checkpassword"> <input type="checkbox"  onClick={handleClick}/>check password</div>
                        <div> {ErrorValidation.confirmpassword && <span>{ErrorValidation.confirmpassword}</span> }</div>
                        <button className="signupbutton" type="submit">Update</button>
                    </form>
                    <div>
                        <Link to="/" className="backbutton">Login</Link>
                    </div>
                </div>

            </div>
        </div>
    </div>)
}