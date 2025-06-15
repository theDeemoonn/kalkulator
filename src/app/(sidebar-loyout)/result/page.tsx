'use client';
import AlertTriangle from '@/components/icon/alert-triangle';
import Edit from '@/components/icon/edit';
import FileDocuments from '@/components/icon/file-documents';
import FightningFilled from '@/components/icon/lightning-filled';
import LineChartUp from '@/components/icon/line-chart-up';
import Trash from '@/components/icon/trash';
import Warning from '@/components/icon/warning';
import {
  PageContainer,
  PageContent,
  PageHeader,
  PageTitle,
} from '@/components/page-container';
import SoilTable, { SoilLayer } from '@/components/soil-characteristics-table';
import {
  TypographyBodyL,
  TypographyBodyM,
  TypographyH2,
  TypographyH4,
  TypographyH5,
  TypographyMuted,
} from '@/components/typography';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { InputWithSlider } from '@/components/ui/input-with-slider';
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Separator } from '@/components/ui/separator';
import { SidebarInset } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Check, Plus, X } from 'lucide-react';
import { useState } from 'react';

interface Tab {
  id: string;
  name: string;
  isEditing: boolean;
}

interface CriticalError {
  id: string;
  title: string;
  description: string;
  status: string;
}

// Типы грунтов
const soilTypes = [
  'Насыпной',
  'Песок мелкий',
  'Песок гравелистый',
  'Супесь',
  'Суглинок',
  'Глина',
  'Торф',
];

// Тултипы для колонок
const columnTooltips: Record<string, string> = {
  ИГЭ: 'Индекс грунтового элемента',
  Грунт: 'Тип грунта',
  h: 'Толщина слоя',
  H2: 'Глубина до нижней границы слоя',
  Z2: 'Глубина до верхней границы слоя',
  γ: 'Удельный вес грунта',
  'γ sat': 'Удельный вес насыщенного грунта',
  ks: 'Коэффициент пористости',
  c: 'Сцепление',
  φ: 'Угол внутреннего трения',
  v: 'Коэффициент Пуассона',
};

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
      H2: '5,0',
    },
    {
      id: '2',
      ige: '1',
      type: 'Песок мелкий',
      h: '3,8',
      H2: '8,8',
    },
    {
      id: '3',
      ige: '6',
      type: 'Песок гравелистый',
      h: '2,6',
      H2: '11,4',
    },
    {
      id: '4',
      ige: '0',
      type: 'Насыпной',
      h: '5,0',
      H2: '5,0',
    },
    {
      id: '5',
      ige: '6',
      type: 'Песок гравелистый',
      h: '2,6',
      H2: '11,4',
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
      H2: '0,0',
    };
    setSoilLayers([...soilLayers, newLayer]);
  };

  const handleUpdateLayer = (
    id: string,
    field: keyof SoilLayer,
    value: string
  ) => {
    setSoilLayers((prev) =>
      prev.map((layer) =>
        layer.id === id ? { ...layer, [field]: value } : layer
      )
    );
  };

  const handleRemoveLayer = (id: string) => {
    setSoilLayers((prev) => prev.filter((layer) => layer.id !== id));
  };

  const handleAddLayer = () => {
    console.log('Добавить слой');
  };

  return (
    <TooltipProvider>
      <SidebarInset>
        <PageContainer className="p-0">
          {/* Header с табами */}
          <PageHeader className="py-6">
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
                              <span className="truncate max-w-[140px]">
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

                  <Button size="default" variant="outline" onClick={addNewTab}>
                    <Plus className="h-4 w-4 text-accent-default" />
                  </Button>
                </div>
              </Tabs>
            </div>
          </PageHeader>

          <Separator className={'h-px'} />

          <PageContainer className="flex-1 space-y-0 p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              {tabs.map((tab) => (
                <TabsContent
                  key={tab.id}
                  value={tab.id}
                  className="mt-0 space-y-0"
                >
                  {/* Main Content - Two Columns */}
                  <ResizablePanelGroup direction="horizontal">
                    {/* Left Column */}
                    <ResizablePanel className="flex flex-col">
                      {/* Информация о проекте */}
                      <PageHeader className="flex py-1.5 px-6 items-start">
                        <div className="flex flex-col gap-3">
                          <TypographyH2>Без названия</TypographyH2>
                          <TypographyMuted className="text-muted-foreground mb-2 ">
                            Обновлено 25.12.2024 17:02
                          </TypographyMuted>
                        </div>
                        <div className="flex items-center gap-2">
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
                      </PageHeader>

                      {/* Табы второго уровня */}

                      <Tabs
                        value={leftActiveTab}
                        onValueChange={setLeftActiveTab}
                      >
                        <PageHeader className="flex py-4 px-6 items-start">
                          <TabsList>
                            <TabsTrigger value="excavation">
                              <TypographyBodyM>
                                Ограждение и котлован
                              </TypographyBodyM>
                            </TabsTrigger>
                            <TabsTrigger
                              value="loads"
                              className="text-xs md:text-sm"
                            >
                              <Warning className="h-4 w-4 data-[state=active]:text-accent-default" />
                              <TypographyBodyM>Нагрузки</TypographyBodyM>
                            </TabsTrigger>
                            <TabsTrigger
                              value="anchors"
                              className="text-xs md:text-sm"
                            >
                              <TypographyBodyM>
                                Анкеры и распорки
                              </TypographyBodyM>
                            </TabsTrigger>
                          </TabsList>
                        </PageHeader>

                        <TabsContent value="excavation" className="space-y-6">
                          <PageContent className="py-8.5 px-6">
                            {/* Характеристики грунтов */}
                            <div className="space-y-4">
                              <div className="flex items-center justify-between pb-6">
                                <TypographyH4>
                                  Характеристики грунтов
                                </TypographyH4>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={addSoilLayer}
                                  rightIcon={
                                    <Plus className="h-4 w-4 mr-1 text-fg-soft" />
                                  }
                                >
                                  Добавить грунт
                                </Button>
                              </div>
                              <SoilTable
                                soilLayers={soilLayers}
                                onUpdateLayer={handleUpdateLayer}
                                onRemoveLayer={handleRemoveLayer}
                                onAddLayer={handleAddLayer}
                                soilTypes={soilTypes}
                                columnTooltips={columnTooltips}
                              />
                            </div>

                            {/* Параметры котлована */}
                            <div>
                              <TypographyH4 className="py-10.5">
                                Параметры котлована
                              </TypographyH4>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <InputWithSlider
                                  measure={
                                    <>
                                      h<sub>w</sub>
                                    </>
                                  }
                                  title="Уровень грунтовых вод"
                                  value={
                                    Number.isNaN(
                                      Number(excavationParams.groundwaterLevel)
                                    )
                                      ? 0
                                      : Number(
                                          excavationParams.groundwaterLevel
                                        )
                                  }
                                  unit="м"
                                  min={0}
                                  max={500}
                                  step={1}
                                  onChange={(val) =>
                                    setExcavationParams((prev) => ({
                                      ...prev,
                                      groundwaterLevel: String(val),
                                    }))
                                  }
                                />
                                <InputWithSlider
                                  measure="β"
                                  title="Угол наклона поверхности грунта"
                                  value={
                                    Number.isNaN(
                                      Number(excavationParams.slopeAngle)
                                    )
                                      ? 0
                                      : Number(excavationParams.slopeAngle)
                                  }
                                  unit="°"
                                  min={0}
                                  max={90}
                                  step={1}
                                  onChange={(val) =>
                                    setExcavationParams((prev) => ({
                                      ...prev,
                                      slopeAngle: String(val),
                                    }))
                                  }
                                />
                                <InputWithSlider
                                  measure="H"
                                  title="Глубина котлована"
                                  value={
                                    Number.isNaN(Number(excavationParams.depth))
                                      ? 0
                                      : Number(excavationParams.depth)
                                  }
                                  unit="м"
                                  min={0}
                                  max={50}
                                  step={0.1}
                                  onChange={(val) =>
                                    setExcavationParams((prev) => ({
                                      ...prev,
                                      depth: String(val),
                                    }))
                                  }
                                />
                                <InputWithSlider
                                  measure="L"
                                  title="Длина ограждения"
                                  value={
                                    Number.isNaN(
                                      Number(excavationParams.length)
                                    )
                                      ? 0
                                      : Number(excavationParams.length)
                                  }
                                  unit="м"
                                  min={0}
                                  max={100}
                                  step={0.1}
                                  onChange={(val) =>
                                    setExcavationParams((prev) => ({
                                      ...prev,
                                      length: String(val),
                                    }))
                                  }
                                />
                                <InputWithSlider
                                  measure=""
                                  title="Глубина заделки"
                                  value={
                                    Number.isNaN(
                                      Number(excavationParams.embedmentDepth)
                                    )
                                      ? 0
                                      : Number(excavationParams.embedmentDepth)
                                  }
                                  unit="м"
                                  min={0}
                                  max={50}
                                  step={0.1}
                                  onChange={(val) =>
                                    setExcavationParams((prev) => ({
                                      ...prev,
                                      embedmentDepth: String(val),
                                    }))
                                  }
                                  disabled
                                />
                              </div>
                            </div>

                            {/* Ограждение */}
                            <div>
                              <TypographyH4 className="py-10.5">
                                Ограждение
                              </TypographyH4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputWithSlider
                                  measure="γ"
                                  title="Контакт с грунтом"
                                  value={
                                    Number.isNaN(
                                      Number(excavationParams.contactCoeff)
                                    )
                                      ? 0
                                      : Number(excavationParams.contactCoeff)
                                  }
                                  unit=""
                                  min={0}
                                  max={1}
                                  step={0.01}
                                  onChange={(val) =>
                                    setExcavationParams((prev) => ({
                                      ...prev,
                                      contactCoeff: String(val),
                                    }))
                                  }
                                />
                                <InputWithSlider
                                  measure="E"
                                  title="Модуль упругости стены"
                                  value={
                                    Number.isNaN(
                                      Number(excavationParams.elasticModulus)
                                    )
                                      ? 0
                                      : Number(excavationParams.elasticModulus)
                                  }
                                  unit="МПа"
                                  min={0}
                                  max={500}
                                  step={1}
                                  onChange={(val) =>
                                    setExcavationParams((prev) => ({
                                      ...prev,
                                      elasticModulus: String(val),
                                    }))
                                  }
                                />
                                <InputWithSlider
                                  measure="J"
                                  title="Момент инерции стены"
                                  value={
                                    Number.isNaN(
                                      Number(excavationParams.momentInertia)
                                    )
                                      ? 0
                                      : Number(excavationParams.momentInertia)
                                  }
                                  unit="см⁴"
                                  min={0}
                                  max={100}
                                  step={0.01}
                                  onChange={(val) =>
                                    setExcavationParams((prev) => ({
                                      ...prev,
                                      momentInertia: String(val),
                                    }))
                                  }
                                />
                                <InputWithSlider
                                  measure="b"
                                  title="Шаг ограждения"
                                  value={
                                    Number.isNaN(Number(excavationParams.step))
                                      ? 0
                                      : Number(excavationParams.step)
                                  }
                                  unit="мм"
                                  min={0}
                                  max={100}
                                  step={1}
                                  onChange={(val) =>
                                    setExcavationParams((prev) => ({
                                      ...prev,
                                      step: String(val),
                                    }))
                                  }
                                />

                                <InputWithSlider
                                  measure="W"
                                  title="Момент сопротивления"
                                  value={
                                    Number.isNaN(
                                      Number(excavationParams.momentResistance)
                                    )
                                      ? 0
                                      : Number(
                                          excavationParams.momentResistance
                                        )
                                  }
                                  unit="см³"
                                  min={0}
                                  max={10}
                                  step={0.01}
                                  onChange={(val) =>
                                    setExcavationParams((prev) => ({
                                      ...prev,
                                      momentResistance: String(val),
                                    }))
                                  }
                                />
                                <InputWithSlider
                                  measure="R"
                                  title="Момент сопротивления"
                                  value={
                                    Number.isNaN(
                                      Number(excavationParams.momentResistance2)
                                    )
                                      ? 0
                                      : Number(
                                          excavationParams.momentResistance2
                                        )
                                  }
                                  unit="МПа"
                                  min={0}
                                  max={10}
                                  step={0.01}
                                  onChange={(val) =>
                                    setExcavationParams((prev) => ({
                                      ...prev,
                                      momentResistance2: String(val),
                                    }))
                                  }
                                />
                              </div>
                            </div>
                          </PageContent>
                        </TabsContent>

                        <TabsContent value="loads" className="space-y-6">
                          <div>
                            <PageHeader>
                              <PageTitle className="text-lg">
                                Нагрузки
                              </PageTitle>
                            </PageHeader>
                            <PageContent>
                              <p className="text-muted-foreground">
                                Настройка нагрузок...
                              </p>
                            </PageContent>
                          </div>
                        </TabsContent>

                        <TabsContent value="anchors" className="space-y-6">
                          <div>
                            <PageHeader>
                              <CardTitle className="text-lg">
                                Анкеры и распорки
                              </CardTitle>
                            </PageHeader>
                            <PageContent>
                              <p className="text-muted-foreground">
                                Настройка анкеров и распорки...
                              </p>
                            </PageContent>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </ResizablePanel>

                    {/*<ResizableHandle />*/}
                    <Separator orientation="vertical" />

                    {/* Right Column */}
                    <ResizablePanel className="flex flex-col">
                      <PageHeader className="flex py-1.5 px-6 items-start">
                        <div className="flex flex-col gap-3">
                          <TypographyH2>Результат</TypographyH2>
                          <TypographyMuted className="text-muted-foreground mb-2 ">
                            Обновлено 25.12.2024 17:02
                          </TypographyMuted>
                        </div>
                      </PageHeader>

                      {/* Табы второго уровня */}

                      <Tabs
                        value={rightActiveTab}
                        onValueChange={setRightActiveTab}
                      >
                        <PageHeader className="flex py-4 px-6 items-start">
                          <TabsList>
                            <TabsTrigger value="document">
                              <FileDocuments className="h-4 w-4  data-[state=active]:text-accent-default" />
                              Документ
                            </TabsTrigger>
                            <TabsTrigger
                              value="visualization"
                              className="gap-2"
                            >
                              <LineChartUp className="h-4 w-4  data-[state=active]:text-accent-defaultt" />
                              Визуализация
                            </TabsTrigger>
                          </TabsList>
                        </PageHeader>
                        <TabsContent value="document">
                          <PageContent className="flex flex-row items-center gap-2 pt-8.5 pb-5 px-6">
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                            <TypographyH4>Критические ошибки</TypographyH4>
                          </PageContent>
                          <Separator className="h-px" />
                          <PageContent className="flex py-5 px-6">
                            <div className="space-y-4">
                              {criticalErrors.map((error) => (
                                <div
                                  key={error.id}
                                  className="border-b border-border pb-4 last:border-b-0 last:pb-0"
                                >
                                  <div className="space-y-2">
                                    <div className="flex items-start justify-between">
                                      <TypographyBodyL className="text-muted-foreground">
                                        {error.title}
                                      </TypographyBodyL>

                                      <TypographyBodyL>
                                        {error.status}
                                      </TypographyBodyL>
                                    </div>
                                    <TypographyBodyM className="text-muted-foreground">
                                      {error.description}
                                    </TypographyBodyM>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </PageContent>
                        </TabsContent>

                        <TabsContent value="visualization">
                          <div>
                            <PageHeader>
                              <CardTitle className="text-lg">
                                Визуализация
                              </CardTitle>
                            </PageHeader>
                            <PageContent>
                              <p className="text-muted-foreground">
                                Визуализация будет доступна после устранения
                                ошибок и выполнения расчета.
                              </p>
                            </PageContent>
                          </div>
                        </TabsContent>
                      </Tabs>

                      {/* Warning and Calculate Button - Fixed to Bottom */}
                      <div className="mt-auto px-6 pb-6">
                        <div className="p-4 bg-bg-surface2 rounded-lg mb-2">
                          <div className="flex items-start gap-2 flex-col">
                            <TypographyH5 className="text-accent-default">
                              Внимание
                            </TypographyH5>
                            <TypographyBodyM className="text-fg-default">
                              Чтобы сделать расчет устраните ошибки
                            </TypographyBodyM>
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <Button
                            size={'full'}
                            leftIcon={<FightningFilled className=" h-4 w-4" />}
                            variant="outline"
                            disabled
                          >
                            Рассчитать
                          </Button>
                        </div>
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </TabsContent>
              ))}
            </Tabs>
          </PageContainer>
        </PageContainer>
      </SidebarInset>
    </TooltipProvider>
  );
}

export default ResultPage;
