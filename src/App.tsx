import { BrowserRouter } from "react-router-dom";
import Rotas from '../src/routes/routes';
import AuthProvider from "./contexts/AuthContext";

const App = () => (

  <BrowserRouter>
    <AuthProvider>
      <Rotas />
    </AuthProvider>
  </BrowserRouter>

);

export default App;
