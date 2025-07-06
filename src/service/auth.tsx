import type { ILogin } from '../interfaces/Login';
import type { IRegister } from '../interfaces/Register';
import { api } from './api';

export const Auth = {
  login: (data: ILogin) => {
    return api.post('/auth/login', data);
  },

  register: (data: IRegister) => {
    return api.post('/auth/register', data);
  },

  logout: () => {

    localStorage.removeItem('token');
    localStorage.removeItem('userName');
  },
};
