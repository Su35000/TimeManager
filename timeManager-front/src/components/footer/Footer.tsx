import { useEffect, useState} from "react"
import {Button, Card, CardBody, CardFooter, CardHeader, Divider, Switch} from "@nextui-org/react"
import {Clock, MoonIcon, SunIcon} from "../../assets/icon";
import {useThemeDispatch} from "../../context/themeContext";
import {sendingClock} from "../../fetch/clocks.ts";
import ProgressBarWorkingTime from "./ProgressBarWorkingTime.tsx";
import {getWorkingTimeToday} from "../../fetch/workingTimes.ts";
import {useUserState} from "../../context/userContext.tsx";
import { Link } from "react-router-dom";

export default function Footer() {
    const [clockLabel, setClockLabel] = useState("Clock-in");
    const [workingTime, setWorkingTime] = useState([]);
    const { user } = useUserState()
    const themeDispatch = useThemeDispatch();

    async function getWorkingTime() {
        const resp = await getWorkingTimeToday(user.id)
        console.log("respo work time ===", resp);
        
        setWorkingTime(resp)
    }

    const handleClocking = async () => {

        const data = await sendingClock();
        switch (data.clock.status) {
            case true:
                setClockLabel("Clock-out")
                break;
            case false:
                setClockLabel("Clock-in")
                break;
            default:
                break;
        }
    }

    const onValueChange = (e: any) => {
        if (e) {
            themeDispatch({
                type: "SWITCH_THEME",
                payload: "light"
            })
        } else {
            themeDispatch({
                type: "SWITCH_THEME",
                payload: "dark"
            })
        }
    }
    
    useEffect(() => {
        if (user) {
            getWorkingTime()
        }
    }, [user]);

    return (
        <footer className="">
            <Card radius="none" className="w-full">
                {!!user &&
                    <>
                        <CardHeader className="flex justify-center gap-3">
                            <Button 
                                startContent={<Clock fill="currentColor" size={24}/>} 
                                size="lg" 
                                radius="full"
                                color={clockLabel === "Clock-in" ? "success" : "danger"} onPress={handleClocking}
                                children={clockLabel}
                                isDisabled={false}
                            />
                        </CardHeader>
                        <Divider/>
                        <CardBody>
                            <ProgressBarWorkingTime workingTime={workingTime}/>
                        </CardBody>
                    </>
                }
                <CardFooter className="flex flex-col justify-center gap-3">
                    <p>&copy; Time Manager</p>
                    <Switch
                        onValueChange={onValueChange}
                        defaultSelected={localStorage.getItem("theme") === "light"}
                        size="sm"
                        color="secondary"
                        thumbIcon={({isSelected, className}:{isSelected:boolean, className:string}) =>
                            isSelected ? (
                                <SunIcon fill="currentColor" size={1} className={className}/>
                            ) : (
                                <MoonIcon fill="currentColor" size={1} className={className}/>
                            )
                        }
                    >
                        Dark mode
                    </Switch>
                    <Link className=" text-blue-500" to={"/help"}>Need help ?</Link>
                </CardFooter>
            </Card>
        </footer>
    );
}
