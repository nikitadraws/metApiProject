import React, { useEffect } from "react";
import { Routes, Route } from "react-router";
import { Home } from "pages/Home/Home";
import { About } from "pages/About/About";
import { Collection } from "pages/Collection/Collection";
import { MyCollection } from "pages/MyCollection/MyCollection";
import { Navbar } from "components/Navbar/Navbar";
import { Registration } from "pages/Registration/Registration";
import { Login } from "pages/Login/Login";
import { NotFound } from "pages/NotFound/NotFound";
import { PrivateRoute } from "components/PrivateRoute";
import { useDispatch } from "react-redux";
import { replaceData } from "store/data-slice";
import { useGetApiDataQuery } from "store/api-slice";
import { Museum } from "pages/Museum/Museum";
import { Project } from "pages/Project/Project";
import { Contacts } from "pages/Contacts/Contacts";
import { ArtworkPage } from "pages/ArtworkPage/ArtworkPage";
import Footer from "components/Footer/Footer";

function App() {
  const dispatch = useDispatch();
  const getApiData = useGetApiDataQuery();

  useEffect(() => {
    if (getApiData.currentData) {
      dispatch(replaceData(getApiData.currentData));
    }
  }, [getApiData, dispatch]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/:id" element={<ArtworkPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route
          path="/mycollection"
          element={
            <PrivateRoute haveToBeLogged={true}>
              <MyCollection />
            </PrivateRoute>
          }
        />
        <Route path="/about" element={<About className="About-layout" />} />
        <Route path="/about/museum" element={<Museum />} />
        <Route path="/about/project" element={<Project />} />
        <Route path="/about/contacts" element={<Contacts />} />
        <Route
          path="/login"
          element={
            <PrivateRoute haveToBeLogged={false}>{<Login />}</PrivateRoute>
          }
        />
        <Route
          path="/registration"
          element={
            <PrivateRoute haveToBeLogged={false}>
              {<Registration />}
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
