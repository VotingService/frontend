import "./AdminInfo.css"
import AdminPanel from "../AdminPanel/AdminPanel";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminInfo(){
  const navigate = useNavigate();
  useEffect(() => {
    if(sessionStorage.getItem("role") === 'USER'){
      navigate("/home")
    }
  })
  return(
  <div className="admin-info-page">
    <AdminPanel/>
    <div className="no-panel">
      <h1 className="title">Інформація</h1>
      <h3 className="subtitle">Види голосування:</h3>
      <ol>
        <li><b>Єдиний голос</b> - виборець може віддати рівно один голос за одного кандидата. <br/>
          Виборець голосує натиснувши на кружечок навпроти вибраного кандидата.
        </li>
        <li><b>Множинний голос</b> - виборець може віддати рівно один голос за стількох кандидатів, скільки вважатиме за потрібне. <br/>
          Виборець голосує, натиснувши на квадратики тих кандидатів, за яких бажає проголосувати.
        </li>
        <li><b>Оцінка</b> - виборець розподіляє надані йому голоси між кандидатами. <br/>
          Виборець голосує, розподіливши певну кількість голосів між кандидатами, вписавши їх у клітинки навпроти відповідних кандидатів
        </li>
      </ol>
    </div>
  </div>)
}

export default AdminInfo;