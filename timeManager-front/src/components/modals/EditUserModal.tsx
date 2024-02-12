import {Button, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem} from "@nextui-org/react";
import NewWorkingTimeForm from "../forms/NewWorkingTimeForm.tsx";
import React, {ChangeEvent, useState} from "react";
import ChangeRoleForm from "../forms/ChangeRoleForm.tsx";
import { IUser } from "../../reducers/UserReducer.tsx";
import { useUserState } from "../../context/userContext.tsx";

export const actions = [
    {label: "Adding new working time", component: NewWorkingTimeForm, role:["manager", "general_manager"]},
    {label: "Change the role of user", component: ChangeRoleForm, role:["general_manager"]}
]

interface IAction {
    label:string;
    component:JSX.Element;
    role:string[];
}

export default function EditUserModal({user}: {user:IUser}) {
    const {user:currentUser} = useUserState();
    const [selectedAction, setSelectedAction] = useState<React.ReactNode>(null);

    function handleSelectionChange(e : ChangeEvent<HTMLSelectElement>) {
        actions.forEach(action => {
            if (action.role.includes(currentUser.role)) {
                if (action.label === e.target.value) {
                    setSelectedAction(React.createElement(action.component, { user: user}))
                }
            }
        })
    }

    const checkRole = (actionArray:IAction) => {
        return actionArray.role.includes(currentUser.role) 
    }

    return (
        <ModalContent>
            <ModalHeader>
                <Select
                    label="Select an actions"
                    className="max-w-xs"
                    onChange={handleSelectionChange}
                >
                    {actions.map(action => (
                        <SelectItem isReadOnly={!checkRole(action)} key={action.label}>
                            {action.label}
                        </SelectItem>
                    ))}
                </Select>
            </ModalHeader>
            <ModalBody>
                { selectedAction }
            </ModalBody>
            <ModalFooter>
                <Button type="submit" color="primary" form="editUserForm">
                    Submit
                </Button>
            </ModalFooter>
        </ModalContent>
    );
}