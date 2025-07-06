import { useEffect, useState } from "react";
import { HiOutlineTruck } from "react-icons/hi";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import "./modal.css";
import { createVehicle, updateVehicle } from "../../../service/vehicle";

export default function Modal({ close, vehicle, onSave }: VehicleModalProps) {
  const [name, setName] = useState("");
  const [plate, setPlate] = useState("");

  useEffect(() => {
    if (vehicle) {
      setName(vehicle.name);
      setPlate(vehicle.plate);
    } else {
      setName("");
      setPlate("");
    }
  }, [vehicle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação do nome
    if (name.trim().length < 4) {
      toast.warning("O nome do veículo deve ter pelo menos 4 caracteres.");
      return;
    }

    // Validação da placa
    const plateRegex = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/i;
    if (!plateRegex.test(plate)) {
      toast.error("Placa inválida. Use o formato brasileiro (ex: ABC1D23 ou ABC1234).");
      return;
    }

    try {
      if (vehicle && vehicle.id) {
        await updateVehicle(vehicle.id, {
          name,
          plate,
          status: vehicle.status || "ativo",
        });
        toast.info("Veículo editado com sucesso!");
      } else {
        await createVehicle({ name, plate, status: "ativo" });
        toast.success("Veículo criado com sucesso!");
      }

      onSave();
      close();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar veículo. Tente novamente.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>
            <HiOutlineTruck size={55} color="#000" className="icon" />
            <p className="text">
              {vehicle && vehicle.id ? "Editar Veículo" : "Cadastrar Novo Veículo"}
            </p>
          </h2>
          <FiX size={24} className="close-icon" onClick={close} />
        </div>

        <form className="form-horizontal" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Nome do Veículo</label>
            <input
              type="text"
              id="name"
              placeholder="Digite o nome do Veículo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="plate">Placa do Veículo</label>
            <input
              type="text"
              id="plate"
              placeholder="Digite a placa do veículo"
              value={plate}
              onChange={(e) => setPlate(e.target.value.toUpperCase())}
              maxLength={7}
            />
          </div>

          <button type="submit" className="save-button">
            {vehicle && vehicle.id ? "Editar Veículo" : "Criar Veículo"}
          </button>
        </form>
      </div>
    </div>
  );
}

interface VehicleModalProps {
  close: () => void;
  vehicle: Vehicle | null;
  onSave: () => void;
}

type Vehicle = {
  id?: number;
  name: string;
  plate: string;
  status?: string;
};
