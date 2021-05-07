import React, {useState, useEffect} from 'react'


const Cpu = () => {

  [cpuInfo, setCpuInfo] = useState('')

  const fetchData = () => {
    
  }

  useEffect(()=>{
  },[])

    return (
      <div>
        {cpuInfo.load}<br/>
        {cpuInfo.temps}
      </div>
    );
  }
  
  export default Cpu;
  