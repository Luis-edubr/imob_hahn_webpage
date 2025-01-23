import React, { useEffect } from 'react';
import RegistersList from '../../components/RegistersList';

function Dashboard() {
  useEffect(() => {
    document.body.classList.add('background-dashboard');
    return () => {
      document.body.classList.remove('background-dashboard');
    };
  }, []);

  return (
    <>
    <h1 style={{marginLeft: 50}}>Página geral de imóveis</h1>
    <RegistersList />
    </>
    
  );
}

export default Dashboard;