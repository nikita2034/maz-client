import { createContext, useContext } from 'react';
import {Outlet,Navigate } from "react-router-dom";
import {AuthContextIntarface} from '../types/authTypes'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;
export const AuthContext = createContext<AuthContextIntarface | null>(null);

const ProtectedRoute = ({ requiredRoles }: { requiredRoles: string[] }) => {
  const role = (JSON.parse(localStorage.getItem('user') || '{}') || {}).role;
  const token = (JSON.parse(localStorage.getItem('user') || '{}') || {}).token;
  const hasAccess = token && requiredRoles.includes(role!);
  return hasAccess ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;

interface UserContextType {
  roleUser: string | null;
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [roleUser, setRole] = useState<string | null>(null); 

    const fetchRoleData = async () => {
      try {
        const token = (JSON.parse(localStorage.getItem('user') || '{}') || {}).token;
        if (!token) {
          throw new Error('Токен не найден в localStorage');
        }
    
        const response = await axios.get(`${apiUrl}/user/role`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setRole(response.data.role);
      } catch (error) {
        if (error) {
          console.error('Ошибка при получении данных:', error);
        } else {
          console.error('Ошибка при получении роли:', error);
        }
      }
    };

    useEffect(() => {
            fetchRoleData(); 
    }, []);

    return (
        <UserContext.Provider value={{ roleUser,setRole  }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};