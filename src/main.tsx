import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

const domain = import.meta.env.VITE_AUTH0_DOMAIN!;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID!;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin, 
        }}
      >
        <App />
      </Auth0Provider>
    </ChakraProvider>
  </React.StrictMode>
);
