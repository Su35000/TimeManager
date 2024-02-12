import {Line} from 'react-chartjs-2';
import {useEffect, useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import {Select, SelectItem} from "@nextui-org/react"
import {getTeamsBasedOnRole} from "../../fetch/users.ts";
import {getTeamById} from "../../fetch/teams.ts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {formatDate, getWorkingTimes} from "../../utils/functions/utils.ts";

export default function GeneralInfo(){
    /* Weekly Bar data */
    const [lineData, setLineData] = useState({
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
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

    const lineOptions = {
        scales: {
            
            y: {
                title : {
                  display: true,
                  text: "Number of user"
                },
                ticks: {
                    precision: 0,
                    beginAtZero: true
                }
            },
            x: {
                title : {
                    display: true,
                    text: "Working time"
                },
                ticks: {
                    precision: 0
                }
            }
        },
        responsive: true
    } as any;

    const [teamsList, setTeamList] = useState([])
    const [users, setUsers] = useState([])
    const [dailyDate, setDailyDate] = useState<Date | null>(null)

    /* Before page load */
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await getTeamsBasedOnRole();
                setTeamList(response);
            } catch (error) {
                console.error('Erreur lors de la récupération des teams', error);
            }
        };

        fetchTeams();
    }, [])

    // Select teams onChange event
    const handleChangeSelectTeam = (e) => {

        const teamId = e.currentKey
        const resp = getTeamById(teamId)
        resp.then((data) => {

            const teamSize = data.data.users.length
            const teamUsers = data.data.users

            setUsers(teamUsers)
        });

        setDailyDate(null)
    }

    // DatePicker onChange event
    const handleChangeDaily = async (dailyDate: Date | null) => {
        setDailyDate(dailyDate)

        const workingTimePerUser: number[] = []

        //Get all working times per user
        await Promise.all(users.map(async (user) => {
            let workingTimeUser = 0;

            const workingTimes = await getWorkingTimes({ start: formatDate(dailyDate) }, user.id);

            for (const workingTime of workingTimes.data) {
                const startDate = new Date(workingTime.start);
                const endDate = new Date(workingTime.end);
                const durationHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);

                workingTimeUser += durationHours;
            }
            workingTimePerUser.push(workingTimeUser)
        }));

        //Build array with number of user par working time
        let workingTimesPerUserDaily = []

        for(let i = 1; i < 12; i++) {
           let numberOfUserForThisClockTime = 0

           workingTimePerUser.forEach((wk) => {
               if(i == wk) {
                   numberOfUserForThisClockTime++
               }
           })

            workingTimesPerUserDaily.push(numberOfUserForThisClockTime)
        }

        const newLineData = {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            datasets: [
                {
                    label: 'Temps de travail',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    data: workingTimesPerUserDaily,
                },
            ],
        };

        setLineData(newLineData)
    }

    return(
        <>
            <h1>General info</h1>
            <Select
                label="Team"
                placeholder="Select a team"
                className="max-w-xs"
                onSelectionChange={handleChangeSelectTeam}
            >
                {teamsList.map((team) => (
                    <SelectItem
                        key={team.id}
                        value={team.name}
                    >
                        {team.name}
                    </SelectItem>
                ))}
            </Select>

            <DatePicker
                className="mr-4 shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                selected={dailyDate}
                onChange={(selectedDate) => handleChangeDaily(selectedDate)}/>

            <div className="chart-line-container">
                <Line data={lineData} options={lineOptions}/>
            </div>
        </>
    )
}