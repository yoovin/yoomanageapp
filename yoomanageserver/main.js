const sysinfo = require('systeminformation')
const app = require('express')()
const port = 3030
const byteProByte = 1048576 // 1024 * 1024

app.get('/cpu', async (req, res) => {
    let cpuInfo = {}
    await sysinfo.cpu().then(data => {
        cpuInfo.manu = data.manufacturer + data.brand // cpu이름
        cpuInfo.core = data.cores //cpu 코어 수
    })
    await sysinfo.cpuTemperature().then(data => {
        cpuInfo.temps = data.cores //cpu 코어 별 온도
    })
    await sysinfo.cpuCurrentSpeed().then(data => {
        cpuInfo.cpuSpeedAvg = data.avg // cpu 속도 평균
        cpuInfo.cpuSpeedCores = data.cores // cpu 코어 별 속도
    })
    await sysinfo.currentLoad().then(data => {
        cpuInfo.load = data.currentLoad.toFixed(2) // cpu 사용량 %
        cpuInfo.loadIdle = data.currentLoadIdle.toFixed(2) // cpu 사용 x %
    })
    await res.send(cpuInfo)
})

app.get('/mem', async (req,res) => {
    let memInfo = {}
    await sysinfo.mem().then(data => {
        // memInfo.totalMem = data.total/byteProByte // 총 메모리
        // memInfo.currentUseMem = data.used/byteProByte // 가용 메모리
        // memInfo.active = data.active/byteProByte // 사용중인 메모리
        // memInfo.available = data.available/byteProByte // 사용가능한 메모리
        memInfo = data
    })
    await res.send(memInfo)
})

app.get('/disk', async (req,res) => {
    let diskInfo = {}
    await sysinfo.diskLayout().then(data => {
        diskInfo.device = data.map(item => item.device) // disk 디바이스
        diskInfo.type = data.map(item => item.type) // disk 종류
        diskInfo.size = data.map(item => Math.floor(item.size/byteProByte/1024)) // disk 사이즈 GB 소수점 버림
        diskInfo.name = data.map(item => item.name) // disk 이름
    })
    await sysinfo.fsSize().then(data => {
        diskInfo.fs = data.map(item => item.fs) // 디바이스
        diskInfo.fsType = data.map(item => item.type) // 파일시스템 종류
        diskInfo.fsSize = data.map(item => Math.floor(item.size/byteProByte)) // 사이즈
        diskInfo.fsUsed = data.map(item => Math.floor(item.used/byteProByte)) // 사용중인 용량 MB 소수점 버림
        diskInfo.fsAva = data.map(item => Math.floor(item.available/byteProByte)) // 사용가능한 용량 MB 소수점 버림
        diskInfo.fsUse = data.map(item => item.use) // 사용비율
        diskInfo.fsMount = data.map(item => item.mount) // 마운트 위치
    })
    await res.send(diskInfo)
})

app.get('/network', async (req, res) => {
    let netInfo = {}
    await sysinfo.networkStats().then(data => {
        netInfo.iface = data.map(item=>item.iface) // network 이름
        netInfo.totalRxBytes = data.map(item => item.rx_bytes) // 총 받은 네트워크 데이터 양
        netInfo.totalTxBytes = data.map(item => item.tx_bytes) // 총 전송한 네트워크 데이터 양 
    })
    await res.send(netInfo)
})

app.listen(port, () => {
    console.log(`대충 ${port}에서 서버 돌아간다는 뜼ㅎ`)
  })