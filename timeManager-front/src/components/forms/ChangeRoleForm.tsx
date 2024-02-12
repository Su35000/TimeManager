import {Select, SelectItem} from "@nextui-org/react";
import {FormEvent} from "react";
import {api} from "../../fetch/fetch.ts";
import {updateUser} from "../../fetch/users.ts";

const roles = [
    { label: "Employee", value: "employee"},
    { label: "Manager", value: "manager"}
]

export default function ChangeRoleForm( {user}:any ) {

    function handleSubmit(e: FormEvent) {
        e.preventDefault(); // Empêche le rechargement de la page
        const userInfo = {
            user: {
                username: user.username,
                email: user.email,
                role: e.target[0].value,
                password: "Azerty123456."
            }
        };
        updateUser(user.id, userInfo)

    }

    return (
        <form onSubmit={handleSubmit} id="editUserForm">
            <Select
                label={"Select a role for " + user.username}
                className="max-w-xs"
                defaultSelectedKeys={[user.role]}
            >
                {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                        {role.label}
                    </SelectItem>
                ))}
            </Select>
        </form>
    );
};
