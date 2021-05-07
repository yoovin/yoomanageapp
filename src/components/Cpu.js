import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Cpu = () => {
  const [cpuInfo, setcpuInfo] = useState('')

  const fetchData = () => {
    setInterval(() => {
      const url = '/cpu'
      axios.get(url)
      .then(res=>setcpuInfo(res.data))
    },2000)
  }

  useEffect(()=>{
    fetchData()
  },[])

    return (
      <div>
        {cpuInfo.load}<br/>
        {cpuInfo.temps}
      </div>
    );
  }
  
  export default Cpu;
  