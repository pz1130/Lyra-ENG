import React, { useState, useMemo } from 'react';
import {
  FileText,
  Upload,
  PlusCircle,
  X,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { useSoundEffects } from '../../hooks/useSoundEffects';
import {
  analyzeCsvContent,
  buildWordItemsFromRows,
  parseRawTextToWords,
  ParsedCsvResult,
} from '../../utils/rsvpHelper';
import { WordItem } from '../../types/index';

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

  const [activeTab, setActiveTab] = useState<ImportTab>('file');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [emoji, setEmoji] = useState('📖');

  // Tab 1: Passage text
  const [passageText, setPassageText] = useState('');

  // Tab 2: File content & CSV analysis
  const [fileName, setFileName] = useState('');
  const [fileError, setFileError] = useState('');
  const [csvAnalysis, setCsvAnalysis] = useState<ParsedCsvResult | null>(null);
  const [wordCol, setWordCol] = useState<number>(0);
  const [transCol, setTransCol] = useState<number>(1);
  const [phoneticCol, setPhoneticCol] = useState<number>(-1);
  const [skipHeader, setSkipHeader] = useState<boolean>(false);

  // Tab 3: Word list text
  const [wordListText, setWordListText] = useState('');

  // Computed words for file upload
  const fileWords = useMemo(() => {
    if (!csvAnalysis || csvAnalysis.rows.length === 0) return [];
    return buildWordItemsFromRows(
      csvAnalysis.rows,
      wordCol,
      transCol,
      phoneticCol,
      skipHeader
    );
  }, [csvAnalysis, wordCol, transCol, phoneticCol, skipHeader]);

  // Computed words for manual wordlist tab
  const manualListAnalysis = useMemo(() => {
    if (!wordListText.trim()) return null;
    return analyzeCsvContent(wordListText);
  }, [wordListText]);

  const manualListWords = useMemo(() => {
    if (!manualListAnalysis || manualListAnalysis.rows.length === 0) return [];
    return buildWordItemsFromRows(
      manualListAnalysis.rows,
      manualListAnalysis.detectedWordCol,
      manualListAnalysis.detectedTransCol,
      manualListAnalysis.detectedPhoneticCol,
      manualListAnalysis.hasHeader
    );
  }, [manualListAnalysis]);

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
        const analysis = analyzeCsvContent(content);

        if (analysis.rows.length === 0) {
          setFileError('未能在文件中读取到内容，请检查文件格式');
          setCsvAnalysis(null);
        } else {
          setCsvAnalysis(analysis);
          setWordCol(analysis.detectedWordCol);
          setTransCol(analysis.detectedTransCol);
          setPhoneticCol(analysis.detectedPhoneticCol);
          setSkipHeader(analysis.hasHeader);
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
      finalWords = manualListWords;
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
    setCsvAnalysis(null);
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
      `序号,英文,中文释义,音标
1,apple,苹果,[ˈæpl]
2,banana,香蕉,[bəˈnænə]
3,strawberry,草莓,[ˈstrɔːbəri]
4,orange,橙子,[ˈɒrɪndʒ]
5,watermelon,西瓜,[ˈwɔːtəmelən]
6,ice cream,冰淇淋,[ˌaɪs ˈkriːm]
7,cupcake,纸杯蛋糕,[ˈkʌpkeɪk]`
    );
  };

  const maxColumns = csvAnalysis
    ? Math.max(...csvAnalysis.rows.map((r) => r.length), 1)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm animate-pop-in">
      <div
        className="w-full max-w-2xl max-h-[92vh] bg-white rounded-3xl sm:rounded-4xl shadow-2xl border-4 border-pink-100 flex flex-col overflow-hidden relative"
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
                智能识别中英对照列、跳过表头与实时表格校验
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
              setActiveTab('file');
            }}
            className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-1.5 transition-all shrink-0 ${
              activeTab === 'file'
                ? 'bg-pink-500 text-white shadow-md shadow-pink-200'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>上传文件 (CSV / TXT / Excel)</span>
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
            <span>粘贴中英单词表</span>
          </button>

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
            <span>绘本/文章整段分词</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Metadata Section */}
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
                placeholder="例如：自制核心词汇表、课外阅读生词..."
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
              placeholder="简述这本词书适合的年级或难度..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs font-medium p-2.5 rounded-2xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
            />
          </div>

          {/* TAB 1: FILE UPLOAD (CSV / TXT) */}
          {activeTab === 'file' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-pink-300 hover:border-pink-500 rounded-3xl p-5 text-center bg-pink-50/30 transition-colors">
                <Upload className="w-8 h-8 text-pink-500 mx-auto mb-1.5" />
                <p className="text-sm font-black text-gray-700">
                  点击上传或拖放 CSV / TXT 文件
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  支持 Excel 导出的 CSV、TXT（支持多列，自动识别中英文与序号）
                </p>
                <input
                  type="file"
                  accept=".txt,.csv,.tsv,.json"
                  onChange={handleFileUpload}
                  className="mt-3 block mx-auto text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-pink-500 file:text-white hover:file:bg-pink-600 cursor-pointer"
                />
              </div>

              {fileName && (
                <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between text-xs font-bold">
                  <span className="truncate max-w-[240px]">📄 {fileName}</span>
                  <span className="text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> 已解析 {fileWords.length}{' '}
                    个有效单词
                  </span>
                </div>
              )}

              {fileError && (
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{fileError}</span>
                </div>
              )}

              {/* Column Mapping Controls & Live Preview Table */}
              {csvAnalysis && csvAnalysis.rows.length > 0 && (
                <div className="p-4 rounded-3xl bg-amber-50/60 border border-amber-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-black text-amber-900">
                      <SlidersHorizontal className="w-4 h-4 text-amber-600" />
                      <span>列对应纠偏（如果识别不准，可在此调整）：</span>
                    </div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={skipHeader}
                        onChange={(e) => setSkipHeader(e.target.checked)}
                        className="w-4 h-4 accent-pink-500"
                      />
                      <span>跳过首行表头</span>
                    </label>
                  </div>

                  {/* Dropdowns row */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="block text-[11px] font-bold text-gray-500 mb-1">
                        英文单词列 (Word)
                      </span>
                      <select
                        value={wordCol}
                        onChange={(e) => setWordCol(parseInt(e.target.value, 10))}
                        className="w-full p-2 rounded-xl border border-gray-300 bg-white font-black text-gray-800 focus:border-pink-500"
                      >
                        {Array.from({ length: maxColumns }, (_, i) => (
                          <option key={i} value={i}>
                            第 {i + 1} 列 {csvAnalysis.rows[0]?.[i] ? `("${csvAnalysis.rows[0][i].slice(0, 10)}")` : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <span className="block text-[11px] font-bold text-gray-500 mb-1">
                        中文释义列 (Meaning)
                      </span>
                      <select
                        value={transCol}
                        onChange={(e) => setTransCol(parseInt(e.target.value, 10))}
                        className="w-full p-2 rounded-xl border border-gray-300 bg-white font-black text-gray-800 focus:border-pink-500"
                      >
                        <option value={-1}>无中文释义</option>
                        {Array.from({ length: maxColumns }, (_, i) => (
                          <option key={i} value={i}>
                            第 {i + 1} 列 {csvAnalysis.rows[0]?.[i] ? `("${csvAnalysis.rows[0][i].slice(0, 10)}")` : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <span className="block text-[11px] font-bold text-gray-500 mb-1">
                        音标列 (Phonetic 可选)
                      </span>
                      <select
                        value={phoneticCol}
                        onChange={(e) => setPhoneticCol(parseInt(e.target.value, 10))}
                        className="w-full p-2 rounded-xl border border-gray-300 bg-white font-black text-gray-800 focus:border-pink-500"
                      >
                        <option value={-1}>无音标</option>
                        {Array.from({ length: maxColumns }, (_, i) => (
                          <option key={i} value={i}>
                            第 {i + 1} 列 {csvAnalysis.rows[0]?.[i] ? `("${csvAnalysis.rows[0][i].slice(0, 10)}")` : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Real-time Preview Table */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-xs font-black text-gray-700 mb-1.5">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-pink-500" />
                        速读内容实时预览 (前 5 行)：
                      </span>
                      <span className="text-[11px] text-pink-600 font-bold">
                        将导入 {fileWords.length} 个单词
                      </span>
                    </div>

                    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-2xs">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-pink-50/80 text-gray-700 font-black border-b border-gray-200">
                          <tr>
                            <th className="py-2 px-3 w-12">#</th>
                            <th className="py-2 px-3">识别英文单词 (速读展示)</th>
                            <th className="py-2 px-3">识别中文释义</th>
                            <th className="py-2 px-3">音标</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {fileWords.slice(0, 5).map((w, idx) => (
                            <tr key={idx} className="hover:bg-pink-50/30">
                              <td className="py-2 px-3 text-gray-400 font-bold">
                                {idx + 1}
                              </td>
                              <td className="py-2 px-3 font-extrabold text-pink-600">
                                {w.word}
                              </td>
                              <td className="py-2 px-3 font-medium text-gray-700">
                                {w.translation || <span className="text-gray-300">无</span>}
                              </td>
                              <td className="py-2 px-3 font-mono text-[11px] text-gray-400">
                                {w.phonetic || <span className="text-gray-300">-</span>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WORD LIST TEXTAREA */}
          {activeTab === 'wordlist' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-gray-700">
                  粘贴或输入单词表 (支持逗号、Tab、或多列)
                </label>
                <button
                  onClick={loadWordListSample}
                  className="text-xs font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> 填入带序号的示例
                </button>
              </div>
              <textarea
                rows={6}
                placeholder="直接粘贴 Excel 复制的内容，或逗号分隔，例如：&#10;1, apple, 苹果, [ˈæpl]&#10;2, banana, 香蕉, [bəˈnænə]&#10;系统将自动识别并过滤序号！"
                value={wordListText}
                onChange={(e) => setWordListText(e.target.value)}
                className="w-full text-xs p-3 rounded-2xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none font-mono"
              />

              {/* Real-time preview for manual text input */}
              {manualListWords.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-pink-50/50 border border-pink-200 space-y-2">
                  <div className="flex items-center justify-between text-xs font-black text-gray-700">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-pink-500" />
                      自动识别解析预览 (前 5 行)：
                    </span>
                    <span className="text-pink-600 font-bold">
                      已识别 {manualListWords.length} 词
                    </span>
                  </div>

                  <div className="border border-pink-200/60 rounded-xl overflow-hidden bg-white">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-pink-100/60 text-gray-700 font-bold border-b border-pink-200">
                        <tr>
                          <th className="py-1.5 px-3 w-10">#</th>
                          <th className="py-1.5 px-3">单词</th>
                          <th className="py-1.5 px-3">释义</th>
                          <th className="py-1.5 px-3">音标</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-pink-50">
                        {manualListWords.slice(0, 5).map((w, idx) => (
                          <tr key={idx}>
                            <td className="py-1.5 px-3 text-gray-400 font-bold">{idx + 1}</td>
                            <td className="py-1.5 px-3 font-black text-pink-600">{w.word}</td>
                            <td className="py-1.5 px-3 text-gray-700">{w.translation || '-'}</td>
                            <td className="py-1.5 px-3 text-gray-400 font-mono text-[10px]">{w.phonetic || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SMART PASSAGE */}
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
            确认导入此词书
          </button>
        </div>
      </div>
    </div>
  );
};
