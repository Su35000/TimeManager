import ContainerLayout from "../../layout/ContainerLayout.tsx";
import {Navigate, Outlet } from "react-router-dom";
import {useUserState} from "../../context/userContext.tsx";
import {toast} from "react-toastify";

export enum UserRole {
    EMPLOYEE = 'employee',
    MANAGER = 'manager',
    GENERAL_MANAGER = 'general_manager',
    ADMIN = 'admin'
}

// Hiérarchie des rôles
const roleHierarchy: Record<UserRole, number> = {
    [UserRole.EMPLOYEE]: 1,
    [UserRole.MANAGER]: 2,
    [UserRole.GENERAL_MANAGER]: 3,
    [UserRole.ADMIN]: 4
};

const isRoleAllowed = (userRole: UserRole, highestAllowedRole: UserRole) => {

    const userRoleLevel = roleHierarchy[userRole];
    const highestAllowedRoleLevel = roleHierarchy[highestAllowedRole];
    return userRoleLevel >= highestAllowedRoleLevel;
};

export default function CheckingRole({role}:{role:string}) {
    const {user} = useUserState()
    if (user) {
        if (!isRoleAllowed(user.role as UserRole, role as UserRole)) {
            toast.warn("You don't have access to this page !!!")
            return <Navigate to="/dashboard" replace/>;
        }
    } else {
        return <Navigate to="/dashboard" replace/>;
    }

    return <ContainerLayout><Outlet/></ContainerLayout>;
}