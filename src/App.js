import * as React from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import Landing from "./components/Landing/Landing";
import "./components/style/style.css";
import { ToastProvider, useToasts } from "react-toast-notifications";
function App() {
  return (
    <ToastProvider autoDismiss autoDismissTimeout={2000}>
      <Landing />
    </ToastProvider>
  );
}

export default App;
\
