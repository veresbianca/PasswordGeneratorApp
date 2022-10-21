const passwordConfiguration = {
  includeNumbers: "0123456789",
  useLowercaseLetters: "abcdefghijklmnopqrstuvwxyz",
  useUppercaseLetters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  includeSymbols: "!@#$%^&*()",
};

const generatePassword = (formInputData) => {
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

export { generatePassword };
