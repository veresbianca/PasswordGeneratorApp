import PasswordConfigurations from "./PasswordConfigurations";
import StrengthDisplay from "./StrengthDisplay";
import GeneratePassButton from "./GeneratePassButton";
import PasswordDisplay from "./PasswordDisplay";

import { useState } from "react";

import "./PasswordGenerator.css";

const initialValues = {
  useUppercaseLetters: false,
  useLowercaseLetters: false,
  includeNumbers: false,
  includeSymbols: false,
  characterLength: 0,
};

const passwordConfiguration = {
  includeNumbers: "0123456789",
  useLowercaseLetters: "abcdefghijklmnopqrstuvwxyz",
  useUppercaseLetters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  includeSymbols: "!@#$%^&*()",
};

const passwordPlaceholder = "P4$5W0rD!";

function PasswordGenerator() {
  const [formInputData, setFormInputData] = useState(initialValues);
  const [currentPassword, setPassword] = useState(passwordPlaceholder);
  const [strengthStatus, setStrengthStatus] = useState("default");
  const [isPassCopied, setCopiedPassStatus] = useState(false);
  let isEmptyPass = currentPassword === "P4$5W0rD!";

  const handleFormSubmit = (event) => {
    event.preventDefault();

    setPassword(generatePassword());
    setCopiedPassStatus(false);
    isEmptyPass = false;
    setStrengthStatus(checkPasswordStrength(generatePassword()));
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
    } else if (medium.test(password)) {
      return "medium";
    } else if (weak.test(password)) {
      return "weak";
    } else {
      return "too_weak";
    }
  };

  const generatePassword = () => {
    let password = "";

    for (let i = 0; i < parseInt(formInputData.characterLength); ) {
      const criteria = Object.keys(formInputData).filter(
        (key) => typeof formInputData[key] === "boolean" && formInputData[key]
      );

      if (criteria.length) {
        // eslint-disable-next-line no-loop-func
        criteria.forEach((criterion) => {
          if (i < parseInt(formInputData.characterLength)) {
            password += getRandomCharacter(passwordConfiguration[criterion]);
            i++;
          }
        });
      } else {
        return;
      }
    }

    return password;
  };

  const getRandomCharacter = (characters) => {
    return characters.charAt(Math.floor(Math.random() * characters.length));
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFormInputData({
      ...formInputData,
      [name]: value,
    });
  };

  const handleCopyToClipboard = () => {
    if (currentPassword !== "") {
      navigator.clipboard.writeText(currentPassword);
      setCopiedPassStatus(true);
    }
  };

  return (
    <div className="app-component__container">
      <h1 className="app-component__title">Password Generator</h1>
      <PasswordDisplay
        password={currentPassword}
        isEmptyPass={isEmptyPass}
        isPassCopied={isPassCopied}
        handleClick={handleCopyToClipboard}
      />
      <div className="password-generator__container">
        <form onSubmit={handleFormSubmit}>
          <PasswordConfigurations
            handleInputChange={handleInputChange}
            characterLength={formInputData.characterLength}
          />
          <StrengthDisplay strengthStatus={strengthStatus} />
          <GeneratePassButton />
        </form>
      </div>
    </div>
  );
}

export default PasswordGenerator;
