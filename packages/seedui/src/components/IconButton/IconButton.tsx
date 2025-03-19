import { ForwardedRef, forwardRef, KeyboardEvent, MouseEvent, useImperativeHandle, useRef, useState } from 'react';

import { IconButtonPrimaryFilled } from './variants/PrimaryFilled';
import { IconButtonSecondaryFilled } from './variants/SecondaryFilled';
import { IconButtonNeutralFilled } from './variants/NeutralFilled';
import { IconButtonPrimaryTransparent } from './variants/PrimaryTransparent';
import { IconButtonSecondaryTransparent } from './variants/SecondaryTransparent';
import { IconButtonNeutralTransparent } from './variants/NeutralTransparent';
import { IconButtonColors, IconButtonBase, IconButtonVariants, IconButtonProps } from './IconButtonBase';
import { FocusRing } from '../_internal/FocusRing';

const componentsMap: Record<IconButtonVariants, Record<IconButtonColors, typeof IconButtonBase>> = {
  filled: {
    primary: IconButtonPrimaryFilled,
    secondary: IconButtonSecondaryFilled,
    neutral: IconButtonNeutralFilled,
  },
  transparent: {
    primary: IconButtonPrimaryTransparent,
    secondary: IconButtonSecondaryTransparent,
    neutral: IconButtonNeutralTransparent,
  },
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      htmlAttributes: { rootButton: rootButtonHTMLAttributes } = {},
      size = 'md',
      color = 'primary',
      variant = 'filled',
      disabled,
      children,
    }: IconButtonProps,
    forwardedRef: ForwardedRef<HTMLButtonElement>,
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isClicking, setIsClicking] = useState<boolean>(false);

    const buttonRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(forwardedRef, () => buttonRef.current as HTMLButtonElement);

    const IconButtonElement = componentsMap[variant][color];

    const preventFocusOnClick = (event: MouseEvent<HTMLButtonElement>): void => {
      if (event.detail === 0) {
        // This means that the click was triggered by a keyboard event. We want to keep the focus in that case.
        return;
      }
      event.currentTarget.blur();
    };

    const handleKeyEvent = (event: KeyboardEvent<HTMLButtonElement>): void => {
      if (event.key === ' ') {
        if (event.type === 'keydown') {
          setIsActive(true);
        } else if (event.type === 'keyup') {
          setIsActive(false);
        }
      }
    };

    const handleMouseEvent = (event: MouseEvent<HTMLButtonElement>): void => {
      if (event.type === 'mousedown') {
        setIsClicking(true);
      } else if (event.type === 'mouseup') {
        setIsClicking(false);
      }
    };

    return (
      <IconButtonElement
        {...rootButtonHTMLAttributes}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyEvent}
        onKeyUp={handleKeyEvent}
        onClick={preventFocusOnClick}
        onMouseDown={handleMouseEvent}
        onMouseUp={handleMouseEvent}
        color={color}
        disabled={disabled}
        size={size}
        ref={buttonRef}
      >
        <FocusRing color={color} show={isFocused && !isClicking} pressed={isActive} />
        {children}
      </IconButtonElement>
    );
  },
);

IconButton.displayName = 'IconButton';
