import React, { useEffect, useState } from 'react'
import Web3 from "web3";
import SimpleStorage from "./contracts/SimpleStorage.json";
import './App.css';

function App() {

  const [state,setState] = useState({
    web3:null,
    contract:null
  });

  useEffect(()=>{
  async function init(){
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
      const web3 = new Web3(provider); // setting the provider
      const networkId = await web3.eth.net.getId(); // builtin function to get the network ID
      const deployedNetwork = SimpleStorage.networks[networkId]; // fetching the address of contract via network ID

      console.log("Contract address: ",deployedNetwork.address);
      const contract =  new web3.eth.Contract(SimpleStorage.abi,deployedNetwork.address);
      console.log(contract);
      setState({web3:web3,contract:contract}); // setting the state of contract...
    }
    init();
  },[])

  // useEffect(()=>{
  //   const{ contract } = state;
  //   async function read(){
  //     const data = await contract.methods.getter().call();
  //     console.log(data);
  //   }
  //   contract && read();
  // },[state,state.contract]);

  useEffect(()=>{
    const{contract} = state;
    console.log(contract);
    async function read(){
      const data = await contract.methods.getter().call();
      console.log(data);
    }
    contract && read();
  },[state,state.contract])
  // if there is any change in the dependecy list then it will re-run

  // async function setValue(){ 
  //   const {contract} = state;
  //   console.log(contract)
  // }

  return (
    <div className="App">
      <div>This is my data</div>
    </div>
  );
  }



export default App;
