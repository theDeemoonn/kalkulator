'use client';

import CopyRight from '@/components/icon/copy-right';
import Heart from '@/components/icon/heart';
import HeartFilled from '@/components/icon/heart-filled';
import SortVertical from '@/components/icon/sort-vertical';
import Trash from '@/components/icon/trash';
import {
  PageActions,
  PageContainer,
  PageContent,
  PageHeader,
  PageTableContainer,
} from '@/components/page-container';
import { TypographyBodyM, TypographyH2 } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SidebarInset } from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';

interface Project {
  id: string;
  name: string;
  location: string;
  updatedAt: string;
  updatedTime: string;
  calculationsCount: number;
  isFavorite: boolean;
  status?: string;
}

type SortState = 'none' | 'asc' | 'desc';

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: '2224534343412',
      location: 'Без адреса',
      updatedAt: '25.03.2025',
      updatedTime: '14:28',
      calculationsCount: 0,
      isFavorite: false,
    },
    {
      id: '2',
      name: 'Газпром',
      location: 'г. Екатеринбург, Сергеевкий тракт (22.323444; 43.333321)',
      updatedAt: '25.03.2025',
      updatedTime: '11:32',
      calculationsCount: 11,
      isFavorite: true,
    },
    {
      id: '3',
      name: 'Sturiva (2)',
      location: 'г. Вильянди, ул Леола, участок №5 (34.234532; 54.12231)',
      updatedAt: '21.03.2025',
      updatedTime: '16:42',
      calculationsCount: 2,
      isFavorite: true,
    },
    {
      id: '4',
      name: 'Sturvia',
      location: 'г. Вильянди, ул Леола, участок №5 (34.234532; 54.12231)',
      updatedAt: '21.03.2025',
      updatedTime: '15:25',
      calculationsCount: 0,
      isFavorite: false,
    },
    {
      id: '5',
      name: 'Без названия (2)',
      location: 'Без адреса',
      updatedAt: '20.03.2025',
      updatedTime: '21:33',
      calculationsCount: 1,
      isFavorite: false,
    },
    {
      id: '6',
      name: 'Уфа-водоканал',
      location: 'г. Уфа',
      updatedAt: '19.03.2025',
      updatedTime: '11:52',
      calculationsCount: 24,
      isFavorite: true,
    },
    {
      id: '7',
      name: '242424',
      location: 'г. Москва',
      updatedAt: '01.12.2024',
      updatedTime: '10:01',
      calculationsCount: 1,
      isFavorite: false,
    },
    {
      id: '8',
      name: 'Ограждения варианты с насыпным грунтом',
      location: 'Без адреса',
      updatedAt: '21.11.2024',
      updatedTime: '13:11',
      calculationsCount: 5,
      isFavorite: true,
    },
    {
      id: '9',
      name: 'Грунты тест',
      location: 'Без адреса',
      updatedAt: '20.11.2024',
      updatedTime: '15:45',
      calculationsCount: 15,
      isFavorite: true,
    },
    {
      id: '10',
      name: 'Без названия (3)',
      location: 'Без адреса',
      updatedAt: '19.11.2024',
      updatedTime: '12:12',
      calculationsCount: 1,
      isFavorite: false,
    },
    {
      id: '11',
      name: 'Без имени',
      location: 'Без адреса',
      updatedAt: '01.12.2024',
      updatedTime: '10:01',
      calculationsCount: 1,
      isFavorite: false,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortState, setSortState] = useState<SortState>('none');
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const handleSort = () => {
    // Циклическое переключение состояний: none → asc → desc → none
    const nextState: Record<SortState, SortState> = {
      none: 'asc',
      asc: 'desc',
      desc: 'none',
    };

    setSortState(nextState[sortState]);
  };

  const getSortedProjects = () => {
    if (sortState === 'none') return projects;

    return [...projects].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name, 'ru');
      return sortState === 'asc' ? comparison : -comparison;
    });
  };

  const toggleFavorite = (projectId: string) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? { ...project, isFavorite: !project.isFavorite }
          : project
      )
    );
  };

  const copyProject = (projectId: string) => {
    console.log('Copy project:', projectId);
  };

  const deleteProject = (projectId: string) => {
    console.log('Delete project:', projectId);
  };

  const filteredProjects = getSortedProjects().filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <TooltipProvider>
      <SidebarInset>
        <PageContainer>
          {/* Headers */}
          <PageHeader>
            <TypographyH2>Мои проекты</TypographyH2>
          </PageHeader>

          {/* Actions container */}
          <PageActions>
            <div className="flex justify-start items-center gap-4 h-7.5">
              {/* Input with search icon */}
              <div className="w-64 inline-flex flex-col justify-start items-start gap-1.5">
                <div className="relative w-full">
                  <div className="absolute left-1.5 top-1.5 z-10">
                    <Search className="w-[18px] h-[18px] text-fg-muted" />
                  </div>
                  <Input
                    placeholder="Поиск по проектам"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-1.5 pl-8 h-7.5 bg-bg-surface1 rounded border border-border-hard text-fg-soft text-xs font-medium"
                  />
                </div>
              </div>

              {/* Filters dropdown */}
              <Select>
                <SelectTrigger className="p-1.5 h-7.5 bg-bg-surface1 rounded border border-border-hard text-fg-soft text-xs font-medium w-auto">
                  <SelectValue placeholder="Фильтры" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все проекты</SelectItem>
                  <SelectItem value="favorites">Избранные</SelectItem>
                  <SelectItem value="recent">Недавние</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* New project button */}
            <Button
              leftIcon={<Plus className="w-4 h-4 text-accent-default" />}
              className="p-1.5 bg-fg-default rounded flex justify-center items-center gap-1.5 text-xs font-medium h-7.5"
            >
              <span className="text-bg-surface1">Новый проект</span>
            </Button>
          </PageActions>

          <PageContent className="py-1">
            {/* Header container */}
            <div className="px-4 flex flex-col justify-start items-start">
              <div className="w-full h-10 pl-10 inline-flex justify-start items-start">
                {/* Project name column */}
                <div className="flex-1  flex justify-start items-start gap-1">
                  {sortState === 'none' ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span
                          className="text-fg-soft text-sm font-medium cursor-pointer px-1.5 py-1"
                          onClick={() => handleSort()}
                        >
                          Название
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side={'bottom'}>
                        <TypographyBodyM>Сортировка</TypographyBodyM>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          rightIcon={
                            <SortVertical className="w-5 h-5 text-fg-soft" />
                          }
                          variant="ghost"
                          onClick={() => handleSort()}
                          className="px-1.5 bg-bg-surface3 rounded flex justify-start items-center gap-1 h-auto p-1"
                        >
                          <span className="text-fg-soft text-sm font-medium">
                            Название
                          </span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side={'bottom'}>
                        <TypographyBodyM>Сортировка</TypographyBodyM>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
                {/* Project info columns */}
                <div className="flex-1 flex justify-between items-center">
                  <div className="w-36 flex justify-start items-center gap-1.5">
                    <div className=" rounded flex justify-start items-center gap-1">
                      <span className="text-fg-soft text-sm font-medium">
                        Обновлен
                      </span>
                    </div>
                  </div>
                  <div className="w-36 flex justify-start items-center gap-1.5">
                    <div className=" rounded flex justify-start items-center gap-1">
                      <span className="text-fg-soft text-sm font-medium">
                        Расчеты
                      </span>
                    </div>
                  </div>
                  <div className="w-24  flex justify-start items-center gap-1.5">
                    <span className="text-fg-soft text-sm font-medium">
                      Действия
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project list */}
            <PageTableContainer>
              <div className="flex flex-col justify-start items-start gap-4">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className={`w-full inline-flex justify-start items-start rounded ${
                      hoveredRow === project.id ? 'bg-bg-surface3' : ''
                    }`}
                    onMouseEnter={() => setHoveredRow(project.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    {/* Favourites case */}
                    <div className="w-10 h-10 relative">
                      {(project.isFavorite || hoveredRow === project.id) && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              onClick={() => toggleFavorite(project.id)}
                              className="py-1 px-2.5 absolute left-0 top-0 rounded inline-flex justify-center items-center hover:bg-transparent h-auto"
                            >
                              {project.isFavorite ? <HeartFilled /> : <Heart />}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side={'bottom'}>
                            <TypographyBodyM>
                              {project.isFavorite
                                ? 'Убрать из избранного'
                                : 'В избранное'}
                            </TypographyBodyM>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>

                    {/* Project name */}
                    <div className="flex-1 px-2 inline-flex flex-col justify-start items-start gap-1">
                      <div className="w-full text-fg-default text-base font-bold">
                        {project.name}
                      </div>
                      <div className="w-full opacity-40 text-fg-default text-xs font-medium">
                        {project.location}
                      </div>
                    </div>

                    {/* Project info */}
                    <div className="flex-1 flex justify-between items-start">
                      {/* Update info */}
                      <div className="w-36 flex justify-start items-center gap-1.5">
                        <span className="text-fg-soft text-sm font-medium">
                          {project.updatedAt}
                        </span>
                        <span className="text-fg-soft text-sm font-medium">
                          {project.updatedTime}
                        </span>
                      </div>

                      {/* Counter */}
                      <div className="flex justify-start items-center gap-1.5">
                        <span className="w-32 text-fg-soft text-sm font-medium">
                          {project.calculationsCount}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="w-24 flex justify-start items-center gap-3">
                        {hoveredRow === project.id && (
                          <>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  onClick={() => copyProject(project.id)}
                                  className="p-2.5 rounded flex justify-center items-center hover:bg-transparent h-auto"
                                >
                                  <CopyRight className="w-5 h-5 text-fg-default" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side={'bottom'}>
                                <TypographyBodyM>Копировать</TypographyBodyM>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  onClick={() => deleteProject(project.id)}
                                  className="p-2.5 rounded flex justify-center items-center hover:bg-transparent h-auto"
                                >
                                  <Trash className="w-5 h-5 text-fg-default" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side={'bottom'}>
                                <TypographyBodyM>Удалить</TypographyBodyM>
                              </TooltipContent>
                            </Tooltip>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </PageTableContainer>
          </PageContent>
        </PageContainer>
      </SidebarInset>
    </TooltipProvider>
  );
}

export default ProjectsPage;
