import { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Lyra Reader Uncaught Error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      // Clear potentially corrupted library / settings keys
      localStorage.removeItem('lyra_active_lib_id');
    } catch {
      // Ignore
    }
    // Reload cleanly
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-rose-50 to-amber-100 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-4xl p-6 sm:p-8 shadow-2xl border-4 border-pink-200 text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-pink-100 flex items-center justify-center text-4xl shadow-inner animate-bounce-gentle">
              🐰
            </div>
            
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-gray-800">
                萌萌速读遇到了一点小波折
              </h2>
              <p className="text-xs sm:text-sm font-bold text-gray-500">
                别担心，点击下方按钮即可一键恢复到初始状态并继续阅读
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] font-bold text-amber-800 flex items-center gap-2 text-left">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
              <span className="line-clamp-2">
                {this.state.error?.message || '渲染出现异常，重置后即可正常使用'}
              </span>
            </div>

            <button
              onClick={this.handleReset}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-black text-sm sm:text-base shadow-lg shadow-pink-200 hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5 stroke-[2.5]" />
              一键恢复并开启速读
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
