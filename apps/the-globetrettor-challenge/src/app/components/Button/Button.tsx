import { cva } from 'class-variance-authority';
import { ButtonProps } from './types';
import { cn } from '../../utils/cn';

const buttonCva = cva('text-primary-font-1 p-4 rounded-md', {
  variants: {
    variant: {
      primary:
        'bg-primary-orange-1 border-2 border-primary-font-1 font-bold text-primary-font-1',
    },
  },
});

const Button = ({ children, onClick, className, disabled }: ButtonProps) => {
  return (
    <button
      className={cn(buttonCva({ variant: 'primary', className }))}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
