import { FormEvent, useState} from "react";
import { Button, Input, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import {useUserDispatch, useUserState} from "../../context/userContext";
import {deleteUserById} from "../../fetch/users.ts";
import { toast } from "react-toastify";
import {signOut} from "../../fetch/authentication.ts";
import {useNavigate} from "react-router-dom";

interface IFormInput extends EventTarget{
    username:{value:string};
}

export default function DeleteAccountModal(){
    const [isUsernameOk, setIsUsernameOk] = useState(false)
    const {user} = useUserState()
    const dispatch = useUserDispatch()
    const navigate = useNavigate();

    const logout = async () => {
        if (dispatch) {
            dispatch({
                type: "LOGOUT",
                payload: null
            })
        }
        await signOut();
        localStorage.removeItem("accessToken")
        sessionStorage.removeItem("currentUser")
        navigate("/auth/login")
    }

    const handleValueChange = (e:any) => {
        setIsUsernameOk(e === user.username)
    }

    const handleSubmit = async (e:FormEvent<HTMLFormElement>, onClose:()=>void) => {
        e.preventDefault();
        const {username} = e.target as IFormInput
        if (username.value === user.username ) {

            await deleteUserById(user.id)

            logout()

            onClose();
        } else {
            toast.error("")
        }
    }
    return(
        <ModalContent>
            {onClose =>(
                <form onSubmit={(e)=>handleSubmit(e, onClose)}>
                    <ModalHeader>
                        <h1>Delete my Account</h1>
                    </ModalHeader>
                    <ModalBody>
                        <p>Confirm the deletion of your account by entering your username : {<strong>{user.username}</strong>}</p>
                        <Input onValueChange={handleValueChange} type="text" name="username" />
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="danger" children="Delete my Account" disabled={!isUsernameOk} variant={!isUsernameOk ? "faded" : "solid"} />
                    </ModalFooter>
                </form>
            )}
        </ModalContent>
    )
}