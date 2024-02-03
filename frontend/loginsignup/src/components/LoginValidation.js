

export default function LoginValidatin(values)
{

    const error={}
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // const passwordValidation= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    if(values.email==="")
    {
        error.email="Email should be entered";
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
        error.password="Password should be entered";
    }
    // else if(!passwordValidation.test(values.password))
    // {
    //     error.password="password did not match"
    // }
    else
    {
        error.password=""
    }
    return error;
}