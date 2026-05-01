import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import bgImage from "./assets/8-bit-pixel-forest-landscape-and-mountains-palms-vector.jpg";
import catWalkSprite from "./assets/white cat walk pixel.PNG";

const CAT_FRAME_WIDTH = 80;
const CAT_HEIGHT = 80;
const TOTAL_FRAMES = 5;

const PixelCat = () => {
  return (
    <>
      <style>{`
        .cat-sprite {
          width: ${CAT_FRAME_WIDTH}px;
          height: ${CAT_HEIGHT}px;
          background-image: url('${catWalkSprite}');
          background-size: ${CAT_FRAME_WIDTH * TOTAL_FRAMES}px auto;
          background-repeat: no-repeat;
          background-position-y: 0px;
          image-rendering: pixelated;
          animation: walk-cycle 0.5s steps(${TOTAL_FRAMES}) infinite;
        }

        @keyframes walk-cycle {
          from { background-position-x: 0px; }
          to   { background-position-x: -${CAT_FRAME_WIDTH * TOTAL_FRAMES}px; }
        }
      `}</style>

      <div className="cat-sprite" />
    </>
  );
};

export default function SettingPage() {
  const [activeTab, setActiveTab] = useState<
    "security" | "notifications" | "privacy" | "pet"
  >("security");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [saved, setSaved] = useState(false);
  const [petEnabled, setPetEnabled] = useState(true);
  const [walkingSpeed, setWalkingSpeed] = useState(2);
  const [petPosition, setPetPosition] = useState(0);

  useEffect(() => {
    if (!petEnabled) return;

    const interval = setInterval(() => {
      setPetPosition((prev) => (prev + 1) % 100);
    }, 1000 / walkingSpeed);

    return () => clearInterval(interval);
  }, [petEnabled, walkingSpeed]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const pageTitleClass =
    "text-4xl font-bold text-gray-900 dark:text-white mb-2";
  const pageSubtitleClass = "text-gray-600 dark:text-gray-300";

  const tabClass = (tab: "security" | "notifications" | "privacy" | "pet") =>
    `pb-3 px-6 text-sm font-semibold transition-colors border-b-2 -mb-0.5 ${
      activeTab === tab
        ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
        : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
    }`;

  const sectionCardClass =
    "bg-white rounded-lg border border-gray-200 p-8 dark:bg-gray-800 dark:border-gray-700";

  const innerCardClass = "bg-gray-50 rounded-lg dark:bg-gray-900/60";

  const innerBorderCardClass =
    "border border-gray-200 rounded-lg bg-gray-50 dark:border-gray-700 dark:bg-gray-900/60";

  const headingClass =
    "text-xl font-bold text-gray-900 dark:text-white mb-6 text-left";

  const labelClass =
    "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 text-left";

  const itemTitleClass = "font-semibold text-gray-900 dark:text-white mb-1";

  const itemDescClass = "text-sm text-gray-600 dark:text-gray-300";

  const inputClass =
    "w-full bg-white text-gray-900 border-gray-200 dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:placeholder:text-gray-500";

  const toggleClass =
    "w-14 h-7 bg-gray-300 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-900 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600";

  return (
    <div className="min-h-screen w-full flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8 text-center">
          <h1 className={pageTitleClass}>Settings</h1>
          <p className={pageSubtitleClass}>
            Manage your account settings and preferences
          </p>
        </div>

        <div className="flex gap-6 mb-8 border-b-2 border-gray-200 dark:border-gray-700 justify-center">
          <button
            onClick={() => setActiveTab("security")}
            className={tabClass("security")}
          >
            Security
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={tabClass("notifications")}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={tabClass("privacy")}
          >
            Privacy
          </button>
          <button
            onClick={() => setActiveTab("pet")}
            className={tabClass("pet")}
          >
            Digital Pet
          </button>
        </div>

        <form onSubmit={handleSave}>
          {activeTab === "security" && (
            <div className="space-y-8">
              <div className={sectionCardClass}>
                <h2 className={headingClass}>Change Password</h2>

                <div className="space-y-5">
                  <div>
                    <label className={labelClass}>Current Password</label>
                    <Input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className={inputClass}
                      placeholder="Enter your current password"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>New Password</label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={inputClass}
                      placeholder="Enter your new password"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Confirm New Password</label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={inputClass}
                      placeholder="Confirm your new password"
                    />
                  </div>
                </div>
              </div>

              <div className={sectionCardClass}>
                <h2 className={headingClass}>Two-Factor Authentication</h2>

                <div
                  className={`flex items-center justify-between p-5 ${innerCardClass}`}
                >
                  <div>
                    <p className={itemTitleClass}>
                      Enable Two-Factor Authentication
                    </p>
                    <p className={itemDescClass}>
                      Add an extra layer of security to your account with 2FA
                    </p>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={twoFactorAuth}
                      onChange={(e) => setTwoFactorAuth(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className={toggleClass}></div>
                  </label>
                </div>
              </div>

              <div className={sectionCardClass}>
                <h2 className={headingClass}>Active Sessions</h2>

                <div className="space-y-3">
                  <div
                    className={`flex items-center justify-between p-4 ${innerBorderCardClass}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-blue-600 dark:text-blue-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Windows PC - Chrome
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Bangkok, Thailand • Last active now
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-semibold text-green-700 dark:text-green-300 px-3 py-1.5 bg-green-100 dark:bg-green-900/40 rounded-full">
                      Current
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-8">
              <div className={sectionCardClass}>
                <h2 className={headingClass}>Email Notifications</h2>

                <div className="space-y-4">
                  <div
                    className={`flex items-center justify-between p-5 ${innerCardClass}`}
                  >
                    <div>
                      <p className={itemTitleClass}>Activity Notifications</p>
                      <p className={itemDescClass}>
                        Get notified about important updates and activities
                      </p>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={emailNotifications}
                        onChange={(e) =>
                          setEmailNotifications(e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className={toggleClass}></div>
                    </label>
                  </div>

                  <div
                    className={`flex items-center justify-between p-5 ${innerCardClass}`}
                  >
                    <div>
                      <p className={itemTitleClass}>Marketing Emails</p>
                      <p className={itemDescClass}>
                        Receive promotional emails and product updates
                      </p>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={marketingEmails}
                        onChange={(e) => setMarketingEmails(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className={toggleClass}></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className={sectionCardClass}>
                <h2 className={headingClass}>Push Notifications</h2>

                <div className="space-y-4">
                  <div
                    className={`flex items-center justify-between p-5 ${innerCardClass}`}
                  >
                    <div>
                      <p className={itemTitleClass}>Browser Notifications</p>
                      <p className={itemDescClass}>
                        Receive push notifications in your browser
                      </p>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pushNotifications}
                        onChange={(e) => setPushNotifications(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className={toggleClass}></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="space-y-8">
              <div className={sectionCardClass}>
                <h2 className={headingClass}>Data & Privacy</h2>

                <div className="space-y-4">
                  <div className={`p-5 ${innerCardClass}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className={itemTitleClass}>Download Your Data</p>
                        <p className={itemDescClass}>
                          Request a copy of your personal data
                        </p>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        className="ml-4 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
                      >
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className={`p-5 ${innerCardClass}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className={itemTitleClass}>Delete Account</p>
                        <p className={itemDescClass}>
                          Permanently delete your account and all data
                        </p>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        className="ml-4 border-red-300 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/40"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={sectionCardClass}>
                <h2 className={headingClass}>Login History</h2>

                <div className="space-y-3">
                  {[
                    {
                      device: "Windows PC - Chrome",
                      location: "Bangkok, Thailand",
                      time: "Just now",
                      status: "success",
                    },
                    {
                      device: "iPhone - Safari",
                      location: "Bangkok, Thailand",
                      time: "2 hours ago",
                      status: "success",
                    },
                    {
                      device: "iPad - Safari",
                      location: "Chiang Mai, Thailand",
                      time: "Yesterday",
                      status: "success",
                    },
                  ].map((login, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900/60"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-gray-600 dark:text-gray-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>

                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {login.device}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {login.location} • {login.time}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-semibold text-green-700 dark:text-green-300 px-3 py-1.5 bg-green-100 dark:bg-green-900/40 rounded-full">
                        Success
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "pet" && (
            <div className="space-y-8">
              <div className={sectionCardClass}>
                <h2 className={headingClass}>Digital Pet Control</h2>

                <div className="space-y-4">
                  <div
                    className={`flex items-center justify-between p-5 ${innerCardClass}`}
                  >
                    <div>
                      <p className={itemTitleClass}>Enable Digital Pet</p>
                      <p className={itemDescClass}>
                        Show a pixel pet walking on your screen
                      </p>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={petEnabled}
                        onChange={(e) => setPetEnabled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className={toggleClass}></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className={sectionCardClass}>
                <h2 className={headingClass}>Walking Speed</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Speed:{" "}
                      {walkingSpeed === 1
                        ? "Slow"
                        : walkingSpeed === 2
                          ? "Normal"
                          : "Fast"}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="3"
                    value={walkingSpeed}
                    onChange={(e) => setWalkingSpeed(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />

                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Slow</span>
                    <span>Normal</span>
                    <span>Fast</span>
                  </div>
                </div>
              </div>

              <div className={sectionCardClass}>
                <h2 className={headingClass}>Pet Preview</h2>

                <div
                  className="relative h-48 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                  style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: "auto 100%",
                    backgroundPosition: "center bottom",
                    backgroundRepeat: "repeat-x",
                    imageRendering: "pixelated",
                  }}
                >
                  {petEnabled && (
                    <div
                      className="absolute bottom-2 transition-all duration-300"
                      style={{ left: `${petPosition}%` }}
                    >
                      <PixelCat />
                    </div>
                  )}

                  {!petEnabled && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <p className="text-white font-semibold">
                        Pet is disabled
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <Button
              type="button"
              variant="ghost"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Reset Changes
            </Button>

            <div className="flex items-center gap-4">
              {saved && (
                <span className="text-sm text-green-600 dark:text-green-400 font-semibold">
                  ✓ Settings saved successfully
                </span>
              )}

              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
