interface ChurningInstructionsProps {
  categoryName?: string | null;
  scienceNote?: string | null;
  techniqueTip?: string | null;
  recipeName?: string | null;
  compact?: boolean;
}

const BASE_STEPS = [
  'Chill the mix thoroughly (ideally overnight, or at least 4 hours). A cold base freezes faster in the machine and makes smaller ice crystals.',
  'Churn in your ice cream maker per the manufacturer’s instructions — usually 15–25 minutes until it looks like soft-serve.',
  'Pack into a shallow airtight container; press plastic wrap onto the surface before the lid to limit ice crystals.',
  'Harden in the freezer at 0°F / -18°C or colder for at least 4 hours before scooping for best texture.',
];

export function ChurningInstructions({
  categoryName,
  scienceNote,
  techniqueTip,
  recipeName,
  compact = false,
}: ChurningInstructionsProps) {
  const pad = compact ? 'p-3' : 'p-5';
  const title = compact ? 'text-base' : 'text-lg';

  return (
    <div className={`space-y-3 ${compact ? 'text-xs' : 'text-sm'}`}>
      <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${pad}`}>
        <h3 className={`font-bold text-gray-900 mb-2 flex items-center gap-2 ${title}`}>
          <span>🌀</span> Churning & freezing
        </h3>
        {recipeName && (
          <p className="text-gray-600 mb-3 italic">
            Recipe: <span className="font-semibold not-italic text-gray-800">{recipeName}</span>
          </p>
        )}
        <ol className="list-decimal pl-4 space-y-2 text-gray-700">
          {BASE_STEPS.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
        {categoryName && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Style</div>
            <p className="text-gray-800 font-medium">{categoryName}</p>
          </div>
        )}
        {scienceNote && (
          <div className="mt-3 p-3 rounded-lg bg-sky-50 border border-sky-100">
            <div className="text-xs font-bold text-sky-800 mb-1">🔬 Why it works</div>
            <p className="text-gray-700 leading-snug">{scienceNote}</p>
          </div>
        )}
        {techniqueTip && (
          <div className="mt-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
            <div className="text-xs font-bold text-amber-900 mb-1">👨‍🍳 Technique tip</div>
            <p className="text-amber-950 leading-snug">{techniqueTip}</p>
          </div>
        )}
      </div>
    </div>
  );
}
