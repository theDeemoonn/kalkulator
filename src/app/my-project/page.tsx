'use client';
import { TypographyH2 } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { SidebarInset } from '@/components/ui/sidebar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Filter,
  Heart,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';

interface Project {
  id: string;
  name: string;
  location: string;
  updatedAt: string;
  calculationsCount: number;
  isFavorite: boolean;
  status?: string;
}

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Сортировка №412',
      location: 'Без адреса',
      updatedAt: '25.03.2025 14:28',
      calculationsCount: 0,
      isFavorite: false,
      status: 'sorting',
    },
    {
      id: '2',
      name: 'Газпром',
      location: 'г. Екатеринбург, Сергеевский тракт (22.323444; 43.333321)',
      updatedAt: '25.03.2025 11:32',
      calculationsCount: 11,
      isFavorite: true,
    },
    {
      id: '3',
      name: 'Sturvia (2)',
      location: 'г. Вильнюди, ул Леола, участок №5 (34.234532; 54.12231)',
      updatedAt: '21.03.2025 16:42',
      calculationsCount: 2,
      isFavorite: false,
    },
    {
      id: '4',
      name: 'Sturvia',
      location: 'г. Вильнюди, ул Леола, участок №5 (34.234532; 54.12231)',
      updatedAt: '21.03.2025 15:25',
      calculationsCount: 0,
      isFavorite: false,
    },
    {
      id: '5',
      name: 'Без названия (2)',
      location: 'Без адреса',
      updatedAt: '20.03.2025 21:33',
      calculationsCount: 1,
      isFavorite: false,
    },
    {
      id: '6',
      name: 'Уфа-водоканал',
      location: 'г. Уфа',
      updatedAt: '19.03.2025 11:52',
      calculationsCount: 24,
      isFavorite: true,
    },
    {
      id: '7',
      name: 'Sturvia (2)',
      location: 'г. Москва',
      updatedAt: '01.12.2024 10:01',
      calculationsCount: 1,
      isFavorite: false,
    },
    {
      id: '8',
      name: 'Ограждения варианты с насыпным грунтом',
      location: 'Без адреса',
      updatedAt: '21.11.2024 13:11',
      calculationsCount: 5,
      isFavorite: true,
    },
    {
      id: '9',
      name: 'Грунты тест',
      location: 'Без адреса',
      updatedAt: '20.11.2024 15:45',
      calculationsCount: 15,
      isFavorite: true,
    },
    {
      id: '10',
      name: 'Без названия (3)',
      location: 'Без адреса',
      updatedAt: '19.11.2024 12:12',
      calculationsCount: 1,
      isFavorite: false,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: 'name') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const getSortedProjects = () => {
    if (!sortBy) return projects;

    return [...projects].sort((a, b) => {
      if (sortBy === 'name') {
        const comparison = a.name.localeCompare(b.name, 'ru');
        return sortDirection === 'asc' ? comparison : -comparison;
      }
      return 0;
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

  return (
    <SidebarInset>
      <Card className="flex flex-col flex-1 overflow-hidden m-1 py-4 gap-4">
        {/* Header с заголовком */}
        <CardHeader className="flex h-16 shrink-0 justify-between items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 pb-0">
          <div className="flex items-center gap-2 flex-1">
            <TypographyH2>Мои проекты</TypographyH2>
          </div>
        </CardHeader>

        <Separator className={'h-px'} />

        <CardContent className="flex-1 space-y-0 p-0">
          {/* Поиск и фильтры */}
          <div className="p-6 space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between">
              <div className="flex flex-col gap-3 md:flex-row md:gap-4">
                <div className="relative w-full md:flex-1 md:max-w-md md:min-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Поиск по проектам"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button
                  leftIcon={<Filter className="w-4 h-4" />}
                  variant="outline"
                  className="gap-2 w-full md:w-auto"
                >
                  Фильтры
                </Button>
              </div>
              <Button
                leftIcon={<Plus className="w-4 h-4 mr-2" />}
                className="bg-popover-foreground w-full md:w-auto"
              >
                Новый проект
              </Button>
            </div>
          </div>

          {/* Таблица проектов */}
          <div className="p-6 space-y-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead className="flex items-center gap-2">
                    <span>Название</span>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 font-medium text-gray-900 hover:text-gray-700 hover:bg-transparent"
                      onClick={() => handleSort('name')}
                    >
                      {sortDirection === 'asc' ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead className="text-center">Обновлен</TableHead>
                  <TableHead className="text-center">Расчеты</TableHead>
                  <TableHead className="text-center">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getSortedProjects().map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(project.id)}
                            className={`${project.isFavorite ? 'text-orange-500 hover:text-orange-600' : 'text-gray-400 hover:text-gray-600'} p-1 hover:bg-transparent`}
                          >
                            <Heart
                              className={`w-4 h-4 ${project.isFavorite ? 'fill-current' : ''}`}
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side={'bottom'}>
                          {project.isFavorite
                            ? 'Убрать из избранного'
                            : 'Добавить в избранное'}
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{project.name}</span>
                        </div>
                        <div className="text-sm">{project.location}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-sm">
                      {project.updatedAt}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm">
                        {project.calculationsCount}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyProject(project.id)}
                              className="p-1"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side={'bottom'}>
                            <p>Копировать</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteProject(project.id)}
                              className="hover:text-destructive p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side={'bottom'}>
                            <p>Удалить</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </SidebarInset>
  );
}

export default ProjectsPage;
