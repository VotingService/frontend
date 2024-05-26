import "./HomeAdmin.css"
import BlocksAdmin from "../BlocksAdmin/BlocksAdmin";
import AdminPanel from "../AdminPanel/AdminPanel";

export default function HomeAdmin() {
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