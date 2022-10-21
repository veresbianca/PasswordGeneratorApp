import PasswordConfigurations from "./PasswordConfigurations";
import StrengthDisplay from "./StrengthDisplay";
import GeneratePassButton from "./GeneratePassButton";
import PasswordDisplay from "./PasswordDisplay";
import { generatePassword } from "./PasswordGenerationLogic";

import { useState } from "react";

import "./PasswordGenerator.css";

const initialValues = {
  useUppercaseLetters: false,
  useLowercaseLetters: false,
  includeNumbers: false,
  includeSymbols: false,
  characterLength: 0,
};

const handleCopyToClipboard = (currentPassword, setIsPassCopied) => {
  if (currentPassword !== "") {
    navigator.clipboard.writeText(currentPassword);
    setIsPassCopied(true);
  }
};

function PasswordGenerator() {
  const [formInputData, setFormInputData] = useState(initialValues);
  const [currentPassword, setCurrentPassword] = useState("");
  const [isPassCopied, setIsPassCopied] = useState(false);
  const isEmptyPass = currentPassword === "";

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const generatedPassword = generatePassword(formInputData);
    setCurrentPassword(generatedPassword);
    setIsPassCopied(false);
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
          <StrengthDisplay currentPassword={currentPassword} />
          <GeneratePassButton />
        </form>
      </div>
    </div>
  );
}

export default PasswordGenerator;
