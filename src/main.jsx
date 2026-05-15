import ReactDOM from "react-dom/client";
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './context/AppContext.jsx';
import { ClerkProvider } from "@clerk/clerk-react";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <BrowserRouter> {/* ✅ Router FIRST */}
      <AppContextProvider> {/* ✅ Now useNavigate works */}
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </ClerkProvider>
);
console.log("Clerk Key:", clerkPubKey);