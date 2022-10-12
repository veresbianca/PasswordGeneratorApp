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

const minPassLength = 6;

const passwordPlaceholder = 'P4$5W0rD!';

function PasswordGenerator() {
	const [formInputData, setFormInputData] = useState(initialValues);
	const [currentPassword, setPassword] = useState(passwordPlaceholder);
	const [emptyPass, setPassStatus] = useState(true);
	const [strengthStatus, setStrengthStatus] = useState('default');	
	const [copiedPass, setCopiedPassStatus] = useState(false);

	const handleFormSubmit = (evnt) => {
        evnt.preventDefault();

        let password = '';
        let strength = '';

        password = generatePassword();
        setPassword(password);
        setCopiedPassStatus(false);
        setPassStatus(false);

        strength = checkPasswordStrength(password);
        setStrengthStatus(strength);
    }

    const checkPasswordStrength = (password) => {
    	const strong = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})');
    	const medium = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{5,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{6,}))');
    	const weak = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])');
    	const too_weak = !strong && !medium;

    	if(strong.test(password)) {
    		debugger
    		return 'strong';
    	} else if (medium.test(password)) {
    		debugger
    		return 'medium';
    	} else if (weak.test(password)) {
    		debugger
    		return 'weak';
    	} else {
    		debugger
    		return 'too_weak';
    	} 
    }

    const generatePassword = () => {
    	let passwordChar = '';
    	let password = '';

    	for (let i = 0; i < formInputData.characterLength; i+=Object.keys(formInputData).filter(key=>formInputData[key]).length - 1) {
    		if(formInputData.useUppercaseLetters) {
        		password += getRandomCharacter(passwordConfiguration.uppercaseLetters);
        	}

        	if(formInputData.useLowercaseLetters) {
        		password += getRandomCharacter(passwordConfiguration.lowercaseLetters);
        	}

        	if(formInputData.includeNumbers) {
        		password += getRandomCharacter(passwordConfiguration.numbers);
        	}

        	if(formInputData.includeSymbols) {
        		password += getRandomCharacter(passwordConfiguration.symbols);
        	}
        }

        return password;
    }

    const getRandomCharacter = (characters) => {
    	return characters.charAt(Math.floor(Math.random() * characters.length))
    }

 	const handleInputChange = (event) => {
 		const target = event.target;
    	const value = target.type === 'checkbox' ? target.checked : target.value;
    	const name = target.name;

   		setFormInputData({
      		...formInputData,
      		[name]: value,
    	});
 	}

 	const handleClick = () => {
 		if(currentPassword !== '') {
 			navigator.clipboard.writeText(currentPassword);	
 			setCopiedPassStatus(true);
 		}
 	}
    	
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
					<StrengthDisplay strengthStatus={strengthStatus}/>
					<GeneratePassButton handleFormSubmit={handleFormSubmit}/>
				</form>
			</div>
		</div>	
	)
}

export default PasswordGenerator;