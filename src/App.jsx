import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        {/* Public route: login/signup */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes under Body */}
        <Route path="/" element={<Body />}>
          {/* default child when logged in */}
          <Route index element={<Feed />} />
          <Route path="profile" element={<Profile />} />
          <Route path="connections" element={<Connections />} />
          <Route path="requests" element={<Requests />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
