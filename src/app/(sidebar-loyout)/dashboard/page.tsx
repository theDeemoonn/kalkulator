'use client';
import Edit from '@/components/icon/edit';
import Trash from '@/components/icon/trash';
import {
  PageContainer,
  PageContent,
  PageHeader,
} from '@/components/page-container';
import { TypographyBodyM, TypographyMuted } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputWithControls } from '@/components/ui/input-with-controls';
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
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Check, Plus, X } from 'lucide-react';
import * as React from 'react';
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
  z2: string;
  gamma: string;
  gammaSat: string;
  ks: string;
  c: string;
  phi: string;
  v: string;
}

function DashboardPage() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: '1', name: 'Исходные', isEditing: false },
  ]);
  const [activeTab, setActiveTab] = useState<string>('1');
  const [editingValue, setEditingValue] = useState<string>('');

  // Состояние для редактирования заголовка проекта
  const [projectTitle, setProjectTitle] = useState<string>('Hydroweb');
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [titleEditValue, setTitleEditValue] = useState<string>('');

  // Состояние для параметров расчета
  const [calculationParams, setCalculationParams] = useState({
    compactionType: '',
    lateralPressure: '',
    waterPressure: '',
    soilAssignment: '',
    topMark: { a: '200', m: '' },
    nodesCount: '400',
    pressureRatio: '20',
    activeNotLess: false,
  });

  // Состояние для слоев грунта
  const [soilLayers, setSoilLayers] = useState<SoilLayer[]>([
    {
      id: '1',
      ige: '0',
      type: 'Насыпной',
      h: '5,0',
      h2: '5,0',
      z2: '95,0',
      gamma: '2,04',
      gammaSat: '2,07',
      ks: '0,0',
      c: '0,0',
      phi: '0,0',
      v: '0,0',
    },
    {
      id: '2',
      ige: '1',
      type: 'Песок мелкий',
      h: '3,8',
      h2: '8,8',
      z2: '91,2',
      gamma: '2,04',
      gammaSat: '2,07',
      ks: '0,0',
      c: '0,0',
      phi: '0,0',
      v: '0,0',
    },
  ]);

  // Состояние для параметров котлована
  const [groundwaterLevel, setGroundwaterLevel] = useState(0);
  const [slopeAngle, setSlopeAngle] = useState(0);
  const [pitDepth, setPitDepth] = useState(0);
  const [fenceLength, setFenceLength] = useState(0);
  const [embedmentDepth, setEmbedmentDepth] = useState(0);

  // Состояние для drag and drop
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [dropIndicator, setDropIndicator] = useState<{
    targetId: string;
    position: 'above' | 'below';
  } | null>(null);

  // Массив вариантов грунта
  const soilTypes = [
    'Песок гравелистый',
    'Грунт 5',
    'Грунт 7',
    'Грунт 8',
    'Грунт 9',
  ];

  // Массив полей для таблицы с корректным типом
  const soilFields: (keyof SoilLayer)[] = [
    'h',
    'h2',
    'z2',
    'gamma',
    'gammaSat',
    'ks',
    'c',
    'phi',
    'v',
  ];

  // Маппинг колонок к их описаниям для тултипов
  const columnTooltips: { [key: string]: string } = {
    ИГЭ: 'Инженерно-геологический элемент',
    Грунт: 'Наименование слоя',
    h: 'Толщина слоя',
    H2: 'Относительная отметка подошвы слоя',
    Z2: 'Абсолютная отметка подошвы слоя',
    γ: 'Удельный вес грунта',
    'γ sat': 'Удельный вес грунта при полном водонасыщении',
    ks: 'Коэффициент постели',
    c: 'Удельное сцепление грунта',
    φ: 'Угол внутреннего трения грунта',
    v: 'Коэффициент Пуассона',
  };

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

  const addSoilLayer = () => {
    const newLayer: SoilLayer = {
      id: Date.now().toString(),
      ige: soilLayers.length.toString(),
      type: 'Новый грунт',
      h: '0,0',
      h2: '0,0',
      z2: '0,0',
      gamma: '0,0',
      gammaSat: '0,0',
      ks: '0,0',
      c: '0,0',
      phi: '0,0',
      v: '0,0',
    };
    setSoilLayers([...soilLayers, newLayer]);
  };

  const removeSoilLayer = (id: string) => {
    setSoilLayers(soilLayers.filter((layer) => layer.id !== id));
  };

  // Функции для drag and drop
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    if (!draggedItem || draggedItem === targetId) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    const position = e.clientY < midY ? 'above' : 'below';

    setDropIndicator({ targetId, position });
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();

    if (!draggedItem || draggedItem === targetId) {
      setDraggedItem(null);
      setDropIndicator(null);
      return;
    }

    const draggedIndex = soilLayers.findIndex(
      (layer) => layer.id === draggedItem
    );
    const targetIndex = soilLayers.findIndex((layer) => layer.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedItem(null);
      setDropIndicator(null);
      return;
    }

    const newLayers = [...soilLayers];
    const [draggedLayer] = newLayers.splice(draggedIndex, 1);

    // Определяем позицию вставки на основе индикатора
    let insertIndex = targetIndex;
    if (dropIndicator?.position === 'below') {
      insertIndex = targetIndex + 1;
    }
    if (draggedIndex < targetIndex && dropIndicator?.position === 'above') {
      insertIndex = targetIndex - 1;
    }

    newLayers.splice(insertIndex, 0, draggedLayer);

    setSoilLayers(newLayers);
    setDraggedItem(null);
    setDropIndicator(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDropIndicator(null);
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

  const handleInfoClick = () => {
    alert('Показать справку или дополнительную информацию');
  };

  return (
    <SidebarInset>
      <PageContainer className="p-0">
        {/* Header с табами */}
        <PageHeader>
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
                          <TabsTrigger value={tab.id} className="pr-12 min-w-0">
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
                              <Edit className="h-3 w-3" />
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
                  leftIcon={
                    <Plus className="h-4 w-4 mr-1 text-accent-default" />
                  }
                >
                  Добавить расчет
                </Button>
              </div>
            </Tabs>
          </div>
        </PageHeader>

        <PageContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {tabs.map((tab) => (
              <TabsContent
                key={tab.id}
                value={tab.id}
                className="mt-0 space-y-0"
              >
                {/* Информация о проекте */}
                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between">
                    {isEditingTitle ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={titleEditValue}
                          onChange={(e) => setTitleEditValue(e.target.value)}
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
                      <h1 className="text-3xl font-semibold">{projectTitle}</h1>
                    )}

                    {!isEditingTitle && (
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={startEditingTitle}
                          className="bg-bg-surface2"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="bg-bg-surface2"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <TypographyMuted className="text-muted-foreground">
                    Обновлено 25.12.2024 16:48
                  </TypographyMuted>
                </div>
                <Separator className={'h-px'} />
                <div className="p-6 space-y-6">
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mr-2 bg-background"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <TypographyMuted className="text-muted-foreground">
                      г. Москва, Центральный проезд Хорошёвского Серебряного
                      Бора, участок №5, (22.434223; 42.123123)
                    </TypographyMuted>
                  </div>
                </div>

                <Separator className={'h-px'} />

                {/* Параметры расчета */}
                <div className="p-6 pt-10.5 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">Параметры расчета</h2>
                  </div>

                  {/* Первая строка с выпадающими списками */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="compaction">Тип уплотнения грунта</Label>
                      <Select
                        value={calculationParams.compactionType}
                        onValueChange={(value) =>
                          setCalculationParams((prev) => ({
                            ...prev,
                            compactionType: value,
                          }))
                        }
                      >
                        <SelectTrigger className="w-56 data-[placeholder]:text-black">
                          <SelectValue placeholder="Нормально уплотненный" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">
                            Нормально уплотненный
                          </SelectItem>
                          <SelectItem value="over">Переуплотненный</SelectItem>
                          <SelectItem value="under">Недоуплотненный</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lateral">Боковое давление грунта</Label>
                      <Select
                        value={calculationParams.lateralPressure}
                        onValueChange={(value) =>
                          setCalculationParams((prev) => ({
                            ...prev,
                            lateralPressure: value,
                          }))
                        }
                      >
                        <SelectTrigger className="w-56 data-[placeholder]:text-black">
                          <SelectValue placeholder="СП 22.13330.2016" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sp22">СП 22.13330.2016</SelectItem>
                          <SelectItem value="snip2">СНиП 2.02.01-83</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="water">Учет давления воды</Label>
                      <Select
                        value={calculationParams.waterPressure}
                        onValueChange={(value) =>
                          setCalculationParams((prev) => ({
                            ...prev,
                            waterPressure: value,
                          }))
                        }
                      >
                        <SelectTrigger className="w-56 data-[placeholder]:text-black">
                          <SelectValue placeholder="Свободная" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="free">Свободная</SelectItem>
                          <SelectItem value="artesian">Артезианская</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="assignment">Вид задания грунта</Label>
                      <Select
                        value={calculationParams.soilAssignment}
                        onValueChange={(value) =>
                          setCalculationParams((prev) => ({
                            ...prev,
                            soilAssignment: value,
                          }))
                        }
                      >
                        <SelectTrigger className="w-56 data-[placeholder]:text-black">
                          <SelectValue placeholder="По удельному весу" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weight">
                            По удельному весу
                          </SelectItem>
                          <SelectItem value="density">По плотности</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Вторая строка с числовыми полями */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <InputWithControls
                      label="Отметка верха геологии"
                      value={calculationParams.topMark.a}
                      onChange={(value) =>
                        setCalculationParams((prev) => ({
                          ...prev,
                          topMark: { ...prev.topMark, a: String(value) },
                        }))
                      }
                      prefix="A"
                      suffix="м"
                      showInfoButton={true}
                      onInfoClick={() => {
                        console.log(
                          'Показать информацию о отметке верха геологии'
                        );
                      }}
                      showSlider={false}
                      size="md"
                      type="text"
                      aria-label="Отметка верха геологии"
                    />
                    <InputWithControls
                      label="Кол-во узлов расчетной схемы"
                      value={Number(calculationParams.nodesCount) || 1}
                      onChange={(value) =>
                        setCalculationParams((prev) => ({
                          ...prev,
                          nodesCount: String(value),
                        }))
                      }
                      prefix="n"
                      showInfoButton={false}
                      onInfoClick={() => {
                        console.log('Информация о количестве узлов');
                      }}
                      showSlider={true}
                      min={1}
                      max={100}
                      step={1}
                      size="md"
                      type="number"
                      aria-label="Количество узлов расчетной схемы"
                    />
                    <InputWithControls
                      label="Доля от бытового давления"
                      value={Number(calculationParams.pressureRatio) || 0}
                      onChange={(value) =>
                        setCalculationParams((prev) => ({
                          ...prev,
                          pressureRatio: String(value),
                        }))
                      }
                      prefix="d₀"
                      suffix="%"
                      showInfoButton={false}
                      onInfoClick={() => {
                        console.log('Информация о доле от бытового давления');
                      }}
                      showSlider={true}
                      min={0}
                      max={100}
                      step={1}
                      size="md"
                      type="number"
                      aria-label="Доля от бытового давления"
                    />{' '}
                  </div>

                  {/* Чекбокс */}
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active-pressure"
                      checked={calculationParams.activeNotLess}
                      onCheckedChange={(checked) =>
                        setCalculationParams((prev) => ({
                          ...prev,
                          activeNotLess: checked as boolean,
                        }))
                      }
                    />
                    <TypographyBodyM>
                      Активное давление не менее доли бытового
                    </TypographyBodyM>
                  </div>
                </div>

                {/* Характеристики грунтов */}
                <TooltipProvider>
                  <div className="px-6 flex flex-col gap-6">
                    <div className="text-xl font-bold">
                      Характеристики грунтов
                    </div>
                    <div className="rounded-lg overflow-x-auto max-w-full relative">
                      <div className="w-full" style={{ paddingLeft: '36px' }}>
                        {/* Заголовок */}
                        <div className="flex bg-bg-surface2 rounded-t-lg">
                          {/* ИГЭ */}
                          <div className="w-[74px] min-h-12 py-1 flex flex-col">
                            <div className="self-stretch h-full px-2.5 border-r border-border-hard2 flex flex-col justify-center items-start overflow-hidden">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="text-fg-default text-sm font-medium leading-tight cursor-help">
                                    ИГЭ
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{columnTooltips['ИГЭ']}</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </div>
                          {/* Грунт */}
                          <div className="w-[250px] min-h-12 py-1 flex flex-col">
                            <div className="self-stretch h-full px-2.5 border-r border-border-hard2 flex flex-col justify-center items-start overflow-hidden">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="text-fg-default text-sm font-medium leading-tight cursor-help">
                                    Грунт
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{columnTooltips['Грунт']}</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </div>

                          {[
                            'h',
                            'H2',
                            'Z2',
                            'γ',
                            'γ sat',
                            'ks',
                            'c',
                            'φ',
                            'v',
                          ].map((col) => (
                            <div
                              key={col}
                              className="w-[74px] min-h-12 py-1 flex flex-col"
                            >
                              <div className="self-stretch h-full px-2.5 border-r border-border-hard2 flex flex-col justify-center items-start overflow-hidden">
                                <div className="inline-flex justify-start items-center gap-0.5">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <span className="text-fg-default text-sm font-medium leading-tight cursor-help">
                                        {col}
                                      </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{columnTooltips[col]}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                                <div className="inline-flex justify-start items-center gap-1.5">
                                  {['h', 'H2', 'Z2'].includes(col) && (
                                    <TypographyMuted className="leading-tight">
                                      м
                                    </TypographyMuted>
                                  )}
                                  {(col === 'γ' ||
                                    col === 'γ sat' ||
                                    col === 'ks') && (
                                    <TypographyMuted className="leading-tight">
                                      кН/м<sup>3</sup>
                                    </TypographyMuted>
                                  )}
                                  {col === 'c' && (
                                    <TypographyMuted className="leading-tight">
                                      кПа
                                    </TypographyMuted>
                                  )}
                                  {col === 'φ' && (
                                    <TypographyMuted className="leading-tight">
                                      °
                                    </TypographyMuted>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className="w-12 min-h-12 py-1 flex flex-col">
                            <div className="self-stretch h-full flex flex-col justify-center items-start overflow-hidden" />
                          </div>
                        </div>
                        {/* Строки */}
                        {soilLayers.map((layer, idx) => (
                          <div
                            key={layer.id}
                            className={`flex relative group ${
                              hoveredRow === layer.id
                                ? 'bg-bg-surface4'
                                : idx % 2
                                  ? 'bg-bg-surface2'
                                  : 'bg-bg-surface1'
                            } ${draggedItem === layer.id ? 'opacity-50' : ''}`}
                            draggable
                            onDragStart={(e) => handleDragStart(e, layer.id)}
                            onDragOver={(e) => handleDragOver(e, layer.id)}
                            onDrop={(e) => handleDrop(e, layer.id)}
                            onDragEnd={handleDragEnd}
                            onMouseEnter={() => setHoveredRow(layer.id)}
                            onMouseLeave={() => setHoveredRow(null)}
                          >
                            {/* Hover область слева с кнопками */}
                            {hoveredRow === layer.id && (
                              <div className="absolute left-[-36px] top-0 h-12 w-auto px-2 bg-bg-surface4 rounded-l-md flex items-center justify-center gap-1 z-10 border-r-0 border-border-hard2">
                                {/* Иконка для перетаскивания */}
                                <div
                                  className="cursor-move p-1 hover:bg-bg-surface5 rounded"
                                  title="Перетащить строку"
                                >
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M12.0002 5.40005C11.0061 5.40005 10.2002 4.59416 10.2002 3.60005C10.2002 2.60594 11.0061 1.80005 12.0002 1.80005C12.9943 1.80005 13.8002 2.60594 13.8002 3.60005C13.8002 4.59416 12.9943 5.40005 12.0002 5.40005Z"
                                      fill="#C4AA97"
                                    />
                                    <path
                                      d="M12.0002 10.8C11.0061 10.8 10.2002 9.99416 10.2002 9.00005C10.2002 8.00594 11.0061 7.20005 12.0002 7.20005C12.9943 7.20005 13.8002 8.00594 13.8002 9.00005C13.8002 9.99416 12.9943 10.8 12.0002 10.8Z"
                                      fill="#C4AA97"
                                    />
                                    <path
                                      d="M12.0002 16.2C11.0061 16.2 10.2002 15.3942 10.2002 14.4C10.2002 13.4059 11.0061 12.6 12.0002 12.6C12.9943 12.6 13.8002 13.4059 13.8002 14.4C13.8002 15.3942 12.9943 16.2 12.0002 16.2Z"
                                      fill="#C4AA97"
                                    />
                                    <path
                                      d="M6.0002 5.40005C5.00608 5.40005 4.2002 4.59416 4.2002 3.60005C4.2002 2.60594 5.00608 1.80005 6.0002 1.80005C6.99431 1.80005 7.8002 2.60594 7.8002 3.60005C7.8002 4.59416 6.99431 5.40005 6.0002 5.40005Z"
                                      fill="#C4AA97"
                                    />
                                    <path
                                      d="M6.0002 10.8C5.00608 10.8 4.2002 9.99416 4.2002 9.00005C4.2002 8.00594 5.00608 7.20005 6.0002 7.20005C6.99431 7.20005 7.8002 8.00594 7.8002 9.00005C7.8002 9.99416 6.99431 10.8 6.0002 10.8Z"
                                      fill="#C4AA97"
                                    />
                                    <path
                                      d="M6.0002 16.2C5.00608 16.2 4.2002 15.3942 4.2002 14.4C4.2002 13.4059 5.00608 12.6 6.0002 12.6C6.99431 12.6 7.8002 13.4059 7.8002 14.4C7.8002 15.3942 6.99431 16.2 6.0002 16.2Z"
                                      fill="#C4AA97"
                                    />
                                  </svg>
                                </div>
                                {/* Кнопка удаления */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeSoilLayer(layer.id);
                                  }}
                                  className="p-1 hover:bg-red-100 rounded text-gray-400 hover:text-red-600 transition-colors"
                                  aria-label="Удалить грунт"
                                  title="Удалить строку"
                                >
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M3 4.63235L15 4.63235M12 15.75H6C5.17157 15.75 4.5 15.0389 4.5 14.1618V5.42647C4.5 4.98789 4.83579 4.63235 5.25 4.63235H12.75C13.1642 4.63235 13.5 4.98789 13.5 5.42647V14.1618C13.5 15.0389 12.8284 15.75 12 15.75ZM7.5 4.63235H10.5C10.9142 4.63235 11.25 4.27681 11.25 3.83824V3.04412C11.25 2.60554 10.9142 2.25 10.5 2.25H7.5C7.08579 2.25 6.75 2.60554 6.75 3.04412V3.83824C6.75 4.27681 7.08579 4.63235 7.5 4.63235Z"
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                </button>
                              </div>
                            )}

                            {/* ИГЭ */}
                            <div className="w-[74px] min-h-12 py-1 flex flex-col">
                              <div className="self-stretch h-full px-2.5 flex flex-col justify-center items-start overflow-hidden">
                                <Input
                                  value={layer.ige}
                                  onChange={(e) =>
                                    updateSoilLayer(
                                      layer.id,
                                      'ige',
                                      e.target.value
                                    )
                                  }
                                  className="w-full h-8 text-end bg-transparent border-none shadow-none focus:ring-0 focus:outline-none"
                                />
                              </div>
                            </div>
                            {/* Грунт */}
                            <div className="w-[250px] min-h-12 py-1 flex flex-col">
                              <div className="self-stretch h-full px-2.5  flex flex-col justify-center items-start overflow-hidden">
                                <Select
                                  value={layer.type}
                                  onValueChange={(value) =>
                                    updateSoilLayer(layer.id, 'type', value)
                                  }
                                >
                                  <SelectTrigger className="w-full h-8 bg-transparent border-none shadow-none focus:ring-0 p-0 text-sm font-medium text-left data-[placeholder]:text-muted-foreground">
                                    <SelectValue placeholder="Выберите грунт" />
                                  </SelectTrigger>
                                  <SelectContent className="max-h-40 overflow-y-auto bg-bg-surface1 rounded-sm shadow-lg">
                                    {soilTypes.map((type) => (
                                      <SelectItem
                                        key={type}
                                        value={type}
                                        className="p-1.5 text-xs font-medium rounded-sm data-[state=checked]:bg-accent-default data-[state=checked]:text-accent-on-accent text-left"
                                      >
                                        {type}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            {/* Остальные ячейки */}
                            {soilFields.map((field) => (
                              <div
                                key={field}
                                className="w-[74px] min-h-12 py-1 flex flex-col"
                              >
                                <div className="self-stretch h-full flex flex-col justify-center items-start overflow-hidden">
                                  <Input
                                    value={layer[field]}
                                    onChange={(e) =>
                                      updateSoilLayer(
                                        layer.id,
                                        field,
                                        e.target.value
                                      )
                                    }
                                    className="w-full h-8 text-start bg-transparent border-none shadow-none focus:ring-0 focus:outline-none"
                                  />
                                </div>
                              </div>
                            ))}
                            <div className="w-12 min-h-12 py-1 flex flex-col">
                              <div className="self-stretch h-full flex flex-col justify-center items-start overflow-hidden" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="default"
                      size="full"
                      className="mt-4 flex gap-2 justify-center items-center bg-fg-default text-bg-surface1 hover:bg-fg-default hover:text-bg-surface1"
                      onClick={addSoilLayer}
                      aria-label="Добавить грунт"
                      tabIndex={0}
                      leftIcon={
                        <Plus className="h-5 w-5 text-accent-default" />
                      }
                    >
                      <span>Добавить грунт</span>
                    </Button>
                  </div>
                </TooltipProvider>

                {/* Параметры котлована */}
                <div className="p-6 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">
                      Параметры котлована
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <InputWithControls
                      placeholder={'Введите значение (м)'}
                      measure="h"
                      title="Уровень грунтовых вод"
                      value={groundwaterLevel}
                      suffix="м"
                      min={0}
                      max={500}
                      onChange={(value) => setGroundwaterLevel(Number(value))}
                      onInfoClick={handleInfoClick}
                      showInfoButton={true}
                      showSlider={true}
                      type="number"
                      size="md"
                    />
                    {/* Угол наклона поверхности грунта */}
                    <InputWithControls
                      placeholder={'Введите значение (°)'}
                      measure="β"
                      title="Угол наклона поверхности грунта"
                      value={slopeAngle}
                      suffix="°"
                      min={0}
                      max={90}
                      step={1}
                      onChange={(value) => setSlopeAngle(Number(value))}
                      onInfoClick={handleInfoClick}
                      showInfoButton={true}
                      showSlider={true}
                      type="number"
                      size="md"
                    />

                    {/* Глубина котлована */}
                    <InputWithControls
                      placeholder={'Введите значение (м)'}
                      measure="H"
                      title="Глубина котлована"
                      value={pitDepth}
                      suffix="м"
                      min={0}
                      max={200}
                      step={1}
                      onChange={(value) => setPitDepth(Number(value))}
                      type="number"
                      size="md"
                    />

                    {/* Длина ограждения */}
                    <InputWithControls
                      placeholder={'Введите значение (м)'}
                      measure="L"
                      title="Длина ограждения"
                      value={fenceLength}
                      suffix="м"
                      min={0}
                      max={100}
                      step={1}
                      onChange={(value) => setFenceLength(Number(value))}
                      type="number"
                      size="md"
                    />
                  </div>
                  <div className="mt-6 max-w-xs">
                    <InputWithControls
                      measure=""
                      title="Глубина заделки"
                      value={embedmentDepth}
                      suffix="м"
                      min={0}
                      max={100}
                      onChange={(value) => setEmbedmentDepth(Number(value))}
                      onInfoClick={handleInfoClick}
                      showInfoButton={true}
                      showSlider={true}
                      type="number"
                      size="md"
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </PageContent>
      </PageContainer>
    </SidebarInset>
  );
}

export default DashboardPage;
