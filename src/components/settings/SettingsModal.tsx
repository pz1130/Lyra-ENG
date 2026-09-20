import React from 'react';
import {
  Settings,
  X,
  Type,
  Volume2,
  Eye,
  RotateCcw,
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { readerSettings, updateSettings, resetSettings } = useLibrary();
  const { playPop } = useSoundEffects();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-sm animate-pop-in">
      <div
        className="w-full max-w-md bg-white rounded-3xl sm:rounded-4xl shadow-2xl border-4 border-pink-100 p-5 sm:p-6 relative overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-pink-100 text-pink-600">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-800">
                速读偏好与辅助设置
              </h2>
              <p className="text-xs text-gray-400 font-bold">
                量身定制最舒适的儿童视读体验
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Settings Form */}
        <div className="py-4 space-y-5 overflow-y-auto flex-1 text-sm text-gray-700">
          {/* Section 1: Typography */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 font-black text-xs text-gray-900">
              <Type className="w-4 h-4 text-pink-500" />
              <span>文字与排版</span>
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">
                单词显示字号
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['md', 'lg', 'xl', '2xl'] as const).map((size) => {
                  const labels = {
                    md: '标准',
                    lg: '较大',
                    xl: '特大',
                    '2xl': '巨大',
                  };
                  const isSelected = readerSettings.fontSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => {
                        playPop();
                        updateSettings({ fontSize: size });
                      }}
                      className={`py-2 rounded-xl text-xs font-black transition-all ${
                        isSelected
                          ? 'bg-pink-500 text-white shadow-xs'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {labels[size]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Font Family */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">
                字体风格
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'reading', label: '速读专用 (Lexend)' },
                  { id: 'comic', label: '卡通圆润 (Comic)' },
                  { id: 'sans', label: '标准清晰 (Sans)' },
                ].map((f) => {
                  const isSelected = readerSettings.fontFamily === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => {
                        playPop();
                        updateSettings({
                          fontFamily: f.id as 'reading' | 'comic' | 'sans',
                        });
                      }}
                      className={`p-2 rounded-xl text-xs font-black transition-all text-center ${
                        isSelected
                          ? 'bg-pink-500 text-white shadow-xs'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 2: Visual Guidance */}
          <div className="space-y-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5 font-black text-xs text-gray-900">
              <Eye className="w-4 h-4 text-pink-500" />
              <span>视觉辅助与注视点</span>
            </div>

            {/* ORP Marker toggle */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50">
              <div>
                <p className="text-xs font-black text-gray-800">
                  显示定焦标尺 (ORP 辅助刻度)
                </p>
                <p className="text-[11px] text-gray-400">
                  在焦点字母上下显示标尺，帮助孩子眼球定焦不乱跑
                </p>
              </div>
              <input
                type="checkbox"
                checked={readerSettings.showORPIndicator}
                onChange={(e) =>
                  updateSettings({ showORPIndicator: e.target.checked })
                }
                className="w-5 h-5 accent-pink-500 cursor-pointer"
              />
            </div>

            {/* Translation toggle */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50">
              <div>
                <p className="text-xs font-black text-gray-800">
                  显示中文释义与音标
                </p>
                <p className="text-[11px] text-gray-400">
                  在速读卡片下方显示词汇对照
                </p>
              </div>
              <input
                type="checkbox"
                checked={readerSettings.showTranslation}
                onChange={(e) =>
                  updateSettings({ showTranslation: e.target.checked })
                }
                className="w-5 h-5 accent-pink-500 cursor-pointer"
              />
            </div>

            {/* Punctuation Pause */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-1">
                <span>句末标点额外停顿倍率</span>
                <span className="font-black text-pink-600">
                  {readerSettings.punctuationPauseMultiplier}x
                </span>
              </div>
              <input
                type="range"
                min={1.0}
                max={3.0}
                step={0.5}
                value={readerSettings.punctuationPauseMultiplier}
                onChange={(e) =>
                  updateSettings({
                    punctuationPauseMultiplier: parseFloat(e.target.value),
                  })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                <span>不停顿 (1.0x)</span>
                <span>适中停顿 (2.0x 推荐)</span>
                <span>长停顿 (3.0x)</span>
              </div>
            </div>
          </div>

          {/* Section 3: Speech Audio */}
          <div className="space-y-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5 font-black text-xs text-gray-900">
              <Volume2 className="w-4 h-4 text-pink-500" />
              <span>真人语音发音 (TTS)</span>
            </div>

            {/* Auto Pronounce On Pause */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50">
              <div>
                <p className="text-xs font-black text-gray-800">
                  暂停时自动朗读单词
                </p>
                <p className="text-[11px] text-gray-400">
                  每当按暂停键时，立即读出当前停顿的单词
                </p>
              </div>
              <input
                type="checkbox"
                checked={readerSettings.autoPronounceOnPause}
                onChange={(e) =>
                  updateSettings({ autoPronounceOnPause: e.target.checked })
                }
                className="w-5 h-5 accent-pink-500 cursor-pointer"
              />
            </div>

            {/* Speech Rate */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-1">
                <span>朗读语速</span>
                <span className="font-black text-pink-600">
                  {readerSettings.speechRate}x
                </span>
              </div>
              <input
                type="range"
                min={0.6}
                max={1.2}
                step={0.1}
                value={readerSettings.speechRate}
                onChange={(e) =>
                  updateSettings({ speechRate: parseFloat(e.target.value) })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between shrink-0">
          <button
            onClick={() => {
              playPop();
              resetSettings();
            }}
            className="text-xs font-bold text-gray-400 hover:text-gray-600 flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" /> 恢复默认配置
          </button>
          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="px-6 py-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-black text-xs shadow-md active:scale-95 transition-all"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
};
