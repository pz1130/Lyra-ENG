import React from 'react';
import {
  BookOpen,
  Plus,
  Trash2,
  Download,
  Check,
  X,
  Sparkles,
  Layers,
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface LibraryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenImport: () => void;
}

export const LibraryDrawer: React.FC<LibraryDrawerProps> = ({
  isOpen,
  onClose,
  onOpenImport,
}) => {
  const {
    libraries,
    activeLibraryId,
    setActiveLibraryId,
    deleteLibrary,
    exportLibraryJson,
  } = useLibrary();
  const { playPop, playChime } = useSoundEffects();

  if (!isOpen) return null;

  const handleSelect = (id: string) => {
    playChime();
    setActiveLibraryId(id);
    onClose();
  };

  const handleDelete = (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    if (confirm(`确定要删除词书《${title}》吗？`)) {
      playPop();
      deleteLibrary(id);
    }
  };

  const handleExport = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    playPop();
    exportLibraryJson(id);
  };

  const [activeCategory, setActiveCategory] = React.useState<string>('all');

  const CATEGORIES = [
    { id: 'all', name: '全部' },
    { id: 'phonics', name: '🔤 自然拼读' },
    { id: 'discover', name: '🧭 牛津探索' },
    { id: 'sight-words', name: '🌟 高频词' },
    { id: 'cambridge', name: '🦁 剑桥英语' },
    { id: 'stories', name: '📖 经典童话' },
    { id: 'custom', name: '✨ 自定义' },
  ];

  const filteredLibraries = libraries.filter((lib) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'custom') return lib.isCustom;
    return lib.category === activeCategory;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-pop-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col overflow-hidden border-l border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-pink-50/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-pink-500 text-white shadow-xs">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-800">
                速读词库宝库
              </h2>
              <p className="text-xs text-gray-500 font-bold">
                共 {libraries.length} 本精品词书，随时切换
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 text-gray-500 flex items-center justify-center border border-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action button: Import custom */}
        <div className="p-3 border-b border-gray-100 bg-gray-50/60">
          <button
            onClick={() => {
              playPop();
              onOpenImport();
            }}
            className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-black text-xs sm:text-sm shadow-md shadow-pink-200 hover:opacity-95 active:scale-98 flex items-center justify-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            导入 / 新建自定义词书
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="px-3 py-2 border-b border-gray-100 bg-white flex gap-1.5 overflow-x-auto shrink-0">
          {CATEGORIES.map((cat) => {
            const isCatActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playPop();
                  setActiveCategory(cat.id);
                }}
                className={`px-2.5 py-1 rounded-xl text-xs font-black shrink-0 transition-all active:scale-95 ${
                  isCatActive
                    ? 'bg-pink-500 text-white shadow-2xs'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Library list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredLibraries.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 space-y-3 rounded-3xl bg-pink-50/40 border-2 border-dashed border-pink-200">
              <span className="text-4xl animate-bounce-gentle">✨</span>
              <div className="space-y-1">
                <p className="text-sm font-black text-gray-700">
                  {activeCategory === 'custom'
                    ? '还没有自定义词书呢'
                    : '该分类下暂时没有词书'}
                </p>
                <p className="text-xs text-gray-500 font-bold">
                  {activeCategory === 'custom'
                    ? '点击下方按钮，导入 CSV 或粘贴英文短文'
                    : '可以切换到其他分类查看精选词库哦'}
                </p>
              </div>
              {activeCategory === 'custom' ? (
                <button
                  onClick={() => {
                    playPop();
                    onOpenImport();
                  }}
                  className="px-4 py-2 rounded-2xl bg-pink-500 text-white font-black text-xs shadow-md shadow-pink-200 hover:bg-pink-600 transition-all active:scale-95"
                >
                  立即导入自定义词书
                </button>
              ) : (
                <button
                  onClick={() => {
                    playPop();
                    setActiveCategory('all');
                  }}
                  className="px-4 py-2 rounded-2xl bg-white border border-gray-200 text-gray-700 font-black text-xs shadow-xs hover:bg-gray-50 transition-all active:scale-95"
                >
                  查看全部词书
                </button>
              )}
            </div>
          ) : (
            filteredLibraries.map((lib) => {
              const isSelected = activeLibraryId === lib.id;
              return (
                <div
                  key={lib.id}
                  onClick={() => handleSelect(lib.id)}
                  className={`p-4 rounded-3xl border-2 transition-all cursor-pointer relative group ${
                    isSelected
                      ? 'border-pink-500 bg-pink-50/70 shadow-md ring-2 ring-pink-300/40'
                      : 'border-gray-200 hover:border-pink-200 hover:bg-pink-50/20 bg-white'
                  }`}
                >
                  {/* Check badge */}
                  {isSelected && (
                    <div className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <span className="text-3xl p-2 rounded-2xl bg-white shadow-xs border border-gray-100">
                      {lib.badgeEmoji || '📖'}
                    </span>
                    <div className="flex-1 min-w-0 pr-6">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-black text-sm sm:text-base text-gray-900 truncate">
                          {lib.title}
                        </h3>
                        {lib.isCustom && (
                          <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700">
                            自定义
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {lib.description}
                      </p>

                      <div className="flex items-center gap-3 mt-3 text-xs font-bold text-gray-400">
                        <span className="flex items-center gap-1 text-pink-600 font-extrabold">
                          <BookOpen className="w-3.5 h-3.5" />
                          {lib.words?.length || 0} 词
                        </span>

                        {/* Custom library actions */}
                        {lib.isCustom && (
                          <div className="flex items-center gap-1 ml-auto">
                            <button
                              onClick={(e) => handleExport(e, lib.id)}
                              className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                              title="导出 JSON 备份"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => handleDelete(e, lib.id, lib.title)}
                              className="p-1 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50"
                              title="删除词书"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 text-center border-t border-gray-100 text-[11px] font-medium text-gray-400 bg-gray-50 flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          所有自定义词书均已保存在本地设备中
        </div>
      </div>
    </div>
  );
};
