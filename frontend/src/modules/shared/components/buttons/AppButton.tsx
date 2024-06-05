import {MouseEventHandler, ReactElement, ReactNode} from 'react';

interface AppBtnProps {
  children: ReactNode;
  variant: 'primary' | 'secondary' | 'tertiary';
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'large';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  active?: boolean;
}

export default function AppButton({
  children,
  variant,
  type,
  size,
  onClick,
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

  const getVariant = (variant: string): string => {
    switch (variant) {
      case 'primary':
        return 'btn-success';
      case 'secondary':
        return 'btn-outline-success';
      case 'tertiary':
        return 'btn-danger';
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
      className={`btn ${className} ${getSize(size)} ${getVariant(variant)} ${isActive(active)}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
