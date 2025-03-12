import { FunctionComponent } from 'react';
import { Tag, Text, ThemeProvider } from '@seedui/seedui';

import '@fontsource/poppins';
import '@fontsource-variable/inter';

export const App: FunctionComponent = () => {
  return (
    <ThemeProvider>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 20, padding: 20 }}>
        <Tag>Hello World</Tag>
        <Tag color="primary">Hello World</Tag>
        <Tag color="secondary">Hello World</Tag>
        <Tag color="info">Hello World</Tag>
        <Tag color="success">Hello World</Tag>
        <Tag color="warning">Hello World</Tag>
        <Tag color="error">Hello World</Tag>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 20, padding: 20 }}>
        <Tag size="sm">Hello World</Tag>
        <Tag size="sm" color="primary">
          Hello World
        </Tag>
        <Tag size="sm" color="secondary">
          Hello World
        </Tag>
        <Tag size="sm" color="info">
          Hello World
        </Tag>
        <Tag size="sm" color="success">
          Hello World
        </Tag>
        <Tag size="sm" color="warning">
          Hello World
        </Tag>
        <Tag size="sm" color="error">
          Hello World
        </Tag>
      </div>

      <div style={{ marginTop: 80 }}>
        <Text variant="h1">Lorem ipsum et bla bla bla.</Text>
        <Text variant="h2">Lorem ipsum et bla bla bla.</Text>
        <Text variant="h3">Lorem ipsum et bla bla bla.</Text>
        <Text variant="h4">Lorem ipsum et bla bla bla.</Text>
        <Text variant="h5">Lorem ipsum et bla bla bla.</Text>
        <Text variant="h6">Lorem ipsum et bla bla bla.</Text>
        <Text variant="p">Lorem ipsum et bla bla bla.</Text>
        <Text variant="caption">Lorem ipsum et bla bla bla.</Text>
        <Text variant="small">Lorem ipsum et bla bla bla.</Text>
      </div>
    </ThemeProvider>
  );
};
