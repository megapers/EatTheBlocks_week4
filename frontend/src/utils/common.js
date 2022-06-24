import { ethers, Contract } from "ethers";
import DAOArtifact from "../abis/DAO.json";
import ContractAddress from "../abis/contract-address.json";
import Swal from "sweetalert2";

const getBlockchain = () =>
  new Promise(async (resolve, reject) => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();

      const DAOContract = new Contract(
        ContractAddress.DAO,
        DAOArtifact.abi,
        signer
      );

      resolve({ signerAddress, DAOContract });
    }
    else {
      const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_INFURA_URL);
      const wallet = new ethers.Wallet(process.env.REACT_APP_WALLET_PRIVATE_KEY, provider);
      const signer = wallet.connect(provider);
      const signerAddress = await signer.getAddress();

      console.log(signerAddress);

      const DAOContract = new Contract(
        '0x7d7827f9A8CBf2FC848269D4542e40128088AFA1',
        DAOArtifact.abi,
        signer
      );
      resolve({ signerAddress, DAOContract });
    }

    resolve({ signerAddress: undefined, DAOContract: undefined });
  });

function showError(error) {
  Swal.fire({
    icon: "error",
    title: "Transaction Failed",
    text: error.toString(),
  });
}

export { getBlockchain, showError };
