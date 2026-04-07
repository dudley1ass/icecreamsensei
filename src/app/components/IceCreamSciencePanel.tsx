import { Badge } from './ui/badge';
import { PODPACScales } from './PODPACScales';
import type { IceCreamTasteResult } from '../utils/iceCreamTastePrediction';
import { getScoreColor, getScoreLabel } from '../utils/iceCreamTastePrediction';

interface ResultsSlice {
  fatPct: number;
  sugarPct: number;
  msnfPct: number;
  waterPct: number;
  totalSolidsPct: number;
  POD: number;
  PAC: number;
  flags: string[];
}

interface IceCreamSciencePanelProps {
  taste: IceCreamTasteResult;
  results: ResultsSlice;
  getStatusColor: (value: number, min: number, max: number) => string;
}

function ScoreBar({ label, score, emoji }: { label: string; score: number; emoji: string }) {
  const color = getScoreColor(score);
  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-0.5">
        <span className="text-xs font-medium text-gray-700">
          {emoji} {label}
        </span>
        <span className="text-xs font-bold text-gray-900">
          {score}/100 <span className="text-gray-400 font-normal">({getScoreLabel(score)})</span>
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

export function IceCreamSciencePanel({ taste, results, getStatusColor }: IceCreamSciencePanelProps) {
  const tasteScores = [
    { label: 'Chocolate', score: taste.chocolateScore, emoji: '🍫' },
    { label: 'Fruit', score: taste.fruitinessScore, emoji: '🍓' },
    { label: 'Spice', score: taste.spiceScore, emoji: '🌶️' },
    { label: 'Nutty', score: taste.nuttinessScore, emoji: '🥜' },
    { label: 'Tart / citrus', score: taste.tartScore, emoji: '🍋' },
    { label: 'Bitter', score: taste.bitternessScore, emoji: '😬' },
  ].filter((t) => t.score > 0);

  const creaminess = Math.min(100, Math.round((results.fatPct / 16) * 88 + (results.msnfPct / 11) * 12));
  const bodyScore = Math.min(100, Math.round((results.msnfPct / 11) * 85 + (results.totalSolidsPct / 40) * 15));
  const sweetnessScience = Math.min(100, Math.round((results.sugarPct / 18) * 92));
  const softnessScience = Math.min(100, Math.round((results.PAC / 200) * 100));
  const freezeHardRisk = Math.min(100, Math.round(100 - softnessScience + Math.max(0, 12 - results.sugarPct) * 3));

  return (
    <div className="space-y-4 text-sm">
      {/* Taste prediction — cake-style */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2 text-sm">
          <span>👅</span> Taste prediction
        </h3>
        <div
          className="mb-2 px-3 py-2 rounded-lg text-center"
          style={{ background: 'linear-gradient(135deg, #fff7ed, #fce7f3)' }}
        >
          <div className="text-[10px] text-gray-500 mb-0.5 uppercase tracking-wide">Dominant flavour</div>
          <div className="text-lg font-black text-gray-900 leading-tight">{taste.dominantFlavor}</div>
        </div>
        <p className="text-xs text-gray-600 italic mb-3 px-0.5">&ldquo;{taste.tasteNotes}&rdquo;</p>
        {taste.flavorProfile.length > 0 && (
          <div className="mb-3">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Flavour profile</div>
            <div className="flex flex-wrap gap-1.5">
              {taste.flavorProfile.map((f) => (
                <span
                  key={f}
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #c0392b, #e67e22)' }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}
        {tasteScores.length > 0 && (
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2">Flavour intensity</div>
            {tasteScores.map((t) => (
              <ScoreBar key={t.label} label={t.label} score={t.score} emoji={t.emoji} />
            ))}
          </div>
        )}
        {taste.tasteWarnings.length > 0 && (
          <div className="mt-2 space-y-1.5">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Chef&apos;s notes</div>
            {taste.tasteWarnings.map((w, i) => (
              <div
                key={i}
                className="text-[10px] text-gray-700 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg px-2 py-1.5 italic"
              >
                {w}
              </div>
            ))}
          </div>
        )}
        {taste.flavorProfile.length === 0 && tasteScores.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-1">Add fruit, chocolate, nuts, or spices to see flavour hints.</p>
        )}
      </div>

      {/* Ice cream “science” scores */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
          <span>🔬</span> Mix science scores
        </h3>
        <ScoreBar label="Creaminess (fat + MSNF)" score={creaminess} emoji="🥛" />
        <ScoreBar label="Sweetness (solids)" score={sweetnessScience} emoji="🍬" />
        <ScoreBar label="Body / MSNF" score={bodyScore} emoji="📐" />
        <ScoreBar label="Freezer softness (PAC)" score={softnessScience} emoji="❄️" />
        <ScoreBar label="Hard / icy risk" score={freezeHardRisk} emoji="🧊" />
      </div>

      {/* Composition % — compact */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm">
          <span>📊</span> Composition
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <div className={`p-2 rounded-lg border text-center ${getStatusColor(results.fatPct, 12, 16)} print:!border-gray-400 print:!bg-white print:!text-gray-900`}>
            <div className="text-xl font-bold">{results.fatPct.toFixed(1)}%</div>
            <div className="text-[10px] mt-0.5">Fat</div>
          </div>
          <div className={`p-2 rounded-lg border text-center ${getStatusColor(results.sugarPct, 14, 16)} print:!border-gray-400 print:!bg-white print:!text-gray-900`}>
            <div className="text-xl font-bold">{results.sugarPct.toFixed(1)}%</div>
            <div className="text-[10px] mt-0.5">Sugar</div>
          </div>
          <div className={`p-2 rounded-lg border text-center ${getStatusColor(results.msnfPct, 9, 11)} print:!border-gray-400 print:!bg-white print:!text-gray-900`}>
            <div className="text-xl font-bold">{results.msnfPct.toFixed(1)}%</div>
            <div className="text-[10px] mt-0.5">MSNF</div>
          </div>
          <div className={`p-2 rounded-lg border text-center ${getStatusColor(results.waterPct, 0, 100)} print:!border-gray-400 print:!bg-white print:!text-gray-900`}>
            <div className="text-xl font-bold">{results.waterPct.toFixed(1)}%</div>
            <div className="text-[10px] mt-0.5">Water</div>
          </div>
          <div className={`p-2 rounded-lg border text-center col-span-2 ${getStatusColor(results.totalSolidsPct, 36, 40)} print:!border-gray-400 print:!bg-white print:!text-gray-900`}>
            <div className="text-xl font-bold">{results.totalSolidsPct.toFixed(1)}%</div>
            <div className="text-[10px] mt-0.5">Total solids</div>
          </div>
        </div>
        <div className="mt-2 p-2 rounded-lg bg-blue-50 border border-blue-100 text-center print:!bg-white print:!border-gray-400">
          <div className="text-xs font-bold text-blue-900 print:text-gray-900">
            POD {results.POD.toFixed(1)} / PAC {results.PAC.toFixed(1)}
          </div>
          <div className="text-[10px] text-blue-800/80 print:text-gray-600">per kg mix · sucrose-relative</div>
        </div>
        {results.flags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {results.flags.map((flag, i) => (
              <Badge key={i} variant="outline" className="text-[10px] bg-amber-50 text-amber-900 border-amber-200">
                {flag}
              </Badge>
            ))}
          </div>
        )}
        <p className="text-[10px] text-gray-500 mt-2 leading-snug">
          Targets: fat 12–16% · sugar 14–16% · MSNF 9–11% · solids 36–40%. POD/PAC are engineering shorthand vs sucrose.
        </p>
      </div>

      <div className="max-w-md">
        <PODPACScales POD={results.POD} PAC={results.PAC} compact />
      </div>
    </div>
  );
}
