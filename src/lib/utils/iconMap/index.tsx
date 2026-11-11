import React, { ReactElement } from 'react';

import { Icons } from '@/components/Icons';

import {
  BriefcaseIcon,
  CodeIcon,
  HomeIcon,
  NotebookIcon,
  RocketIcon,
} from 'lucide-react';

export const iconMap: Record<
  string,
  (props: React.HTMLAttributes<SVGElement>) => ReactElement
> = {
  briefcase: (props) => <BriefcaseIcon {...props} />,
  code: (props) => <CodeIcon {...props} />,
  email: (props) => <Icons.email {...props} />,
  github: (props) => <Icons.github {...props} />,
  home: (props) => <HomeIcon {...props} />,
  linkedin: (props) => <Icons.linkedin {...props} />,
  notebook: (props) => <NotebookIcon {...props} />,
  rocket: (props) => <RocketIcon {...props} />,
  x: (props) => <Icons.x {...props} />,
  youtube: (props) => <Icons.youtube {...props} />,
};
