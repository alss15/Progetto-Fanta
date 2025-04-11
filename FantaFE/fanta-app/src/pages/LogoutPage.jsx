import react from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LogoutPage = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        logout();
        navigate("/", { replace: true });
    }, [logout, navigate]);
    
    return null; // Non è necessario restituire nulla qui
    }

    return (
        <div className="logout-page" style={{ minHeight: "100vh", backgroundSize: "cover", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <h1 style={{ color: "#044c93", fontFamily: "'Poppins', sans-serif" }}>Logout in corso...</h1>
        </div>
    );

