'use client';

import { Card } from '@/components/ui/card';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import * as React from 'react';

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
  }[];
}) {
  const [activeTeam] = React.useState(teams[0]);

  if (!activeTeam) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Card className="border-0 shadow-none bg-transparent p-0">
          <div className="flex w-full items-center gap-2 overflow-hidden rounded-md text-left text-sm outline-hidden transition-[width,height,padding] hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 h-12 group-data-[collapsible=icon]:p-0!">
            <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <activeTeam.logo className="size-7" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate text-2xl font-medium">
                {activeTeam.name}
              </span>
            </div>
            <SidebarTrigger className="-ml-1" />
          </div>
        </Card>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
