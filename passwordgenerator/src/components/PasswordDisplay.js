import "./PasswordDisplay.css";

import CopyIcon from "../images/copy-icon-active.svg";
import CopyIconInactive from "../images/copy-icon-inactive.svg";

function PasswordDisplay({ handleClick, password, isEmptyPass, isPassCopied }) {
  const renderElement = () => {
    if (isPassCopied) {
      return (
        <>
          <span className="password-display--status copied">COPIED</span>
          <img src={CopyIcon} alt="Copy Icon" className="copy_icon--active" />
        </>
      );
    } else {
      return (
        <img
          src={CopyIconInactive}
          alt="Copy Icon Inactive"
          className="copy_icon--inactive"
          onClick={handleClick}
        />
      );
    }
  };

  return (
    <div className="password-display__container">
      <span className={`password-display--title ${isEmptyPass ? "empty" : ""}`}>
        {password}
      </span>
      <div className="password-display-copy__container">{renderElement()}</div>
    </div>
  );
}

export default PasswordDisplay;
