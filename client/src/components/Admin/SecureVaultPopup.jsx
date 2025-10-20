import { useState, useEffect } from "react";
import SecureVaultAd from "./SecureVaultAd";

const SecureVaultPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [nextShowTime, setNextShowTime] = useState(null);

  // Check if popup should be shown based on localStorage
  useEffect(() => {
    const checkPopupSchedule = () => {
      const lastShown = localStorage.getItem("secureVaultLastShown");
      const remindLaterTime = localStorage.getItem("secureVaultRemindLater");
      const currentTime = Date.now();

      // If remind later is set and time hasn't passed, don't show
      if (remindLaterTime && currentTime < parseInt(remindLaterTime)) {
        setNextShowTime(parseInt(remindLaterTime));
        return;
      }

      // Show popup every 30 minutes if not reminded later
      const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds

      if (!lastShown || currentTime - parseInt(lastShown) > thirtyMinutes) {
        setShowPopup(true);
        localStorage.setItem("secureVaultLastShown", currentTime.toString());
      }
    };

    // Initial check
    checkPopupSchedule();

    // Set up interval to check every minute
    const interval = setInterval(checkPopupSchedule, 60000);

    return () => clearInterval(interval);
  }, []);

  // Handle remind me later (10 minutes)
  const handleRemindLater = () => {
    const tenMinutesFromNow = Date.now() + 10 * 60 * 1000; // 10 minutes
    localStorage.setItem(
      "secureVaultRemindLater",
      tenMinutesFromNow.toString()
    );
    setNextShowTime(tenMinutesFromNow);
    setShowPopup(false);
  };

  // Handle close/cancel
  const handleClose = () => {
    localStorage.removeItem("secureVaultRemindLater");
    localStorage.setItem("secureVaultLastShown", Date.now().toString());
    setShowPopup(false);
  };

  // Check if remind later time has passed
  useEffect(() => {
    if (nextShowTime) {
      const checkRemindLater = setInterval(() => {
        if (Date.now() >= nextShowTime) {
          localStorage.removeItem("secureVaultRemindLater");
          setNextShowTime(null);
          setShowPopup(true);
          localStorage.setItem("secureVaultLastShown", Date.now().toString());
        }
      }, 1000);

      return () => clearInterval(checkRemindLater);
    }
  }, [nextShowTime]);

  if (!showPopup) return null;

  return (
    <SecureVaultAd
      isPopup={true}
      onClose={handleClose}
      onRemindLater={handleRemindLater}
    />
  );
};

export default SecureVaultPopup;
