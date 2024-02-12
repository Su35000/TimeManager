import {useState, useEffect} from 'react';
import {useThemeState} from "../../context/themeContext.tsx";

interface IProgressBarProps {
    workingTime:{
        start:string,
        end:string
    }[]
}
export default function ProgressBarWorkingTime({workingTime}:IProgressBarProps) {
    const [startTime, setStartTime] = useState("0:00");
    const [endTime, setEndTime] = useState("0:00");
    const {theme} = useThemeState();

    // startTime et endTime doivent être des chaînes au format 'HH:MM'
    useEffect(() => {
        if (workingTime.length > 0) {
            setStartTime(formatTime24Hour(workingTime[0].start))
            setEndTime(formatTime24Hour(workingTime[0].end))
        }
    }, [workingTime]);


    function formatTime24Hour(isoString: string): string {
        const date = new Date(isoString);
        const hours = date.getUTCHours(); // Utilisez UTC pour ignorer le fuseau horaire local
        const minutes = date.getUTCMinutes();
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }



    const calculateTimePercentage = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        return ((hours + minutes / 60) / 24) * 100;
    };

    const calculateCurrentTimePercentage = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        return ((hours + minutes / 60) / 24) * 100;
    };

    const [currentTimePercentage, setCurrentTimePercentage] = useState(calculateCurrentTimePercentage());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTimePercentage(calculateCurrentTimePercentage());
        }, 60000); // Mise à jour chaque minute
        return () => clearInterval(interval); // Nettoyage à la désactivation
    }, []);

    const workStartPercentage = calculateTimePercentage(startTime);
    const workEndPercentage = calculateTimePercentage(endTime);
    const workDurationPercentage = workEndPercentage - workStartPercentage;

    return (
        <div style={{ position: 'relative', height: '20px', marginBottom: '24px', backgroundColor: theme === "light" ? '#eee' : '#545454', borderRadius: '4px' }}>
            <div style={{ width: `${workDurationPercentage}%`, height: '20px', backgroundColor: '#007bff', position: 'absolute', left: `${workStartPercentage}%` }}></div>
            <div style={{ width: '3px', height: '20px', backgroundColor: 'red', position: 'absolute', left: `${currentTimePercentage}%` }}></div>
            <div style={{ position: 'absolute', top: '22px', left: '0', color: theme === "light" ? '#333' : '#FFF' }}>00:00</div>
            <div style={{ position: 'absolute', top: '22px', left: `${workStartPercentage}%`, color: theme === "light" ? '#333' : '#FFF', transform: 'translateX(-50%)' }}>{startTime !== "0:00" && startTime}</div>
            <div style={{ position: 'absolute', top: '22px', left: `${workEndPercentage}%`, color: theme === "light" ? '#333' : '#FFF', transform: 'translateX(-50%)' }}>{endTime !== "0:00" && endTime}</div>
            <div style={{ position: 'absolute', top: '22px', right: '0', color: theme === "light" ? '#333' : '#FFF' }}>23:59</div>
        </div>
    );
};
