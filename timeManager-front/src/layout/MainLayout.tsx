import {Outlet} from "react-router-dom";
import Footer from "../components/footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import MobileNavBar from "../components/navbar/MobileNavBar";

export default function MainLayout() {
    return (

        <div className="flex flex-col h-screen justify-between">
            {/* {isMobile ? <MobileNavBar/> : <NavBar/>} */}
            <MobileNavBar/>
            {/* <MainNavBar/> */}
            <div className="flex-grow">
                <Outlet/>
                <ToastContainer/>
            </div>
            <Footer/>

        </div>

    )
}