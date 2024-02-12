import { getAllWorkingtimesByUserBetweenDateRange } from "../../fetch/workingTimes";

export const getURL = (endpoint:string) => {
    return import.meta.env.VITE_BASE_URL + endpoint;
}

export const getEndpoint = (route:{pathname:string}) => {
    return route.pathname.split("/").pop();
}

export const generateKey = (label:string) => {
    return label.split(" ").join("_");
}

export function formatDate(date:Date | null) {
    const year = date && date.getFullYear();
    const month =date && String(date.getMonth() + 1).padStart(2, '0');
    const day = date && String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const getWorkingTimes = async ({start, end}:{start:string, end?:string|null}, user_id:number) => {
    let dateSearchRange = {
        start:start + "T00:00:00.000Z",
        end:(end ? end : start) + "T23:59:59.999Z" 
    }

    return await getAllWorkingtimesByUserBetweenDateRange(user_id, dateSearchRange);
};