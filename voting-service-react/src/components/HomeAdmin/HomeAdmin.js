import "./HomeAdmin.css"
import BlocksAdmin from "../BlocksAdmin/BlocksAdmin";
import AdminPanel from "../AdminPanel/AdminPanel";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function HomeAdmin() {
    const  navigate = useNavigate()
    useEffect(() => {
        if(sessionStorage.getItem("role") === 'USER'){
            navigate("/home")
        }
    })
    return (
        <div className="HomeAdmin">
            <AdminPanel></AdminPanel>
            <div>
                <h1>Домашня сторінка</h1>
                <BlocksAdmin></BlocksAdmin>
            </div>
        </div>
    )
}