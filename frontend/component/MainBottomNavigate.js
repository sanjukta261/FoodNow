import React from 'react';
import { useSelector } from 'react-redux';
import CustomerBottomTab from './CustomerBottomTab';
import StaffBottomTab from './StaffBottomTab';

const MainBottomNavigate = () => {
  const role = useSelector((state) => state.user.role);

  if (role === 'Customer') return <CustomerBottomTab />;
  else if (role === 'Staff') return <StaffBottomTab />;
  else return null;
};

export default MainBottomNavigate;
