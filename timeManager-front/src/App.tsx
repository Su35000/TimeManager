import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import ContainerLayout from "./layout/ContainerLayout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ProtectedRoute from "./utils/components/ProtectedRoute";
import ErrorComponent from "./utils/components/ErrorComponent";
import GeneralInfo from "./pages/generalInfo/GeneralInfo";
import Profile from "./pages/account/Profile";
import Security from "./pages/account/Security";
import ManagementPage from "./pages/management/ManagementPage";
import CheckingRole, {UserRole} from "./utils/components/CheckingRole.tsx";
import { Dashboard } from "./pages/dashboards/Dashboard.tsx";
import { useUserState } from "./context/userContext.tsx";
import Help from "./pages/documentation/Help.tsx";
import ManageTeams from "./pages/management/ManageTeams.tsx";

export default function App() {
  const {user} = useUserState();
  return (
      <Routes>
        <Route path="/" element={<MainLayout/>}>
            <Route path="help" element={<Help/>}/>
            <Route path="auth" element={<ContainerLayout/>}>
              <Route path="login" element={<Login/>}/>
              <Route path="register" element={<Register/>}/>
            </Route>

            <Route path="/" element={<ProtectedRoute />}>
                {/* reachable for all users */}
                <Route path="dashboard" element={<Dashboard user={user}/>}/>

                <Route path="account">
                  <Route path="myProfile" element={<Profile/>}/>
                  <Route path="security" element={<Security/>}/>
                </Route>

                {/* Only for managers */}
                <Route element={<CheckingRole role={UserRole.MANAGER}/>}>
                    <Route path="general-info" element={<GeneralInfo/>}/>
                    <Route path="teams" element={<ManageTeams/>}/>
                    <Route path="manage" element={<ManagementPage/>}/>
                </Route>

            </Route>

            <Route path="*" element={<ErrorComponent/>}/>
        </Route>
      </Routes>
  )
}