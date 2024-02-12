import {FormEvent} from "react";
import { Button, Input, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { updateUser } from "../../fetch/users.ts";
import { useUserState } from "../../context/userContext.tsx";
import {toast} from "react-toastify";
interface IFormInput extends EventTarget{
    currentPassword:{value:string};
    newPassword:{value:string};
}

export default function ChangePasswordModal(){
    const {user} = useUserState()

    const handleSubmit = (e:FormEvent<HTMLFormElement>, onClose:()=>void) => {
        e.preventDefault();

        const {currentPassword, newPassword} = e.target as IFormInput
        const userInfo = {
            user: {
                username: user.username,
                email: user.email,
                password: newPassword.value,
                currentPassword: currentPassword.value,
            }
        };

        updateUser(user.id, userInfo)
            .then(() => {
                toast.success("Password successfuly changed")
                onClose();
            })
            .catch(error => {
                console.error('Error :', error);
            });

        onClose();
    }
    return(
        <ModalContent>
            {onClose => (
                <form onSubmit={(e)=>handleSubmit(e,onClose)}>
                    <ModalHeader >
                        Change my password
                    </ModalHeader>
                    <ModalBody>
                        <Input name="currentPassword" placeholder="Enter your current password" label="Current password" isRequired type="password"/>
                        <Input name="newPassword" placeholder="Enter your new password" label="New password" isRequired type="password"/>
                    </ModalBody>
                    <ModalFooter>
                        {/* <Button onPress={onClose} color="danger" children="Close"/> */}
                        <Button type="submit" children="Confirm"/>
                    </ModalFooter>
                </form>
                )
            }
        </ModalContent>
    )
}