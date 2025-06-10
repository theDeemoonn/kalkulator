'use client';
import {
  PageContainer,
  PageContent,
  PageHeader,
} from '@/components/page-container';
import { TypographyBodyM, TypographyMuted } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputWithSlider } from '@/components/ui/input-with-slider';
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
import { Check, Edit2, Plus, Trash2, X } from 'lucide-react';
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
  const [value, setValue] = useState(200);

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
  const [groundwaterLevel, setGroundwaterLevel] = useState(200);
  const [slopeAngle, setSlopeAngle] = useState(89);
  const [pitDepth, setPitDepth] = useState(10);
  const [fenceLength, setFenceLength] = useState(13);
  const [embedmentDepth, setEmbedmentDepth] = useState(15);

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

  const handleChange = (newValue: number) => {
    setValue(newValue);
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
                        <SelectTrigger className="w-56">
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
                        <SelectTrigger className="w-56">
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
                        <SelectTrigger className="w-56">
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
                        <SelectTrigger className="w-56">
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
                    <div className="space-y-2">
                      <Label>Отметка верха геологии</Label>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1">
                          <Input
                            value={calculationParams.topMark.a}
                            onChange={(e) =>
                              setCalculationParams((prev) => ({
                                ...prev,
                                topMark: { ...prev.topMark, a: e.target.value },
                              }))
                            }
                            className="w-56"
                            prefix={'A'}
                            suffix={'м'}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Кол-во узлов расчетной схемы</Label>
                      <div className="flex items-center gap-1">
                        <Input
                          value={calculationParams.nodesCount}
                          onChange={(e) =>
                            setCalculationParams((prev) => ({
                              ...prev,
                              nodesCount: e.target.value,
                            }))
                          }
                          className="w-56"
                          prefix={'n'}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Доля от бытового давления</Label>
                      <div className="flex items-center gap-1">
                        <Input
                          value={calculationParams.pressureRatio}
                          onChange={(e) =>
                            setCalculationParams((prev) => ({
                              ...prev,
                              pressureRatio: e.target.value,
                            }))
                          }
                          className="w-56"
                          prefix={'d₀'}
                          suffix={'%'}
                        />
                      </div>
                    </div>
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
                <div className="px-6 flex flex-col gap-6">
                  <div className="text-xl font-bold">
                    Характеристики грунтов
                  </div>
                  <div className="rounded-lg overflow-x-auto max-w-full">
                    <div className="w-full">
                      {/* Заголовок */}
                      <div className="flex bg-bg-surface2">
                        <div className="w-[74px] h-12 flex items-center justify-end px-2.5">
                          <span className="text-fg-default text-sm font-medium text-end">
                            ИГЭ
                          </span>
                        </div>
                        <div className="w-[250px] h-12 flex items-center justify-end px-2.5">
                          <span className="text-fg-default text-sm font-medium text-left">
                            Грунт
                          </span>
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
                            className="w-[74px] h-12 flex flex-col justify-center items-end px-2.5"
                          >
                            <div className="inline-flex items-center gap-0.5 w-full justify-end">
                              <span className="text-fg-default text-sm font-medium text-end">
                                {col}
                              </span>
                            </div>
                            <div className="inline-flex items-center gap-1.5 w-full justify-end">
                              {['h', 'H2', 'Z2'].includes(col) && (
                                <TypographyMuted>м</TypographyMuted>
                              )}
                              {(col === 'γ' ||
                                col === 'γ sat' ||
                                col === 'ks') && (
                                <TypographyMuted>кН/м³</TypographyMuted>
                              )}
                              {col === 'v' && (
                                <TypographyMuted>
                                  <br />
                                </TypographyMuted>
                              )}
                              {col === 'c' && (
                                <TypographyMuted>кПа</TypographyMuted>
                              )}
                              {col === 'φ' && (
                                <TypographyMuted>°</TypographyMuted>
                              )}
                            </div>
                          </div>
                        ))}
                        <div className="w-12 h-12 flex items-center justify-center" />
                      </div>
                      {/* Строки */}
                      {soilLayers.map((layer, idx) => (
                        <div
                          key={layer.id}
                          className={`flex ${idx % 2 ? 'bg-bg-surface2' : 'bg-bg-surface1'}`}
                        >
                          {/* ИГЭ */}
                          <div className="w-[74px] h-12 flex items-center justify-end px-2.5">
                            <Input
                              value={layer.ige}
                              onChange={(e) =>
                                updateSoilLayer(layer.id, 'ige', e.target.value)
                              }
                              className="w-full h-8 text-end bg-transparent border-none shadow-none focus:ring-0 focus:outline-none"
                            />
                          </div>
                          {/* Грунт */}
                          <div className="w-[250px] h-12 flex items-center px-2.5">
                            <Select
                              value={layer.type}
                              onValueChange={(value) =>
                                updateSoilLayer(layer.id, 'type', value)
                              }
                            >
                              <SelectTrigger className="w-full h-8 bg-bg-surface1 border border-border-soft rounded-sm px-2 text-sm font-medium text-left">
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
                          {/* Остальные ячейки */}
                          {soilFields.map((field) => (
                            <div
                              key={field}
                              className="w-[74px] h-12 flex items-center justify-end"
                            >
                              <Input
                                value={layer[field]}
                                onChange={(e) =>
                                  updateSoilLayer(
                                    layer.id,
                                    field,
                                    e.target.value
                                  )
                                }
                                className="w-full h-8 text-end bg-transparent border-none shadow-none focus:ring-0 focus:outline-none"
                              />
                            </div>
                          ))}
                          {/* Кнопка удалить */}
                          <div className="w-12 h-12 flex items-center justify-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSoilLayer(layer.id)}
                              className="text-destructive hover:text-destructive"
                              aria-label="Удалить грунт"
                              tabIndex={0}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="full"
                    className="mt-4 flex gap-2 justify-center items-center"
                    onClick={addSoilLayer}
                    aria-label="Добавить грунт"
                    tabIndex={0}
                    leftIcon={<Plus className="h-5 w-5 text-accent-default" />}
                  >
                    <span>Добавить грунт</span>
                  </Button>
                </div>

                {/* Параметры котлована */}
                <div className="p-6 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">
                      Параметры котлована
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <InputWithSlider
                      measure="h"
                      title="Уровень грунтовых вод"
                      value={groundwaterLevel}
                      unit="м"
                      min={0}
                      max={500}
                      onChange={setGroundwaterLevel}
                      onInfoClick={handleInfoClick}
                    />
                    <InputWithSlider
                      measure="β"
                      title="Угол наклона поверхности грунта"
                      value={slopeAngle}
                      unit="°"
                      min={0}
                      max={90}
                      onChange={setSlopeAngle}
                      onInfoClick={handleInfoClick}
                    />
                    <InputWithSlider
                      measure="H"
                      title="Глубина котлована"
                      value={pitDepth}
                      unit="м"
                      min={0}
                      max={100}
                      onChange={setPitDepth}
                      onInfoClick={handleInfoClick}
                    />
                    <InputWithSlider
                      measure="L"
                      title="Длина ограждения"
                      value={fenceLength}
                      unit="м"
                      min={0}
                      max={100}
                      onChange={setFenceLength}
                      onInfoClick={handleInfoClick}
                    />
                  </div>
                  <div className="mt-6 max-w-xs">
                    <InputWithSlider
                      measure=""
                      title="Глубина заделки"
                      value={embedmentDepth}
                      unit="м"
                      min={0}
                      max={100}
                      onChange={setEmbedmentDepth}
                      onInfoClick={handleInfoClick}
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
