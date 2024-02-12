import {api} from "./fetch.ts";

export const sendingClock =  async () => {
    return api.post({endpoint:"/clocks"})
}