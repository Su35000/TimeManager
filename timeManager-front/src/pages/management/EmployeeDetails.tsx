import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {Input} from "@nextui-org/react";
import {fetchWorkingTimes, getAllWorkingTime} from "../../fetch/workingTimes.ts";

export default function EmployeeDetails() {
    const location = useLocation();
    const user = location.state.user;

    const [selectedDate, setSelectedDate] = useState('');
    const [workHours, setWorkHours] = useState([]);

    useEffect(() => {
        const fetchWorkHours = async () => {
            try {
                if (selectedDate) {
                    const formattedStartDate = selectedDate + 'T00:00:00Z';
                    const formattedEndDate = selectedDate + 'T23:59:59Z';
                    const response = await fetchWorkingTimes(user.id, formattedStartDate, formattedEndDate);
                    setWorkHours(response);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des horaires de travail', error);
            }
        };

        fetchWorkHours();
    }, [selectedDate, user.id]);

    return (
        <div>
            <h1>Détails de l'employé</h1>
            {/* Autres détails de l'employé */}

            <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                label="Choisir une date"
            />

            <h2>Horaires de travail pour le {selectedDate} :</h2>
            {workHours.length > 0 ? (
                <ul>
                    {workHours.map((hours, index) => (
                        <li key={index}>{hours.start} - {hours.end}</li>
                    ))}
                </ul>
            ) : (
                <p>Pas d'horaires de travail pour cette date.</p>
            )}
        </div>
    );
}