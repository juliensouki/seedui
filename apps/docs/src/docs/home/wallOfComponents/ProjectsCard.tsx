import { FunctionComponent, useState } from 'react';
import { Text, SearchBar } from '@seedui-react/seedui';
import { useTheme } from '@seedui-react/seedui/sc';
import { WallCard, MiniLabel, StatusDot } from './shared';

export const ProjectsCard: FunctionComponent = () => {
  const theme = useTheme();
  const isLight = theme.mode === 'light';
  const [search, setSearch] = useState('');

  const projects = [
    { name: 'Design System', status: 'Active', color: theme.colors.success[500] },
    { name: 'Mobile App', status: 'In review', color: theme.colors.warning[500] },
    { name: 'API v2', status: 'Draft', color: theme.colors.neutral[400] },
  ];
  const filteredProjects = projects.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.status.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <WallCard>
      <MiniLabel>Projects</MiniLabel>
      <SearchBar
        placeholder="Search projects..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        width="100%"
      />
      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filteredProjects.length === 0 ? (
          <Text variant="caption" style={{ color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800], textAlign: 'center', padding: '12px 0' }}>
            No projects found
          </Text>
        ) : (
          filteredProjects.map((p) => (
            <div
              key={p.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderRadius: 8,
                backgroundColor: isLight ? theme.colors.neutral[100] : theme.colors.neutral[200],
              }}
            >
              <Text variant="small" style={{ fontWeight: 500 }}>
                <StatusDot $color={p.color} />
                {p.name}
              </Text>
              <Text variant="caption" style={{ color: isLight ? theme.colors.neutral[400] : theme.colors.neutral[800] }}>
                {p.status}
              </Text>
            </div>
          ))
        )}
      </div>
    </WallCard>
  );
};
