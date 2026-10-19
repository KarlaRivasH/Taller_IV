
import { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Alert
} from 'reactstrap';

import './App.css';

function App() {
  const [health, setHealth] = useState(null);
  const [info, setInfo] = useState(null);
  const [errorHealth, setErrorHealth] = useState('');
  const [errorInfo, setErrorInfo] = useState('');

  useEffect(() => {
    // EJERCICIO 4: Consumir endpoint /api/health
    fetch('http://localhost:3001/api/health')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('Error en /api/health');
        }
        return respuesta.json();
      })
      .then((datos) => {
        setHealth(datos);
      })
      .catch(() => {
        setErrorHealth('No se pudo conectar con /api/health');
      });

    // EJERCICIO 5: Consumir endpoint /api/info
    fetch('http://localhost:3001/api/info')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('Error en /api/info');
        }
        return respuesta.json();
      })
      .then((datos) => {
        setInfo(datos);
      })
      .catch(() => {
        setErrorInfo('No se pudo conectar con /api/info');
      });
  }, []);

  return (
    <Container className="mt-5 mb-5">

      {/* EJERCICIO 3: Título principal */}
      <h1 className="text-center mb-4">Taller IV</h1>

      {/* EJERCICIO 4: Estado del API */}
      <section className="health-section">
        <div className="health-box">

          <h4>Estado del API</h4>

          {errorHealth ? (
            <p className="health-error">
              {errorHealth}
            </p>
          ) : health ? (
            health.status === 'ok' ? (
              <div className="health-ok">
                <p>El API está funcionando correctamente</p>
                <p>Estado: {health.status}</p>
                <p>{health.message}</p>
              </div>
            ) : (
              <p className="health-error">
                El API reportó un problema.
              </p>
            )
          ) : (
            <p>Consultando el estado del servidor...</p>
          )}

        </div>
      </section>

      {/* EJERCICIO 5: Información de integrantes */}
      <section className="integrantes-section">

        <h2 className="mt-4 mb-3">
          Información de los integrantes
        </h2>

        {errorInfo ? (
          <Alert color="danger">
            {errorInfo}
          </Alert>
        ) : info ? (
          <>
            <Alert
              color={
                info.status === 'ok' ? 'success' : 'warning'
              }
            >
              <strong>API /api/info</strong>
              <p className="mb-0">
                Estado: {info.status}
              </p>
            </Alert>

            <Row>
              {info.integrantes.map((integrante, index) => (
                <Col md="6" className="mb-3" key={index}>

                  <Card className="h-100 shadow-sm">
                    <CardBody>

                      <CardTitle tag="h5">
                        {integrante.nombre}
                      </CardTitle>

                      <CardText>
                        <strong>Edad: </strong>
                        {integrante.edad ?? 'Pendiente'}
                      </CardText>

                      <CardText>
                        <strong>Carrera: </strong>
                        {integrante.carrera || 'Pendiente'}
                      </CardText>

                      <CardText>
                        <strong>Materias aprobadas: </strong>
                        {integrante.materiasAprobadas ?? 'Pendiente'}
                      </CardText>

                    </CardBody>
                  </Card>

                </Col>
              ))}
            </Row>
          </>
        ) : (
          <p>Cargando información de los integrantes...</p>
        )}

      </section>

    </Container>
  );
}

export default App;
