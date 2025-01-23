import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Button, Table, Form, InputGroup, Spinner } from 'react-bootstrap';

const RegistersList = () => {
  const [casas, setCasas] = useState([]);
  const [filteredCasas, setFilteredCasas] = useState([]);

  const [terrenos, setTerrenos] = useState([]);
  const [filteredTerrenos, setFilteredTerrenos] = useState([]);

  const [comerciais, setComerciais] = useState([]);
  const [filteredComerciais, setFilteredComerciais] = useState([]);

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchImoveis = async () => {
    try {
      // Exemplo de retorno: { data: { casas: [...], terrenos: [...], comerciais: [...] } }
      const response = await api.get('/admin/getAllRegisters');
      // O objeto retornado é algo como: { data: { casas: [...], terrenos: [...], comerciais: [...] } }
      // Então precisamos acessar "response.data.data"
      const { casas = []} = response.data.data || {};

      // Seta as listas originais
      setCasas(casas);
      // setTerrenos(terrenos);
      // setComerciais(comerciais);

      // Seta as listas filtradas iguais às originais
      setFilteredCasas(casas);
      // setFilteredTerrenos(terrenos);
      // setFilteredComerciais(comerciais);

      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar imóveis:', error);
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchImoveis();
  }, []);

  const handleSearchChange = (e) => {
    const texto = e.target.value.toLowerCase();
    setSearch(texto);

    if (!texto) {
      // Se não estiver pesquisando nada, mostra tudo
      setFilteredCasas(casas);
    //   setFilteredTerrenos(terrenos);
    //   setFilteredComerciais(comerciais);
      return;
    }

    // Se tiver texto, filtra cada lista separadamente
    setFilteredCasas(casas.filter((imovel) => imovel.bairro?.toLowerCase().includes(texto)));
    // setFilteredTerrenos(terrenos.filter((imovel) => imovel.bairro?.toLowerCase().includes(texto)));
    // setFilteredComerciais(comerciais.filter((imovel) => imovel.bairro?.toLowerCase().includes(texto)));
  };

  const renderLista = (lista) =>
    lista.map((imovel) => (
      <tr key={imovel.idcasa}>
        <td>{imovel.bairro}</td>
        <td>{imovel.valor}</td>
        <td>
          <Button variant="warning" className="me-2">
            Editar
          </Button>
          <Button variant="danger">Excluir</Button>
        </td>
      </tr>
    ));

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Imóveis</h1>
        <div className="d-flex">
          <InputGroup className="me-2">
            <Form.Control
              type="text"
              placeholder="Pesquisar..."
              value={search}
              onChange={handleSearchChange}
            />
          </InputGroup>
          <Button variant="primary">Adicionar Imóvel</Button>
        </div>
      </div>

      <h2>Casas</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Bairro</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{renderLista(filteredCasas)}</tbody>
      </Table>

      <h2>Terrenos</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Bairro</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{renderLista(filteredTerrenos)}</tbody>
      </Table>

      <h2>Imóveis Comerciais</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Bairro</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{renderLista(filteredComerciais)}</tbody>
      </Table>
    </div>
  );
};

export default RegistersList;