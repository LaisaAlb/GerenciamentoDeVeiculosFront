// src/components/ConfirmModal.tsx
import "./mensagem.css";
import { toast } from "react-toastify";

interface ConfirmModalProps {
  message: string;
  actionType: "archive" | "unarchive" | "delete";
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Mensagem({
  message,
  actionType,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();

    switch (actionType) {
      case "archive":
        toast.info("Veículo arquivado com sucesso!");
        break;
      case "unarchive":
        toast.success("Veículo desarquivado com sucesso!");
        break;
      case "delete":
        toast.error("Veículo excluído com sucesso!");
        break;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal confirm">
        <p className="message">{message}</p>
        <div className="actions">
          <button className="confirm-btn" onClick={handleConfirm}>
            Confirmar
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
