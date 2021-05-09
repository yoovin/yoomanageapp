import './App.css';
import Cpu from './components/Cpu'
import Mem from './components/Mem'
import Disk from './components/Disk'
import Net from './components/Net'

function App() {
  return (
    <div className="App">
      <Cpu/>
      <Mem/>
      <Disk/>
      <Net/>
    </div>
  );
}

export default App;
