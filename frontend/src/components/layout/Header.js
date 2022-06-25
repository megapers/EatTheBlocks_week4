import AddNewProposal from "../ui/AddNewProposal";
import Contribute from "../ui/Contribute";
import Transfer from "../ui/Transfer";
import Redeem from "../ui/Redeem";
import Withdraw from "../ui/Withdraw";
import { Alert, Badge } from "react-bootstrap";
import { showError } from "../../utils/common";
import { useEffect, useState, useContext } from "react";
import BlockchainContext from '../../store/blockchain-context';

const Header = () => {
  const [contractValues, setContractValues] = useState({});
  const currentTimestamp = +new Date() / 1000;
  const blockchainContext = useContext(BlockchainContext);
  const provider = blockchainContext.provider;

  const getShares = async () => {
    const { DAOContract, signerAddress } = provider;
    try {
      signerAddress && setContractValues({
        shares: (await DAOContract.shares(signerAddress)).toString(),
        contributionEnd: (await DAOContract.contributionEnd()).toNumber(),
        availableFunds: (await DAOContract.availableFunds()).toString(),
        isAdmin: (await DAOContract.admin()) === signerAddress
      });

    } catch (error) {
      showError(error);
    }
  };

  useEffect(() => {
    getShares();

  }, [contractValues]);

  return (
    <div>
      <Alert variant="success">
        <Alert.Heading>Hey, you have {contractValues.shares} shares</Alert.Heading>
        <p>
          Contribution to this DAO is ends on:{" "}
          <b> {new Date(contractValues.contributionEnd * 1000).toString()}</b>
        </p>
        <p>Total Available Funds : {contractValues.availableFunds}</p>
        <hr />
        <div className="mb-0">
          <div className="d-flex justify-content-end m-4">
            {currentTimestamp < contractValues.contributionEnd && <Contribute />}
            <Transfer />
            <Redeem />
            {contractValues.isAdmin && <Withdraw />}
            <AddNewProposal />
          </div>
        </div>
      </Alert>
    </div>
  );
};

export default Header;
