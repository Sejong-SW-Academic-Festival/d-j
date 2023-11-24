import "./App.css";

import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import PageLoader from "./components/PageLoader/PageLoader";
import Headbar from "./components/headbar/HeadBar";
import { PrivateRoute } from "./PrivateRoute";

import Login from "./doyun/Login/Login";
import Signup from "./doyun/Signup/Signup";
import Mypage from "./doyun/MyPage/Mypage";
import ModifyInfo from "./doyun/ModifyInfo/ModifyInfo";

import { BrowserRouter as Router, Switch } from "react-router-dom";
import ModifyLike from "./doyun/ModifyLike/ModifyLike";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<PrivateRoute children={<Home />} />} />
          <Route path="/2" exact Component={Headbar} />
          <Route path="/signup" exact Component={Signup} />
          <Route path="/mypage" exact Component={Mypage} />
          <Route path="/login" exact Component={Login} />
          <Route path="/modifyInfo" exact Component={ModifyInfo} />
          <Route path="/modifyLike" exact Component={ModifyLike} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
