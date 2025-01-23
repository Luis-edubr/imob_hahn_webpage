import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { createNewRegister } from '../utils/crudApiCalls';

const CreateRegisterForm = ({ table }) => {
  const [formData, setFormData] = useState({
    valor: '',
    bairro: '',
    cidade: '',
    dormitorios: '',
    banheiros: '',
    suites: '',
    garagem: '',
    churrasqueira: '',
    patio: false,
    imagens: '',
    ativo: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createNewRegister(formData, table);
      console.log('Registro criado com sucesso:', response.data);
      // Limpar o formulário após o sucesso
      setFormData({
        valor: '',
        bairro: '',
        cidade: '',
        dormitorios: '',
        banheiros: '',
        suites: '',
        garagem: '',
        churrasqueira: '',
        patio: false,
        imagens: '',
        ativo: true,
      });
    } catch (error) {
      console.error('Erro ao criar registro:', error);
    }
  };

return (
    <Container>
        <h2>Criar Novo Registro</h2>
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={6}>
                    <Form.Group controlId="formValor">
                        <Form.Label>Valor</Form.Label>
                        <Form.Control
                            type="number"
                            name="valor"
                            value={formData.valor}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group controlId="formBairro">
                        <Form.Label>Bairro</Form.Label>
                        <Form.Control
                            type="text"
                            name="bairro"
                            value={formData.bairro}
                            onChange={handleChange}
                            required
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
                            required
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
                            required
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
                            required
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
                            required
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
                            required
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
                            required
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
                <Form.Label>Imagens</Form.Label>
                <Form.Control
                    type="file"
                    name="imagens"
                    onChange={(e) => setFormData({ ...formData, imagens: e.target.files })}
                    multiple
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
                Criar Registro
            </Button>
        </Form>
    </Container>
);
};

export default CreateRegisterForm;