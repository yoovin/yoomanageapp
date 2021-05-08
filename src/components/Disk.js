import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Disk = () => {
  const [diskInfo, setDiskInfo] = useState('')

  const fetchData = () => {
    axios.get('/disk')
    .then(res => {
    setDiskInfo(res.data)      
    })
}

useEffect(()=>{
    fetchData()
},[])
    return (
      diskInfo?
      <div className="card">
        <span>{diskInfo.device.map(data => ' '+data)}</span><br/>
        <span>{diskInfo.fs.map(data=>' '+data)}</span><br/>
        <span>총 용량 {diskInfo.fsSize.map(data=>' '+data+'MB')}</span><br/>
        <span>사용가능한 용량{diskInfo.fsUsed.map(data=>' '+data+'MB')}</span><br/>
        <span>사용중인 비율{diskInfo.fsUse.map(data=>' '+data+'%')}</span><br/>
      </div>
      :'로딩중'
    );
  }
  
  export default Disk;
  