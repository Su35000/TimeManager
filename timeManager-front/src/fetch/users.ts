import { api } from "./fetch";

export const getCurrentUser = async () => {
    return await api.get({endpoint:`/users/me`});
}

export const getUserById = async (id:string) => {
    return await api.get({endpoint:`/users/${id}`});
}

export const getUserByUsernameAndEmail = async({username, email}:{username:string, email:string}) => {
    const options = {
        endpoint:`/users?username=${username}&email=${email}`,
    }
    return await api.post(options);
}

export const getTeamsBasedOnRole = async () => {
    const result = await api.get({endpoint:`/teams`});
    return result.data
}

export const deleteUserById = async (id:number) => {
    const result = await api.delete({endpoint:`/users/${id}`});
    return result.data
}

export const updateUser = async (id: number, data:any)=> {
    const options = {
        endpoint: `/users/${id}`,
        data
    }

    const result = await api.put(options);
    return result.data;
}

export const deleteUser = async (id:number) => {
    return await api.delete({endpoint:`/users/${id}`})
}

export const removeUserFromTeamList = async (user_id:number, team_id:number) => {
    console.log("l'utilisateur n°", user_id, "a été retiré de la team n°", team_id);
    // return await api.put({endpoint:`/users/???`})
}