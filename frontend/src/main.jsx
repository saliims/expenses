import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./store.js";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import AuthStateHandler from "./features/auth/authStateHandler.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthStateHandler>
          <App />
        </AuthStateHandler>
      </PersistGate>
    </Provider>
  </StrictMode>
);
