'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { ChevronDown, ChevronUp, type LucideIcon } from 'lucide-react';
import { useState } from 'react';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'Все проекты': true,
    Избранное: true,
    Последние: true,
  });

  const [activeItem, setActiveItem] = useState<string>(
    items.find((item) => item.isActive)?.title ?? items[0]?.title ?? ''
  );

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <SidebarGroup className="p-0 gap-1.5">
      <SidebarMenu className="gap-1.5">
        {items.map((item) => {
          const isOpen = openSections[item.title];
          const isActive = activeItem === item.title;

          return (
            <Collapsible
              key={item.title}
              open={isOpen}
              onOpenChange={() => toggleSection(item.title)}
              className="group/collapsible"
            >
              <SidebarMenuItem className="relative">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    onClick={() => setActiveItem(item.title)}
                    tooltip={item.title}
                    className={`
                      p-2.5 rounded inline-flex justify-start items-center gap-1.5 overflow-hidden
                      ${
                        isActive
                          ? 'bg-bg-surface3 text-accent-default'
                          : 'bg-bg-surface1 text-fg-default hover:bg-bg-surface3'
                      }
                    `}
                  >
                    {item.icon && (
                      <item.icon
                        className={`w-5 h-5 ${isActive ? 'text-accent-default' : 'text-fg-soft'}`}
                      />
                    )}
                    <span className="flex-1 text-sm font-medium group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>
                    {item.items && (
                      <div className="ml-auto group-data-[collapsible=icon]:hidden">
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-fg-soft" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-fg-soft" />
                        )}
                      </div>
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {item.items && (
                  <CollapsibleContent>
                    <SidebarMenuSub className="py-1.5 gap-1.5 border-l-0 mx-0 px-0">
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className="p-2.5 bg-bg-surface1 rounded inline-flex justify-start items-center gap-1.5 overflow-hidden hover:bg-bg-surface3"
                          >
                            <a
                              href={subItem.url}
                              className="flex items-center gap-1.5 w-full"
                            >
                              <div className="w-5 h-5" />
                              <span className="flex-1 text-fg-soft text-sm font-medium truncate">
                                {subItem.title}
                              </span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
