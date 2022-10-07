import PasswordConfigurations from './PasswordConfigurations';
import StrengthDisplay from './StrengthDisplay';
import GeneratePassButton from './GeneratePassButton';

function PasswordGenerator() {
	return (
		<>
			<PasswordConfigurations />
			<StrengthDisplay />
			<GeneratePassButton />
		</>
	)
}

export default PasswordGenerator;