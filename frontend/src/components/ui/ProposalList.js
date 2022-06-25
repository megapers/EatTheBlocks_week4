import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FcApproval } from "react-icons/fc";
import { ImLibrary, ImQuill } from "react-icons/im";
import { useEffect, useState, useContext, useCallback } from "react";
import { showError } from "../../utils/common";
import BlockchainContext from '../../store/blockchain-context';

const ProposalList = () => {
  const [contractValues, setContractValues] = useState({proposals: [], isAdmin: false});
  const blockchainContext = useContext(BlockchainContext);
  const provider = blockchainContext.provider;

  const getProposals = useCallback(async () => {
    const { DAOContract, signerAddress } = provider;
    try {
      signerAddress && setContractValues({
        proposals: await DAOContract.getProposals(),
        isAdmin: (await DAOContract.admin()) == signerAddress
      });

    } catch (error) {
      showError(error);
    }
  });

  const vote = async (id) => {
    const { DAOContract, signerAddress } = provider;
    try {
      await DAOContract.vote(id);
    } catch (error) {
      showError(error);
    }
  };

  const execute = async (id) => {
    const { DAOContract, signerAddress } = provider;
    try {
      await DAOContract.executeProposal(id);
    } catch (error) {
      showError(error);
    }
  };

  useEffect(() => {
    getProposals();
  }, [getProposals]);

  return (
    <div>
      <h3>All Proposals</h3>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Recipient</th>
            <th>Votes</th>
            <th>Voting Ends</th>
            <th>Active</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contractValues.proposals.map((proposal) => (
            <tr key={proposal.id.toString()}>
              <td>{proposal.id.toNumber()}</td>
              <td>{proposal.name}</td>
              <td>{proposal.amount.toString()}</td>
              <td>{proposal.recipient}</td>
              <td>{proposal.votes.toString()}</td>
              <td>{new Date(proposal.end * 1000).toString()}</td>
              <td>
                <FcApproval />
              </td>
              <td>
                <Button onClick={() => vote(proposal.id)}>
                  <ImQuill /> Vote
                </Button>
              </td>
              <td>
                {contractValues.isAdmin && (
                  <Button onClick={() => execute(proposal.id)}>
                    <ImLibrary /> Execute
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProposalList;
