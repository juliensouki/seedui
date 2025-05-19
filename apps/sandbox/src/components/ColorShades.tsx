import { FunctionComponent } from 'react';
import { SemanticColors, SemanticColorShades, styled } from '@seedui-react/seedui';

const ColorShade = styled.div<{ index: keyof SemanticColorShades; color: keyof SemanticColors }>((props) => {
  const theme = props.theme;

  return {
    width: 120,
    height: 80,
    borderRadius: 10,
    backgroundColor: theme.colors[props.color][props.index],
    border: `1px solid ${theme.colors.neutral[300]}`,
    boxShadow: theme.boxShadow[1],
  };
});

export const ColorShades: FunctionComponent = () => {
  const keys: (keyof SemanticColorShades)[] = [100, 200, 300, 400, 500, 600, 700, 800, 900];

  return (
    <div style={{ display: 'flex', gap: 20 }}>
      {keys.map((key) => (
        <ColorShade color="primary" index={key} key={key} />
      ))}
    </div>
  );
};
