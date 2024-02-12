import {useState, useEffect} from "react"
import { Card, CardBody } from "@nextui-org/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate, getWorkingTimes } from "../../utils/functions/utils";
import { Doughnut } from "react-chartjs-2";

export default function DailyChart({user_id}:{user_id:number}){
    const [date, setDate] = useState<Date | null>(new Date)
    const [doughnutData, setDoughnutData] = useState({
        labels: ['Temps de travail', 'Temps libre'],
        datasets: [
            {
                label: 'Temps journalier',
                backgroundColor: ['rgba(52,153,198,0.51)', 'rgba(84,198,52,0.47)'],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: [0, 0],
            },
        ],
    });
    
    const doughnutOptions = {} as any;

    // DatePicker onChange event
    const handleChangeDaily = async (dailyDate: Date | null) => {
        setDate(dailyDate)
        const workingTimes = await getWorkingTimes({start:formatDate(dailyDate)}, user_id)
        let workTimeDay = 0
        // let workTimeNight = 0

        for (const workingTime of workingTimes.data) {

            const startDate = new Date(workingTime.start);
            const endDate = new Date(workingTime.end);
            const durationHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);

            workTimeDay += durationHours
        }

        const freeTime = 24 - workTimeDay

        const newDoughnutChartData = {
            labels: ['Work time', 'Free time'],
            datasets: [
                {
                    label: 'Working Time',
                    backgroundColor: ['rgba(52,153,198,0.51)', 'rgba(84,198,52,0.47)'],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    data: [workTimeDay, freeTime],
                },
            ],
        };

        setDoughnutData(newDoughnutChartData)
    }

    useEffect(()=>{
        handleChangeDaily(date)
    },[])

    return(
        <Card>
            <CardBody>
                <div className="flex flex-col items-center justify-center w-75">
                    <DatePicker
                        className="mr-4 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        selected={date}
                        onChange={(selectedDate) => handleChangeDaily(selectedDate)}
                    />
                    <div className="chart-doughnut-container">
                        <Doughnut data={doughnutData} options={doughnutOptions}/>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}