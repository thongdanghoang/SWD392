import {ReactElement} from 'react';
import AppBtnProps from './AppButtonProps.ts';

export default function AppSecondaryButton({
  onClickFn,
  children,
  disabled,
  active
}: AppBtnProps): ReactElement {
  return (
    <button
      type="button"
      className={`btn btn-outline-success ${active ? 'active' : ''}`}
      disabled={disabled}
      onClick={onClickFn}
    >
      {children}
    </button>
  );
}
