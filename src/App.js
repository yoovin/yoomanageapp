import './App.css';
import Cpu from './components/Cpu'
import Mem from './components/Mem'
import Disk from './components/Disk'

function App() {
  return (
    <div className="App">
      <Cpu/>
      <Mem/>
      <Disk/>
    </div>
  );
}

export default App;
