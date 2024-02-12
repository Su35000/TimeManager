import { NavbarItem } from "@nextui-org/react";

import ManagerDropdown from "../dropdowns/ManagerDropdown.js";
import {Link} from "react-router-dom";
import { IUser } from "../../reducers/UserReducer.js";

export default function MainNavBar({user}:{user:IUser}) {
  return (
      <>
          <NavbarItem>
              <Link to="/dashboard" className="text-blue-700 no-underline hover:underline">
                  My Dashboard
              </Link>
          </NavbarItem>
          <NavbarItem>
              {
                  !user.role || user.role === "employee"
                      ? <></>
                      : <ManagerDropdown role={user.role}/>
              }

          </NavbarItem>
      </>
  );
}