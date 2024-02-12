import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { ChevronDown, Flash, Server } from "../../assets/icon";
import {useEffect} from "react"
import { generateKey } from "../../utils/functions/utils";
import { useNavigate } from "react-router-dom";
import { useUserState } from "../../context/userContext";

export interface IManagerMenu {
    link:string,
    label:string,
    description:string,
    icon:JSX.Element
}

export default function ManagerDropdown({role}:{role:string}){
    const navigate = useNavigate();
    const {user} = useUserState();
    const managerMenu : IManagerMenu[]= [
        {
            link:"/general-info",
            label:"General info",
            description:`View the averages of the daily and weekly hours of ${role==="manager" ? "your team" : "all users"} over a given period`,
            icon:<Server className="text-warning" fill="currentColor" size={30} />
        },
        {
            link:"/manage",
            label:`Manage ${role==="manager" ? "your team" : "all users"}`,
            description:`Add ${role ==="generalManager" ? "promote" : ""} or Remove a user from your team`,
            icon:<Flash className="text-primary" fill="currentColor" size={30}/>
        },
    ]

    const generalManagerMenu : IManagerMenu[] = [
        ...managerMenu,
        {
            link:"/teams",
            label:"Manage teams",
            description:"Create or delete a team",
            icon:<Flash className="text-primary" fill="currentColor" size={30}/>
        }
    ] 

    const renderMenu = (menuArray:IManagerMenu[]) => {
        return menuArray.map((menu, key)=>{
            return(
                <DropdownItem
                    key={generateKey(menu.label)+key}
                    description={menu.description}
                    startContent={menu.icon}
                    onClick={()=>navigate(menu.link)}
                >
                    {menu.label}
                </DropdownItem>
            )
        })
    }

    useEffect(()=>{
        
    },[])
    return(
        <Dropdown>
            <DropdownTrigger>
                <Button
                    disableRipple
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                    endContent={<ChevronDown fill="currentColor" size={16} />}
                    radius="sm"
                    variant="light"
                >
                    Management
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Management Menu"
                className="w-[340px]"
                itemClasses={{
                base: "gap-4",
                }}
            >
                {
                    renderMenu(managerMenu) 
                    
                    // user.role === "manager" 
                    //     ? renderMenu(managerMenu) 
                    //     : renderMenu(generalManagerMenu)
                }
            </DropdownMenu>
        </Dropdown>
    )
}