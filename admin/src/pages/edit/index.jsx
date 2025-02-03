import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { api } from '../../services/api';

function Edit() {
  const { tipo, id } = useParams();

  // Ajuste os campos exatamente como vêm da API
  const [formData, setFormData] = useState({
    bairro: '',
    cidade: '',
    dormitorios: '',
    banheiros: '',
    suites: '',
    garagem: '',
    churrasqueira: '',
    patio: false,
    imagens: '',
    valor: '',
    ativo: true,
  });

  useEffect(() => {
    const fetchImovel = async () => {
      try {
        // Supondo que a resposta venha como { data: { bairro: '...', ... } }
        const response = await api.get(`/admin/getRegisterById/${id}/${tipo}`);
        const dados = response.data.data; // verifique o path exato do objeto

        // Ajuste para setar no formData exatamente as chaves que precisa
        setFormData({
          bairro: dados.bairro || '',
          cidade: dados.cidade || '',
          dormitorios: dados.dormitorios || '',
          banheiros: dados.banheiros || '',
          suites: dados.suites || '',
          garagem: dados.garagem || '',
          churrasqueira: dados.churrasqueira || '',
          patio: dados.patio || false,
          imagens: dados.imagens || '',
          valor: dados.valor || '',
          ativo: dados.ativo ?? true,
        });
      } catch (error) {
        console.error('Erro ao buscar imóvel:', error);
      }
    };

    fetchImovel();
  }, [tipo, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Faça a atualização dos dados
      console.log('Dados a enviar:', formData);
      // ...
    } catch (error) {
      console.error('Erro ao atualizar registro:', error);
    }
  };

  return (
    <Container>
      <h2>Editar Registro - {tipo}</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formBairro">
              <Form.Label>Bairro</Form.Label>
              <Form.Control
                type="text"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formCidade">
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                type="text"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group controlId="formDormitorios">
              <Form.Label>Dormitórios</Form.Label>
              <Form.Control
                type="number"
                name="dormitorios"
                value={formData.dormitorios}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formBanheiros">
              <Form.Label>Banheiros</Form.Label>
              <Form.Control
                type="number"
                name="banheiros"
                value={formData.banheiros}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formSuites">
              <Form.Label>Suítes</Form.Label>
              <Form.Control
                type="number"
                name="suites"
                value={formData.suites}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group controlId="formGaragem">
              <Form.Label>Garagem</Form.Label>
              <Form.Control
                type="number"
                name="garagem"
                value={formData.garagem}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formChurrasqueira">
              <Form.Label>Churrasqueira</Form.Label>
              <Form.Control
                type="number"
                name="churrasqueira"
                value={formData.churrasqueira}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="formPatio">
              <Form.Check
                type="checkbox"
                label="Pátio"
                name="patio"
                checked={formData.patio}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formImagens">
          <Form.Label>Imagens (separadas por vírgula)</Form.Label>
          <Form.Control
            type="text"
            name="imagens"
            value={formData.imagens}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Atualizar
        </Button>
      </Form>
    </Container>
  );
}

export default Edit;