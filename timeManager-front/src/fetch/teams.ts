import {api} from "./fetch.ts";

export const getTeamById = async (id:number) => {
    return await api.get({endpoint:`/teams/${id}`});
}