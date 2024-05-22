import {ReactElement} from 'react';
import AppBtnProps from './AppButtonProps.ts';

export default function AppPrimaryButton({
  onClickFn,
  children,
  disabled,
  active
}: AppBtnProps): ReactElement {
  return (
    <button
      type="button"
      className={`btn btn-success ${active ? 'active' : ''}`}
      onClick={onClickFn}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
