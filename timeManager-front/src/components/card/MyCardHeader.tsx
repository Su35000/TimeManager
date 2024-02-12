import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function MyCardHeader({title}:{title:string}){
    return (
    <CardHeader className="justify-center text-lg mb-0">
        <Card radius="lg">
            <CardBody className="p-2">
                {title}
            </CardBody>
        </Card>
    </CardHeader>
    )
}