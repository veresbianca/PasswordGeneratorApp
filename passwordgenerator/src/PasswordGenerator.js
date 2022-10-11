import PasswordConfigurations from './PasswordConfigurations';
import StrengthDisplay from './StrengthDisplay';
import GeneratePassButton from './GeneratePassButton';
import './PasswordGenerator.css'

function PasswordGenerator() {
	return (
		<div className="password-generator__container">
			<PasswordConfigurations />
			<StrengthDisplay />
			<GeneratePassButton />
		</div>
	)
}

export default PasswordGenerator;