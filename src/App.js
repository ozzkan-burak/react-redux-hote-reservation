import Header from "./components/Header";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Reservation from "./components/Reservation";
import RoomFeatureContainer from "./components/RoomFeatureContainer";
import PaymentContainer from "./components/PaymentContainer";
import { ReservationCompleted } from "./components/ReservationCompleted";
import { useEffect } from "react";
import { getHotelList } from "./actions";
import { useDispatch } from "react-redux";



function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHotelList());
  }, []);


  return (
    <div className="App container-fluid">
      
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <Reservation />
          </Route>
          <Route exact path="/room-features">
            <RoomFeatureContainer />
          </Route>
          <Route exact path="/room-features/payment">
            <PaymentContainer />
          </Route>
          <Route exact path="/completed">
            <ReservationCompleted />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
