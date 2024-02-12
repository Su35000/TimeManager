const userDetails = sessionStorage.getItem("currentUser")
const user = userDetails && JSON.parse(userDetails)

const token = localStorage.getItem("accessToken")

export const initialUserState = {
  user: user,
  token: token || ""
};

export interface IUser{
  id: number,
  username: string,
  email: string,
  role: string
}

export interface IAuthState{
  user: IUser,
  token: string
}

export interface IAuthAction{
  type:string,
  payload:{[key:string]:string}
}

export const UserReducer = (
  state: IAuthState,
  action: IAuthAction
) => {
  const {type, payload} = action;
  switch (type) {
    case "SET_USER":
      return {
        user: payload.user,
        token: payload.token
      };
    case "LOGOUT":
      return {
        user: null,
        token: null
      };
    default:
      return state;
  }
};
