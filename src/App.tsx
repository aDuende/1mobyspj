import { useState } from "react";
import LoadingPage from "./LoadingPage";
import LoginPage from "./LoginPage";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <LoginPage
        onLogin={(role, username) => {
          console.log(role, username);
        }}
      />

      {loading && (
        <LoadingPage onLoadingComplete={() => setLoading(false)} />
      )}
    </div>
  );
}

export default App;