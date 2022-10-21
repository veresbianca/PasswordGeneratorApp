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

function PasswordGenerator() {
  const [formInputData, setFormInputData] = useState(initialValues);
  const [currentPassword, setCurrentPassword] = useState("");
  const [isPassCopied, setIsPassCopied] = useState(false);
  const isEmptyPass = currentPassword === "";

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const generatedPassword = generatePassword();
    setCurrentPassword(generatedPassword);
    setIsPassCopied(false);
  };

  /*
   * We can make use of modularity here and
   * extract the password generation functions in a separate
   * module. The `formInputData` data can be passed through
   * params.
   */
  const generatePassword = () => {
    let password = "";
    const criteria = Object.keys(formInputData).filter(
      (key) => typeof formInputData[key] === "boolean" && formInputData[key]
    );

    criteria.forEach((criterion) => {
      const randomChar = getRandomCharacter(passwordConfiguration[criterion]);
      password = insertCharacterAtRandomPosition(password, randomChar);
    });

    const allCriteria = criteria.reduce((acc, criterion) => {
      return acc + passwordConfiguration[criterion];
    }, "");

    for (
      let i = criteria.length;
      i < parseInt(formInputData.characterLength);
      i++
    ) {
      const randomChar = getRandomCharacter(allCriteria);
      password = insertCharacterAtRandomPosition(password, randomChar);
    }

    // make sure password has correct length
    if (password.length !== formInputData.characterLength) {
      password = password.substring(0, formInputData.characterLength);
    }

    return password;
  };

  const insertCharacterAtRandomPosition = (pass, randomChar) => {
    if (pass.length > 0) {
      const randomPosition = Math.floor(Math.random() * pass.length);
      return (
        pass.slice(0, randomPosition) + randomChar + pass.slice(randomPosition)
      );
    } else {
      return randomChar;
    }
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
      setIsPassCopied(true);
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
          <StrengthDisplay currentPassword={currentPassword} />
          <GeneratePassButton />
        </form>
      </div>
    </div>
  );
}

export default PasswordGenerator;
