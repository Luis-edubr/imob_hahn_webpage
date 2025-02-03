import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import CreateRegisterForm from '../../components/RegisterForm';

function Create() {
  const [selectedForm, setSelectedForm] = useState('');

  const forms = [
    { label: 'Imóvel - Casa', value: 'CASA' },
    { label: 'Imóvel - Sala Comercial', value: 'SALA' },
    { label: 'Outro Tipo', value: 'OUTRO' },
  ];

  useEffect(() => {
    document.body.classList.add('background-dashboard');
    return () => {
      document.body.classList.remove('background-dashboard');
    };
  }, []);

  return (
    <>
      <h1 style={{ marginLeft: 50 }}>Criar Novo Registro</h1>

      <div style={{ marginLeft: 50, marginBottom: 20 }}>
        {forms.map((form) => (
          <Button
            key={form.value}
            variant="primary"
            className="me-2"
            onClick={() => setSelectedForm(form.value)}
          >
            {form.label}
          </Button>
        ))}
      </div>

      {selectedForm === 'CASA' && <CreateRegisterForm table="casas" formType="CASA" />}
      {selectedForm === 'SALA' && <CreateRegisterForm table="comerciais" formType="SALA" />}
      {selectedForm === 'OUTRO' && (
        <p style={{ marginLeft: 50 }}>Formulário para outro tipo de registro...</p>
      )}
    </>
  );
}

export default Create;