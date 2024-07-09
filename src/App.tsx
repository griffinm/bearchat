import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { UserProvider } from './providers/UserProvider';
import { Router } from './components/router/Router';
import { WSProvider } from './providers/wsProvider';

function App() {
  return (
    <UserProvider>
      <WSProvider>
        <Router />
      </WSProvider>
    </UserProvider>
  );
}

export default App;
