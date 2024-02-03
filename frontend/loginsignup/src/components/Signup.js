import { useNavigate } from "react-router-dom";
import React,{useEffect, useState} from "react";
import SignupValidation from "./SignupValidation";
import axios from "axios";
import "../CSS/SignupPage.css";
import { Link } from "react-router-dom";
function Signup()
{
    console.log(process.env.REACT_APP_BACKEND_URL);
    const [existingEmail,setExistingEmail]=useState([]);
    let bool=true;
    useEffect(()=>
    {
       if(bool)
       {
        axios.get("https://loginsignup-production.up.railway.app/signup").then((response)=>
        {  
         for(let i=0;i<response.data.length;i++)
         {
            setExistingEmail((prev)=>
            {
                return [...prev,response.data[i]];
            })
         }
        }).catch((err)=>
        {
            console.log(err);
        })
       }
       bool=false;
    },[])
    
    const [signupData,setSignupData]=useState({
        name:"",
        email:"",
        password:"",
        confirmpassword:""
    })
    const [ErrorValidation,setErrorValidation]=useState({ })
    const navigate= useNavigate();
    
    function handleInput(event)
    {
        setSignupData((prev)=>({...prev,[event.target.name]: event.target.value}));
    }
    const [emailexisterror,setemailExistError]=useState("");
    function handleSubmit(event)
    {  
        let check=true;
        event.preventDefault(); 
        const SignupValidationCheck=SignupValidation(signupData);
        setErrorValidation(SignupValidationCheck);
        for(let i=0;i<existingEmail.length;i++)
        {
            
            if(existingEmail[i].email==signupData.email)
            {
                setemailExistError("Account already exist!");
                check=false;
                break;
            }
            else
            {
                setemailExistError("");
            }

        }
        if(SignupValidationCheck.email==="" && SignupValidationCheck.password==="" && SignupValidationCheck.confirmpassword==="" && SignupValidationCheck.name==="" && check)
        {   
            axios.post("https://loginsignup-production.up.railway.app/signup", signupData).then(res=>
            {
                    navigate("/");
            }).catch((err)=>
                {
                    window.alert(err);
                    console.log(err);
                })

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
                    <form action="" onSubmit={handleSubmit} className="signupform">
                        <div>{emailexisterror && <span>{emailexisterror}</span>}</div>
                        <div>Sign-up Page</div>
                        <div className="inputBox">
                            <input type="text" className="input" onChange={handleInput} placeholder="Enter your Name" name="name" required></input>
                            <i class='bx bxs-user'></i>
                        </div>
                        <div>{ErrorValidation.name && <span>{ErrorValidation.name} </span> }</div>
                        <div className="inputBox">
                            <input className="input" type="email" onChange={handleInput} placeholder="Type your mail-ID" name="email" required/>
                            <i class='bx bxs-envelope' ></i>
                        </div>
                        <div>{ErrorValidation.email && <span>{ErrorValidation.email} </span> }</div>
                        <div className="inputBox">
                                <input className="input" onChange={handleInput} type="password" id="newPassword" placeholder="Enter a password" name="password" maxLength={20} minLength={6} required/>
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
                        <button className="signupbutton" type="submit">Sign-up</button>
                    </form>
                    <div>
                        <p>Already have an account?</p>
                    </div>
                    <div>
                        <Link to="/" className="backbutton">Login</Link>
                    </div>
                </div>

            </div>
        </div>
    </div>)
}
export default Signup;