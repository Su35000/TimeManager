import {useCallback, Key} from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip} from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon } from "../../assets/icon";
import { ITeam } from "../../pages/management/ManagementPage";

const columns = [
    { name: "TEAM", uid: "name" },
    { name: "ACTIONS", uid: "actions" },
  ];

export default function TeamList({teams}:{teams:ITeam[]}) {
  const renderCell = useCallback((team: ITeam, columnKey: Key) => {
    const cellValue = team[columnKey as keyof ITeam]
    switch (columnKey) {
      case "name":
        return (
            <div className="flex gap-3">
                <h1>{team.name}</h1>
                <Chip className="capitalize" color="primary" size="sm" variant="flat">
                    {team.users.length}
                </Chip>
            </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon fill="currentColor" size={1}/>
              </span>
            </Tooltip>
            <Tooltip content="Edit team">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon fill="currentColor" size={1}/>
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete team">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon fill="currentColor" size={1}/>
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
  <Table aria-label="Table with actions to manage teams">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={teams}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
