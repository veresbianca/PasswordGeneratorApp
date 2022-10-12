import { useState } from 'react';

import './PasswordDisplay.css';

import CopyIcon from '../images/copy-icon-active.svg';
import CopyIconInactive from '../images/copy-icon-inactive.svg';

function PasswordDisplay({handleClick, password, emptyPass, copiedPass}) {
	let titleClassName = 'password-display--title';
	if (emptyPass) {
		titleClassName += ' empty';
	}

	let passStatusClassName = 'password-display--status';
	if (copiedPass) {
		passStatusClassName += ' copied';
	}

	const renderElement = () => {
   		if (copiedPass) {
			return(
				<>
					<span className={passStatusClassName}>COPIED</span>
					<img src={CopyIcon} alt="Copy Icon" className="copy_icon--active"/>
			 	</>
		 	)
		} else {
			return(
				<img src={CopyIconInactive} 
						 alt="Copy Icon Inactive" 
						 className="copy_icon--inactive" 
						 onClick={handleClick}/>
			)
		}
	}

	return (
		<div className="password-display__container">
      		<span className={titleClassName}>{password}</span>
      		<div className="password-display-copy__container">
      			{renderElement()}
      		</div>
		</div>
	)
}

export default PasswordDisplay;