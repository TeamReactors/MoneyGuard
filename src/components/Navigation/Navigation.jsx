import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) return null;

  return (
    <nav>
      <NavLink to="/home" end>Home</NavLink>
      <NavLink to="/statistics">Statistics</NavLink>
      <NavLink to="/currency">Currency</NavLink>
      <NavLink to="/header">Header</NavLink>

    </nav>
  );
};

export default Navigation;