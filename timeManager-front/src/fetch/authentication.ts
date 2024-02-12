import { api } from "./fetch";

export const signIn = async (data:any) => {
    const options = {
        endpoint:"/login",
        data
    }
    return await api.post(options);
}

export const signUp = async (data:any) => {
    const options = {
        endpoint:"/register",
        data
    }

    return await api.post(options);

}

export const signOut =  async () => {
    api.post({endpoint:"/logout"})
} 