import './PasswordConfigurations.css';

function PasswordConfigurations() {
	return (
		<div className="password-configurations__container">
			<div className="password-length__container">
				<span>Character Length</span>
				<span className="password-length--value">{0}</span>
			</div>

			<input type="range" min="0" max="20" className="slider" />

			<div className="configuration-input__container">
				<label className="label__container">
					<span className="label__name">Include Uppercase Letters</span>
	  				<input type="checkbox"  />
	  				<span className="checkmark"></span>
				</label>

				<label className="label__container">
					<span className="label__name" className="label__name">Include Lowercase Letters</span>
	  				<input type="checkbox"  />
	  				<span className="checkmark"></span>
				</label>

				<label className="label__container">
					<span className="label__name">Include Numbers</span>
	  				<input type="checkbox"  />
	  				<span className="checkmark"></span>
				</label>

				<label className="label__container">
					<span className="label__name">Include Symbols</span>
	  				<input type="checkbox"  />
	  				<span className="checkmark"></span>
				</label>
			</div>
		</div>
	) 
}

export default PasswordConfigurations;