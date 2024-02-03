

 export default function SignupValidatin(values)
{
    const  error= {}
    const nameValidation=/^[A-Za-z\s]+$/;
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const passwordValidation= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    if(values.name==="")
    {
        error.name="Name should be entered";
    }
    else if(!nameValidation.test(values.name))
    {   
        error.name="invalid name";
    }
    else{
        error.name="";
    }
    if(values.email==="")
    {
        error.email="Name should be written"
    }
    else if(!emailValidation.test(values.email))
    {
        error.email="Mail did not match! kindly check your Mail";
    }
    else
    {
        error.email=""   
    }
    if(values.password==="")
    {
        error.password="password should be entered"
    }
 // else if(!passwordValidation.test(values.password))
 // {
 //     error.password="password did not match"
 // }
    else
    {
        error.password=""
    }

    if(values.password !== values.confirmpassword){
        error.confirmpassword="Password Mismatched"
    }
    else if(values.confirmpassword==="")
    {
        error.confirmpassword="password should be entered"
    }
    else{
        error.confirmpassword="";
    }

    return  error;
}