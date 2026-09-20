import React, { useState } from 'react';
import {
  FileText,
  Upload,
  PlusCircle,
  X,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import {
  parseImportFileContent,
  parseRawTextToWords,
} from '../../utils/rsvpHelper';
import { WordItem } from '../../types';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ImportTab = 'passage' | 'file' | 'wordlist';

export const ImportModal: React.FC<ImportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addCustomLibrary } = useLibrary();
  const { playPop, playFanfare } = useSoundEffects();

  const [activeTab, setActiveTab] = useState<ImportTab>('passage');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [emoji, setEmoji] = useState('📖');

  // Tab 1: Passage text
  const [passageText, setPassageText] = useState('');

  // Tab 2: File content & preview
  const [fileName, setFileName] = useState('');
  const [fileWords, setFileWords] = useState<WordItem[]>([]);
  const [fileError, setFileError] = useState('');

  // Tab 3: Word list text
  const [wordListText, setWordListText] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    if (!title) {
      setTitle(file.name.replace(/\.[^/.]+$/, ''));
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const content = evt.target?.result as string;
        const words = parseImportFileContent(content);
        if (words.length === 0) {
          setFileError('未能在文件中解析到有效单词，请检查格式');
          setFileWords([]);
        } else {
          setFileWords(words);
          setFileError('');
        }
      } catch (err) {
        setFileError('文件解析出错，请尝试简单文本或 CSV');
      }
    };
    reader.readAsText(file);
  };

  const handleSave = () => {
    let finalWords: WordItem[] = [];

    if (activeTab === 'passage') {
      finalWords = parseRawTextToWords(passageText);
    } else if (activeTab === 'file') {
      finalWords = fileWords;
    } else if (activeTab === 'wordlist') {
      finalWords = parseImportFileContent(wordListText);
    }

    if (finalWords.length === 0) {
      alert('请至少录入或导入 1 个有效单词！');
      return;
    }

    const finalTitle = title.trim() || `自定义词书 (${finalWords.length}词)`;

    addCustomLibrary({
      title: finalTitle,
      description:
        description.trim() || `包含 ${finalWords.length} 个单词的自定义速读库`,
      category: 'custom',
      badgeEmoji: emoji || '✨',
      words: finalWords,
    });

    playFanfare();
    onClose();

    // Reset fields
    setTitle('');
    setDescription('');
    setPassageText('');
    setFileName('');
    setFileWords([]);
    setWordListText('');
  };

  // Quick sample insertion for parents
  const loadPassageSample = () => {
    setTitle('小猫咪的探险 (The Curious Kitten)');
    setDescription('充满童趣的小短文，锻炼连续视读');
    setEmoji('🐱');
    setPassageText(
      'Once upon a time, a fluffy kitten named Mimi went into the green garden. She saw a shiny yellow butterfly dancing in the warm sunshine! "Can I catch you?" thought Mimi softly. She leaped high into the air with joy!'
    );
  };

  const loadWordListSample = () => {
    setTitle('水果与甜品小词典');
    setDescription('常用食物单词中英对照');
    setEmoji('🍓');
    setWordListText(
      `apple, 苹果, [ˈæpl]
banana, 香蕉, [bəˈnænə]
strawberry, 草莓, [ˈstrɔːbəri]
orange, 橙子, [ˈɒrɪndʒ]
watermelon, 西瓜, [ˈwɔːtəmelən]
ice cream, 冰淇淋, [ˌaɪs ˈkriːm]
cupcake, 纸杯蛋糕, [ˈkʌpkeɪk]`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm animate-pop-in">
      <div
        className="w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl sm:rounded-4xl shadow-2xl border-4 border-pink-100 flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-pink-50/50">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📥</span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-gray-800">
                导入自定义单词库
              </h2>
              <p className="text-xs text-gray-500 font-bold">
                支持短文智能分词、CSV/TXT 文件上传与手动建库
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

        {/* Tabs */}
        <div className="px-5 pt-3 pb-1 border-b border-gray-100 flex gap-2 shrink-0 bg-gray-50/70 overflow-x-auto">
          <button
            onClick={() => {
              playPop();
              setActiveTab('passage');
            }}
            className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-1.5 transition-all shrink-0 ${
              activeTab === 'passage'
                ? 'bg-pink-500 text-white shadow-md shadow-pink-200'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>智能短文/绘本粘贴</span>
          </button>

          <button
            onClick={() => {
              playPop();
              setActiveTab('file');
            }}
            className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-1.5 transition-all shrink-0 ${
              activeTab === 'file'
                ? 'bg-pink-500 text-white shadow-md shadow-pink-200'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>上传文件 (CSV/TXT/JSON)</span>
          </button>

          <button
            onClick={() => {
              playPop();
              setActiveTab('wordlist');
            }}
            className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-1.5 transition-all shrink-0 ${
              activeTab === 'wordlist'
                ? 'bg-pink-500 text-white shadow-md shadow-pink-200'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>中英对照单词表</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Metadata Section: Title, Emoji, Description */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-1">
              <label className="block text-xs font-black text-gray-700 mb-1">
                封面 Emoji
              </label>
              <input
                type="text"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value)}
                maxLength={2}
                className="w-full text-center text-xl p-2 rounded-2xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-xs font-black text-gray-700 mb-1">
                词书标题 <span className="text-pink-500">*</span>
              </label>
              <input
                type="text"
                placeholder="例如：神奇树屋第1章、三年级核心单词..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-sm font-bold p-2.5 rounded-2xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-gray-700 mb-1">
              词书简介 (可选)
            </label>
            <input
              type="text"
              placeholder="简述这本词书适合的年龄或阶段..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs font-medium p-2.5 rounded-2xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
            />
          </div>

          {/* TAB 1: Smart Passage Input */}
          {activeTab === 'passage' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-gray-700 flex items-center gap-1">
                  <span>粘贴英文故事 / 短文内容</span>
                </label>
                <button
                  onClick={loadPassageSample}
                  className="text-xs font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> 填入示例短文
                </button>
              </div>
              <textarea
                rows={7}
                placeholder="在此直接粘贴孩子的绘本短文、课本故事或任何英文故事。系统将自动拆分为视觉速读流并保留标点韵律..."
                value={passageText}
                onChange={(e) => setPassageText(e.target.value)}
                className="w-full text-sm p-3.5 rounded-2xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none font-sans"
              />
              <div className="text-xs font-bold text-gray-500 flex items-center justify-between">
                <span>
                  当前预估词数：
                  <span className="text-pink-600 font-extrabold ml-1">
                    {parseRawTextToWords(passageText).length}
                  </span>{' '}
                  词
                </span>
                <span className="text-gray-400">系统将自动处理换行与空格</span>
              </div>
            </div>
          )}

          {/* TAB 2: File Upload */}
          {activeTab === 'file' && (
            <div className="space-y-3">
              <div className="border-2 border-dashed border-pink-300 hover:border-pink-500 rounded-3xl p-6 text-center bg-pink-50/30 transition-colors">
                <Upload className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                <p className="text-sm font-black text-gray-700">
                  点击选择或拖放文件到此处
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  支持 .txt, .csv, .json 文件 (每行一个词或逗号中英对照)
                </p>
                <input
                  type="file"
                  accept=".txt,.csv,.json"
                  onChange={handleFileUpload}
                  className="mt-3 block mx-auto text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-pink-500 file:text-white hover:file:bg-pink-600 cursor-pointer"
                />
              </div>

              {fileName && (
                <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between text-xs font-bold">
                  <span className="truncate max-w-[200px]">📄 {fileName}</span>
                  <span className="text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> 已解析 {fileWords.length}{' '}
                    个词
                  </span>
                </div>
              )}

              {fileError && (
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{fileError}</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Word List Input */}
          {activeTab === 'wordlist' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-gray-700">
                  输入单词与释义 (支持格式：单词, 中文释义, 音标)
                </label>
                <button
                  onClick={loadWordListSample}
                  className="text-xs font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> 填入水果示例
                </button>
              </div>
              <textarea
                rows={7}
                placeholder="每行一个单词，逗号分隔中文释义，例如：&#10;apple, 苹果&#10;banana, 香蕉&#10;watermelon, 西瓜"
                value={wordListText}
                onChange={(e) => setWordListText(e.target.value)}
                className="w-full text-sm p-3.5 rounded-2xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none font-mono"
              />
              <div className="text-xs font-bold text-gray-500">
                解析单词数：
                <span className="text-pink-600 font-extrabold ml-1">
                  {parseImportFileContent(wordListText).length}
                </span>{' '}
                词
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-end gap-3 shrink-0 bg-gray-50">
          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="px-5 py-2.5 rounded-2xl bg-white border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 active:scale-95 transition-all"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-400 text-white font-black text-sm shadow-md shadow-pink-200 hover:opacity-95 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            保存并加入词书库
          </button>
        </div>
      </div>
    </div>
  );
};
