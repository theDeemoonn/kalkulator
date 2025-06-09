'use client';
import { TypographyBodyM, TypographyMuted } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
  const [excavationParams, setExcavationParams] = useState({
    groundwaterLevel: '200',
    slopeAngle: '89',
    depth: '10',
    length: '13',
    embedmentDepth: '15',
  });

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

  return (
    <SidebarInset>
      <Card className="flex flex-col flex-1 overflow-hidden m-1 py-4 gap-4">
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
                <div className="p-6 space-y-6">
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
                <div className="p-6 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold">
                      Характеристики грунтов
                    </h2>
                  </div>

                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-center">ИГЭ</TableHead>
                          <TableHead className="text-center">Грунт</TableHead>
                          <TableHead className="text-center">
                            h<br />
                            <span className="text-xs text-muted-foreground">
                              м
                            </span>
                          </TableHead>
                          <TableHead className="text-center">
                            H2
                            <br />
                            <span className="text-xs text-muted-foreground">
                              м
                            </span>
                          </TableHead>
                          <TableHead className="text-center">
                            Z2
                            <br />
                            <span className="text-xs text-muted-foreground">
                              м
                            </span>
                          </TableHead>
                          <TableHead className="text-center">
                            γ<br />
                            <span className="text-xs text-muted-foreground">
                              кН/м³
                            </span>
                          </TableHead>
                          <TableHead className="text-center">
                            γ sat
                            <br />
                            <span className="text-xs text-muted-foreground">
                              кН/м³
                            </span>
                          </TableHead>
                          <TableHead className="text-center">
                            ks
                            <br />
                            <span className="text-xs text-muted-foreground">
                              кН/м³
                            </span>
                          </TableHead>
                          <TableHead className="text-center">
                            c<br />
                            <span className="text-xs text-muted-foreground">
                              кПа
                            </span>
                          </TableHead>
                          <TableHead className="text-center">
                            φ<br />
                            <span className="text-xs text-muted-foreground">
                              °
                            </span>
                          </TableHead>
                          <TableHead className="text-center">v</TableHead>
                          <TableHead></TableHead>
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
                                  className="w-16 h-8 text-end"
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
                                  className="w-32 h-8 text-end"
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
                                  className="w-16 h-8 text-end"
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
                                  className="w-16 h-8 text-end"
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex justify-center">
                                <Input
                                  value={layer.z2}
                                  onChange={(e) =>
                                    updateSoilLayer(
                                      layer.id,
                                      'z2',
                                      e.target.value
                                    )
                                  }
                                  className="w-16 h-8 text-end"
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex justify-center">
                                <Input
                                  value={layer.gamma}
                                  onChange={(e) =>
                                    updateSoilLayer(
                                      layer.id,
                                      'gamma',
                                      e.target.value
                                    )
                                  }
                                  className="w-16 h-8 text-end"
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex justify-center">
                                <Input
                                  value={layer.gammaSat}
                                  onChange={(e) =>
                                    updateSoilLayer(
                                      layer.id,
                                      'gammaSat',
                                      e.target.value
                                    )
                                  }
                                  className="w-16 h-8 text-end"
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex justify-center">
                                <Input
                                  value={layer.ks}
                                  onChange={(e) =>
                                    updateSoilLayer(
                                      layer.id,
                                      'ks',
                                      e.target.value
                                    )
                                  }
                                  className="w-16 h-8 text-end"
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex justify-center">
                                <Input
                                  value={layer.c}
                                  onChange={(e) =>
                                    updateSoilLayer(
                                      layer.id,
                                      'c',
                                      e.target.value
                                    )
                                  }
                                  className="w-16 h-8 text-end"
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex justify-center">
                                <Input
                                  value={layer.phi}
                                  onChange={(e) =>
                                    updateSoilLayer(
                                      layer.id,
                                      'phi',
                                      e.target.value
                                    )
                                  }
                                  className="w-16 h-8 text-end"
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex justify-center">
                                <Input
                                  value={layer.v}
                                  onChange={(e) =>
                                    updateSoilLayer(
                                      layer.id,
                                      'v',
                                      e.target.value
                                    )
                                  }
                                  className="w-16 h-8 text-end"
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeSoilLayer(layer.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <Button
                    variant="outline"
                    size="full"
                    className="mt-4"
                    onClick={addSoilLayer}
                    leftIcon={<Plus className="h-4 w-4 mr-2" />}
                  >
                    <TypographyBodyM className="text-[var(--foreground-default)]">
                      Добавить грунт
                    </TypographyBodyM>
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
                    <div className="space-y-2">
                      <Label>
                        h<sub>w</sub> Уровень грунтовых вод
                      </Label>
                      <div className="space-y-2">
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
                      <Label>β Угол наклона поверхности грунта</Label>
                      <div className="space-y-2">
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
                      <div className="space-y-2">
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
                      <div className="space-y-2">
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

                  <div className="mt-6 space-y-2">
                    <Label>Глубина заделки</Label>
                    <div className="space-y-2">
                      <Input
                        value={excavationParams.embedmentDepth}
                        onChange={(e) =>
                          setExcavationParams((prev) => ({
                            ...prev,
                            embedmentDepth: e.target.value,
                          }))
                        }
                        className="w-32"
                      />
                      <div className="text-xs text-muted-foreground">15 м</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </SidebarInset>
  );
}

export default DashboardPage;
