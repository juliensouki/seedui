import { FunctionComponent, useEffect, useState, useCallback, useRef } from 'react';
import { Text } from '@seedui-react/seedui';
import styled from '@seedui-react/seedui/sc';

interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

const Nav = styled('nav')(({ theme }) => ({
  position: 'sticky' as const,
  top: theme.spacing(5),
  width: 180,
  flexShrink: 0,
  alignSelf: 'flex-start' as const,
  marginLeft: theme.spacing(5),
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

const Inner = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    borderLeft: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[300]}`,
    paddingLeft: theme.spacing(2),
  };
});

const Indicator = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: -17,
  width: 2,
  backgroundColor: theme.mode === 'light' ? theme.colors.primary[500] : theme.colors.primary.default,
  borderRadius: theme.borderRadius(1),
  transition: 'top 0.25s ease, height 0.25s ease',
}));

const ItemList = styled('div')(() => ({
  position: 'relative',
}));

const Item = styled('button')<{ $active: boolean }>(({ theme, $active }) => {
  const isLight = theme.mode === 'light';
  return {
    display: 'block',
    width: '100%',
    textAlign: 'left' as const,
    background: 'none',
    border: 'none',
    padding: `${theme.spacing(0.625)}px 0`,
    fontSize: theme.typography.p.fontSize,
    cursor: 'pointer',
    color: $active ? (isLight ? theme.colors.primary[500] : theme.colors.primary.default) : isLight ? theme.colors.neutral[500] : theme.colors.neutral[800],
    fontWeight: $active ? 600 : 400,
    transition: 'color 0.15s, font-weight 0.15s',
    '&:hover': {
      color: isLight ? theme.colors.primary[500] : theme.colors.primary.default,
    },
  };
});

export const TableOfContents: FunctionComponent<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 });
  const [isScrollable, setIsScrollable] = useState(true); // default true to avoid SSR layout shift
  const itemListRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const el = itemRefs.current.get(activeId);
    const container = itemListRef.current;
    if (el && container) {
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setIndicatorStyle({
        top: elRect.top - containerRect.top,
        height: elRect.height,
      });
    }
  }, [activeId]);

  const checkScrollable = useCallback(() => {
    const scrollContainer = document.querySelector('main');
    if (!scrollContainer) return;
    setIsScrollable(scrollContainer.scrollHeight > scrollContainer.clientHeight);
  }, []);

  const handleScroll = useCallback(() => {
    const scrollContainer = document.querySelector('main');
    if (!scrollContainer) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

    if (scrollTop + clientHeight >= scrollHeight - 2) {
      setActiveId(items[items.length - 1]?.id ?? '');
      return;
    }

    let current = items[0]?.id ?? '';
    const containerTop = scrollContainer.getBoundingClientRect().top;

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) {
        const elTop = el.getBoundingClientRect().top - containerTop;
        if (elTop <= 20) {
          current = item.id;
        }
      }
    }

    setActiveId(current);
  }, [items]);

  useEffect(() => {
    const scrollContainer = document.querySelector('main');
    if (!scrollContainer) return;

    checkScrollable();
    const observer = new ResizeObserver(checkScrollable);
    observer.observe(scrollContainer);

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, checkScrollable]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    const scrollContainer = document.querySelector('main');
    if (el && scrollContainer) {
      scrollContainer.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' });
    }
  };

  if (!isScrollable) return null;

  return (
    <Nav>
      <Inner>
        <Text variant="p" style={{ fontWeight: 600, marginBottom: 14 }}>On this page</Text>
        <ItemList ref={itemListRef}>
          <Indicator style={{ top: indicatorStyle.top, height: indicatorStyle.height }} />
          {items.map((item) => (
            <Item
              key={item.id}
              ref={(el) => {
                if (el) itemRefs.current.set(item.id, el);
              }}
              $active={activeId === item.id}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </Item>
          ))}
        </ItemList>
      </Inner>
    </Nav>
  );
};
