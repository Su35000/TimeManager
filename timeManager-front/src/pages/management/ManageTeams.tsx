import { useState, useEffect } from "react"
import TeamList from "../../components/table/TeamList";
import { useUserState } from "../../context/userContext";
import { ITeam } from "./ManagementPage";
import { getTeamsBasedOnRole } from "../../fetch/users";

export default function ManageTeams(){
    const [teams, setTeams] = useState<ITeam[]>([]);
    const {user} = useUserState()

    const fetchTeams = async () => {
        try {
            const fetchedTeams = await getTeamsBasedOnRole();

            setTeams(fetchedTeams);
        } catch (error) {
            console.error("Error fetching teams:", error);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, [user]);
    
    return(
        <TeamList teams={teams}/>
    )
}