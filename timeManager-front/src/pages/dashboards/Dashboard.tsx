import Chart from "chart.js/auto";
import {CategoryScale} from "chart.js";
import {Tabs, Tab, Card,} from "@nextui-org/react";
import WeeklyChart from "../../components/charts/WeeklyChart.tsx";
import DailyChart from "../../components/charts/DailyChart.tsx";
import { IUser } from "../../reducers/UserReducer.tsx";

import "react-datepicker/dist/react-datepicker.css";
import "../../assets/custom.css"

Chart.register(CategoryScale);

export function Dashboard({user}:{user:IUser}) {
    const sessionUser = sessionStorage.getItem("currentUser") || "";
    const currentUser = JSON.parse(sessionUser);
    return (
        user && <div className="flex w-full flex-col">
            <Card className="p-5 mb-10 text-center" shadow="md">
                <h1>{user.id === currentUser.id ? "My Dashboard" : `${user.username}'s dashboard`}</h1>
            </Card>
            <Tabs aria-label="Dashboard options">
                <Tab key="daily" aria-label="daily dashboard" title="Daily" >
                    <DailyChart user_id={user.id}/>
                </Tab>
                <Tab key="weekly" aria-label="weekly dashboard" title="Weekly">
                    <WeeklyChart user_id={user.id}/>
                </Tab>
            </Tabs>
        </div>

    );
}
