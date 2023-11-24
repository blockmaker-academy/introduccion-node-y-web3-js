import  { useState, useEffect } from 'react';
import Web3 from 'web3';

export function BotonWallet() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    }
  }, []);

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting to MetaMask", error);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  return (
    <div>
      <button onClick={account ? disconnectWallet : connectWallet}>
        {account ? 'Desconectar' : 'Conectar'}
      </button>
      {account && <p>{`${account.substring(0, 8)}...${account.substring(account.length - 8)}`}</p>}
    </div>
  );
}
export default BotonWallet;