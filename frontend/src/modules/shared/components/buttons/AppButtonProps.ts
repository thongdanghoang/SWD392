import {MouseEventHandler, ReactNode} from 'react';

export default interface AppBtnProps {
  children: ReactNode;
  onClickFn?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  active?: boolean;
}
