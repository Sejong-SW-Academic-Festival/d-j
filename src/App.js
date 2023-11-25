import "./App.css";

import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import PageLoader from "./components/PageLoader/PageLoader";
import Headbar from "./components/headbar/HeadBar";
import { PrivateRoute } from "./PrivateRoute";
import ModifyLike from "./doyun/ModifyLike/ModifyLike";

import Login from "./doyun/Login/Login";
import Signup from "./doyun/Signup/Signup";
import Mypage from "./doyun/MyPage/Mypage";
import ModifyInfo from "./doyun/ModifyInfo/ModifyInfo";
import Unregister from "./doyun/Unregister/Unregister";
import { redirect } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<PrivateRoute children={<Home />} />} />
          <Route path="/signup" exact Component={Signup} />
          <Route path="/mypage" element={<PrivateRoute children={<Mypage />} />} />
          <Route path="/login" exact Component={Login} />
          <Route path="/modifyInfo" element={<PrivateRoute children={<ModifyInfo />} />} />
          <Route path="/modifylike" element={<PrivateRoute children={<ModifyLike />} />} />
          <Route path="/unregister" element={<PrivateRoute children={<Unregister />} />} />
          <Route path="/*" element={redirect("/")}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
