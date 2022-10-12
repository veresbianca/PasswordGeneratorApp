import './StrengthDisplay.css';

const barNumber = [1, 2, 3, 4]

// const currentStatus = 'medium';

const statusProperties = {
	'default': {
		statusColor: 'none',
		barToBeFilled: 0,
		statusLabel: ''
	},
	'too_weak': {
		statusColor: 'red',
		barToBeFilled: 1,
		statusLabel: 'TOO WEAK!'
	},
	'weak': {
		statusColor: 'orange',
		barToBeFilled: 2,
		statusLabel: 'WEAK'
	},
	'medium': {
		statusColor: 'yellow',
		barToBeFilled: 3,
		statusLabel: 'MEDIUM'
	},
	'strong': {
		statusColor: 'neon-green',
		barToBeFilled: 4,
		statusLabel: 'STRONG'
	}
}

function StrengthDisplay({strengthStatus}) {
	return (
		<div className="strength-display__container">
			<span className="strength-display__label">STRENGTH</span>
			<div className="strength-display__status-container">
				<span className="strength-display--status">{statusProperties[strengthStatus].statusLabel}</span>
				<div className={`strength-bar__container status-${statusProperties[strengthStatus].statusColor}`}>
					{barNumber.map((bar, i) => {
			            return (<span key={i} className={`strength-bar ${statusProperties[strengthStatus].barToBeFilled <= i ? 'empty' : ''}`}></span>) 
			        })}
				</div>
			</div>
		</div>
	)
}

export default StrengthDisplay;