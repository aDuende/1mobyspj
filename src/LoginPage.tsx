import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Separator } from "./components/ui/separator";
import {
  Mail,
  Lock,
  Eye as Visibility,
  EyeOff as VisibilityOff,
} from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);

  useEffect(() => {
    const brandColors = [
      { main: "#006BFF", bg: "rgba(0, 107, 255, 0.15)" },
      { main: "#FC4C02", bg: "rgba(252, 76, 2, 0.15)" },
      { main: "#FFA400", bg: "rgba(255, 164, 0, 0.15)" },
    ];

    const handleSelection = () => {
      const randomColor =
        brandColors[Math.floor(Math.random() * brandColors.length)];
      document.documentElement.style.setProperty(
        "--moby-selection",
        randomColor.main,
      );
      document.documentElement.style.setProperty(
        "--moby-selection-bg",
        randomColor.bg,
      );
    };

    window.addEventListener("selectstart", handleSelection);
    return () => window.removeEventListener("selectstart", handleSelection);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const user = users[username.toLowerCase() as keyof typeof users];

    if (!user) {
      setError("Invalid username or password");
      return;
    }

    if (user.password !== password) {
      setError("Invalid username or password");
      return;
    }

    let displayName = username.includes("@")
      ? username.split("@")[0]
      : username;

    displayName = displayName
      .split(".")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(".");

    onLogin(user.role, displayName);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-6 bg-[#1d1f2a]"
      style={{
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
      <div className="relative w-full max-w-5xl h-[670px] rounded-[32px] overflow-visible shadow-2xl">
        {/* Background */}
        <div className="absolute inset-0 rounded-[32px] overflow-hidden shadow-[0_24px_48px_rgba(0,0,0,0.2)]">
          <img src="src/assets/w1.png" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Login Card */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10 w-full max-w-sm rounded-[24px] bg-white border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.15)] pt-20 pb-7 px-7 text-gray-900 overflow-visible transition-all duration-300">
          {/* Mascot */}
          <div className="absolute left-1/2 top-[-40px] -translate-x-1/2 w-[175px] z-20 pointer-events-none drop-shadow-xl transition-all duration-300">
            <img
              src={isPasswordFocus ? "/2.png" : "/1.png"}
              className="w-full h-auto"
              alt="Mascot"
            />
          </div>

          <div className="text-center mb-5">
            <h1
              className="text-2xl font-bold text-gray-900 leading-none"
              style={{ fontFamily: '"Geometrica", sans-serif' }}
            >
              Welcome
            </h1>
            <p className="text-gray-500 text-[13px] font-medium translate-y-[-8px]">
              Sign in to ConteX Skills
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2.5">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 group-focus-within:text-black transition-colors" />
              <Input
                type="text"
                name="username"
                autoComplete="username"
                placeholder="Email"
                autoFocus
                className="h-11 pl-11 rounded-xl bg-gray-100/80 border border-gray-200/60 focus:border-[#006BFF] focus:ring-2 focus:ring-blue-500/20 transition-all text-gray-900 placeholder:text-gray-400 text-sm font-normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 group-focus-within:text-black transition-colors" />
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                className="h-11 pl-11 pr-11 rounded-xl bg-gray-100/80 border border-gray-200/60 focus:border-[#006BFF] focus:ring-2 focus:ring-blue-500/20 transition-all text-gray-900 placeholder:text-gray-400 text-sm font-normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsPasswordFocus(true)}
                onBlur={() => setIsPasswordFocus(false)}
                required
              />
              {password && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors cursor-pointer focus:outline-none"
                >
                  {showPassword ? (
                    <VisibilityOff className="w-4.5 h-4.5" />
                  ) : (
                    <Visibility className="w-4.5 h-4.5" />
                  )}
                </button>
              )}
            </div>

            <div className="flex justify-end mt-[-2px]">
              <button
                type="button"
                className="text-[12px] font-medium text-gray-500 hover:text-black hover:bg-gray-100/80 px-2.5 py-1 rounded-lg transition-all cursor-pointer active:scale-[0.97]"
              >
                Forget Password?
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-2 rounded-xl bg-red-50 text-red-600 text-[11px] font-semibold border border-red-100">
                <svg
                  className="w-3.5 h-3.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </div>
            )}

            <Button className="w-full h-11 bg-[#006BFF] hover:bg-[#0056cc] text-white rounded-xl font-medium text-[14px] shadow-lg shadow-blue-500/15 active:scale-[0.97] transition-all cursor-pointer">
              Login
            </Button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <Separator className="bg-gray-100" />
            </div>
            <span className="relative flex justify-center text-[13px] text-gray-400">
              <span className="bg-white px-2.5 font-medium">or</span>
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              className="w-full h-11 rounded-xl border-[#dadce0] bg-white hover:bg-[#f8f9fa] hover:border-[#d2d5db] transition-all flex items-center justify-center gap-3 font-medium text-[#3c4043] text-[14px] cursor-pointer active:scale-[0.97]"
            >
              <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24">
                <defs>
                  <clipPath id="google-clip">
                    <path d="M12 10v4.5h6.47c-.5 2.7-3 4.74-6.47 4.74-3.9 0-7.1-3.3-7.1-7.25S8.1 4.75 12 4.75c1.8 0 3.35.6 4.6 1.8l3.4-3.4C18 1.2 15.24 0 12 0 5.4 0 0 5.4 0 12s5.4 12 12 12c7 0 11.5-4.9 11.5-11.7 0-.8-.1-1.54-.2-2.3H12z" />
                  </clipPath>
                  <filter id="google-blur">
                    <feGaussianBlur stdDeviation="1" />
                  </filter>
                </defs>
                <g style={{ clipPath: "url(#google-clip)" }}>
                  <foreignObject
                    style={{ filter: "url(#google-blur)" }}
                    height="28"
                    transform="translate(-2,-2)"
                    width="28"
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background:
                          "conic-gradient(#FF4641,#FD5061 40deg,#FD5061 60deg,#3186FF 85deg,#3186FF 117deg,#00A5B7 142deg,#0EBC5F 167deg,#0EBC5F 200deg,#6CC500 226deg,#FFCC00 253deg,#FFD314 268deg,#FFCC00 292deg,#FF4641 327deg)",
                      }}
                    />
                  </foreignObject>
                  <rect fill="#3186FF" height="8" width="16" x="11" y="8" />
                </g>
              </svg>
              Continue with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
