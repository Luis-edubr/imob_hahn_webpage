import React, { useEffect } from 'react';
import RegistersList from '../../components/RegistersList';
import CreateRegisterForm from '../../components/RegisterForm';

function Create() {
  useEffect(() => {
    document.body.classList.add('background-dashboard');
    return () => {
      document.body.classList.remove('background-dashboard');
    };
  }, []);

  return (
    <>
    <CreateRegisterForm />
    </>
    
  );
}

export default Create;