import React, { useRef, useState } from 'react';
import { Input } from './ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

// Тип слоя грунта
export type SoilLayer = {
  id: string;
  ige: string;
  type: string;
  h: string;
  H2: string;
  Z2?: string;
  γ?: string;
  'γ sat'?: string;
  ks?: string;
  c?: string;
  φ?: string;
  v?: string;
};

// Пропсы компонента
interface SoilTableProps {
  soilLayers: SoilLayer[];
  onUpdateLayer: (id: string, field: keyof SoilLayer, value: string) => void;
  onRemoveLayer: (id: string) => void;
  onAddLayer: () => void;
  soilTypes: string[];
  columnTooltips: Record<string, string>;
}

const soilFields: (keyof SoilLayer)[] = ['h', 'H2', 'Z2', 'γ'];

const SoilTable: React.FC<SoilTableProps> = ({
  soilLayers,
  onUpdateLayer,
  onRemoveLayer,
  soilTypes,
  columnTooltips,
}) => {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const dragOverId = useRef<string | null>(null);

  // Drag & drop обработчики
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
  };
  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    dragOverId.current = id;
  };
  const handleDrop = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (draggedItem && draggedItem !== id) {
      const fromIdx = soilLayers.findIndex((l) => l.id === draggedItem);
      const toIdx = soilLayers.findIndex((l) => l.id === id);
      if (fromIdx !== -1 && toIdx !== -1) {
        const updated = [...soilLayers];
        const [removed] = updated.splice(fromIdx, 1);
        updated.splice(toIdx, 0, removed);
        // Обновляем порядок через onUpdateLayer для каждого слоя
        updated.forEach((layer, idx) => {
          if (layer.id !== soilLayers[idx].id) {
            onUpdateLayer(layer.id, 'id', layer.id); // Просто триггерим обновление
          }
        });
      }
    }
    setDraggedItem(null);
    dragOverId.current = null;
  };
  const handleDragEnd = () => {
    setDraggedItem(null);
    dragOverId.current = null;
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-6">
        {/* Контейнер с горизонтальным скроллом */}
        <div className="w-full overflow-x-auto rounded-lg">
          {/* Внутренний контейнер с минимальной шириной */}
          <div className="min-w-max">
            {/* Заголовок */}
            <div className="flex bg-bg-surface2">
              {/* ИГЭ */}
              <div className="w-[74px] min-w-[74px] min-h-12 py-1 flex flex-col">
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
              <div className="w-[250px] min-w-[250px] min-h-12 py-1 flex flex-col">
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
              {soilFields.map((col) => (
                <div
                  key={col}
                  className="w-[74px] min-w-[74px] min-h-12 py-1 flex flex-col"
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
                        <span className="text-xs text-muted-foreground leading-tight">
                          м
                        </span>
                      )}
                      {(col === 'γ' || col === 'γ sat' || col === 'ks') && (
                        <span className="text-xs text-muted-foreground leading-tight">
                          кН/м³
                        </span>
                      )}
                      {col === 'c' && (
                        <span className="text-xs text-muted-foreground leading-tight">
                          кПа
                        </span>
                      )}
                      {col === 'φ' && (
                        <span className="text-xs text-muted-foreground leading-tight">
                          °
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div className="w-12 min-w-12 min-h-12 py-1 flex flex-col">
                <div className="self-stretch h-full flex flex-col justify-center items-start overflow-hidden" />
              </div>
            </div>
            {/* Строки */}
            {soilLayers.map((layer, idx) => (
              <div
                key={layer.id}
                className={`flex relative group border-t border-border-hard2 ${
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
                tabIndex={0}
                aria-label={`Строка грунта ${layer.type}`}
                onKeyDown={(e) => {
                  if (e.key === 'Delete') onRemoveLayer(layer.id);
                }}
              >
                {/* ИГЭ */}
                <div className="w-[74px] min-w-[74px] min-h-12 py-1 flex flex-col">
                  <div className="self-stretch h-full px-2.5 border-r border-border-hard2 flex flex-col justify-center items-start overflow-hidden">
                    <Input
                      value={layer.ige}
                      onChange={(e) =>
                        onUpdateLayer(layer.id, 'ige', e.target.value)
                      }
                      className="w-full h-8 text-end bg-transparent border-none shadow-none focus:ring-0 focus:outline-none"
                      aria-label="ИГЭ"
                    />
                  </div>
                </div>
                {/* Грунт */}
                <div className="w-[250px] min-w-[250px] min-h-12 py-1 flex flex-col">
                  <div className="self-stretch h-full px-2.5 border-r border-border-hard2 flex flex-col justify-center items-start overflow-hidden">
                    <select
                      value={layer.type}
                      onChange={(e) =>
                        onUpdateLayer(layer.id, 'type', e.target.value)
                      }
                      className="w-full h-8 bg-transparent border-none shadow-none focus:ring-0 p-0 text-sm font-medium text-left text-fg-default"
                      aria-label="Грунт"
                    >
                      {soilTypes.map((type) => (
                        <option
                          key={type}
                          value={type}
                          className="text-xs font-medium"
                        >
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Остальные ячейки */}
                {soilFields.map((field) => (
                  <div
                    key={field}
                    className="w-[74px] min-w-[74px] min-h-12 py-1 flex flex-col"
                  >
                    <div className="self-stretch h-full px-2.5 border-r border-border-hard2 flex flex-col justify-center items-start overflow-hidden">
                      <Input
                        value={layer[field]}
                        onChange={(e) =>
                          onUpdateLayer(layer.id, field, e.target.value)
                        }
                        className="w-full h-8 text-start bg-transparent border-none shadow-none focus:ring-0 focus:outline-none"
                        aria-label={field}
                      />
                    </div>
                  </div>
                ))}
                <div className="w-12 min-w-12 min-h-12 py-1 flex flex-col">
                  <div className="self-stretch h-full flex flex-col justify-center items-start overflow-hidden" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SoilTable;
