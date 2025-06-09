'use client';

import LogoComponent from '@/components/icon/logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Frame, Heart, History, Home, Map, PieChart } from 'lucide-react';
import * as React from 'react';

// This is sample data.
const data = {
  user: {
    name: 'Константин',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Hydroweb',
      logo: LogoComponent,
    },
  ],
  navMain: [
    {
      title: 'Все проекты',
      url: '#',
      icon: Home,
      isActive: true,
      items: [
        {
          title: 'Уфа-Водоканал',
          url: '#',
        },
        {
          title: 'Sturiva',
          url: '#',
        },
        {
          title: 'Газпром',
          url: '#',
        },
      ],
    },
    {
      title: 'Избранное',
      url: '#',
      icon: Heart,
      items: [
        {
          title: 'Сбербанк',
          url: '#',
        },
        {
          title: 'Ростелеком',
          url: '#',
        },
        {
          title: 'ВТБ',
          url: '#',
        },
        {
          title: 'Мегафон',
          url: '#',
        },
      ],
    },
    {
      title: 'Последние',
      url: '#',
      icon: History,
      items: [
        {
          title: 'Сбербанк',
          url: '#',
        },
        {
          title: 'Ростелеком',
          url: '#',
        },
        {
          title: 'ВТБ',
          url: '#',
        },
        {
          title: 'Мегафон',
          url: '#',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarSeparator className="h-1" />
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/*<NavProjects projects={data.projects} />*/}
      </SidebarContent>
      <SidebarSeparator className="h-1" />
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
