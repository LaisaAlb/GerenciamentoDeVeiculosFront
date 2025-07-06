import { useEffect, useState } from "react";
import { getVehicleStats } from "../../service/vehicle";
import { FiClipboard } from "react-icons/fi";
import { FaCircle, FaCircleCheck } from "react-icons/fa6";
import "./cards.css";

export default function Cards({ refresh }: { refresh: boolean }) {
  const [stats, setStats] = useState({ total: 0, ativos: 0, inativos: 0 });

  useEffect(() => {
    getVehicleStats().then((response) => {
      setStats(response.data);
    });
  }, [refresh]); 

  return (
    <div className="cards">
      <div className="card azul">
        <div className="header">
          <FiClipboard size={24} color="#0000FF" />
          <p className="nome">Total</p>
        </div>
        <p className="valor">{stats.total}</p>
      </div>

      <div className="card verde">
        <div className="header">
          <FaCircleCheck size={24} color="#4CAF50" />
          <p className="nome">Ativos</p>
        </div>
        <p className="valor">{stats.ativos}</p>
      </div>

      <div className="card laranja">
        <div className="header">
          <FaCircle size={24} color="#FF9800" />
          <p className="nome">Inativos</p>
        </div>
        <p className="valor">{stats.inativos}</p>
      </div>
    </div>
  );
}
