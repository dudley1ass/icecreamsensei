import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface PODPACScalesProps {
  POD: number;
  PAC: number;
}

export function PODPACScales({ POD, PAC }: PODPACScalesProps) {
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
    if (distance < 0.30) return 'bg-blue-500';
    if (distance < 0.50) return 'bg-purple-500';
    return 'bg-pink-500';
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
    
    return (
      <div className="space-y-3">
        <div className="flex justify-between items-baseline">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{label}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            {value.toFixed(1)}
          </div>
        </div>
        
        {/* Scale container */}
        <div className="relative pt-10">
          {/* Scale bar background */}
          <div className="h-12 bg-gradient-to-r from-blue-100 via-green-100 to-purple-100 rounded-lg border-2 border-gray-300 relative overflow-visible">
            {/* Sucrose baseline marker */}
            <div 
              className="absolute -top-8 bottom-0 w-0.5 bg-gray-400 z-10"
              style={{ left: `${sucrosePosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-gray-700 whitespace-nowrap">
                Sucrose
              </div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">
                ({baseline})
              </div>
            </div>
            
            {/* Current value indicator */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-300 z-20"
              style={{ left: `${position}%`, transform: `translateX(-50%) translateY(-50%)` }}
            >
              <div className="relative flex flex-col items-center">
                {/* Value label above */}
                <div className={`px-3 py-1 rounded-full font-bold text-white text-lg whitespace-nowrap shadow-lg mb-1 ${getScaleColor(value, min, max, baseline)}`}>
                  {value.toFixed(1)}
                </div>
                {/* Arrow pointing down */}
                <div className={`w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] ${getScaleColor(value, min, max, baseline)}`} />
              </div>
            </div>
          </div>
          
          {/* Scale labels */}
          <div className="flex justify-between mt-2 text-xs font-semibold text-gray-600">
            <span>{leftLabel}</span>
            <span>{rightLabel}</span>
          </div>
          
          {/* Scale numbers */}
          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <span>{min}</span>
            <span>{Math.round((min + max) / 4)}</span>
            <span>{Math.round((min + max) / 2)}</span>
            <span>{Math.round((3 * max + min) / 4)}</span>
            <span>{max}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-white/80 backdrop-blur border-2 shadow-lg">
      <CardHeader>
        <CardTitle>POD & PAC Analysis</CardTitle>
        <CardDescription>Sweetness and softness relative to sucrose baseline (values per kg)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
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
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-purple-200">
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
      </CardContent>
    </Card>
  );
}