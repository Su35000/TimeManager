import {FormEvent, useState} from 'react';
import { Spacer } from '@nextui-org/react';
import {addingWorkingTime} from "../../fetch/workingTimes.ts";

export default function NewWorkingTimeForm( {user}:any ) {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); // Empêche le rechargement de la page
        const data = {
            working_time: {
                start,
                end,
                user
            }
        }
        addingWorkingTime(data)

    };

    return (
        <form onSubmit={handleSubmit} id="editUserForm">
            <div>
                <label htmlFor="start-date">Date de début:</label>
                <input
                    type="datetime-local"
                    id="start-date"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    aria-label="Choisir la date de début"
                />
            </div>
            <Spacer y={1} />
            <div>
                <label htmlFor="end-date">Date de fin:</label>
                <input
                    type="datetime-local"
                    id="end-date"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    aria-label="Choisir la date de fin"
                />
            </div>
        </form>
    );
};
