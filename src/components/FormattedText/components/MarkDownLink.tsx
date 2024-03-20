import * as model from '@/model/pages/project';
import { Link } from '@gravity-ui/uikit';
import { useEvent } from 'effector-react';
import { useCallback } from 'react';
import { ExtraProps } from 'react-markdown';

type MarkDownLinkProps = JSX.IntrinsicElements['a'] & ExtraProps;

export const MarkDownLink = (props: MarkDownLinkProps) => {
  const { href, children } = props;
  const loadFeature = useEvent(model.loadFeature);
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href
      && href.startsWith('/project')
      && href.includes('feature')
      && e.button === 0
      && !e.ctrlKey
      && !e.metaKey
      && !e.shiftKey
      && !e.altKey) {
      e.preventDefault();
      loadFeature({ feature: href.split('feature=')[1].split('&')[0] });
    }
  },
    [href, loadFeature]);
  if (href && href.startsWith('/project') && href.includes('feature')) {
    return <Link href={href} onClick={handleClick}> {children}</Link >;
  }
  return <Link href={href}>{children}</Link>;
};
