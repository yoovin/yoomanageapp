import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
const byteProByte = 1048576 // 1024 * 1024

const Net = () => {

  const [netInfo, setNetInfo] = useState('')
  const netRef = useRef({})

  const fetchData = () => {
    axios.get('/network')
    .then(res => {
    setNetInfo(res.data)
    })
  }

    useEffect(()=>{
      setTimeout(()=>{
        fetchData()
      },1000)
      netRef.current.totalTxBytes = netInfo.totalTxBytes
      netRef.current.totalRxBytes = netInfo.totalRxBytes
    },[netInfo])

    return (
      netInfo?
      <div className="card">
        <span>Network Interface : {netInfo.iface}</span><br/>
        <span>전송한 데이터 : {((parseInt(netInfo.totalTxBytes)-parseInt(netRef.current.totalTxBytes))/byteProByte).toFixed(4)}Mb/s</span><br/>
        <span>받은 데이터 : {((parseInt(netInfo.totalRxBytes)-parseInt(netRef.current.totalRxBytes))/byteProByte).toFixed(4)}Mb/s</span><br/>
        <span>총 전송 데이터 : {(parseInt(netInfo.totalTxBytes)/1073741824).toFixed(2)}Gb</span><br/>
        <span>총 받은 데이터 : {(parseInt(netInfo.totalRxBytes)/1073741824).toFixed(2)}Gb</span>
      </div>
      :'로딩중'
    );
  }
  
  export default Net;