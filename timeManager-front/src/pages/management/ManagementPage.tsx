import {useState, useEffect} from "react"
import {useUserState} from "../../context/userContext"
import UserList from "../../components/table/UserList"
import {getTeamsBasedOnRole} from "../../fetch/users";
import {Accordion, AccordionItem, Button, Card, CardHeader} from "@nextui-org/react";
import React from "react";
import { IUser } from "../../reducers/UserReducer";

export interface ITeam {
    id: number,
    manager_id: number,
    name: string,
    users: IUser[]
}

export default function ManagementPage() {
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

    return (
        <>
            {(user.role === "manager" || user.role === "general_manager") &&
                teams.map((team: ITeam) => (
                    <React.Fragment key={team.id}>
                        <Accordion>
                            <AccordionItem
                                aria-label={`accordion for team ${team.name}`}
                                title={team.name}
                                startContent={
                                    <Card className="flex flex-row align-middle justify-center mr-5 py-3 px-5">
                                        <h1 className="text-center">Team</h1> 
                                    </Card>
                                }
                            >
                                {
                                    team.users.length > 1 
                                        ? <UserList users={team.users} teamId={team.id}/> 
                                        : <Card>
                                            <CardHeader className="flex gap-5 justify-center align-middle">
                                                <p>There is no user in this team</p>
                                                {user.role === "general_manager" && <Button className="w-5 px-10" size="sm" children='Add a user'/>}
                                            </CardHeader>
                                        </Card>
                                }
                            </AccordionItem>
                        </Accordion>
                    </React.Fragment>
                ))}
        </>
    )
}