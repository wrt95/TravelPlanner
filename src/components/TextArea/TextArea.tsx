import { ChangeEvent, HTMLAttributes, ReactElement } from "react";
import classes from "./TextArea.module.css";

type TextAreaProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  label: string;
  hideLabel?: boolean;
} & HTMLAttributes<HTMLTextAreaElement>;

export const TextArea = ({
  value,
  onChange,
  required,
  label,
  hideLabel,
  id,
  ...rest
}: TextAreaProps): ReactElement => {
  return (
    <div>
      <label
        htmlFor={id}
        className={hideLabel ? classes.hiddenLabel : classes.inputLabel}
      >
        {hideLabel ? label : null}
      </label>
      <textarea
        value={value}
        id={id}
        onChange={onChange}
        required={required}
        rows={1} // TODO
        className={classes.styledInput}
        {...rest}
      />
    </div>
  );
};
