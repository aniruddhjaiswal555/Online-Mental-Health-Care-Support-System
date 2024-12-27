import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('username');
        const storedEmail = localStorage.getItem('userEmail');
        return storedUser ? { name: storedUser, email: storedEmail, profileIcon: storedEmail.charAt(0).toUpperCase() } : null;
    });

    const updateUser = (name, email) => {
        const newUser = { name, email, profileIcon: email.charAt(0).toUpperCase() };
        setUser(newUser);
        localStorage.setItem('username', name);
        localStorage.setItem('userEmail', email);
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem('username');
        localStorage.removeItem('userEmail');
    };

    return (
        <UserContext.Provider value={{ user, updateUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};
