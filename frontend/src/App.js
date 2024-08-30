import './styles/App.css';
import NavBar from './components/header/header'
import Footer from './components/footer'

import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

function App() {
  return (
    <div className="App">
    <NavBar/>
    <main>
      <Container>
        <Outlet />
      </Container>
      <Footer/>
    </main>  
  </div>
  );
}

export default App;
