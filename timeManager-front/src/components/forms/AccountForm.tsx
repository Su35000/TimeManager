import { Button, Card, CardBody, CardFooter, Divider, Input } from "@nextui-org/react";
import { FormEventHandler } from "react";
import MyCardHeader from "../card/MyCardHeader";
import {updateUser} from "../../fetch/users.ts";
import {useUserDispatch, useUserState} from "../../context/userContext.tsx";
import {useNavigate} from "react-router-dom";
import { useMediaQuery } from "react-responsive";
interface IFormProps {
    title:string;
    inputs:{
        label:string;
        type:string;
        value:string;
        isDisabled?:boolean;
        isHidden?:boolean;
    }[];
    buttonLabel:string;
    onSubmit:FormEventHandler<HTMLFormElement>;
}

export default function AccountForm({title, inputs, buttonLabel, onSubmit}:IFormProps){
    const isMobile = useMediaQuery({ query: '(max-width: 640px)' })
    const {user} = useUserState()
    const navigate = useNavigate();
    const dispatch = useUserDispatch()
    const token = localStorage.getItem("accessToken")

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        const {email, username, currentPassword} = event.target

        if(currentPassword.value) {
            // Submit form
            const userInfo = {
                user: {
                    username: username.value,
                    email: email.value,
                    password: currentPassword.value,
                    currentPassword: currentPassword.value
                }
            };

            updateUser(user.id, userInfo)

            user.email = email.value
            user.username = username.value

            sessionStorage.setItem("currentUser", JSON.stringify(user));

            if (dispatch) {
                dispatch({
                    type: "SET_USER",
                    payload: {user, token}
                });
            }

            navigate("/account/myProfile")


        } else {
            // Enable form
        }

        onSubmit(event);
    }

    return(
        <form className={isMobile ? "flex justify-center" : ""} onSubmit={handleSubmit}>
            <Card className="w-35">
                <MyCardHeader title={title}/>
                <CardBody>
                    <div className={`flex ${isMobile ? "flex-col gap-5" : "justify-evenly"}`}>
                        {inputs.map((input, key) =>{
                            return(
                                <Input
                                    className={`${input.isHidden && 'hidden'} mr-2 ${isMobile ? "justify-end" : "justify-center"}`}
                                    labelPlacement="outside-left"
                                    isDisabled={input.isDisabled} 
                                    key={input.label + key}
                                    label={input.label}
                                    aria-label={input.label}
                                    name={input.label}
                                    type={input.type}
                                    defaultValue={input.value}
                                    isRequired
                                />
                            )
                        })}
                    </div>
                </CardBody>
                <Divider/>
                <CardFooter className="justify-center">
                    <Button type="submit" children={buttonLabel}/>
                </CardFooter>
            </Card>
        </form>
    )
}