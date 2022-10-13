import PasswordConfigurations from './PasswordConfigurations';
import StrengthDisplay from './StrengthDisplay';
import GeneratePassButton from './GeneratePassButton';
import PasswordDisplay from './PasswordDisplay';

import { useState } from 'react';

import './PasswordGenerator.css';

const initialValues = {
  useUppercaseLetters: false,
  useLowercaseLetters: false,
  includeNumbers: false,
  includeSymbols: false,
  characterLength: 0,
};

const passwordConfiguration = {
	numbers: '0123456789',
	lowercaseLetters: 'abcdefghijklmnopqrstuvwxyz',
	uppercaseLetters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	symbols: '!@#$%^&*()'
}

// Make sure to remove all unused code before pushing a commit
const minPassLength = 6;

const passwordPlaceholder = 'P4$5W0rD!';

function PasswordGenerator() {
  const [formInputData, setFormInputData] = useState(initialValues);
  const [currentPassword, setPassword] = useState(passwordPlaceholder);

  /*
   * This can be a derived state piece of date
   * computed based on `currentPassword`
   *
   * Be careful when naming things. Every variable/function
   * name should cleary express to the reader the reason for
   * its existence.
   *
   * When naming boolean variables, it's a good practice
   * to use the is/has verbs.
   */
  const [emptyPass, setPassStatus] = useState(true);

  const [strengthStatus, setStrengthStatus] = useState("default");
  const [copiedPass, setCopiedPassStatus] = useState(false);

  const handleFormSubmit = evnt => {
    /*
     * Given that you've grouped all the form
     * related markup under a <form/> element,
     * it makes senes for this function to be
     * set on the `onSumbit` prop of the `<form/>`
     * element
     */
    evnt.preventDefault();

    /* These 3 lines can be merged into one
     * by passing the call to the generation function
     * as a param of the state setter
     */
    let password = "";
    password = generatePassword();
    setPassword(password);

    setCopiedPassStatus(false);
    setPassStatus(false);

    /* These 3 lines can be merged into one
     * by passing the call to the generation function
     * as a param of the state setter
     */
    let strength = "";
    strength = checkPasswordStrength(password);
    setStrengthStatus(strength);
  };

  const checkPasswordStrength = password => {
    const strong = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})");
    const medium = new RegExp(
      "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{5,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{6,}))"
    );
    const weak = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])");

    // Make sure to remove all unused code before pushing a commit
    const too_weak = !strong && !medium;

    if (strong.test(password)) {
      /* Make sure to remove `debbuger` statements
       * before pushing a commit
       *
       * Pro tip: You can configure eslint to statically check the code
       */
      debugger;
      return "strong";
    } else if (medium.test(password)) {
      debugger;
      return "medium";
    } else if (weak.test(password)) {
      debugger;
      return "weak";
    } else {
      debugger;
      return "too_weak";
    }
  };

  const generatePassword = () => {
    // Make sure to remove all unused code before pushing a commit
    let passwordChar = "";
    let password = "";

    for (
      let i = 0;
      i < formInputData.characterLength;
      i += Object.keys(formInputData).filter(key => formInputData[key]).length - 1
    ) {
      /*
       * Given that we will always generate a password
       * that has a length equal to the slider's value,
       * the last part of the `for` condition should be
       * a simple increment
       *
       * The following code can be simplified if we
       * store the value of the `filter` in a variable
       * and use the `forEach` function to generate each type
       * of character.
       */
      if (formInputData.useUppercaseLetters) {
        password += getRandomCharacter(passwordConfiguration.uppercaseLetters);
      }

      if (formInputData.useLowercaseLetters) {
        password += getRandomCharacter(passwordConfiguration.lowercaseLetters);
      }

      if (formInputData.includeNumbers) {
        password += getRandomCharacter(passwordConfiguration.numbers);
      }

      if (formInputData.includeSymbols) {
        password += getRandomCharacter(passwordConfiguration.symbols);
      }
    }

    return password;
  };

  const getRandomCharacter = characters => {
    return characters.charAt(Math.floor(Math.random() * characters.length));
  };

  const handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFormInputData({
      ...formInputData,
      [name]: value,
    });
  };

  /*
   * Be careful when naming things. Every variable/function
   * name should cleary express to the reader the reason for
   * its existence.
   */
  const handleClick = () => {
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
        emptyPass={emptyPass}
        copiedPass={copiedPass}
        handleClick={handleClick}
      />
      <div className="password-generator__container">
        <form>
          <PasswordConfigurations
            handleInputChange={handleInputChange}
            characterLength={formInputData.characterLength}
            useUppercaseLetters={formInputData.useUppercaseLetters}
            useLowercaseLetters={formInputData.useLowercaseLetters}
            includeNumbers={formInputData.includeNumbers}
            includeSymbols={formInputData.includeSymbols}
          />
          <StrengthDisplay strengthStatus={strengthStatus} />
          <GeneratePassButton handleFormSubmit={handleFormSubmit} />
        </form>
      </div>
    </div>
  );
}

export default PasswordGenerator;
