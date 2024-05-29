import {MouseEventHandler, ReactElement, ReactNode} from 'react';

interface AppBtnProps {
  children: ReactNode;
  style: 'primary' | 'secondary';
  size?: 'small' | 'large';
  onClickFn?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  active?: boolean;
}

export default function AppButton({
  children,
  size,
  style,
  onClickFn,
  className,
  disabled,
  active
}: AppBtnProps): ReactElement {
  const getSize = (size: string | undefined): string => {
    switch (size) {
      case 'small':
        return 'btn-sm px-3 py-2';
      case 'large':
        return 'btn-lg px-5 px-3';
      default:
        return 'px-4 py-2';
    }
  };

  const getStyle = (style: string): string => {
    switch (style) {
      case 'primary':
        return 'btn-success';
      case 'secondary':
        return 'btn-outline-success';
      default:
        return 'btn-success';
    }
  };

  const isActive = (active: boolean | undefined): string => {
    return active ? 'active' : '';
  };

  return (
    <button
      type="button"
      className={`btn ${className} ${getSize(size)} ${getStyle(style)} ${isActive(active)}`}
      onClick={onClickFn}
      disabled={disabled}
    >
      {children}
    </button>
  );
}