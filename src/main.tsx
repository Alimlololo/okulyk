import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import { AppStoreProvider } from "@/store/AppStore";
import { LocaleProvider } from "@/i18n";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <LocaleProvider>
        <AppStoreProvider>
          <App />
        </AppStoreProvider>
      </LocaleProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
