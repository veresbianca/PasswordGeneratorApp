import { useState } from 'react';

import './PasswordDisplay.css';

import CopyIcon from './fa-regular_copy.svg';
import CopyIconInactive from './copy-icon-inactive.svg';

function PasswordDisplay() {
	const [emptyPass, setPass] = useState(true);
	const copiedPass = false;

	let titleClassName = 'password-display--title';
	if (emptyPass) {
		titleClassName += ' empty';
	}

	let passStatusClassName = 'password-display--status';
	if (copiedPass) {
		passStatusClassName += ' copied';
	}

	const onClickHandler = () => {
		console.log('icon is clicked')
	}

	return (
		<div className="password-display__container">
      		<span className={titleClassName}>PoE3xs8Hss</span>
      		<div className="password-display-copy__container">
      			<span className={passStatusClassName}>COPIED</span>
      			<img src={CopyIcon} alt="Copy Icon" className="copy_icon--active" onClick={onClickHandler}/>
      			<img src={CopyIconInactive} alt="Copy Icon Inactive" className="copy_icon--inactive" onClick={onClickHandler}/>
      		</div>
		</div>
	)
}

export default PasswordDisplay;