import './App.css';

import { Container, Row, Col } from 'react-bootstrap';
import FormContainer from './components/form/formcontainer/FormContainer';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Container>
          <Row>
            <Col className='text-center'>
              <h1> Books App </h1>
              <span> Reactjs Book library with localstorage </span>
            </Col>
          </Row>
        </Container>
      </header>
      <hr />
      <main>
        <Container>
          <Row>
            <Col>
              <FormContainer></FormContainer>
            </Col>
          </Row>
        </Container>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
