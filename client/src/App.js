import "./App.css"
import FirstNavBar from "./components/navbar/firstnavbar";
import SecondNavBar from "./components/navbar/secondnavbar";
import TicketList from "./components/ticketlist/ticketlist";
import PageNav from "./components/pagenav/pagenav";

function App() {
  return (
    <div>
      <FirstNavBar/>
      <SecondNavBar/>
      <TicketList/>
      <PageNav/>
    </div>
  );
}

export default App;
