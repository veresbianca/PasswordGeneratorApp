import './GeneratePassButton.css';

import BtnArrow from './bx_arrow-to-left.svg';
import BtnArrowNeon from './arrow-neon.svg';

function GeneratePassButton() {
	return (
		<div className="button__container">
			<button className="generate-pass-btn" type='button'>
				<span>GENERATE</span>
				<img src={BtnArrow} alt="Arrow Button" className="default-arrow" />
				<img src={BtnArrowNeon} alt="Arrow Button" className="neon-arrow" />	
			</button>
		</div>
	)
}

export default GeneratePassButton;