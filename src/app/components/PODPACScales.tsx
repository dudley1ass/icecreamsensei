import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface PODPACScalesProps {
  POD: number;
  PAC: number;
  /** Narrower, shorter scales for side-column layout */
  compact?: boolean;
}

export function PODPACScales({ POD, PAC, compact = false }: PODPACScalesProps) {
  // Define realistic POD range for ice cream (based on common sweeteners)
  // Dextrose is ~0.70 (low), Fructose is ~1.70 (high)
  const POD_MIN = 50; // per kg
  const POD_MAX = 250; // per kg
  
  // Define realistic PAC range for ice cream 
  // Lower PAC = harder, Higher PAC = softer
  const PAC_MIN = 50; // per kg
  const PAC_MAX = 300; // per kg

  // Calculate position on scale based on actual min/max
  const calculatePosition = (value: number, min: number, max: number): number => {
    const clamped = Math.max(min, Math.min(max, value));
    return ((clamped - min) / (max - min)) * 100;
  };

  const podPosition = calculatePosition(POD, POD_MIN, POD_MAX);
  const pacPosition = calculatePosition(PAC, PAC_MIN, PAC_MAX);
  
  // Sucrose baseline is 1.0, which typically corresponds to ~140-160 per kg
  const SUCROSE_POD = 140;
  const SUCROSE_PAC = 140;
  const sucrosePositionPOD = calculatePosition(SUCROSE_POD, POD_MIN, POD_MAX);
  const sucrosePositionPAC = calculatePosition(SUCROSE_PAC, PAC_MIN, PAC_MAX);

  // Get color based on value range
  const getScaleColor = (value: number, min: number, max: number, baseline: number): string => {
    const normalizedValue = (value - min) / (max - min);
    const normalizedBaseline = (baseline - min) / (max - min);
    const distance = Math.abs(normalizedValue - normalizedBaseline);
    
    if (distance < 0.15) return 'bg-green-500';
    if (distance < 0.30) return 'bg-cyan-500';
    if (distance < 0.50) return 'bg-amber-500';
    return 'bg-teal-500';
  };

  const Scale = ({ 
    label, 
    value, 
    position, 
    description,
    leftLabel,
    rightLabel,
    min,
    max,
    sucrosePosition,
    type
  }: { 
    label: string; 
    value: number; 
    position: number;
    description: string;
    leftLabel: string;
    rightLabel: string;
    min: number;
    max: number;
    sucrosePosition: number;
    type: 'POD' | 'PAC';
  }) => {
    const baseline = type === 'POD' ? SUCROSE_POD : SUCROSE_PAC;
    
    const barH = compact ? 'h-7' : 'h-12';
    const topPad = compact ? 'pt-6' : 'pt-10';
    const titleCls = compact ? 'text-sm font-bold' : 'text-xl font-bold';
    const descCls = compact ? 'text-xs text-gray-600' : 'text-sm text-gray-600';
    const valCls = compact
      ? 'text-lg font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent'
      : 'text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent';
    const bubbleCls = compact
      ? 'px-2 py-0.5 rounded-full font-bold text-white text-xs whitespace-nowrap shadow mb-0.5'
      : 'px-3 py-1 rounded-full font-bold text-white text-lg whitespace-nowrap shadow-lg mb-1';

    return (
      <div className={compact ? 'space-y-2' : 'space-y-3'}>
        <div className="flex justify-between items-baseline gap-2">
          <div className="min-w-0">
            <h3 className={`text-gray-900 ${titleCls}`}>{label}</h3>
            <p className={descCls}>{description}</p>
          </div>
          <div className={`shrink-0 ${valCls}`}>
            {value.toFixed(1)}
          </div>
        </div>
        
        <div className={`relative ${topPad}`}>
          <div className={`${barH} bg-gradient-to-r from-cyan-100 via-amber-100 to-teal-100 rounded-lg border border-gray-300 relative overflow-visible`}>
            <div 
              className="absolute -top-6 bottom-0 w-0.5 bg-gray-400 z-10"
              style={{ left: `${sucrosePosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className={`absolute left-1/2 -translate-x-1/2 font-semibold text-gray-700 whitespace-nowrap ${compact ? '-top-4 text-[10px]' : '-top-6 text-xs'}`}>
                Sucrose ({baseline})
              </div>
            </div>
            
            <div 
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-300 z-20"
              style={{ left: `${position}%`, transform: `translateX(-50%) translateY(-50%)` }}
            >
              <div className="relative flex flex-col items-center">
                <div className={`${bubbleCls} ${getScaleColor(value, min, max, baseline)}`}>
                  {value.toFixed(1)}
                </div>
                <div className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] md:border-l-[10px] md:border-r-[10px] md:border-t-[14px] ${getScaleColor(value, min, max, baseline)}`} />
              </div>
            </div>
          </div>
          
          <div className={`flex justify-between mt-1 font-semibold text-gray-600 ${compact ? 'text-[10px]' : 'text-xs'}`}>
            <span>{leftLabel}</span>
            <span>{rightLabel}</span>
          </div>
          
          <div className={`flex justify-between mt-0.5 text-gray-400 ${compact ? 'text-[10px]' : 'text-xs'}`}>
            <span>{min}</span>
            <span>{Math.round((min + max) / 2)}</span>
            <span>{max}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className={`print-clean-panel bg-white/80 backdrop-blur border-2 shadow-lg ${compact ? 'border shadow-md' : ''}`}>
      <CardHeader className={compact ? 'py-3 pb-2' : ''}>
        <CardTitle className={compact ? 'text-base' : ''}>POD & PAC</CardTitle>
        <CardDescription className={`print:hidden ${compact ? 'text-xs' : ''}`}>
          Sweetness & softness vs sucrose baseline (per kg mix)
        </CardDescription>
      </CardHeader>
      <CardContent className={compact ? 'pt-0' : ''}>
        <div className="hidden print:block border border-gray-800 p-4 text-sm space-y-3 mb-0">
          <p className="font-bold text-gray-900">Sweetness & freezing (per kg of mix)</p>
          <p>
            <span className="font-semibold">POD (sweetness index):</span> {POD.toFixed(2)}{' '}
            <span className="text-gray-600">— ~140 is a common sucrose-relative reference band.</span>
          </p>
          <p>
            <span className="font-semibold">PAC (softness / freezing point):</span> {PAC.toFixed(2)}{' '}
            <span className="text-gray-600">— higher PAC → softer at freezer temperature.</span>
          </p>
        </div>
        <div className={`print:hidden ${compact ? 'space-y-5' : 'space-y-8'}`}>
        <Scale
          label="POD (Power of Dextrose)"
          value={POD}
          position={podPosition}
          description="Relative sweetness"
          leftLabel="Less Sweet"
          rightLabel="More Sweet"
          min={POD_MIN}
          max={POD_MAX}
          sucrosePosition={sucrosePositionPOD}
          type="POD"
        />
        
        <Scale
          label="PAC (Power of Anti-freezing)"
          value={PAC}
          position={pacPosition}
          description="Freezing point depression / softness"
          leftLabel="Harder/Icier"
          rightLabel="Softer/Scoopable"
          min={PAC_MIN}
          max={PAC_MAX}
          sucrosePosition={sucrosePositionPAC}
          type="PAC"
        />
        
        {/* Info box */}
        <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-cyan-50 rounded-lg border border-amber-200">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            📖 Understanding POD & PAC
          </p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li><strong>POD ≈ {SUCROSE_POD} (sucrose baseline):</strong> Standard sweetness</li>
            <li><strong>POD &lt; {SUCROSE_POD}:</strong> Less sweet (e.g., dextrose)</li>
            <li><strong>POD &gt; {SUCROSE_POD}:</strong> Sweeter (e.g., fructose)</li>
            <li className="mt-2"><strong>PAC ≈ {SUCROSE_PAC} (sucrose baseline):</strong> Standard softness</li>
            <li><strong>PAC &gt; {SUCROSE_PAC}:</strong> Softer at freezer temperature (easier to scoop)</li>
            <li><strong>Higher PAC:</strong> More freezing point depression (stays scoopable)</li>
          </ul>
        </div>
        </div>
      </CardContent>
    </Card>
  );
}