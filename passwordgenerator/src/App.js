import './App.css';
import './ThemeVariables.css';
import PasswordDisplay from './components//PasswordDisplay';
import PasswordGenerator from './components/PasswordGenerator';

function App() {
  return (
    <div className="app-component__container">
      <h1 className="app-component__title">Password Generator</h1>
      <PasswordDisplay />
      <PasswordGenerator />
    </div>
  );
}

export default App;
