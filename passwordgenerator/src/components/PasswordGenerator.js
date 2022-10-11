import PasswordConfigurations from './PasswordConfigurations';
import StrengthDisplay from './StrengthDisplay';
import GeneratePassButton from './GeneratePassButton';
import PasswordDisplay from './PasswordDisplay';

import './PasswordGenerator.css'

function PasswordGenerator() {
	return (
		<div className="app-component__container">
      		<h1 className="app-component__title">Password Generator</h1>
      		<PasswordDisplay />
			<div className="password-generator__container">
				<PasswordConfigurations />
				<StrengthDisplay />
				<GeneratePassButton />
			</div>
		</div>	
	)
}

export default PasswordGenerator;