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
      url: '/my-project',
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
          title: 'Sturiva',
          url: '#',
        },
        {
          title: 'Уфа-водоканал',
          url: '#',
        },
        {
          title: 'Ограждения варианты с насыпным грунтом',
          url: '#',
        },
        {
          title: 'Грунты тест',
          url: '#',
        },
        {
          title: 'Без названия (5)',
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
          title: '2224534343412',
          url: '#',
        },
        {
          title: 'Газпром',
          url: '#',
        },
        {
          title: 'Sturiva (2)',
          url: '#',
        },
        {
          title: 'Sturiva',
          url: '#',
        },
        {
          title: 'Без названия (2)',
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
    <Sidebar collapsible="icon" className="w-[236px]" {...props}>
      <div className="flex flex-col h-full bg-bg-surface2  gap-0.5 group-data-[collapsible=icon]:gap-0.5">
        <SidebarHeader className="pr-2.5 py-2.5 bg-bg-surface1 rounded inline-flex justify-start items-center overflow-hidden">
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>

        <SidebarContent className="flex-1 bg-bg-surface1 rounded p-2 gap-1.5 overflow-hidden">
          <NavMain items={data.navMain} />
        </SidebarContent>

        <SidebarFooter className="bg-bg-surface1 rounded p-2.5 mt-0">
          <NavUser user={data.user} />
        </SidebarFooter>
      </div>
      <SidebarRail />
    </Sidebar>
  );
}
