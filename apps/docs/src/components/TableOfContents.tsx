import { FunctionComponent, useEffect, useState, useCallback, useRef } from 'react';
import { styled } from '@seedui-react/seedui';

interface TocItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TocItem[];
}

const Nav = styled('nav')(({ theme }) => ({
  position: 'sticky' as const,
  top: 40,
  width: 180,
  flexShrink: 0,
  alignSelf: 'flex-start' as const,
  marginLeft: 40,
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

const Inner = styled('div')(({ theme }) => {
  const isLight = theme.mode === 'light';
  return {
    borderLeft: `1px solid ${isLight ? theme.colors.neutral[200] : theme.colors.neutral[700]}`,
    paddingLeft: 16,
  };
});

const Indicator = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: -17,
  width: 2,
  backgroundColor: theme.colors.primary[500],
  borderRadius: 2,
  transition: 'top 0.25s ease, height 0.25s ease',
}));

const Label = styled('div')(() => ({
  fontSize: 15,
  fontWeight: 600,
  marginBottom: 14,
}));

const ItemList = styled('div')(() => ({
  position: 'relative',
}));

const Item = styled('button')<{ $active: boolean }>(({ theme, $active }) => ({
  display: 'block',
  width: '100%',
  textAlign: 'left',
  background: 'none',
  border: 'none',
  padding: '5px 0',
  fontSize: 14,
  cursor: 'pointer',
  color: $active ? theme.colors.primary[500] : theme.colors.neutral[500],
  fontWeight: $active ? 600 : 400,
  transition: 'color 0.15s, font-weight 0.15s',
  '&:hover': {
    color: theme.colors.primary[500],
  },
}));

export const TableOfContents: FunctionComponent<TableOfContentsProps> = ({ items }) => {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 });
  const [isScrollable, setIsScrollable] = useState(false);
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
        <Label>On this page</Label>
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
