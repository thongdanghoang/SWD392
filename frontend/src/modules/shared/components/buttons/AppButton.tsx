import {MouseEventHandler, ReactElement, ReactNode} from 'react';

interface AppBtnProps {
  children: ReactNode;
  style: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'large';
  onClickFn?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  active?: boolean;
}

export default function AppButton({
  children,
  style,
  type,
  size,
  onClickFn,
  className,
  disabled,
  active
}: AppBtnProps): ReactElement {
  const getSize = (size: string | undefined): string => {
    switch (size) {
      case 'small':
        return 'btn-sm px-3 py-2 semibold-14';
      case 'large':
        return 'btn-lg px-5 px-3 semibold-20';
      default:
        return 'px-4 py-2 semibold-16';
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

  const getType = (
    type: string | undefined
  ): 'button' | 'submit' | 'reset' | undefined => {
    switch (type) {
      case 'button':
        return 'button';
      case 'submit':
        return 'submit';
      case 'reset':
        return 'reset';
      default:
        return 'button';
    }
  };

  return (
    <button
      type={getType(type)}
      className={`btn ${className} ${getSize(size)} ${getStyle(style)} ${isActive(active)}`}
      onClick={onClickFn}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
