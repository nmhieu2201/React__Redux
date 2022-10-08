import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./Components/redux/configeStore";
import Form from "./Components/FormStudent/Form";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<App />}>
          <Route path="form" element={<Form />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
