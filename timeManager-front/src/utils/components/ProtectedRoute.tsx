import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserDispatch, useUserState } from "../../context/userContext";
import { getCurrentUser } from "../../fetch/users";
import ContainerLayout from "../../layout/ContainerLayout";

const ProtectedRoute = () => {
    const dispatch = useUserDispatch();
    const { user, token } = useUserState();
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        // Cette fonction asynchrone vérifie si l'utilisateur est authentifié
        const checkUserAuthentication = async () => {
            // Si l'utilisateur n'est pas dans le contexte mais qu'un token existe
            if (!user && token) {
                try {
                    // Tentez de récupérer les données de l'utilisateur avec le token
                    const response = await getCurrentUser();
                    if (response) {
                        const { data } = response;
                        // Stockez l'utilisateur dans sessionStorage et mettez à jour le contexte
                        sessionStorage.setItem("currentUser", JSON.stringify(data));
                        dispatch({
                            type: "SET_USER",
                            payload: { user: data, token: token }
                        });
                        // L'utilisateur est authentifié
                        setIsAuthenticated(true);
                    } else {
                        // Si la réponse est nulle, retirez le token et redirigez vers login
                        localStorage.removeItem("accessToken");
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    // Gérez les erreurs éventuelles
                    console.error("La vérification de l'authentification a échoué :", error);
                    localStorage.removeItem("accessToken");
                    setIsAuthenticated(false);
                }
            } else if (user) {
                // Si l'utilisateur est déjà dans le contexte, il est authentifié
                setIsAuthenticated(true);
            } else {
                // Si aucun utilisateur ni token, alors l'utilisateur n'est pas authentifié
                setIsAuthenticated(false);
            }
        };

        // Exécutez la vérification d'authentification
        checkUserAuthentication();
    }, [user, token, dispatch]);

    // Pendant la vérification de l'authentification, nous pouvons afficher null ou un indicateur de chargement
    if (isAuthenticated === null) {
        return <div>Chargement...</div>; // Ou un spinner de chargement si vous préférez
    }

    // Si non authentifié, rediriger vers la page de connexion
    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    // Si authentifié, rendre l'Outlet qui rendra les routes enfants
    return <ContainerLayout><Outlet/></ContainerLayout>;
};

export default ProtectedRoute;
