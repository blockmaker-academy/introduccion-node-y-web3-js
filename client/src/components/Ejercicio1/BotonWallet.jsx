import { useState } from "react";
import Web3 from 'web3'

export default function BotonWallet (){
    const [connect, setConnnect]= useState(false)
    const [account, setAccount]= useState(null)
// creo una función async para llamar y esperar respuesta
    const connectWallet = async () => {
// pruebo a llamar a la wallet y conectarme a ella
        try{
            if(window.ethereum) { 
// creo una instancia para introducir la comunicación de la wallet en una variable
                const web3 = new Web3(window.ethereum)
// espero a recibir autorización para acceder a la billetera
                await window.ethereum.enable()
// cogo (getAccounts) las cuentas de la billetera en una variable
                const accounts = web3.eth.getAccounts()
// compruebo que tengo cuentas y si tengo cuentas introduzco la cuenta  primera (accounts(0))
// en una variable (account) que he de declarar el estado arriba.
                if(accounts.lenth >0){
                    setAccount(accounts[0])
                    setConnnect(true)
                }

            }
            else {
                console.error ('No se encontró la billetera en el navegador')
        }
    }
    catch (error) {console.error('Error al conecar la billetera')}
    }
    const disconnectWallet = () => {
        setAccount(null)
        setConnnect(false)
    }
    return(
// Saco por pantalla un boton que conecte o desconecte la billete y ma muestre el numero de cuenta
// Voy a utilizar un operador ternario y otra función para desconectar (disconnectWallet)
        <div>
            {connect ? (
                <div>
                    <p>
                        Dirección de la cuenta {account}
                    </p>
                    <button onClick={disconnectWallet}>Desconectar la Wallet</button>
                </div>
            ):(
                <button onClick={connectWallet}>Conectar la wallet</button>
            )}
        </div>
    )
}