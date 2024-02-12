import {useState, useEffect} from "react"
import { Card, CardBody } from "@nextui-org/react";
import DatePicker from "react-datepicker";
import {endOfISOWeek, isSameISOWeek, startOfISOWeek,} from "date-fns";
import {toast} from "react-toastify";
import { formatDate, getWorkingTimes } from "../../utils/functions/utils";
import "react-datepicker/dist/react-datepicker.css";
import { Bar } from "react-chartjs-2";

export default function WeeklyChart({user_id}:{user_id:number}) {
    const [startDate, setStartDate] = useState(new Date);
    const [barData, setBarData] = useState({
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
            {
                label: 'Temps de travail',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: [0, 0, 0, 0, 0, 0, 0],
            },
        ],
    });

    const barOptions = {
        scales: {
            x: {
                type: 'category',
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    } as any;

    // Create a week day map with a start day
    function createWeekMap(startDate:string) {
        const weekMap = new Map();
        const currentDate = new Date(startDate);

        for (let i = 0; i < 7; i++) {
            weekMap.set(currentDate.toISOString().split('T')[0], 0);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return weekMap;
    }

    const handleChangeWeekly = async (selectedDate:Date) => {
        setStartDate(selectedDate);
        const weekStart = formatDate(startOfISOWeek(selectedDate));
        const weekEnd = formatDate(endOfISOWeek(selectedDate));

        const workingTimes = await getWorkingTimes({start:weekStart, end:weekEnd}, user_id)
        let chartData: any = []
        if (workingTimes.data.length == 0) {
            toast.warn("No working time this week");
            chartData = [0, 0, 0, 0, 0, 0, 0]

        } else {
            const weekNumber = createWeekMap(weekStart)

            for (const workingTime of workingTimes.data) {

                // const dayKey = startDate.toISOString().split('T')[0];
                const startDate = new Date(workingTime.start);
                const endDate = new Date(workingTime.end);
                const durationHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);

                const hours = weekNumber.get(formatDate(startDate));
                weekNumber.set(formatDate(startDate), hours + durationHours);
                chartData = [...weekNumber.values()]
            }

        }
        const newChartData = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [
                {
                    label: 'Temps de travail',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    data: chartData,
                },
            ],
        };
        setBarData(newChartData)
    };

    useEffect(()=>{
        handleChangeWeekly(startDate)
    },[])
    return(
        
        <Card>
            <CardBody>
                <div className="flex flex-col items-center justify-center">
                    <DatePicker
                        className="mr-4 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                        dayClassName={(date: Date) =>
                            isSameISOWeek(date, startDate) ? "react-datepicker__day--selected" : ""
                        }
                        calendarClassName="datepicker-weekly"
                        selected={startDate}
                        onChange={handleChangeWeekly}
                        showWeekNumbers
                        calendarStartDay={1}
                        startDate={null}
                        required={true}
                    />
                    <div className="chart-bar-container">
                        <Bar data={barData} options={barOptions}/>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}