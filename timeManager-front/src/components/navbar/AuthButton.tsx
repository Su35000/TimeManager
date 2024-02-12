import {useEffect} from "react";
import { Button, NavbarItem } from "@nextui-org/react";
import { useLocation, Link } from "react-router-dom";
import { getEndpoint } from "../../utils/functions/utils";

export default function AuthButton(){
    const endpoint = getEndpoint(useLocation())

    useEffect(()=>{
        
    },[])
    return (
                <NavbarItem>
                    {
                        endpoint === "login" 
                        ?
                            <Button as={Link} color="primary" to="/auth/register" variant="flat">
                                Sign Up
                            </Button>
                        :
                            <Button as={Link} color="primary" to="/auth/login" variant="flat">
                                Sign In
                            </Button>
                    }
                </NavbarItem>
    )
}