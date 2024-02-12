import {Card, CardBody} from "@nextui-org/react";
import {Outlet} from "react-router-dom";

export default function ContainerLayout({children}: any) {
    return (
        <div>
            <Card className="px-7 py-7">
                <CardBody>
                    {
                        children ? children : <Outlet/>
                    }
                </CardBody>
            </Card>
        </div>
    );
}
