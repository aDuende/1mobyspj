import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Separator } from "./components/ui/separator";

const users = {
  "tarin.chon@1moby.com": { password: "123", role: "employee" as const },
  "sam.frea@1moby.com": { password: "456", role: "manager" as const },
  "jadi.vort@1moby.com": { password: "789", role: "admin" as const },
};

interface LoginPageProps {
  onLogin: (role: "employee" | "manager" | "admin", username: string) => void;
}

function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const user = users[username.toLowerCase() as keyof typeof users];

    if (!user) {
      setError("Invalid username or password");
      return;
    }

    // Check password
    if (user.password !== password) {
      setError("Invalid username or password");
      return;
    }

    // Login successful - extract username before @ if email and capitalize properly
    let displayName = username.includes("@")
      ? username.split("@")[0]
      : username;

    // Capitalize first letter and letter after dot (e.g., tarin.chon -> Tarin.Chon)
    displayName = displayName
      .split(".")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(".");

    onLogin(user.role, displayName);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-6" style={{
        background: `
          linear-gradient(
            135deg,
            #0b78ff 0%,
            #0a5fd6 25%,
            #0b3c9f 50%,
            #1c5fa8 70%,
            #ff932f 90%,
            #ff7a00 100%
          )
        `,
      }}
    >
      <div className="relative w-full max-w-5xl h-[670px] rounded-3xl overflow-visible shadow-2xl">

        {/* Background */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <img
            src="src/assets/w1.png"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Login card */}
        <div className="absolute left-12 top-1/2 -translate-y-1/2 z-10 w-full max-w-sm rounded-2xl bg-white/25 backdrop-blur-md border border-white/30 shadow-xl pt-24 pb-8 px-8 text-white overflow-visible">

          {/* Mascot */}
          <img
            src={isPasswordFocus ? "/2.png" : "/1.png"}
            className="absolute left-1/2 top-[-40px] -translate-x-1/2 w-[200px] z-20 pointer-events-none drop-shadow-xl"
          />

          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold !text-white leading-none">
              Welcome
            </h1>
            <p className="text-white/80 leading-none -mt-2 translate-y-[-20px]">
              Sign in to 1Moby LMS
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-sm font-medium text-white">
                Username or Email
              </label>
              <Input
                type="text"
                placeholder="Enter your username"
                className="bg-white/90 text-gray-900 placeholder:text-gray-400 border-white/40"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-sm font-medium text-white">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                className="bg-white/90 text-gray-900 placeholder:text-gray-400 border-white/40"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsPasswordFocus(true)}
                onBlur={() => setIsPasswordFocus(false)}
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg border border-red-300/40 bg-red-500/20 text-white text-sm">
                {error}
              </div>
            )}

            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              Sign In
            </Button>
          </form>

          <div className="relative my-5">
            <Separator className="bg-white/30" />
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent px-3 text-sm text-white/80">
              or
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="bg-white/80 text-gray-900 hover:bg-white flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.7 1.22 9.2 3.6l6.9-6.9C35.9 2.3 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.3l8.1 6.3C12.6 13.7 17.8 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.4c-.5 2.8-2.1 5.2-4.5 6.8l7 5.4c4.1-3.8 7.2-9.4 7.2-16.2z" />
                <path fill="#FBBC05" d="M10.7 28.4A14.7 14.7 0 0 1 10 24c0-1.5.3-3 .7-4.4l-8.1-6.3A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.7l8.1-6.3z" />
                <path fill="#34A853" d="M24 48c6.3 0 11.6-2.1 15.5-5.7l-7-5.4c-2 1.3-4.5 2.1-8.5 2.1-6.2 0-11.4-4.2-13.3-9.9l-8.1 6.3C6.5 42.6 14.6 48 24 48z" />
              </svg>
              Google
            </Button>

            <Button
              variant="outline"
              className="bg-white/80 text-gray-900 hover:bg-white flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.2 1.2A11 11 0 0 1 12 6.8c1 0 2 .1 2.9.4 2.2-1.5 3.2-1.2 3.2-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
              </svg>
              GitHub
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;
