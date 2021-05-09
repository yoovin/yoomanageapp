import React, {useState, useEffect} from 'react'
import axios from 'axios'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

/*
짜투리 모음
const today = new Date()
const curTime = today.getMinutes() + today.getSeconds()
setCpuData(cpuData.concat({
        'name': curTime,
        'uv': res.data.load
      }))

*/


const Cpu = () => {

  const [cpuInfo, setCpuInfo] = useState('')
  // const [cpuStatus, setCpuStatus] = useState('')
  // const cpuData = useRef([])

  const fetchData = () => {
      axios.get('/cpu')
      .then(res => {
      setCpuInfo(res.data)      
      })
  }

  useEffect(()=>{
    setInterval(()=>{
      fetchData()
      // setCpuStatus(cpuData.current.push({
      //   'name': '1',
      //   'uv': cpuInfo.load
      // }))
    },2000)
  },[])

    return (
      cpuInfo?
      <div className="card">
        <span>Cpu Manufactor : {cpuInfo.manu}</span><br/>
        <span>현재 사용률 : {parseFloat(cpuInfo.load).toFixed(2)}% 대기율 : {parseFloat(cpuInfo.loadIdle).toFixed(2)}%</span><br/>
        <span>현재 온도 {cpuInfo.temps.map((data,index) => (index+1).toString()+'번코어 ' + data+'℃ ')}</span><br/>
      </div>
      :'로딩중'
    );
  }
  
  export default Cpu;
  