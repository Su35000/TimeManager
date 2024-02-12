import {Key} from "react"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Modal,
  useDisclosure,
  ModalContent,
} from "@nextui-org/react";
import { EditIcon, DeleteIcon, EyeIcon } from "../../assets/icon";
import { useCallback, useState } from "react";
import EditUserModal from "../modals/EditUserModal.tsx";
import { useUserState } from "../../context/userContext.tsx";
import { removeUserFromTeamList } from "../../fetch/users.ts";
import { Dashboard } from "../../pages/dashboards/Dashboard.tsx";
import { IUser } from "../../reducers/UserReducer.tsx";

const columns = [
  { name: "NAME", uid: "username" },
  { name: "ROLE", uid: "role" },
  { name: "DAILY HOURS", uid: "daily" },
  { name: "WEEKLY HOURS", uid: "weekly" },
  { name: "ACTIONS", uid: "actions" },
];


export default function UserList({ users, teamId }: {users:IUser[], teamId:number}) {
  // TODO vérifier typage pour tout le composant userList
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user: currentUser } = useUserState();

  const [ displayComponent, setDisplayComponent] = useState<React.ReactNode>()

  
  const deleteTheUser = (id: number) => {
    // deleteUser(id)
    console.log("l'utilisateur n°", id, "a été supprimé");
  };

  const selectComponentModal = (componentName:string, user:IUser) => {
    switch (componentName) {
        case "edit":
            setDisplayComponent(<EditUserModal user={user}/>)
            break;
        case "view":
            setDisplayComponent(<ModalContent><Dashboard user={user}/></ModalContent>)
            break;
        default:
            break;
    }
    onOpen();
  }

  const removeUserFromTeam = async (user_id: number, team_id: number) => {
    removeUserFromTeamList(user_id, team_id);
  };
  
  const renderCell = useCallback((user: any, columnKey: Key) => {
    const cellValue = user[columnKey as keyof IUser];
    switch (columnKey) {
      case "username":
        return user.id !== 0 ? (
          <User
            avatarProps={{ radius: "lg", src: "" }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        ) : (
          <p className=" text-end">{user.username}</p>
        );
      case "role":
      case "daily":
      case "weekly":
        return (
          <div className="flex flex-col ">
            <p className="text-bold text-sm capitalize text-center">
              {cellValue}
            </p>
          </div>
        );
      case "actions":
        if (user.id === 0) {
          return;
        }

        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Employee dashboard">
                <span 
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    onClick={()=> selectComponentModal("view", user)}
                >
                  <EyeIcon fill="currentColor" size={1} />
                </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => selectComponentModal("edit", user)}
              >
                <EditIcon fill="currentColor" size={1} />
              </span>
            </Tooltip>
            <Tooltip
              color="danger"
              content={
                currentUser.role === "manager"
                  ? "Remove user from the team"
                  : "Delete user"
              }
            >
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={
                  currentUser.role === "manager"
                    ? () => removeUserFromTeam(user.id, teamId)
                    : () => deleteTheUser(user.id)
                }
              >
                <DeleteIcon fill="currentColor" size={1} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <Table aria-label="User table with name, role, worked hours and actions" isStriped>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item: IUser) => (
            <TableRow key={item.username}>
              {(columnKey:Key) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        children={displayComponent}
        placement="top"
        backdrop="blur"
      />
    </>
  );
}
