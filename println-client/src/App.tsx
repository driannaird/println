import { useState } from "react";
import PrintForm from "./components/print-form";
import PrintList from "./components/print-list";
import { IpContext } from "./context/ip";

function App() {
  const [ip, setIp] = useState<string | null>(null);
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-primary text-secondary">
      <img src="/logo.png" alt="" />
      <h1 className="mb-5 text-xl font-bold">Welcome to println</h1>

      <IpContext.Provider value={{ name: ip, update: setIp }}>
        <PrintList />
        <PrintForm />
      </IpContext.Provider>
    </main>
  );
}

export default App;
