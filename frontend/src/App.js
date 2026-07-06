import AICommunication from "./pages/AICommunication";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddLead from "./pages/AddLead";
import ViewLeads from "./pages/ViewLeads";
import Analytics from "./pages/Analytics";
import FollowUps from "./pages/FollowUps";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/add-lead" element={<AddLead />} />

        <Route path="/view-leads" element={<ViewLeads />} />

        <Route path="/ai-communication" element={<AICommunication />} />

        <Route path="/analytics" element={<Analytics />}/>
        <Route path="/settings" element={<Settings />} />
        <Route

path="/followups"

element={<FollowUps />}

/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;