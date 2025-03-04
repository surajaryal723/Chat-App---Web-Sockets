import { useEffect, useRef, useState } from "react"


function App() {

const [socket,setSocket]=useState()
const formRef=useRef()

function sendMessage(){
if(!socket){
  return
}
socket.send(formRef.current.value)
}

useEffect(()=>{
const wss = new WebSocket('ws://localhost:8080')
setSocket(wss)
wss.onmessage=(message)=>{
alert(message.data)
}
},[])

  return (
    <>
      <form action="">
        <input type="text" ref={formRef} />
        <button onClick={sendMessage}>Send Message</button>
      </form>
    </>
  )
}

export default App
