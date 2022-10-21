import "./StrengthDisplay.css";
import { useEffect, useState } from "react";

const barNumber = [1, 2, 3, 4];

const statusProperties = {
  default: {
    statusColor: "none",
    barToBeFilled: 0,
    statusLabel: "",
  },
  too_weak: {
    statusColor: "red",
    barToBeFilled: 1,
    statusLabel: "TOO WEAK!",
  },
  weak: {
    statusColor: "orange",
    barToBeFilled: 2,
    statusLabel: "WEAK",
  },
  medium: {
    statusColor: "yellow",
    barToBeFilled: 3,
    statusLabel: "MEDIUM",
  },
  strong: {
    statusColor: "neon-green",
    barToBeFilled: 4,
    statusLabel: "STRONG",
  },
};

const checkPasswordStrength = (password) => {
  const strong = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})"
  );

  const medium = new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
  );

  const weak = new RegExp(
    "(?=.*[a-z])(?=.{6,})|(?=.*[A-Z])(?=.{6,})|(?=.*[0-9])(?=.{6,})|(?=.*[^A-Za-z0-9])(?=.{6,})"
  );

  if (strong.test(password)) {
    return "strong";
  }

  if (medium.test(password)) {
    return "medium";
  }

  if (weak.test(password)) {
    return "weak";
  }

  return "too_weak";
};

function StrengthDisplay({ currentPassword }) {
  const [strengthStatus, setStrengthStatus] = useState("default");

  useEffect(() => {
    if (currentPassword) {
      setStrengthStatus(checkPasswordStrength(currentPassword));
    } else {
      setStrengthStatus("default");
    }
  }, [currentPassword]);

  return (
    <div className="strength-display__container">
      <span className="strength-display__label">STRENGTH</span>
      <div className="strength-display__status-container">
        <span className="strength-display--status">
          {statusProperties[strengthStatus].statusLabel}
        </span>
        <div
          className={`strength-bar__container status-${statusProperties[strengthStatus].statusColor}`}
        >
          {barNumber.map((bar, i) => {
            return (
              <span
                key={i}
                className={`strength-bar ${
                  statusProperties[strengthStatus].barToBeFilled <= i
                    ? "empty"
                    : ""
                }`}
              ></span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StrengthDisplay;
