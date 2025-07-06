export interface IVehicle {
  id: number;
  nome: string;
  plate: string;
  status: "ativo" | "inativo";
  createdAt?: string;
}
