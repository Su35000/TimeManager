import {useState, useEffect} from "react"

import { Button, Card, CardBody, Modal, useDisclosure } from "@nextui-org/react";
import MyCardHeader from "../../components/card/MyCardHeader";
import ChangePasswordModal from "../../components/modals/ChangePasswordModal";
import DeleteAccountModal from "../../components/modals/DeleteAccountModal";

export default function Security(){
    const [displayForm, setDisplayForm] = useState<React.ReactNode>()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const selectFormModal = (form:string) => {
        switch (form) {
            case "changePassword":
            setDisplayForm(<ChangePasswordModal/>)
            break;

            case "deleteAccount":
            setDisplayForm(<DeleteAccountModal/>)
            break;
        
            default:
                break;
        }
        onOpen();
    }
    useEffect(()=>{

    },[])
    
    return(
        <>
            <Card>
                <MyCardHeader title="Security"/>
                <CardBody className="flex flex-col gap-2">
                    <Button className=" mx-auto min-w-[300px]" children="Change my password" onPress={()=>selectFormModal("changePassword")}/>
                    <Button className=" mx-auto min-w-[300px]" color="danger" children="Delete my Account" onPress={()=>selectFormModal("deleteAccount")}/>
                </CardBody>
            </Card>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                children={displayForm}
                placement="top-center"
                backdrop="blur"
            />
        </>
    )
}