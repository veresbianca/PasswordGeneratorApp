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

  /*
   * Givent that this piece of state is used only to be passed
   * as a `prop`, it can safely be moved inside that respective component
   *
   * What is needed for the computation of the password strenght is
   * ONLY the `currentPassword`
   */
  const [strengthStatus, setStrengthStatus] = useState("default");
  const [currentPassword, setCurrentPassword] = useState(passwordPlaceholder);
  const [isPassCopied, setIsPassCopied] = useState(false);
  const isEmptyPass = currentPassword === "P4$5W0rD!";

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const generatedPassword = generatePassword();
    setCurrentPassword(generatedPassword);
    setIsPassCopied(false);
    setStrengthStatus(checkPasswordStrength(currentPassword));
  };
  /*
   * This function has no value in being declared in this component
   */
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
          <StrengthDisplay strengthStatus={strengthStatus} />
          <GeneratePassButton />
        </form>
      </div>
    </div>
  );
}

export default PasswordGenerator;
