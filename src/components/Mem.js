import React, {useState, useEffect} from 'react'
import axios from 'axios'
const byteProByte = 1048576 // 1024 * 1024

const Mem = () => {

  const [memInfo, setMemInfo] = useState('')

  const fetchData = () => {
    axios.get('/mem')
    .then(res => {
    setMemInfo(res.data)      
    })
}

useEffect(()=>{
  setInterval(()=>{
    fetchData()
  },3000)
  console.log(memInfo)
},[])
    return (
      memInfo?
      <div className="card">
        <span>총 메모리 : {Math.floor(parseFloat(memInfo.total)/byteProByte)}MB</span><br/>
        <span>사용중인 메모리 : {Math.floor(parseFloat(memInfo.used)/byteProByte)}MB</span><br/>
        <span></span><br/>
      </div>
      :'로딩중'
    );
  }
  
  export default Mem;
  