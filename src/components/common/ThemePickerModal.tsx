import React from 'react';
import { Check, Sparkles, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import { ThemeId } from '../../types/theme';

interface ThemePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemePickerModal: React.FC<ThemePickerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentThemeId, setTheme, allThemes } = useTheme();
  const { playChime, playPop } = useSoundEffects();

  if (!isOpen) return null;

  const handleSelectTheme = (id: ThemeId) => {
    playChime();
    setTheme(id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-pop-in">
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-4 border-pink-100 p-6 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎨</span>
            <div>
              <h2 className="text-xl font-extrabold text-gray-800">
                选择你喜欢的萌宠皮肤
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                换一个色彩，开启不一样的速读冒险！
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
          {allThemes.map((t) => {
            const isSelected = currentThemeId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleSelectTheme(t.id)}
                className={`relative flex flex-col items-start p-4 rounded-2xl border-2 text-left transition-all duration-200 active:scale-98 ${
                  isSelected
                    ? 'border-pink-500 bg-pink-50/60 ring-2 ring-pink-400/40 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/80'
                }`}
              >
                {/* Active Tag */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center shadow">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}

                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-3xl p-1.5 rounded-xl bg-white shadow-sm border border-gray-100">
                    {t.emoji}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-base text-gray-800">
                      {t.name}
                    </h3>
                    <p className="text-[11px] font-semibold text-gray-500">
                      伴读：{t.mascotName}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-1">{t.subtitle}</p>

                {/* Color swatches preview */}
                <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-gray-100 w-full">
                  <div
                    className="w-5 h-5 rounded-full shadow-inner border border-white"
                    style={{ backgroundColor: t.colors.orpColor }}
                    title="聚焦高亮色"
                  />
                  <div className="w-5 h-5 rounded-full shadow-inner bg-gradient-to-r from-pink-400 to-rose-400" />
                  <div className="w-5 h-5 rounded-full shadow-inner bg-gradient-to-r from-emerald-400 to-teal-400" />
                  <span className="text-[10px] text-gray-400 ml-auto flex items-center gap-0.5">
                    <Sparkles className="w-3 h-3 text-amber-400" /> 沉浸主题
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-2">
          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-extrabold text-sm shadow-md hover:opacity-95 active:scale-98 transition-all"
          >
            选好啦，开始阅读！✨
          </button>
        </div>
      </div>
    </div>
  );
};
