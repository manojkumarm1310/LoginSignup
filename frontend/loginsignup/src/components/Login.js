import React ,{useState,useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import LoginValidation from "./LoginValidation";
import axios from "axios";
import "../CSS/LoginPage.css";
function Login()
{
    const [existingEmail,setExistingEmail]=useState([]);
    let bool=true;
    useEffect(()=>
    {
       if(bool)
       {
        axios.get("https://loginsignup-backend-production.up.railway.app/login").then((response)=>
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
    const [loginData,setLoginData]=useState({
        email:"",
        password:"",
    })
    const [ErrorValidation,setValidationError]=useState({ })
    const navigate=useNavigate();

    function handleInput(event)
    {
        setLoginData((prev)=>({...prev,[event.target.name]:[event.target.value]}));
    }
    const [ErrorNotify,setErrorNotify]=useState(true);
    const [ErrorNotifyMessage,setErrorNotifyMessage]=useState("");
    function handleSubmit(event)
    {
        event.preventDefault();
        const LoginValidationCheck=LoginValidation(loginData);
        setValidationError(LoginValidationCheck);
        if(LoginValidationCheck.email==="" && LoginValidationCheck.password==="")
        {
            axios.post("https://loginsignup-backend-production.up.railway.app/login",loginData).then(res=>{
                if(res.data.status==="Success")
                {
                    setErrorNotify(true);
                    navigate("/profile");
                }
                else if(res.data.status==="Failed")
                {
                    for(let i=0;i<existingEmail.length;i++)
                    {
                        if(existingEmail[i].email==loginData.email)
                        {
                            setErrorNotifyMessage("wrong Password");
                            break;
                        }
                        else
                        {
                            setErrorNotifyMessage("Invalid Email and Password");
                        }
                    }
                    setErrorNotify(false);
                }
            })
                .catch((err)=>{
                        window.alert(err);
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

    return(<div>
        <div className="container">
       
            <div className="outerLoginContainer">
                <div className="loginContainer">            
                    <form action="" className="loginform" onSubmit={handleSubmit}>
                        <div>{ErrorNotify ? <span></span> : <span>{ErrorNotifyMessage}</span>}</div>
                        <div>Login Page</div>
                        <div className="inputBox">
                            <input className="input" type="email" placeholder="Type your mail-ID" name="email" onChange={handleInput} required/>
                            <i class='bx bxs-envelope' ></i>
                        </div>
                        <div>{ErrorValidation.email && <span>{ErrorValidation.email} </span> }</div>
                        <div className="inputBox">
                                <input className="input" type="password" id="newPassword" placeholder="Enter a password" name="password" onChange={handleInput} maxLength={20} minLength={6} required/>
                                <i class='bx bxs-lock-alt' ></i>   
                        </div>
                        <div className="checkpassword"><input type="checkbox"  onChange={handleCheck}/> check password</div>
                        <div>{ErrorValidation.password && <span>{ErrorValidation.password}</span> }</div>
                        
                        <button type="submit"  className="Loginbutton">Login</button>
                    </form>
                    <Link className="changepassword" to="/changepassword">Forget password?</Link>
                    <div>
                        <p>Don't have an account?</p>
                    </div>
                    <div>
                        <Link to="/signup" className="createbutton">Create new account</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default Login;