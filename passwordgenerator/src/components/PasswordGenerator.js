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

  /*
   * It's a best practice to make the single difference
   * between a state variable and its setter only the `set` prefix.
   *
   * e.g. counter, setCounter
   */
  const [currentPassword, setPassword] = useState(passwordPlaceholder);
  const [isPassCopied, setCopiedPassStatus] = useState(false);

  /*
   * This can be declared as a `const
   * because it's derived state. When the state changes,
   * so does this variable.
   */
  let isEmptyPass = currentPassword === "P4$5W0rD!";

  const handleFormSubmit = event => {
    event.preventDefault();

    setPassword(generatePassword());
    setCopiedPassStatus(false);

    /*
     * Setting the value for this variable is not necessary
     * because it's derived state
     */
    isEmptyPass = false;
    setStrengthStatus(checkPasswordStrength(generatePassword()));
  };

  /*
   * This function has no value in being declared in this component
   */
  const checkPasswordStrength = password => {
    const strong = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})");

    const medium = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );

    const weak = new RegExp(
      "(?=.*[a-z])(?=.{6,})|(?=.*[A-Z])(?=.{6,})|(?=.*[0-9])(?=.{6,})|(?=.*[^A-Za-z0-9])(?=.{6,})"
    );

    /*
     * Given that you're using the early return pattern,
     * you can safely remove the `else` keywords in order
     * to improve readability
     */
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

    /*
     * Pentru fiecare index din lungimea parolei,
     * Vreau sa generez un caracter luand in considerare
     * valorile criteriilor selectate (lowercase, UPPERCASE, numar, simbol)
     *
     * Aleg aleatoriu criteriu pentru care generez caracterul,
     * dar e necesar sa existe minim cate un caracter pentru
     * fiecare criteriu selectat
     */

    for (let i = 0; i < parseInt(formInputData.characterLength); ) {
      const criteria = Object.keys(formInputData).filter(
        key => typeof formInputData[key] === "boolean" && formInputData[key]
      );

      if (criteria.length) {
        // eslint-disable-next-line no-loop-func
        criteria.forEach(criterion => {
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
