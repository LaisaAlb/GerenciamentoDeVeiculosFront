// src/pages/Dashboard/index.tsx
import { FiEdit, FiTrash2, FiArchive, FiPlusCircle } from "react-icons/fi";
import "./dashboard.css";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { useState, useEffect } from "react";
import {
  getAllVehicles,
  deleteVehicle,
  archiveVehicle,
  unarchiveVehicle,
} from "../../service/vehicle";
import Cards from "../../components/Cards";
import Modal from "../../components/Modal/veiculos";
import Mensagem from "../../components/Modal/mensagens";
import type { IVehicle } from "../../interfaces/Vehicle";

export function Dashboard() {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<IVehicle | null>(null);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [actionType, setActionType] = useState<"archive" | "unarchive" | "delete">("archive");
  const [onConfirmAction, setOnConfirmAction] = useState<() => void>(() => {});

  const [loading, setLoading] = useState(true);
  const [refreshStats, setRefreshStats] = useState(false);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const res = await getAllVehicles();
      const ordered = res.data.sort((a, b) => {
        if (a.status === "ativo" && b.status === "inativo") return -1;
        if (a.status === "inativo" && b.status === "ativo") return 1;
        return 0;
      });
      setVehicles(ordered);
      setRefreshStats((p) => !p);
    } catch (err) {
      console.error("Erro ao buscar veículos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleDelete = (vehicle: IVehicle) => {
    setConfirmMessage(`Deseja realmente excluir o veículo "${vehicle.name}"?`);
    setActionType("delete");
    setOnConfirmAction(() => async () => {
      await deleteVehicle(vehicle.id);
      await fetchVehicles();
      setShowConfirmModal(false);
    });
    setShowConfirmModal(true);
  };

  const handleArchive = (vehicle: IVehicle) => {
    const isInativo = vehicle.status === "inativo";
    setConfirmMessage(
      isInativo
        ? `Deseja desarquivar o veículo "${vehicle.name}"?`
        : `Deseja arquivar o veículo "${vehicle.name}"?`
    );
    setActionType(isInativo ? "unarchive" : "archive");
    setOnConfirmAction(() => async () => {
      if (isInativo) await unarchiveVehicle(vehicle.id);
      else await archiveVehicle(vehicle.id);
      await fetchVehicles();
      setShowConfirmModal(false);
    });
    setShowConfirmModal(true);
  };

  return (
    <div>
      <Header />

      <div className="content">
        <Title />
        <Cards refresh={refreshStats} />

        <div className="button-cadastro">
          <button
            className="btn-cadastro"
            onClick={() => {
              setEditingVehicle(null);
              setShowModal(true);
            }}
          >
            <FiPlusCircle size={18} />
            <span>Cadastrar Veículo</span>
          </button>
        </div>

        {loading ? (
          <p style={{ marginTop: "2rem", fontSize: "1.2rem" }}>
            Carregando veículos...
          </p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Veículo</th>
                <th>Placa</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr
                  key={vehicle.id}
                  className={vehicle.status === "inativo" ? "inactive-row" : ""}
                >
                  <td data-label="Veículo">{vehicle.name}</td>
                  <td data-label="Placa">{vehicle.plate}</td>
                  <td data-label="Status">{vehicle.status}</td>
                  <td data-label="Ações">
                    <button
                      className="action"
                      title="Editar"
                      style={{ backgroundColor: "#4CAF50" }}
                      onClick={() => {
                        setEditingVehicle(vehicle);
                        setShowModal(true);
                      }}
                    >
                      <FiEdit color="#fff" size={17} />
                    </button>

                    <button
                      className="action"
                      title="Arquivar"
                      style={{ backgroundColor: "#FF9800", margin: "0 5px" }}
                      onClick={() => handleArchive(vehicle)}
                    >
                      <FiArchive color="#fff" size={17} />
                    </button>

                    <button
                      className="action"
                      title="Excluir"
                      style={{ backgroundColor: "#f44336" }}
                      onClick={() => handleDelete(vehicle)}
                    >
                      <FiTrash2 color="#fff" size={17} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {showModal && (
          <Modal
            close={() => setShowModal(false)}
            vehicle={editingVehicle}
            onSave={fetchVehicles}
          />
        )}

        {showConfirmModal && (
          <Mensagem
            message={confirmMessage}
            actionType={actionType}
            onConfirm={onConfirmAction}
            onCancel={() => setShowConfirmModal(false)}
          />
        )}
      </div>
    </div>
  );
}
