import { FormEvent } from "react";
import Form from "../../components/forms/Form";
import {signIn} from "../../fetch/authentication";
import { useUserDispatch} from "../../context/userContext";
import { useNavigate } from "react-router-dom";

interface IFormInputs extends EventTarget{
    email:{value:string};
    password:{value:string};
}
export default function Login(){
    const dispatch = useUserDispatch()

    const navigate = useNavigate();
    const loginInputs = [
        {
            label:"email",
            placeholder:"Enter your E-mail",
            type:"email",
            isRequired:true
        },
        {
            label:"password",
            placeholder:"Enter your password",
            type:"password",
            isRequired:true
        },
    ]

    const onLogin = async (e:FormEvent) => {
        e.preventDefault();

        const {email, password} = e.target as IFormInputs;
        const userLogInfo = {
            email:email.value,
            password:password.value
        }

        const resp = await signIn(userLogInfo)
        if (resp) {
            const {user, token} = resp
            if (user && token) {
                localStorage.setItem("accessToken", token);
                sessionStorage.setItem("currentUser", JSON.stringify(user));
                if (dispatch) {
                    dispatch({
                        type: "SET_USER",
                        payload: {user,token}
                    })
                }
                navigate("/dashboard")

            }
        }

        
    }
    
    return(
        <Form
            title="Login"
            inputs={loginInputs}
            buttonLabel="Submit"
            onSubmit={onLogin}/>
    )
}