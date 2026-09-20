import React from 'react';
import { Share, PlusSquare, Smartphone, Tablet, X } from 'lucide-react';
import { useSoundEffects } from '../../hooks/useSoundEffects';

interface IOSInstallGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IOSInstallGuide: React.FC<IOSInstallGuideProps> = ({
  isOpen,
  onClose,
}) => {
  const { playPop } = useSoundEffects();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-pop-in">
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border-4 border-amber-100 p-6 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-amber-100 text-amber-700">
              <Tablet className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-800">
                安装到 iPhone / iPad 指南
              </h2>
              <p className="text-xs text-gray-500">
                无需 App Store 审核，10秒变成纯本地全屏 App
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

        <div className="space-y-4 my-5 text-sm text-gray-700">
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200">
            <div className="w-7 h-7 rounded-xl bg-amber-500 text-white font-bold flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <p className="font-extrabold text-gray-900">在 Safari 浏览器中打开</p>
              <p className="text-xs text-gray-600 mt-0.5">
                在 iPhone 或 iPad 的自带 <span className="font-bold text-blue-600">Safari</span> 浏览器访问本网址（同一 Wi-Fi 下输入电脑局域网 IP 或部署域名）。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200">
            <div className="w-7 h-7 rounded-xl bg-blue-500 text-white font-bold flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <p className="font-extrabold text-gray-900 flex items-center gap-1.5">
                点击底栏「分享」按钮 <Share className="w-4 h-4 text-blue-600" />
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                点击 Safari 底部的向上箭头分享图标（iPad 在右上角）。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <div className="w-7 h-7 rounded-xl bg-emerald-500 text-white font-bold flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <p className="font-extrabold text-gray-900 flex items-center gap-1.5">
                选择「添加到主屏幕」 <PlusSquare className="w-4 h-4 text-emerald-600" />
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                在分享菜单向下滑动，点击「添加到主屏幕」(Add to Home Screen)。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-pink-50/70 border border-pink-200">
            <div className="w-7 h-7 rounded-xl bg-pink-500 text-white font-bold flex items-center justify-center shrink-0">
              4
            </div>
            <div>
              <p className="font-extrabold text-gray-900 flex items-center gap-1.5">
                像真实 App 一样全屏使用 <Smartphone className="w-4 h-4 text-pink-600" />
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                主屏幕会出现萌萌速读图标，点击即可进入无浏览器地址栏的沉浸式纯净速读体验，完全支持离线！
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            playPop();
            onClose();
          }}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-400 text-white font-black text-sm shadow-md hover:opacity-95 active:scale-98 transition-all"
        >
          我知道啦！
        </button>
      </div>
    </div>
  );
};
