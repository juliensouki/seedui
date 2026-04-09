import { FunctionComponent, useState, useEffect, ReactElement } from 'react';
import {
  Avatar,
  AvatarStack,
  Button,
  ProgressBar,
  Select,
  Toggle,
} from '@seedui-react/seedui';
import { WallContent } from '../home/wallOfComponents';

const WIDTH = 420;
const HEIGHT = WIDTH * (3 / 5);

const slideStyles = `
  @keyframes wall-slide-in {
    from { transform: translateX(${WIDTH}px); opacity: 0; }
    to   { transform: translateX(0); opacity: 1; }
  }
  @keyframes wall-slide-out {
    from { transform: translateX(0); opacity: 1; }
    to   { transform: translateX(${-WIDTH}px); opacity: 0; }
  }
`;

const slides: (() => ReactElement)[] = [
  () => (
    <div style={{ width: WIDTH, height: HEIGHT, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 48, top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: 8, zIndex: 1 }}>
        <img src="/logo-black.svg" alt="seedui" width={32} height={32} />
        <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em' }}>seedui</span>
      </div>
      <div style={{
        position: 'absolute',
        right: -80,
        top: '40%',
        transform: 'translateY(-50%) scale(0.45)',
        transformOrigin: 'right center',
        opacity: 0.8,
        pointerEvents: 'none',
      }}>
        <WallContent />
      </div>
    </div>
  ),
  () => (
    <Select
      options={[
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'svelte', label: 'Svelte' },
      ]}
      value="react"
      onChange={() => {}}
      label={{ text: 'Framework' }}
      placeholder="Pick one"
      width={300}
    />
  ),
  () => <Toggle checked={true} onChange={() => {}} />,
  () => (
    <AvatarStack max={3}>
      <Avatar src="https://i.pravatar.cc/150?img=1" name="Jane Doe" />
      <Avatar src="https://i.pravatar.cc/150?img=2" name="John Smith" />
      <Avatar src="https://i.pravatar.cc/150?img=3" name="Alex Kim" />
      <Avatar name="Sam Lee" color="success" />
    </AvatarStack>
  ),
  () => <div style={{ width: 200 }}><ProgressBar value={65} /></div>,
  () => <Button>Click me</Button>,
];

const INTERVAL = 3000;
const ANIM_DURATION = 450;

export const ComponentWall: FunctionComponent = () => {
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState<'in' | 'out'>('in');

  useEffect(() => {
    const id = setInterval(() => {
      setPhase('out');
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setPhase('in');
      }, ANIM_DURATION);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  const content = slides[current]();

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <style dangerouslySetInnerHTML={{ __html: slideStyles }} />
      <div style={{ width: WIDTH, height: HEIGHT, overflow: 'hidden', position: 'relative', backgroundColor: '#f9f9fb' }}>
        <div
          key={`${current}-${phase}`}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: current === 0 ? 0 : 24,
            animation: `${phase === 'in' ? 'wall-slide-in' : 'wall-slide-out'} ${ANIM_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
};
