import { FunctionComponent, useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ComponentMDXLayout } from '../components/mdx/ComponentMDXLayout';

interface ComponentMeta {
  name: string;
  category: string;
  description: string;
}

interface MdxModule {
  default: FunctionComponent;
  meta: ComponentMeta;
}

const componentModules = import.meta.glob<MdxModule>('./content/components/*.mdx');

export const ComponentPage: FunctionComponent = () => {
  const { name } = useParams<{ name: string }>();
  const [Content, setContent] = useState<FunctionComponent | null>(null);
  const [meta, setMeta] = useState<ComponentMeta | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setContent(null);
    setMeta(null);
    setNotFound(false);

    // Convert PascalCase name (e.g. "AvatarStack") to kebab-case ("avatar-stack")
    const kebab = name?.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() ?? '';
    const key = Object.keys(componentModules).find((k) => {
      const fileName = k.split('/').pop()?.replace('.mdx', '') ?? '';
      return fileName === kebab;
    });

    if (!key) {
      setNotFound(true);
      return;
    }

    void componentModules[key]().then((mod) => {
      setContent(() => mod.default);
      setMeta(mod.meta);
    });
  }, [name]);

  if (notFound) return <Navigate to="/" replace />;
  if (!Content || !meta) return null;

  return (
    <ComponentMDXLayout name={meta.name} description={meta.description}>
      <Content />
    </ComponentMDXLayout>
  );
};
