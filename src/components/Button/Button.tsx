import { ReactNode, ReactElement, ButtonHTMLAttributes } from 'react';
import classes from './button.module.css';
import cn from 'classnames';

type ButtonProps = {
	children: ReactNode;
	variant?: 'default' | 'danger';
} & ButtonHTMLAttributes<HTMLButtonElement>;

// TODO ICON
export const Button = ({
	children,
	variant = 'default',
	className,
	...rest
}: ButtonProps): ReactElement => {
	return (
		<button
			className={cn(classes.button, classes[variant], className)}
			{...rest}
		>
			{children}
		</button>
	);
};
