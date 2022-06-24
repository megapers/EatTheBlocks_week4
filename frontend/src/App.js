import { useContext } from "react";
import Navbar from "./components/layout/Navbar";
import Container from "react-bootstrap/esm/Container";
import ProposalList from "./components/ui/ProposalList";
import Header from "./components/layout/Header";
import BlockchainContext, { BlockchainContextProvider } from './store/blockchain-context';

function App() {

  const blockchainContext = useContext(BlockchainContext);
  return (
    <div>

      {blockchainContext.isLoaded ?
        <div>
          <Navbar />
          <Container>
            <Header />
            <ProposalList />
          </Container>
        </div>

        : <p>Loading...</p>
      }

    </div >
  );
}

export default App;
