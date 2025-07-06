import type { IVehicle } from '../interfaces/Vehicle.ts'; 
import { api } from './api';

// Buscar todos os veículos (retorna array de IVehicle)
export const getAllVehicles = () => api.get<IVehicle[]>('/vehicles');

// Criar veículo
export const createVehicle = (data: IVehicle) => api.post<IVehicle>('/vehicles', data);

// Atualizar veículo
export const updateVehicle = (id: number, data: IVehicle) => api.put<IVehicle>(`/vehicles/${id}`, data);

// Arquivar veículo
export const archiveVehicle = (id: number) => api.patch<IVehicle>(`/vehicles/${id}/archive`);

// Desarquivar veículo
export const unarchiveVehicle = (id: number) => api.patch<IVehicle>(`/vehicles/${id}/unarchive`);

// Deletar veículo
export const deleteVehicle = (id: number) => api.delete(`/vehicles/${id}`);

// Obter estatísticas (retorna um objeto com total, ativos, inativos)
export const getVehicleStats = () => api.get<{ total: number; ativos: number; inativos: number }>('/vehicles/stats');


// // Buscar todos os veículos
// export const getAllVehicles = () => {
//   return api.get('/vehicles');
// };

// // Criar um novo veículo
// export const createVehicle = (data: IVehicle) => {
//   return api.post('/vehicles', data);
// };


// // Atualizar veículo
// export const updateVehicle = (id: number, data: IVehicle) => {
//   return api.put(`/vehicles/${id}`, data);
// };

// // Arquivar veículo
// export const archiveVehicle = (id: number) => {
//   return api.patch(`/vehicles/${id}/archive`);
// };

// // Desarquivar veículo
// export const unarchiveVehicle = (id: number) => {
//   return api.patch(`/vehicles/${id}/unarchive`);
// };

// // Deletar veículo
// export const deleteVehicle = (id: number) => {
//   return api.delete(`/vehicles/${id}`);
// };

// // Obter estatísticas (para os cards)
// export const getVehicleStats = () => {
//   return api.get('/vehicles/stats');
// };
