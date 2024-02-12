import {toast} from "react-toastify";
import {AxiosError} from "axios";
import {Navigate} from "react-router-dom";

interface IErrorResponse {
    status: number;
    statusText: string;
    data: {
        error: string;
    }
}

export function errorHandler(error: AxiosError){
    if (!error.response) {
        toast.error(error.message, {
            position: toast.POSITION.TOP_CENTER
        });
        throw new Error(error.message);
    }
    const {data} = error.response as IErrorResponse;
    toast.error(`${data.error}`, {
        position: toast.POSITION.TOP_CENTER
    });

    if (error.response.status === 401) {
        sessionStorage.removeItem("currentUser")
        localStorage.removeItem("accessToken")
        return <Navigate to="/auth/login"/>
    }
}