import { useState } from "react"


// primero voy a definir un componente que comprueba si el cliente tiene conectada la wallet
export default function InstallWallet () {

    const [connected, setConnected] = useState (false)
// hago una petición async para comprobar si esta instalada la wallet
const ConnectWallet = () => {
  window.ethereum ? (setConnected(true)):(setConnected(false))
}
return (
  <div>
      <button onClick={ConnectWallet}>comprobar instalación de la wallet</button>
      <p>{connected ? ('Wallet instalada'):('Wallet no instalda')}</p>
    </div>
)
  
}
