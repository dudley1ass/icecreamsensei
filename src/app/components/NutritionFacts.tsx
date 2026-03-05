import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface NutritionFactsProps {
  mass: number;
  fatGrams: number;
  sugarGrams: number;
  msnfGrams: number;
  waterGrams: number;
  otherSolidsGrams: number;
  proteinGrams: number;
  saturatedFatGrams: number;
  transFatGrams: number;
  cholesterolMg: number;
  sodiumMg: number;
  totalCalories: number;
  fiberGrams: number;
  vitaminDMcg: number;
  calciumMg: number;
  ironMg: number;
  potassiumMg: number;
  unitSystem: 'metric' | 'imperial' | 'volumetric';
  totalVolumeML?: number; // Optional: total volume in mL for volumetric mode
}

export function NutritionFacts({
  mass,
  fatGrams,
  sugarGrams,
  msnfGrams,
  waterGrams,
  otherSolidsGrams,
  proteinGrams,
  saturatedFatGrams,
  transFatGrams,
  cholesterolMg,
  sodiumMg,
  totalCalories,
  fiberGrams,
  vitaminDMcg,
  calciumMg,
  ironMg,
  potassiumMg,
  unitSystem,
  totalVolumeML,
}: NutritionFactsProps) {
  // Standard serving size for ice cream: 1/2 cup (about 66g or 100mL)
  const SERVING_SIZE_G = 66;
  const SERVING_SIZE_OZ = 2.33; // 66g in oz
  const SERVING_SIZE_ML = 100; // about 1/2 cup
  
  // Calculate servings based on unit system
  let servingSize = '';
  let servingsPerContainer = 0;
  let servingMultiplier = 1;
  
  if (unitSystem === 'metric') {
    servingSize = `${SERVING_SIZE_G} g (about 1/2 cup)`;
    servingsPerContainer = mass / SERVING_SIZE_G;
    servingMultiplier = SERVING_SIZE_G / mass;
  } else if (unitSystem === 'imperial') {
    servingSize = `${SERVING_SIZE_OZ.toFixed(1)} oz (about 1/2 cup)`;
    servingsPerContainer = (mass / 28.3495) / SERVING_SIZE_OZ;
    servingMultiplier = (SERVING_SIZE_OZ * 28.3495) / mass;
  } else if (unitSystem === 'volumetric' && totalVolumeML) {
    servingSize = `${SERVING_SIZE_ML} mL (1/2 cup)`;
    servingsPerContainer = totalVolumeML / SERVING_SIZE_ML;
    servingMultiplier = SERVING_SIZE_ML / totalVolumeML;
  }
  
  // Handle invalid calculations (prevent NaN and Infinity)
  if (!isFinite(servingsPerContainer) || servingsPerContainer <= 0) {
    servingsPerContainer = 0;
  }
  if (!isFinite(servingMultiplier) || servingMultiplier <= 0) {
    servingMultiplier = 0;
  }
  
  // Calculate lactose (from MSNF) first since we need it for total carbs
  const lactoseGrams = msnfGrams * 0.55; // MSNF is ~55% lactose
  
  // Calculate nutrition for one serving
  const servingFat = fatGrams * servingMultiplier;
  const servingSugar = sugarGrams * servingMultiplier;
  const servingProtein = proteinGrams * servingMultiplier;
  // Total Carbs = Added sugars + Lactose (from milk) + Fiber
  // Note: other_solids contains protein, cocoa solids, minerals, etc. - not all are carbs
  // For ice cream, most carbs come from sugars (added + lactose) and fiber
  const servingCarbs = (sugarGrams + lactoseGrams + fiberGrams) * servingMultiplier;
  const servingSaturatedFat = saturatedFatGrams * servingMultiplier;
  const servingTransFat = transFatGrams * servingMultiplier;
  const servingCholesterol = cholesterolMg * servingMultiplier;
  const servingSodium = sodiumMg * servingMultiplier;
  const servingFiber = fiberGrams * servingMultiplier;
  const servingVitaminD = vitaminDMcg * servingMultiplier;
  const servingCalcium = calciumMg * servingMultiplier;
  const servingIron = ironMg * servingMultiplier;
  const servingPotassium = potassiumMg * servingMultiplier;
  
  // Use actual calories from ingredients if available, otherwise estimate
  const servingCalories = totalCalories > 0 
    ? Math.round(totalCalories * servingMultiplier)
    : Math.round((servingFat * 9) + (servingCarbs * 4) + (servingProtein * 4));
  
  // Calculate total sugars for display (lactose already calculated above)
  const totalSugarsWithLactose = sugarGrams + lactoseGrams;
  const servingTotalSugars = totalSugarsWithLactose * servingMultiplier;
  const servingAddedSugars = sugarGrams * servingMultiplier; // Only added sweeteners

  return (
    <Card className="bg-white border-2 border-black max-w-md">
      <CardHeader className="border-b-8 border-black pb-2">
        <CardTitle className="text-3xl font-black">Nutrition Facts</CardTitle>
        <div className="text-sm mt-1">
          <span className="font-semibold">Servings per container:</span> {servingsPerContainer.toFixed(1)}
        </div>
        <div className="border-t-4 border-black pt-2 mt-2">
          <div className="text-sm font-semibold">Serving size</div>
          <div className="text-lg font-bold">{servingSize}</div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-1 font-sans">
        <div className="border-t-8 border-black pt-2" />
        
        {/* Amount per serving */}
        <div className="text-xs font-bold mb-2">Amount per serving</div>
        
        {/* Calories */}
        <div className="flex justify-between items-baseline font-bold text-3xl">
          <span>Calories</span>
          <span>{servingCalories}</span>
        </div>
        
        <div className="border-t-4 border-black pt-2 mt-2" />
        
        {/* Daily Value header */}
        <div className="text-xs font-bold text-right">% Daily Value*</div>
        
        <div className="border-t border-gray-300 pt-1" />
        
        {/* Total Fat */}
        <div className="flex justify-between items-baseline">
          <span className="font-bold">Total Fat <span className="font-normal">{servingFat.toFixed(1)}g</span></span>
          <span className="font-bold">{((servingFat / 78) * 100).toFixed(0)}%</span>
        </div>
        
        <div className="border-t border-gray-200 pt-1" />
        
        {/* Saturated Fat (indented) */}
        <div className="flex justify-between items-baseline pl-4">
          <span>Saturated Fat <span className="font-normal">{servingSaturatedFat.toFixed(1)}g</span></span>
          <span className="font-bold">{((servingSaturatedFat / 20) * 100).toFixed(0)}%</span>
        </div>
        
        <div className="border-t border-gray-200 pt-1" />
        
        {/* Trans Fat (indented) */}
        <div className="flex justify-between items-baseline pl-4">
          <span><em>Trans</em> Fat <span className="font-normal">{servingTransFat.toFixed(1)}g</span></span>
          <span></span>
        </div>
        
        <div className="border-t border-gray-300 pt-1" />
        
        {/* Cholesterol */}
        <div className="flex justify-between items-baseline">
          <span className="font-bold">Cholesterol <span className="font-normal">{servingCholesterol.toFixed(0)}mg</span></span>
          <span className="font-bold">{((servingCholesterol / 300) * 100).toFixed(0)}%</span>
        </div>
        
        <div className="border-t border-gray-300 pt-1" />
        
        {/* Sodium */}
        <div className="flex justify-between items-baseline">
          <span className="font-bold">Sodium <span className="font-normal">{servingSodium.toFixed(0)}mg</span></span>
          <span className="font-bold">{((servingSodium / 2300) * 100).toFixed(0)}%</span>
        </div>
        
        <div className="border-t border-gray-300 pt-1" />
        
        {/* Total Carbohydrate */}
        <div className="flex justify-between items-baseline">
          <span className="font-bold">Total Carbohydrate <span className="font-normal">{servingCarbs.toFixed(1)}g</span></span>
          <span className="font-bold">{((servingCarbs / 275) * 100).toFixed(0)}%</span>
        </div>
        
        <div className="border-t border-gray-200 pt-1" />
        
        {/* Dietary Fiber (indented) */}
        <div className="flex justify-between items-baseline pl-4">
          <span>Dietary Fiber <span className="font-normal">{servingFiber.toFixed(1)}g</span></span>
          <span className="font-bold">{((servingFiber / 28) * 100).toFixed(0)}%</span>
        </div>
        
        <div className="border-t border-gray-200 pt-1" />
        
        {/* Total Sugars (indented) */}
        <div className="flex justify-between items-baseline pl-4">
          <span>Total Sugars <span className="font-normal">{servingTotalSugars.toFixed(1)}g</span></span>
          <span></span>
        </div>
        
        <div className="border-t border-gray-200 pt-1" />
        
        {/* Added Sugars (double indented) */}
        <div className="flex justify-between items-baseline pl-8">
          <span>Includes {servingAddedSugars.toFixed(1)}g Added Sugars</span>
          <span className="font-bold">{((servingAddedSugars / 50) * 100).toFixed(0)}%</span>
        </div>
        
        <div className="border-t border-gray-300 pt-1" />
        
        {/* Protein */}
        <div className="flex justify-between items-baseline">
          <span className="font-bold">Protein <span className="font-normal">{servingProtein.toFixed(1)}g</span></span>
          <span></span>
        </div>
        
        <div className="border-t-8 border-black pt-3 mt-2" />
        
        {/* Micronutrients section */}
        <div className="flex justify-between items-baseline">
          <span>Vitamin D <span className="font-normal">{servingVitaminD.toFixed(1)}mcg</span></span>
          <span className="font-bold">{((servingVitaminD / 20) * 100).toFixed(0)}%</span>
        </div>
        
        <div className="border-t border-gray-300 pt-1" />
        
        <div className="flex justify-between items-baseline">
          <span>Calcium <span className="font-normal">{servingCalcium.toFixed(0)}mg</span></span>
          <span className="font-bold">{((servingCalcium / 1300) * 100).toFixed(0)}%</span>
        </div>
        
        <div className="border-t border-gray-300 pt-1" />
        
        <div className="flex justify-between items-baseline">
          <span>Iron <span className="font-normal">{servingIron.toFixed(1)}mg</span></span>
          <span className="font-bold">{((servingIron / 18) * 100).toFixed(0)}%</span>
        </div>
        
        <div className="border-t border-gray-300 pt-1" />
        
        <div className="flex justify-between items-baseline">
          <span>Potassium <span className="font-normal">{servingPotassium.toFixed(0)}mg</span></span>
          <span className="font-bold">{((servingPotassium / 4700) * 100).toFixed(0)}%</span>
        </div>
        
        <div className="border-t-4 border-black pt-2 mt-1" />
        
        {/* Daily Value note */}
        <div className="text-xs text-gray-600 pt-2">
          * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 
          2,000 calories a day is used for general nutrition advice.
        </div>
        
        <div className="border-t border-gray-300 pt-2 mt-2" />
        
        <div className="text-xs text-gray-600 pt-2">
          ** Values calculated from ingredient database. Use exact product labels for nutrition label accuracy.
        </div>
      </CardContent>
    </Card>
  );
}