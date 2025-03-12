import { createUseStyles, Text, Theme } from '@seedui/seedui';
import { CSSProperties, FunctionComponent } from 'react';

const useStylesFromThemeFunction = createUseStyles((theme: Theme) => {
  const { palette, mode } = theme;

  return {
    root: {
      display: 'flex',
      flexDirection: 'row',
      gap: 12,
      alignItems: 'center',
    },
    text: {
      fontWeight: 'bold',
      fontSize: 16,
      color: mode === 'light' ? palette.light.black : palette.dark.white,
    },
    icon: {
      fill: mode === 'light' ? palette.light.black : palette.dark.white,
    },
  };
});

interface SeedLogoProps {
  style?: CSSProperties;
  hideText?: boolean;
  className?: string;
}

export const SeedLogo: FunctionComponent<SeedLogoProps> = ({ style, hideText = false, className }) => {
  const classes = useStylesFromThemeFunction();

  return (
    <div className={`${classes.root} ${className}`}>
      <svg style={style} width="18" height="18" viewBox="0 0 19 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.107247 6.52097C0.0958456 6.50657 0.0784828 6.49817 0.060111 6.49817V6.49817C0.0269126 6.49817 -1.3917e-05 6.4709 0.000138072 6.43771C0.0101613 4.24839 0.565906 2.63068 1.6679 1.584C2.72714 0.577445 4.33214 0.0506228 6.48317 0.00353253C6.68542 -0.000882189 6.88008 0.0985958 7.00859 0.268121L18.8438 15.8615C18.9447 15.9945 19.0011 16.1646 18.9973 16.3368C18.9539 18.3299 18.4236 19.7653 17.4069 20.642C16.4209 21.4964 14.8376 21.9426 12.657 21.9809C12.4602 21.9844 12.2701 21.8899 12.1419 21.7278L0.107247 6.52097ZM1.21297 12.3338L7.94177 20.8068C8.31319 21.2745 8.0071 22 7.43831 22H0.709508C0.342418 22 0 21.1763 0 20.7778L0.0447338 12.8053C0.0447338 12.1363 0.810633 11.827 1.21297 12.3338ZM11.3063 0H18.3352C18.7023 0 19 0.323158 19 0.721659V9.19261C19 9.85394 18.2487 10.1671 17.841 9.67559L10.8121 1.20463C10.4268 0.740201 10.7305 0 11.3063 0Z"
          className={classes.icon}
        />
      </svg>
      {!hideText && <Text className={classes.text}>seedui</Text>}
    </div>
  );
};
