import './StrengthDisplay.css'

function StrengthDisplay() {
	const statusColor = {
		'default': 'none',
		'too_weak' : 'red',
		'weak' : 'orange',
		'medium' : 'yellow',
		'strong' : 'neon-green'
	};

	const barToBeFilled = {
		'default': 0,
		'too_weak': 1,
		'weak': 2,
		'medium': 3,
		'strong': 4
	}

	const statusLabel = {
		'default': '',
		'too_weak': 'TOO WEAK!',
		'weak': 'WEAK',
		'medium': 'MEDIUM',
		'strong': 'STRONG'
	}

	const barNumber = [1, 2, 3, 4]

	const currentStatus = 'default';

	return (
		<div className="strength-display__container">
			<span className="strength-display__label">STRENGTH</span>
			<div className="strength-display__status-container">
				<span className="strength-display--status">{statusLabel[currentStatus]}</span>
				<div className={`strength-bar__container status-${statusColor[currentStatus]}`}>
					{barNumber.map((bar, i) => {
			            return (<span key={i} className={`strength-bar ${barToBeFilled[currentStatus] <= i ? 'empty' : ''}`}></span>) 
			        })}
				</div>
			</div>
		</div>
	)
}

export default StrengthDisplay;