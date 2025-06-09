'use client';
import { TypographyH2, TypographyMuted } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  AlertTriangle,
  Check,
  Edit2,
  Eye,
  FileText,
  Plus,
  Trash2,
  X,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

interface Tab {
  id: string;
  name: string;
  isEditing: boolean;
}

interface SoilLayer {
  id: string;
  ige: string;
  type: string;
  h: string;
  h2: string;
}

interface CriticalError {
  id: string;
  title: string;
  description: string;
  status: string;
}

function ResultPage() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: '1', name: 'Исходные данные', isEditing: false },
    { id: '2', name: 'Без названия', isEditing: false },
  ]);
  const [activeTab, setActiveTab] = useState<string>('2');
  const [editingValue, setEditingValue] = useState<string>('');
  const [leftActiveTab, setLeftActiveTab] = useState('excavation');
  const [rightActiveTab, setRightActiveTab] = useState('document');

  // Состояние для редактирования заголовка проекта
  const [projectTitle, setProjectTitle] = useState<string>('Без названия');
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [titleEditValue, setTitleEditValue] = useState<string>('');

  const [soilLayers, setSoilLayers] = useState<SoilLayer[]>([
    {
      id: '1',
      ige: '0',
      type: 'Насыпной',
      h: '5,0',
      h2: '5,0',
    },
    {
      id: '2',
      ige: '1',
      type: 'Песок мелкий',
      h: '3,8',
      h2: '8,8',
    },
    {
      id: '3',
      ige: '6',
      type: 'Песок гравелистый',
      h: '2,6',
      h2: '11,4',
    },
    {
      id: '4',
      ige: '0',
      type: 'Насыпной',
      h: '5,0',
      h2: '5,0',
    },
    {
      id: '5',
      ige: '6',
      type: 'Песок гравелистый',
      h: '2,6',
      h2: '11,4',
    },
  ]);

  const [excavationParams, setExcavationParams] = useState({
    groundwaterLevel: '200',
    slopeAngle: '89',
    depth: '10',
    length: '13',
    embedmentDepth: '15',
    material: 'Бетон, железобетон',
    elasticModulus: '50',
    momentInertia: '2,25',
    step: '15',
    width: '400',
    momentResistance: '0,25',
    momentResistance2: '2,43',
    contactCoeff: '0,33',
  });

  const [criticalErrors] = useState<CriticalError[]>([
    {
      id: '1',
      title: 'Расстояние от нагрузки до ограждения',
      description: 'Нагрузки > Параметры',
      status: 'Нет значения',
    },
    {
      id: '2',
      title: 'Ширина нагрузки',
      description: 'Нагрузки > Параметры',
      status: 'Нет значения',
    },
    {
      id: '3',
      title: 'E Модуль упругости стены',
      description: 'Ограждение и котлован > Выбор материала котлована',
      status: 'Нет значения (МПа)',
    },
    {
      id: '4',
      title: 'J Момент инерции стены',
      description: 'Ограждение и котлован > Выбор материала котлована',
      status: 'Нет значения (см⁴)',
    },
    {
      id: '5',
      title: 'Глубина приложения нагрузки',
      description: 'Нагрузки > Параметр',
      status: 'Нет значения',
    },
    {
      id: '6',
      title: 'Нагрузка на левом конце',
      description: 'Нагрузки > Параметр',
      status: 'Нет значения',
    },
    {
      id: '7',
      title: 'Нагрузка на правом конце',
      description: 'Нагрузки',
      status: 'Нет значения',
    },
  ]);

  // Функции для редактирования заголовка проекта
  const startEditingTitle = () => {
    setIsEditingTitle(true);
    setTitleEditValue(projectTitle);
  };

  const saveTitleEdit = () => {
    if (titleEditValue.trim()) {
      setProjectTitle(titleEditValue.trim());
    }
    setIsEditingTitle(false);
    setTitleEditValue('');
  };

  const cancelTitleEdit = () => {
    setIsEditingTitle(false);
    setTitleEditValue('');
  };

  const handleTitleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      saveTitleEdit();
    } else if (e.key === 'Escape') {
      cancelTitleEdit();
    }
  };

  const saveEdit = (tabId: string) => {
    if (editingValue.trim()) {
      setTabs(
        tabs.map((tab) =>
          tab.id === tabId
            ? { ...tab, name: editingValue.trim(), isEditing: false }
            : tab
        )
      );
    }
    setEditingValue('');
  };

  const removeTab = (tabId: string) => {
    if (tabs.length > 1) {
      const newTabs = tabs.filter((tab) => tab.id !== tabId);
      setTabs(newTabs);
      if (activeTab === tabId) {
        setActiveTab(newTabs[0].id);
      }
    }
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    tabId: string
  ) => {
    if (e.key === 'Enter') {
      saveEdit(tabId);
    } else if (e.key === 'Escape') {
      cancelEdit(tabId);
    }
  };

  const addNewTab = () => {
    const newId = (tabs.length + 1).toString();
    const newTab = {
      id: newId,
      name: 'Расчет',
      isEditing: false,
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newId);
  };

  const startEditing = (tabId: string, currentName: string) => {
    setTabs(
      tabs.map((tab) =>
        tab.id === tabId
          ? { ...tab, isEditing: true }
          : { ...tab, isEditing: false }
      )
    );
    setEditingValue(currentName);
  };

  const cancelEdit = (tabId: string) => {
    setTabs(
      tabs.map((tab) => (tab.id === tabId ? { ...tab, isEditing: false } : tab))
    );
    setEditingValue('');
  };

  const addSoilLayer = () => {
    const newLayer: SoilLayer = {
      id: Date.now().toString(),
      ige: soilLayers.length.toString(),
      type: 'Новый грунт',
      h: '0,0',
      h2: '0,0',
    };
    setSoilLayers([...soilLayers, newLayer]);
  };

  const removeSoilLayer = (id: string) => {
    setSoilLayers(soilLayers.filter((layer) => layer.id !== id));
  };

  const updateSoilLayer = (
    id: string,
    field: keyof SoilLayer,
    value: string
  ) => {
    setSoilLayers(
      soilLayers.map((layer) =>
        layer.id === id ? { ...layer, [field]: value } : layer
      )
    );
  };

  return (
    <TooltipProvider>
      <SidebarInset>
        <Card className="flex flex-col flex-1 overflow-hidden m-1 py-4 gap-0">
          {/* Header с табами */}
          <CardHeader className="flex h-16 shrink-0 justify-between items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 pb-0">
            <div className="flex items-center gap-2 flex-1">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="flex-1"
              >
                <div className="flex items-center gap-2">
                  <TabsList className="h-10">
                    {tabs.map((tab) => (
                      <div key={tab.id} className="relative group">
                        {tab.isEditing ? (
                          <div className="flex items-center gap-1 bg-muted rounded-md px-3 py-2 border">
                            <Input
                              value={editingValue}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => setEditingValue(e.target.value)}
                              onKeyDown={(
                                e: React.KeyboardEvent<HTMLInputElement>
                              ) => handleKeyPress(e, tab.id)}
                              className="h-6 text-xs px-1 min-w-[60px] max-w-[120px] border-0 bg-transparent"
                              autoFocus
                            />
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-5 w-5 p-0"
                              onClick={() => saveEdit(tab.id)}
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-5 w-5 p-0"
                              onClick={() => cancelEdit(tab.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <TabsTrigger
                              value={tab.id}
                              className="pr-12 min-w-0"
                            >
                              <span className="truncate max-w-[100px]">
                                {tab.name}
                              </span>
                            </TabsTrigger>

                            <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                              <Button
                                size="default"
                                variant="ghost"
                                className="h-4 w-4 p-0 hover:bg-muted-foreground/20"
                                onClick={(e: React.MouseEvent) => {
                                  e.stopPropagation();
                                  startEditing(tab.id, tab.name);
                                }}
                              >
                                <Edit2 className="h-3 w-3" />
                              </Button>
                              {tabs.length > 1 && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-4 w-4 p-0 hover:bg-destructive/20 hover:text-destructive"
                                  onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    removeTab(tab.id);
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </TabsList>

                  <Button
                    size="default"
                    variant="outline"
                    onClick={addNewTab}
                    leftIcon={<Plus className="h-4 w-4 mr-1" />}
                  >
                    Добавить расчет
                  </Button>
                </div>
              </Tabs>
            </div>
          </CardHeader>

          <Separator className={'h-px'} />

          <CardContent className="flex-1 space-y-0 p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              {tabs.map((tab) => (
                <TabsContent
                  key={tab.id}
                  value={tab.id}
                  className="mt-0 space-y-0"
                >
                  {/* Main Content - Two Columns */}
                  <div className="space-y-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Left Column */}
                      <div className="flex-1 space-y-6 p-6">
                        {/* Информация о проекте */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            {isEditingTitle ? (
                              <div className="flex items-center gap-2">
                                <Input
                                  value={titleEditValue}
                                  onChange={(e) =>
                                    setTitleEditValue(e.target.value)
                                  }
                                  onKeyDown={handleTitleKeyPress}
                                  className="font-semibold h-12 text-lg border-2 border-primary/50 focus:border-primary min-w-[200px]"
                                  autoFocus
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={saveTitleEdit}
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={cancelTitleEdit}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <TypographyH2>{projectTitle}</TypographyH2>
                            )}

                            {!isEditingTitle && (
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={startEditingTitle}
                                  className="hover:bg-blue-50 hover:text-blue-600"
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </div>

                          <TypographyMuted className="text-muted-foreground">
                            Обновлено 25.12.2024 17:02
                          </TypographyMuted>
                        </div>

                        <Separator className={'h-px'} />

                        {/* Табы второго уровня */}
                        <Tabs
                          value={leftActiveTab}
                          onValueChange={setLeftActiveTab}
                        >
                          <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger
                              value="excavation"
                              className="text-xs md:text-sm"
                            >
                              Ограждение и котлован
                            </TabsTrigger>
                            <TabsTrigger
                              value="loads"
                              className="text-xs md:text-sm"
                            >
                              Нагрузки
                            </TabsTrigger>
                            <TabsTrigger
                              value="anchors"
                              className="text-xs md:text-sm"
                            >
                              Анкеры и распирки
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="excavation" className="space-y-6">
                            {/* Характеристики грунтов */}
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold">
                                  Характеристики грунтов
                                </h2>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={addSoilLayer}
                                  leftIcon={<Plus className="h-4 w-4 mr-1" />}
                                >
                                  Добавить грунт
                                </Button>
                              </div>

                              <div className="overflow-x-auto">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead className="text-center">
                                        ИГЭ
                                      </TableHead>
                                      <TableHead className="text-center">
                                        Грунт
                                      </TableHead>
                                      <TableHead className="text-center">
                                        <div className="flex flex-col items-center">
                                          <span>h</span>
                                          <span className="text-xs text-muted-foreground">
                                            м
                                          </span>
                                        </div>
                                      </TableHead>
                                      <TableHead className="text-center">
                                        <div className="flex flex-col items-center">
                                          <span>H2</span>
                                          <span className="text-xs text-muted-foreground">
                                            м
                                          </span>
                                        </div>
                                      </TableHead>
                                      <TableHead />
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {soilLayers.map((layer) => (
                                      <TableRow key={layer.id}>
                                        <TableCell>
                                          <div className="flex justify-center">
                                            <Input
                                              value={layer.ige}
                                              onChange={(e) =>
                                                updateSoilLayer(
                                                  layer.id,
                                                  'ige',
                                                  e.target.value
                                                )
                                              }
                                              className="w-12 h-8 text-center"
                                            />
                                          </div>
                                        </TableCell>
                                        <TableCell>
                                          <div className="flex justify-center">
                                            <Input
                                              value={layer.type}
                                              onChange={(e) =>
                                                updateSoilLayer(
                                                  layer.id,
                                                  'type',
                                                  e.target.value
                                                )
                                              }
                                              className="w-32 h-8 text-center"
                                            />
                                          </div>
                                        </TableCell>
                                        <TableCell>
                                          <div className="flex justify-center">
                                            <Input
                                              value={layer.h}
                                              onChange={(e) =>
                                                updateSoilLayer(
                                                  layer.id,
                                                  'h',
                                                  e.target.value
                                                )
                                              }
                                              className="w-16 h-8 text-center"
                                            />
                                          </div>
                                        </TableCell>
                                        <TableCell>
                                          <div className="flex justify-center">
                                            <Input
                                              value={layer.h2}
                                              onChange={(e) =>
                                                updateSoilLayer(
                                                  layer.id,
                                                  'h2',
                                                  e.target.value
                                                )
                                              }
                                              className="w-16 h-8 text-center"
                                            />
                                          </div>
                                        </TableCell>
                                        <TableCell>
                                          <div className="flex justify-center">
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <Button
                                                  variant="ghost"
                                                  size="sm"
                                                  onClick={() =>
                                                    removeSoilLayer(layer.id)
                                                  }
                                                  className="text-destructive hover:text-destructive p-1"
                                                >
                                                  <X className="h-4 w-4" />
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
                            </div>

                            {/* Параметры котлована */}
                            <div className="space-y-4">
                              <h2 className="text-xl font-semibold">
                                Параметры котлована
                              </h2>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label className="flex items-center gap-2">
                                    <span>
                                      h<sub>w</sub> Уровень грунтовых вод
                                    </span>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="p-1 h-4 w-4"
                                        >
                                          <span className="text-xs bg-gray-200 rounded-full w-3 h-3 flex items-center justify-center">
                                            ?
                                          </span>
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Уровень грунтовых вод</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </Label>
                                  <div className="space-y-1">
                                    <Input
                                      value={excavationParams.groundwaterLevel}
                                      onChange={(e) =>
                                        setExcavationParams((prev) => ({
                                          ...prev,
                                          groundwaterLevel: e.target.value,
                                        }))
                                      }
                                    />
                                    <div className="text-xs text-muted-foreground">
                                      200 м
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label className="flex items-center gap-2">
                                    <span>
                                      β Угол наклона поверхности грунта
                                    </span>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="p-1 h-4 w-4"
                                        >
                                          <span className="text-xs bg-gray-200 rounded-full w-3 h-3 flex items-center justify-center">
                                            ?
                                          </span>
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Угол наклона поверхности грунта</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </Label>
                                  <div className="space-y-1">
                                    <Input
                                      value={excavationParams.slopeAngle}
                                      onChange={(e) =>
                                        setExcavationParams((prev) => ({
                                          ...prev,
                                          slopeAngle: e.target.value,
                                        }))
                                      }
                                    />
                                    <div className="text-xs text-muted-foreground">
                                      89 °
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label>H Глубина котлована</Label>
                                  <div className="space-y-1">
                                    <Input
                                      value={excavationParams.depth}
                                      onChange={(e) =>
                                        setExcavationParams((prev) => ({
                                          ...prev,
                                          depth: e.target.value,
                                        }))
                                      }
                                    />
                                    <div className="text-xs text-muted-foreground">
                                      10 м
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label>L Длина ограждения</Label>
                                  <div className="space-y-1">
                                    <Input
                                      value={excavationParams.length}
                                      onChange={(e) =>
                                        setExcavationParams((prev) => ({
                                          ...prev,
                                          length: e.target.value,
                                        }))
                                      }
                                    />
                                    <div className="text-xs text-muted-foreground">
                                      13 м
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="w-full max-w-xs space-y-2 p-4 bg-gray-50 rounded-lg">
                                <Label>Глубина заделки</Label>
                                <div className="space-y-1">
                                  <Input
                                    value={excavationParams.embedmentDepth}
                                    onChange={(e) =>
                                      setExcavationParams((prev) => ({
                                        ...prev,
                                        embedmentDepth: e.target.value,
                                      }))
                                    }
                                  />
                                  <div className="text-xs text-muted-foreground">
                                    15 м
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Ограждение */}
                            <div className="space-y-4">
                              <h2 className="text-xl font-semibold">
                                Ограждение
                              </h2>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Материал ограждения</Label>
                                  <Select
                                    value={excavationParams.material}
                                    onValueChange={(value) =>
                                      setExcavationParams((prev) => ({
                                        ...prev,
                                        material: value,
                                      }))
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Бетон, железобетон">
                                        Бетон, железобетон
                                      </SelectItem>
                                      <SelectItem value="Сталь">
                                        Сталь
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div className="space-y-2">
                                  <Label className="flex items-center gap-2">
                                    <span>
                                      γ<sub>s</sub> Контакт с грунтом
                                    </span>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="p-1 h-4 w-4"
                                        >
                                          <span className="text-xs bg-gray-200 rounded-full w-3 h-3 flex items-center justify-center">
                                            ?
                                          </span>
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Контакт с грунтом</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </Label>
                                  <Input
                                    value={excavationParams.contactCoeff}
                                    onChange={(e) =>
                                      setExcavationParams((prev) => ({
                                        ...prev,
                                        contactCoeff: e.target.value,
                                      }))
                                    }
                                  />
                                </div>

                                <div className="space-y-2">
                                  <Label>E Модуль упругости стены</Label>
                                  <div className="space-y-1">
                                    <Input
                                      value={excavationParams.elasticModulus}
                                      onChange={(e) =>
                                        setExcavationParams((prev) => ({
                                          ...prev,
                                          elasticModulus: e.target.value,
                                        }))
                                      }
                                    />
                                    <div className="text-xs text-muted-foreground">
                                      50 МПа
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label>J Момент инерции стены</Label>
                                  <div className="space-y-1">
                                    <Input
                                      value={excavationParams.momentInertia}
                                      onChange={(e) =>
                                        setExcavationParams((prev) => ({
                                          ...prev,
                                          momentInertia: e.target.value,
                                        }))
                                      }
                                    />
                                    <div className="text-xs text-muted-foreground">
                                      2,25 см⁴
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label>
                                    b<sub>w</sub> Шаг ограждения
                                  </Label>
                                  <div className="space-y-1">
                                    <Input
                                      value={excavationParams.step}
                                      onChange={(e) =>
                                        setExcavationParams((prev) => ({
                                          ...prev,
                                          step: e.target.value,
                                        }))
                                      }
                                    />
                                    <div className="text-xs text-muted-foreground">
                                      15 мм
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label>
                                    B Ширина одного элемента ограждения
                                  </Label>
                                  <div className="space-y-1">
                                    <Input
                                      value={excavationParams.width}
                                      onChange={(e) =>
                                        setExcavationParams((prev) => ({
                                          ...prev,
                                          width: e.target.value,
                                        }))
                                      }
                                    />
                                    <div className="text-xs text-muted-foreground">
                                      400 мм
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label>W Момент сопротивления</Label>
                                  <div className="space-y-1">
                                    <Input
                                      value={excavationParams.momentResistance}
                                      onChange={(e) =>
                                        setExcavationParams((prev) => ({
                                          ...prev,
                                          momentResistance: e.target.value,
                                        }))
                                      }
                                    />
                                    <div className="text-xs text-muted-foreground">
                                      0,25 см³
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label>
                                    R<sub>s</sub> Момент сопротивления
                                  </Label>
                                  <div className="space-y-1">
                                    <Input
                                      value={excavationParams.momentResistance2}
                                      onChange={(e) =>
                                        setExcavationParams((prev) => ({
                                          ...prev,
                                          momentResistance2: e.target.value,
                                        }))
                                      }
                                    />
                                    <div className="text-xs text-muted-foreground">
                                      2,43 МПа
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="loads" className="space-y-6">
                            <div>
                              <CardHeader>
                                <CardTitle className="text-lg">
                                  Нагрузки
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-muted-foreground">
                                  Настройка нагрузок...
                                </p>
                              </CardContent>
                            </div>
                          </TabsContent>

                          <TabsContent value="anchors" className="space-y-6">
                            <div>
                              <CardHeader>
                                <CardTitle className="text-lg">
                                  Анкеры и распирки
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-muted-foreground">
                                  Настройка анкеров и распирок...
                                </p>
                              </CardContent>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>

                      {/* Right Column */}
                      <div className="flex-1 flex flex-col border-l border-border pl-6 p-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <TypographyH2>Результат</TypographyH2>
                            <div className="text-sm text-muted-foreground">
                              Обновлено 25.12.2024 16:48
                            </div>
                          </div>

                          <Tabs
                            value={rightActiveTab}
                            onValueChange={setRightActiveTab}
                          >
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="document" className="gap-2">
                                <FileText className="h-4 w-4" />
                                Документ
                              </TabsTrigger>
                              <TabsTrigger
                                value="visualization"
                                className="gap-2"
                              >
                                <Eye className="h-4 w-4" />
                                Визуализация
                              </TabsTrigger>
                            </TabsList>

                            <TabsContent value="document">
                              <div>
                                <CardHeader className="flex flex-row items-center gap-2">
                                  <AlertTriangle className="h-5 w-5 text-destructive" />
                                  <CardTitle className="text-lg">
                                    Критические ошибки
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    {criticalErrors.map((error) => (
                                      <div
                                        key={error.id}
                                        className="border-b border-border pb-4 last:border-b-0 last:pb-0"
                                      >
                                        <div className="space-y-2">
                                          <div className="flex items-start justify-between">
                                            <h4 className="font-medium text-sm">
                                              {error.title}
                                            </h4>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                              {error.status}
                                            </span>
                                          </div>
                                          <p className="text-sm text-muted-foreground">
                                            {error.description}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </div>
                            </TabsContent>

                            <TabsContent value="visualization">
                              <div>
                                <CardHeader>
                                  <CardTitle className="text-lg">
                                    Визуализация
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-muted-foreground">
                                    Визуализация будет доступна после устранения
                                    ошибок и выполнения расчета.
                                  </p>
                                </CardContent>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>

                        {/* Warning and Calculate Button - Fixed to Bottom */}
                        <div className="mt-auto space-y-4">
                          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                            <div className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm font-medium text-orange-800">
                                  Внимание
                                </p>
                                <p className="text-sm text-orange-700">
                                  Чтобы сделать расчет устраните ошибки
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-center">
                            <Button
                              leftIcon={<Zap className="mr-2 h-4 w-4" />}
                              variant="outline"
                              disabled
                            >
                              Рассчитать
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </SidebarInset>
    </TooltipProvider>
  );
}

export default ResultPage;
