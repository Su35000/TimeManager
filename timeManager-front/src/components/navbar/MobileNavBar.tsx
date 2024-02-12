import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { useUserDispatch, useUserState } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import AuthButton from "./AuthButton";
import { signOut } from "../../fetch/authentication";
import MainNavBar from "./MainNavBar";

export default function MobileNavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const {user} = useUserState();
  const dispatch = useUserDispatch()
  const navigate = useNavigate();

  const logout = async () => {
    if (dispatch) {
      dispatch({
        type: "LOGOUT",
        payload: null
      })
    }
    await signOut();
    localStorage.removeItem("accessToken")
    sessionStorage.removeItem("currentUser")
    navigate("/auth/login")
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        {user && <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />}
        <NavbarBrand>
          <p className="font-bold text-inherit">TimeManager</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {
            user && <MainNavBar user={user}/>
        }
      </NavbarContent>
      <NavbarContent justify="end">
        {
            user 
                ?
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="secondary"
                            name={user.username}
                            size="sm"
                            src=""
                            isDisabled
                        />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem aria-label="my profile" key="profile" className="h-14 gap-2" onClick={()=>navigate("/account/myProfile")}>
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">{user.email}</p>
                            </DropdownItem>
                            <DropdownItem aria-label="account security" key="security" onClick={()=>navigate("/account/security")}>Security</DropdownItem>
                            <DropdownItem key="logout" className="text-danger" color="danger" onClick={logout}>
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                : <AuthButton/>
        }
      </NavbarContent>
      <NavbarMenu>
          <NavbarMenuItem>
            <MainNavBar user={user}/>
          </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
