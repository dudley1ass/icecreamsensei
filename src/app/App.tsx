import { useState, useEffect } from 'react';
import { Plus, RotateCcw, X, Droplet, Cookie, FlaskConical, Weight, Apple, Candy, Nut, Beef, Droplets, Sparkles, ArrowLeft } from 'lucide-react';
import { IceCreamTypeSelector } from './components/IceCreamTypeSelector';
import { iceCreamCategories, IceCreamCategory, IceCreamRecipe } from './types/iceCreamTypes';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './components/ui/select';
import { Input } from './components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Label } from './components/ui/label';
import { NutritionFacts } from './components/NutritionFacts';
import { PODPACScales } from './components/PODPACScales';
import { PrintRecipeCard } from './components/PrintRecipeCard';


// Ingredient composition fractions by weight (0-1)
interface IngredientProfile {
  label: string;
  fat: number;
  msnf: number;
  sugar: number;
  other_solids: number;
  water: number;
  protein: number;
  category: string;
  notes: string;
  density: number; // g/mL for volumetric conversions
  volumetricUnit: 'cup' | 'tbsp' | 'tsp'; // preferred volumetric unit
  // Additional nutrition fields (per 100g)
  saturated_fat?: number; // g per 100g
  trans_fat?: number; // g per 100g
  cholesterol?: number; // mg per 100g
  sodium?: number; // mg per 100g
  calories?: number; // kcal per 100g
  fiber?: number; // g per 100g
  vitamin_d?: number; // mcg per 100g
  calcium?: number; // mg per 100g
  iron?: number; // mg per 100g
  potassium?: number; // mg per 100g
}

const INGREDIENTS: Record<string, IngredientProfile> = {
  // DAIRY
  whole_milk: { label: 'Whole milk', fat: 0.0325, msnf: 0.087, sugar: 0.0, other_solids: 0.0, water: 0.8805, protein: 0.033, category: 'Dairy', notes: '~3.25% fat', density: 1.03, volumetricUnit: 'cup', saturated_fat: 1.865, trans_fat: 0, cholesterol: 12, sodium: 43, calories: 61, fiber: 0, vitamin_d: 1.3, calcium: 113, iron: 0.03, potassium: 132 },
  skim_milk: { label: 'Skim milk', fat: 0.001, msnf: 0.090, sugar: 0.0, other_solids: 0.0, water: 0.909, protein: 0.034, category: 'Dairy', notes: 'low fat', density: 1.03, volumetricUnit: 'cup' },
  half_and_half: { label: 'Half & half', fat: 0.12, msnf: 0.075, sugar: 0.0, other_solids: 0.0, water: 0.805, protein: 0.031, category: 'Dairy', notes: '~12% fat', density: 1.01, volumetricUnit: 'cup' },
  heavy_cream_36: { label: 'Heavy cream (36%)', fat: 0.36, msnf: 0.056, sugar: 0.0, other_solids: 0.0, water: 0.584, protein: 0.022, category: 'Dairy', notes: 'premium base', density: 0.99, volumetricUnit: 'cup', saturated_fat: 23, trans_fat: 0, cholesterol: 137, sodium: 38, calories: 345, fiber: 0, vitamin_d: 1.2, calcium: 65, iron: 0.03, potassium: 75 },
  heavy_cream_40: { label: 'Heavy cream (40%)', fat: 0.40, msnf: 0.050, sugar: 0.0, other_solids: 0.0, water: 0.550, protein: 0.020, category: 'Dairy', notes: 'extra rich', density: 0.98, volumetricUnit: 'cup' },
  buttermilk: { label: 'Buttermilk', fat: 0.01, msnf: 0.085, sugar: 0.0, other_solids: 0.0, water: 0.905, protein: 0.034, category: 'Dairy', notes: 'tangy flavor', density: 1.03, volumetricUnit: 'cup' },
  sour_cream: { label: 'Sour cream', fat: 0.20, msnf: 0.05, sugar: 0.0, other_solids: 0.0, water: 0.75, protein: 0.025, category: 'Dairy', notes: 'adds tang', density: 1.01, volumetricUnit: 'cup' },
  cream_cheese: { label: 'Cream cheese', fat: 0.34, msnf: 0.05, sugar: 0.0, other_solids: 0.02, water: 0.54, protein: 0.055, category: 'Dairy', notes: 'rich and thick', density: 1.02, volumetricUnit: 'tbsp' },
  condensed_milk: { label: 'Sweetened condensed milk', fat: 0.09, msnf: 0.08, sugar: 0.55, other_solids: 0.0, water: 0.28, protein: 0.078, category: 'Dairy', notes: 'pre-sweetened', density: 1.31, volumetricUnit: 'cup' },
  evaporated_milk: { label: 'Evaporated milk', fat: 0.08, msnf: 0.18, sugar: 0.0, other_solids: 0.0, water: 0.74, protein: 0.068, category: 'Dairy', notes: 'concentrated', density: 1.04, volumetricUnit: 'cup' },

  // DRY MILK SOLIDS
  skim_milk_powder: { label: 'Skim milk powder (SMP)', fat: 0.008, msnf: 0.962, sugar: 0.0, other_solids: 0.0, water: 0.03, protein: 0.360, category: 'Milk solids', notes: 'boost MSNF/body', density: 0.47, volumetricUnit: 'tbsp', saturated_fat: 0.5, trans_fat: 0, cholesterol: 18, sodium: 535, calories: 362, fiber: 0, vitamin_d: 4.0, calcium: 1257, iron: 0.05, potassium: 1705 },
  whole_milk_powder: { label: 'Whole milk powder', fat: 0.27, msnf: 0.68, sugar: 0.0, other_solids: 0.0, water: 0.03, protein: 0.260, category: 'Milk solids', notes: 'full fat powder', density: 0.6, volumetricUnit: 'tbsp' },
  whey_powder: { label: 'Whey powder', fat: 0.01, msnf: 0.93, sugar: 0.0, other_solids: 0.0, water: 0.06, protein: 0.130, category: 'Milk solids', notes: 'rough profile', density: 0.5, volumetricUnit: 'tbsp' },
  lactose: { label: 'Lactose powder', fat: 0.0, msnf: 0.98, sugar: 0.0, other_solids: 0.0, water: 0.02, protein: 0.0, category: 'Milk solids', notes: 'milk sugar', density: 0.5, volumetricUnit: 'tbsp' },

  // SWEETENERS (Natural & Refined)
  sucrose: { label: 'Sugar (sucrose/white sugar)', fat: 0, msnf: 0, sugar: 1.0, other_solids: 0, water: 0, protein: 0, category: 'Sweetener', notes: 'baseline sweetness', density: 0.85, volumetricUnit: 'cup', saturated_fat: 0, trans_fat: 0, cholesterol: 0, sodium: 1, calories: 387, fiber: 0, vitamin_d: 0, calcium: 1, iron: 0.01, potassium: 2 },
  brown_sugar: { label: 'Brown sugar', fat: 0, msnf: 0, sugar: 0.98, other_solids: 0.02, water: 0, protein: 0, category: 'Sweetener', notes: 'molasses flavor', density: 0.90, volumetricUnit: 'cup' },
  dextrose: { label: 'Dextrose (glucose)', fat: 0, msnf: 0, sugar: 1.0, other_solids: 0, water: 0, protein: 0, category: 'Sweetener', notes: 'less sweet, softer', density: 0.85, volumetricUnit: 'tbsp' },
  fructose: { label: 'Fructose', fat: 0, msnf: 0, sugar: 1.0, other_solids: 0, water: 0, protein: 0, category: 'Sweetener', notes: 'very sweet', density: 0.85, volumetricUnit: 'tbsp' },
  corn_syrup_solids: { label: 'Corn syrup solids', fat: 0, msnf: 0, sugar: 1.0, other_solids: 0, water: 0, protein: 0, category: 'Sweetener', notes: 'body/anti-ice', density: 0.70, volumetricUnit: 'tbsp' },
  corn_syrup_liquid: { label: 'Corn syrup (liquid)', fat: 0, msnf: 0, sugar: 0.76, other_solids: 0, water: 0.24, protein: 0, category: 'Sweetener', notes: 'smooth texture', density: 1.38, volumetricUnit: 'cup' },
  invert_sugar: { label: 'Invert sugar', fat: 0, msnf: 0, sugar: 1.0, other_solids: 0, water: 0, protein: 0, category: 'Sweetener', notes: 'smooth texture', density: 1.40, volumetricUnit: 'cup' },
  honey: { label: 'Honey', fat: 0, msnf: 0, sugar: 0.82, other_solids: 0, water: 0.18, protein: 0.003, category: 'Sweetener', notes: 'floral notes', density: 1.42, volumetricUnit: 'tbsp' },
  maple_syrup: { label: 'Maple syrup', fat: 0, msnf: 0, sugar: 0.67, other_solids: 0, water: 0.33, protein: 0.001, category: 'Sweetener', notes: 'distinctive flavor', density: 1.33, volumetricUnit: 'cup' },
  agave_nectar: { label: 'Agave nectar', fat: 0, msnf: 0, sugar: 0.76, other_solids: 0, water: 0.24, protein: 0, category: 'Sweetener', notes: 'high fructose', density: 1.36, volumetricUnit: 'tbsp' },
  molasses: { label: 'Molasses', fat: 0, msnf: 0, sugar: 0.74, other_solids: 0.02, water: 0.24, protein: 0, category: 'Sweetener', notes: 'robust flavor', density: 1.40, volumetricUnit: 'tbsp' },

  // FRUIT (Fresh & Purees)
  strawberry_puree: { label: 'Strawberry puree', fat: 0.003, msnf: 0.0, sugar: 0.049, other_solids: 0.008, water: 0.91, protein: 0.007, category: 'Fruit', notes: 'natural fruit sugars', density: 1.00, volumetricUnit: 'cup' },
  strawberry_fresh: { label: 'Strawberries (fresh, diced)', fat: 0.003, msnf: 0.0, sugar: 0.049, other_solids: 0.018, water: 0.91, protein: 0.007, category: 'Fruit', notes: 'with texture', density: 0.58, volumetricUnit: 'cup' },
  blueberry_puree: { label: 'Blueberry puree', fat: 0.003, msnf: 0.0, sugar: 0.10, other_solids: 0.007, water: 0.84, protein: 0.007, category: 'Fruit', notes: 'antioxidant rich', density: 1.00, volumetricUnit: 'cup' },
  blueberry_fresh: { label: 'Blueberries (fresh)', fat: 0.003, msnf: 0.0, sugar: 0.10, other_solids: 0.027, water: 0.84, protein: 0.007, category: 'Fruit', notes: 'whole berries', density: 0.67, volumetricUnit: 'cup' },
  raspberry_puree: { label: 'Raspberry puree', fat: 0.007, msnf: 0.0, sugar: 0.044, other_solids: 0.069, water: 0.86, protein: 0.012, category: 'Fruit', notes: 'high fiber', density: 1.00, volumetricUnit: 'cup' },
  raspberry_fresh: { label: 'Raspberries (fresh)', fat: 0.007, msnf: 0.0, sugar: 0.044, other_solids: 0.069, water: 0.86, protein: 0.012, category: 'Fruit', notes: 'seedy texture', density: 0.54, volumetricUnit: 'cup' },
  blackberry_puree: { label: 'Blackberry puree', fat: 0.005, msnf: 0.0, sugar: 0.049, other_solids: 0.056, water: 0.88, protein: 0.014, category: 'Fruit', notes: 'deep flavor', density: 1.00, volumetricUnit: 'cup' },
  mango_puree: { label: 'Mango puree', fat: 0.004, msnf: 0.0, sugar: 0.14, other_solids: 0.016, water: 0.83, protein: 0.008, category: 'Fruit', notes: 'tropical', density: 1.00, volumetricUnit: 'cup' },
  mango_fresh: { label: 'Mango (fresh, diced)', fat: 0.004, msnf: 0.0, sugar: 0.14, other_solids: 0.026, water: 0.83, protein: 0.008, category: 'Fruit', notes: 'chunky', density: 0.59, volumetricUnit: 'cup' },
  banana_mashed: { label: 'Banana (mashed)', fat: 0.003, msnf: 0.0, sugar: 0.12, other_solids: 0.027, water: 0.75, protein: 0.011, category: 'Fruit', notes: 'creamy texture', density: 0.60, volumetricUnit: 'cup' },
  peach_puree: { label: 'Peach puree', fat: 0.003, msnf: 0.0, sugar: 0.086, other_solids: 0.015, water: 0.89, protein: 0.009, category: 'Fruit', notes: 'summer fruit', density: 1.00, volumetricUnit: 'cup' },
  cherry_puree: { label: 'Cherry puree', fat: 0.002, msnf: 0.0, sugar: 0.128, other_solids: 0.016, water: 0.82, protein: 0.010, category: 'Fruit', notes: 'tart and sweet', density: 1.00, volumetricUnit: 'cup' },
  cherry_fresh: { label: 'Cherries (pitted, chopped)', fat: 0.002, msnf: 0.0, sugar: 0.128, other_solids: 0.026, water: 0.82, protein: 0.010, category: 'Fruit', notes: 'with texture', density: 0.63, volumetricUnit: 'cup' },
  pineapple_puree: { label: 'Pineapple puree', fat: 0.001, msnf: 0.0, sugar: 0.099, other_solids: 0.014, water: 0.86, protein: 0.005, category: 'Fruit', notes: 'tropical tang', density: 1.00, volumetricUnit: 'cup' },
  coconut_puree: { label: 'Coconut puree', fat: 0.33, msnf: 0.0, sugar: 0.06, other_solids: 0.09, water: 0.47, protein: 0.033, category: 'Fruit', notes: 'high fat fruit', density: 0.90, volumetricUnit: 'cup' },
  lemon_juice: { label: 'Lemon juice', fat: 0.002, msnf: 0.0, sugar: 0.025, other_solids: 0.003, water: 0.92, protein: 0.004, category: 'Fruit', notes: 'acid/brightness', density: 1.03, volumetricUnit: 'tbsp' },
  lime_juice: { label: 'Lime juice', fat: 0.001, msnf: 0.0, sugar: 0.017, other_solids: 0.002, water: 0.93, protein: 0.004, category: 'Fruit', notes: 'tart citrus', density: 1.02, volumetricUnit: 'tbsp' },
  orange_juice: { label: 'Orange juice', fat: 0.002, msnf: 0.0, sugar: 0.086, other_solids: 0.005, water: 0.88, protein: 0.007, category: 'Fruit', notes: 'citrus flavor', density: 1.04, volumetricUnit: 'cup' },
  passion_fruit_puree: { label: 'Passion fruit puree', fat: 0.007, msnf: 0.0, sugar: 0.11, other_solids: 0.103, water: 0.73, protein: 0.022, category: 'Fruit', notes: 'intense flavor', density: 1.00, volumetricUnit: 'cup' },
  kiwi_puree: { label: 'Kiwi puree', fat: 0.005, msnf: 0.0, sugar: 0.090, other_solids: 0.030, water: 0.83, protein: 0.011, category: 'Fruit', notes: 'bright green', density: 1.00, volumetricUnit: 'cup' },
  watermelon_puree: { label: 'Watermelon puree', fat: 0.002, msnf: 0.0, sugar: 0.062, other_solids: 0.004, water: 0.91, protein: 0.006, category: 'Fruit', notes: 'summer fruit', density: 1.00, volumetricUnit: 'cup' },
  cantaloupe_puree: { label: 'Cantaloupe puree', fat: 0.002, msnf: 0.0, sugar: 0.079, other_solids: 0.009, water: 0.90, protein: 0.008, category: 'Fruit', notes: 'melon flavor', density: 1.00, volumetricUnit: 'cup' },
  honeydew_puree: { label: 'Honeydew puree', fat: 0.001, msnf: 0.0, sugar: 0.081, other_solids: 0.008, water: 0.90, protein: 0.005, category: 'Fruit', notes: 'sweet melon', density: 1.00, volumetricUnit: 'cup' },
  apricot_puree: { label: 'Apricot puree', fat: 0.004, msnf: 0.0, sugar: 0.093, other_solids: 0.017, water: 0.86, protein: 0.014, category: 'Fruit', notes: 'stone fruit', density: 1.00, volumetricUnit: 'cup' },
  plum_puree: { label: 'Plum puree', fat: 0.003, msnf: 0.0, sugar: 0.099, other_solids: 0.014, water: 0.87, protein: 0.007, category: 'Fruit', notes: 'tart & sweet', density: 1.00, volumetricUnit: 'cup' },
  fig_paste: { label: 'Fig paste', fat: 0.003, msnf: 0.0, sugar: 0.48, other_solids: 0.097, water: 0.30, protein: 0.034, category: 'Fruit', notes: 'concentrated', density: 1.20, volumetricUnit: 'tbsp' },
  cranberry_sauce: { label: 'Cranberry sauce', fat: 0.001, msnf: 0.0, sugar: 0.35, other_solids: 0.009, water: 0.61, protein: 0.002, category: 'Fruit', notes: 'sweetened', density: 1.15, volumetricUnit: 'cup' },
  grape_puree: { label: 'Grape puree (concord)', fat: 0.002, msnf: 0.0, sugar: 0.154, other_solids: 0.006, water: 0.81, protein: 0.007, category: 'Fruit', notes: 'intense grape', density: 1.00, volumetricUnit: 'cup' },
  pear_puree: { label: 'Pear puree', fat: 0.001, msnf: 0.0, sugar: 0.097, other_solids: 0.032, water: 0.84, protein: 0.004, category: 'Fruit', notes: 'delicate flavor', density: 1.00, volumetricUnit: 'cup' },
  
  // CHOCOLATE & COCOA
  cocoa_powder: { label: 'Cocoa powder (unsweetened)', fat: 0.14, msnf: 0.0, sugar: 0.0, other_solids: 0.83, water: 0.03, protein: 0.195, category: 'Chocolate', notes: 'pure cocoa', density: 0.52, volumetricUnit: 'tbsp' },
  dark_chocolate_70: { label: 'Dark chocolate (70% cacao)', fat: 0.43, msnf: 0.0, sugar: 0.24, other_solids: 0.32, water: 0.01, protein: 0.078, category: 'Chocolate', notes: 'intense chocolate', density: 1.25, volumetricUnit: 'tbsp' },
  dark_chocolate_85: { label: 'Dark chocolate (85% cacao)', fat: 0.48, msnf: 0.0, sugar: 0.14, other_solids: 0.37, water: 0.01, protein: 0.105, category: 'Chocolate', notes: 'very dark', density: 1.25, volumetricUnit: 'tbsp' },
  milk_chocolate: { label: 'Milk chocolate', fat: 0.32, msnf: 0.08, sugar: 0.52, other_solids: 0.07, water: 0.01, protein: 0.073, category: 'Chocolate', notes: 'sweet & creamy', density: 1.22, volumetricUnit: 'tbsp' },
  white_chocolate: { label: 'White chocolate', fat: 0.32, msnf: 0.09, sugar: 0.59, other_solids: 0.0, water: 0.01, protein: 0.059, category: 'Chocolate', notes: 'no cocoa solids', density: 1.20, volumetricUnit: 'tbsp' },
  chocolate_chips: { label: 'Chocolate chips (semi-sweet)', fat: 0.30, msnf: 0.0, sugar: 0.50, other_solids: 0.19, water: 0.01, protein: 0.043, category: 'Chocolate', notes: 'chunks/texture', density: 0.64, volumetricUnit: 'cup' },
  chocolate_syrup: { label: 'Chocolate syrup', fat: 0.01, msnf: 0.0, sugar: 0.56, other_solids: 0.09, water: 0.34, protein: 0.010, category: 'Chocolate', notes: 'liquid sweetener', density: 1.37, volumetricUnit: 'tbsp' },
  nutella: { label: 'Nutella/hazelnut spread', fat: 0.31, msnf: 0.0, sugar: 0.57, other_solids: 0.08, water: 0.04, protein: 0.064, category: 'Chocolate', notes: 'chocolate hazelnut', density: 1.25, volumetricUnit: 'tbsp' },
  mini_chocolate_chips: { label: 'Mini chocolate chips', fat: 0.30, msnf: 0.0, sugar: 0.50, other_solids: 0.19, water: 0.01, protein: 0.043, category: 'Chocolate', notes: 'smaller pieces', density: 0.64, volumetricUnit: 'cup' },
  white_chocolate_chips: { label: 'White chocolate chips', fat: 0.32, msnf: 0.09, sugar: 0.59, other_solids: 0.0, water: 0.01, protein: 0.059, category: 'Chocolate', notes: 'sweet chunks', density: 0.62, volumetricUnit: 'cup' },
  dark_chocolate_chunks: { label: 'Dark chocolate chunks', fat: 0.43, msnf: 0.0, sugar: 0.24, other_solids: 0.32, water: 0.01, protein: 0.078, category: 'Chocolate', notes: 'big pieces', density: 0.64, volumetricUnit: 'cup' },
  cocoa_nibs: { label: 'Cocoa nibs', fat: 0.54, msnf: 0.0, sugar: 0.01, other_solids: 0.43, water: 0.02, protein: 0.140, category: 'Chocolate', notes: 'crunchy bitter', density: 0.55, volumetricUnit: 'cup' },

  // MIX-INS & CANDIES
  peanut_butter_chips: { label: 'Peanut butter chips', fat: 0.25, msnf: 0.0, sugar: 0.50, other_solids: 0.24, water: 0.01, protein: 0.070, category: 'Mix-ins', notes: 'PB flavor', density: 0.60, volumetricUnit: 'cup' },
  butterscotch_chips: { label: 'Butterscotch chips', fat: 0.08, msnf: 0.0, sugar: 0.65, other_solids: 0.26, water: 0.01, protein: 0.005, category: 'Mix-ins', notes: 'buttery sweet', density: 0.58, volumetricUnit: 'cup' },
  cinnamon_chips: { label: 'Cinnamon chips', fat: 0.10, msnf: 0.0, sugar: 0.62, other_solids: 0.27, water: 0.01, protein: 0.005, category: 'Mix-ins', notes: 'spiced sweet', density: 0.58, volumetricUnit: 'cup' },
  toffee_bits: { label: 'Toffee bits (Heath)', fat: 0.18, msnf: 0.05, sugar: 0.62, other_solids: 0.14, water: 0.01, protein: 0.015, category: 'Mix-ins', notes: 'buttery crunch', density: 0.50, volumetricUnit: 'cup' },
  rainbow_sprinkles: { label: 'Rainbow sprinkles', fat: 0.03, msnf: 0.0, sugar: 0.82, other_solids: 0.14, water: 0.01, protein: 0.002, category: 'Mix-ins', notes: 'colorful', density: 0.70, volumetricUnit: 'cup' },
  chocolate_sprinkles: { label: 'Chocolate sprinkles (jimmies)', fat: 0.05, msnf: 0.0, sugar: 0.72, other_solids: 0.22, water: 0.01, protein: 0.015, category: 'Mix-ins', notes: 'chocolate color', density: 0.68, volumetricUnit: 'cup' },
  marshmallow_mini: { label: 'Mini marshmallows', fat: 0.0, msnf: 0.0, sugar: 0.79, other_solids: 0.02, water: 0.17, protein: 0.018, category: 'Mix-ins', notes: 'fluffy sweet', density: 0.21, volumetricUnit: 'cup' },
  marshmallow_fluff: { label: 'Marshmallow fluff', fat: 0.0, msnf: 0.0, sugar: 0.63, other_solids: 0.01, water: 0.21, protein: 0.005, category: 'Mix-ins', notes: 'smooth spread', density: 0.95, volumetricUnit: 'cup' },
  cookie_dough_chunks: { label: 'Cookie dough chunks', fat: 0.18, msnf: 0.0, sugar: 0.48, other_solids: 0.28, water: 0.05, protein: 0.040, category: 'Mix-ins', notes: 'raw dough bits', density: 0.85, volumetricUnit: 'cup' },
  brownie_chunks: { label: 'Brownie chunks', fat: 0.15, msnf: 0.0, sugar: 0.42, other_solids: 0.38, water: 0.04, protein: 0.045, category: 'Mix-ins', notes: 'fudgy pieces', density: 0.75, volumetricUnit: 'cup' },
  oreo_crushed: { label: 'Oreo cookies (crushed)', fat: 0.18, msnf: 0.0, sugar: 0.40, other_solids: 0.40, water: 0.02, protein: 0.040, category: 'Mix-ins', notes: 'cookies & cream', density: 0.45, volumetricUnit: 'cup' },
  graham_cracker_crumbs: { label: 'Graham cracker crumbs', fat: 0.10, msnf: 0.0, sugar: 0.35, other_solids: 0.53, water: 0.02, protein: 0.064, category: 'Mix-ins', notes: 'pie crust', density: 0.48, volumetricUnit: 'cup' },
  caramel_sauce: { label: 'Caramel sauce', fat: 0.05, msnf: 0.03, sugar: 0.60, other_solids: 0.02, water: 0.30, protein: 0.012, category: 'Mix-ins', notes: 'swirl/ribbon', density: 1.30, volumetricUnit: 'tbsp' },
  caramel_bits: { label: 'Caramel bits (hard)', fat: 0.08, msnf: 0.05, sugar: 0.75, other_solids: 0.11, water: 0.01, protein: 0.015, category: 'Mix-ins', notes: 'chewy chunks', density: 0.55, volumetricUnit: 'cup' },
  fudge_sauce: { label: 'Hot fudge sauce', fat: 0.08, msnf: 0.02, sugar: 0.52, other_solids: 0.13, water: 0.25, protein: 0.015, category: 'Mix-ins', notes: 'chocolate ribbon', density: 1.35, volumetricUnit: 'tbsp' },
  dulce_de_leche: { label: 'Dulce de leche', fat: 0.07, msnf: 0.08, sugar: 0.55, other_solids: 0.02, water: 0.28, protein: 0.062, category: 'Mix-ins', notes: 'caramelized milk', density: 1.32, volumetricUnit: 'tbsp' },
  m_and_m_minis: { label: 'M&M minis', fat: 0.20, msnf: 0.05, sugar: 0.64, other_solids: 0.10, water: 0.01, protein: 0.038, category: 'Mix-ins', notes: 'candy coated', density: 0.72, volumetricUnit: 'cup' },
  reeses_pieces: { label: "Reese's Pieces", fat: 0.21, msnf: 0.0, sugar: 0.58, other_solids: 0.19, water: 0.01, protein: 0.085, category: 'Mix-ins', notes: 'PB candy', density: 0.68, volumetricUnit: 'cup' },
  mini_peanut_butter_cups: { label: 'Mini peanut butter cups', fat: 0.28, msnf: 0.03, sugar: 0.52, other_solids: 0.15, water: 0.01, protein: 0.073, category: 'Mix-ins', notes: 'chocolate PB', density: 0.60, volumetricUnit: 'cup' },

  // EGGS
  egg_yolk: { label: 'Egg yolk', fat: 0.33, msnf: 0.0, sugar: 0.0, other_solids: 0.17, water: 0.50, protein: 0.158, category: 'Emulsifier', notes: 'custard style', density: 1.03, volumetricUnit: 'tbsp', saturated_fat: 10.3, trans_fat: 0, cholesterol: 1234, sodium: 48, calories: 322, fiber: 0, vitamin_d: 5.4, calcium: 129, iron: 2.73, potassium: 109 },
  whole_egg: { label: 'Whole egg', fat: 0.10, msnf: 0.0, sugar: 0.0, other_solids: 0.13, water: 0.76, protein: 0.126, category: 'Emulsifier', notes: 'full egg', density: 1.03, volumetricUnit: 'cup' },

  // PROTEIN POWDERS
  whey_protein: { label: 'Whey protein isolate', fat: 0.01, msnf: 0.0, sugar: 0.02, other_solids: 0.95, water: 0.04, protein: 0.900, category: 'Protein powder', notes: 'high protein', density: 0.35, volumetricUnit: 'tbsp' },
  whey_protein_concentrate: { label: 'Whey protein concentrate', fat: 0.04, msnf: 0.0, sugar: 0.05, other_solids: 0.85, water: 0.05, protein: 0.750, category: 'Protein powder', notes: 'moderate protein', density: 0.37, volumetricUnit: 'tbsp' },
  casein_protein: { label: 'Casein protein', fat: 0.02, msnf: 0.0, sugar: 0.02, other_solids: 0.90, water: 0.05, protein: 0.800, category: 'Protein powder', notes: 'slow-digesting', density: 0.36, volumetricUnit: 'tbsp' },
  pea_protein: { label: 'Pea protein', fat: 0.06, msnf: 0.0, sugar: 0.01, other_solids: 0.88, water: 0.05, protein: 0.800, category: 'Protein powder', notes: 'plant-based', density: 0.40, volumetricUnit: 'tbsp' },
  soy_protein: { label: 'Soy protein isolate', fat: 0.01, msnf: 0.0, sugar: 0.02, other_solids: 0.92, water: 0.05, protein: 0.900, category: 'Protein powder', notes: 'plant-based', density: 0.32, volumetricUnit: 'tbsp' },
  collagen_powder: { label: 'Collagen powder', fat: 0.0, msnf: 0.0, sugar: 0.0, other_solids: 0.98, water: 0.02, protein: 0.900, category: 'Protein powder', notes: 'unflavored', density: 0.38, volumetricUnit: 'tbsp' },

  // STABILIZERS & GUMS
  instant_pudding_mix: { label: 'Instant pudding mix (generic)', fat: 0.0, msnf: 0.0, sugar: 0.65, other_solids: 0.35, water: 0.0, protein: 0.002, category: 'Stabilizer/Mix', notes: 'convenience mix', density: 0.55, volumetricUnit: 'tbsp' },
  xanthan_gum: { label: 'Xanthan gum', fat: 0.0, msnf: 0.0, sugar: 0.0, other_solids: 1.0, water: 0.0, protein: 0.0, category: 'Stabilizer/Mix', notes: 'powerful thickener', density: 0.60, volumetricUnit: 'tsp' },
  guar_gum: { label: 'Guar gum', fat: 0.0, msnf: 0.0, sugar: 0.0, other_solids: 1.0, water: 0.0, protein: 0.050, category: 'Stabilizer/Mix', notes: 'thickener', density: 0.65, volumetricUnit: 'tsp' },
  carrageenan: { label: 'Carrageenan', fat: 0.0, msnf: 0.0, sugar: 0.0, other_solids: 1.0, water: 0.0, protein: 0.0, category: 'Stabilizer/Mix', notes: 'seaweed extract', density: 0.60, volumetricUnit: 'tsp' },
  locust_bean_gum: { label: 'Locust bean gum (LBG)', fat: 0.0, msnf: 0.0, sugar: 0.0, other_solids: 1.0, water: 0.0, protein: 0.0, category: 'Stabilizer/Mix', notes: 'natural thickener', density: 0.55, volumetricUnit: 'tsp' },
  gelatin: { label: 'Gelatin powder', fat: 0.0, msnf: 0.0, sugar: 0.0, other_solids: 0.98, water: 0.15, protein: 0.850, category: 'Stabilizer/Mix', notes: 'animal protein', density: 0.70, volumetricUnit: 'tbsp' },
  pectin: { label: 'Pectin', fat: 0.0, msnf: 0.0, sugar: 0.0, other_solids: 1.0, water: 0.0, protein: 0.0, category: 'Stabilizer/Mix', notes: 'fruit-based gel', density: 0.62, volumetricUnit: 'tsp' },
  cornstarch: { label: 'Cornstarch', fat: 0.0, msnf: 0.0, sugar: 0.0, other_solids: 0.99, water: 0.01, protein: 0.003, category: 'Stabilizer/Mix', notes: 'thickener', density: 0.60, volumetricUnit: 'tbsp' },
  tapioca_starch: { label: 'Tapioca starch', fat: 0.0, msnf: 0.0, sugar: 0.0, other_solids: 0.99, water: 0.01, protein: 0.001, category: 'Stabilizer/Mix', notes: 'clear thickener', density: 0.58, volumetricUnit: 'tbsp' },

  // NUTS & NUT BUTTERS
  peanut_butter: { label: 'Peanut butter (smooth)', fat: 0.50, msnf: 0.0, sugar: 0.09, other_solids: 0.20, water: 0.01, protein: 0.250, category: 'Nuts/Seeds', notes: 'high fat', density: 1.10, volumetricUnit: 'tbsp' },
  almond_butter: { label: 'Almond butter', fat: 0.55, msnf: 0.0, sugar: 0.05, other_solids: 0.19, water: 0.01, protein: 0.210, category: 'Nuts/Seeds', notes: 'rich nutty', density: 1.08, volumetricUnit: 'tbsp' },
  cashew_butter: { label: 'Cashew butter', fat: 0.49, msnf: 0.0, sugar: 0.08, other_solids: 0.17, water: 0.03, protein: 0.180, category: 'Nuts/Seeds', notes: 'creamy', density: 1.06, volumetricUnit: 'tbsp' },
  tahini: { label: 'Tahini (sesame paste)', fat: 0.54, msnf: 0.0, sugar: 0.03, other_solids: 0.19, water: 0.03, protein: 0.170, category: 'Nuts/Seeds', notes: 'sesame flavor', density: 0.95, volumetricUnit: 'tbsp' },
  pistachio_paste: { label: 'Pistachio paste', fat: 0.54, msnf: 0.0, sugar: 0.06, other_solids: 0.18, water: 0.04, protein: 0.200, category: 'Nuts/Seeds', notes: 'distinctive green', density: 1.05, volumetricUnit: 'tbsp' },
  almonds_chopped: { label: 'Almonds (chopped)', fat: 0.50, msnf: 0.0, sugar: 0.04, other_solids: 0.27, water: 0.05, protein: 0.210, category: 'Nuts/Seeds', notes: 'crunchy', density: 0.51, volumetricUnit: 'cup' },
  pecans_chopped: { label: 'Pecans (chopped)', fat: 0.72, msnf: 0.0, sugar: 0.04, other_solids: 0.14, water: 0.04, protein: 0.092, category: 'Nuts/Seeds', notes: 'buttery', density: 0.46, volumetricUnit: 'cup' },
  walnuts_chopped: { label: 'Walnuts (chopped)', fat: 0.65, msnf: 0.0, sugar: 0.03, other_solids: 0.20, water: 0.04, protein: 0.152, category: 'Nuts/Seeds', notes: 'earthy flavor', density: 0.50, volumetricUnit: 'cup' },
  cashews_chopped: { label: 'Cashews (chopped)', fat: 0.44, msnf: 0.0, sugar: 0.06, other_solids: 0.26, water: 0.05, protein: 0.180, category: 'Nuts/Seeds', notes: 'mild & creamy', density: 0.57, volumetricUnit: 'cup' },
  pistachios_chopped: { label: 'Pistachios (chopped)', fat: 0.45, msnf: 0.0, sugar: 0.08, other_solids: 0.27, water: 0.04, protein: 0.202, category: 'Nuts/Seeds', notes: 'green color', density: 0.52, volumetricUnit: 'cup' },
  peanuts_roasted: { label: 'Peanuts (roasted)', fat: 0.50, msnf: 0.0, sugar: 0.04, other_solids: 0.20, water: 0.02, protein: 0.260, category: 'Nuts/Seeds', notes: 'salty option', density: 0.64, volumetricUnit: 'cup' },
  hazelnuts_chopped: { label: 'Hazelnuts (chopped)', fat: 0.61, msnf: 0.0, sugar: 0.04, other_solids: 0.24, water: 0.05, protein: 0.150, category: 'Nuts/Seeds', notes: 'nutella flavor', density: 0.54, volumetricUnit: 'cup' },
  macadamia_chopped: { label: 'Macadamia nuts (chopped)', fat: 0.76, msnf: 0.0, sugar: 0.05, other_solids: 0.11, water: 0.01, protein: 0.079, category: 'Nuts/Seeds', notes: 'buttery rich', density: 0.53, volumetricUnit: 'cup' },

  // OILS & FATS
  coconut_oil: { label: 'Coconut oil', fat: 1.0, msnf: 0.0, sugar: 0.0, other_solids: 0.0, water: 0.0, protein: 0, category: 'Oils/Fats', notes: 'saturated fat', density: 0.92, volumetricUnit: 'tbsp' },
  coconut_cream: { label: 'Coconut cream', fat: 0.24, msnf: 0.0, sugar: 0.03, other_solids: 0.06, water: 0.67, protein: 0.023, category: 'Oils/Fats', notes: 'dairy alternative', density: 0.95, volumetricUnit: 'cup' },
  coconut_milk: { label: 'Coconut milk (canned)', fat: 0.17, msnf: 0.0, sugar: 0.02, other_solids: 0.05, water: 0.76, protein: 0.018, category: 'Oils/Fats', notes: 'dairy alternative', density: 0.97, volumetricUnit: 'cup' },
  butter: { label: 'Butter (unsalted)', fat: 0.81, msnf: 0.01, sugar: 0.0, other_solids: 0.0, water: 0.18, protein: 0.009, category: 'Oils/Fats', notes: 'pure dairy fat', density: 0.96, volumetricUnit: 'tbsp' },

  // FLAVOR EXTRACTS
  vanilla_extract: { label: 'Vanilla extract', fat: 0.0, msnf: 0.0, sugar: 0.13, other_solids: 0.0, water: 0.65, protein: 0, category: 'Flavoring', notes: 'alcohol base', density: 0.88, volumetricUnit: 'tsp' },
  almond_extract: { label: 'Almond extract', fat: 0.0, msnf: 0.0, sugar: 0.0, other_solids: 0.0, water: 0.65, protein: 0, category: 'Flavoring', notes: 'alcohol base', density: 0.88, volumetricUnit: 'tsp' },
  mint_extract: { label: 'Mint extract', fat: 0.0, msnf: 0.0, sugar: 0.0, other_solids: 0.0, water: 0.65, protein: 0, category: 'Flavoring', notes: 'alcohol base', density: 0.88, volumetricUnit: 'tsp' },
  lemon_zest: { label: 'Lemon zest', fat: 0.003, msnf: 0.0, sugar: 0.04, other_solids: 0.09, water: 0.79, protein: 0.015, category: 'Flavoring', notes: 'citrus oil', density: 0.50, volumetricUnit: 'tsp' },
  salt: { label: 'Salt', fat: 0.0, msnf: 0.0, sugar: 0.0, other_solids: 1.0, water: 0.0, protein: 0, category: 'Flavoring', notes: 'enhances flavor', density: 1.20, volumetricUnit: 'tsp' },

  // WATER
  water: { label: 'Water', fat: 0.0, msnf: 0.0, sugar: 0.0, other_solids: 0.0, water: 1.0, protein: 0, category: 'Water', notes: '', density: 1.00, volumetricUnit: 'cup' },
  coffee_brewed: { label: 'Coffee (brewed)', fat: 0.0, msnf: 0.0, sugar: 0.0, other_solids: 0.002, water: 0.998, protein: 0.001, category: 'Water', notes: 'coffee flavor', density: 1.00, volumetricUnit: 'cup' },
  espresso: { label: 'Espresso', fat: 0.002, msnf: 0.0, sugar: 0.0, other_solids: 0.02, water: 0.978, protein: 0.002, category: 'Water', notes: 'concentrated coffee', density: 1.00, volumetricUnit: 'tbsp' },
  tea_brewed: { label: 'Tea (brewed)', fat: 0.0, msnf: 0.0, sugar: 0.0, other_solids: 0.002, water: 0.998, protein: 0, category: 'Water', notes: 'tea flavor', density: 1.00, volumetricUnit: 'cup' },
  matcha_tea: { label: 'Matcha powder', fat: 0.05, msnf: 0.0, sugar: 0.0, other_solids: 0.93, water: 0.02, protein: 0.290, category: 'Flavoring', notes: 'green tea powder', density: 0.40, volumetricUnit: 'tsp' },
  cookie_pieces: { label: 'Cookie / Oreo pieces', fat: 0.17, msnf: 0.0, sugar: 0.45, other_solids: 0.37, water: 0.01, protein: 0.040, category: 'Mix-ins', notes: 'chunky mix-in', density: 0.55, volumetricUnit: 'cup' },
  nut_paste: { label: 'Nut paste (pistachio/hazelnut)', fat: 0.50, msnf: 0.0, sugar: 0.08, other_solids: 0.35, water: 0.07, protein: 0.180, category: 'Mix-ins', notes: 'intense nut flavor', density: 1.05, volumetricUnit: 'tbsp' },
  pecan_pieces: { label: 'Pecan pieces (toasted)', fat: 0.72, msnf: 0.0, sugar: 0.04, other_solids: 0.20, water: 0.04, protein: 0.091, category: 'Nuts/Seeds', notes: 'crunchy mix-in', density: 0.50, volumetricUnit: 'cup' },
  butter_unsalted: { label: 'Unsalted butter', fat: 0.80, msnf: 0.01, sugar: 0.0, other_solids: 0.01, water: 0.18, protein: 0.009, category: 'Oils/Fats', notes: 'rich dairy fat', density: 0.91, volumetricUnit: 'tbsp' },
  greek_yogurt: { label: 'Greek yogurt (full-fat)', fat: 0.05, msnf: 0.08, sugar: 0.04, other_solids: 0.02, water: 0.81, protein: 0.090, category: 'Dairy', notes: 'tangy, thick', density: 1.05, volumetricUnit: 'cup' },
};

const SWEETENERS: Record<string, { POD: number; PAC: number }> = {
  sucrose: { POD: 1.0, PAC: 1.0 },
  brown_sugar: { POD: 0.97, PAC: 1.0 },
  dextrose: { POD: 0.70, PAC: 1.90 },
  fructose: { POD: 1.70, PAC: 1.90 },
  invert_sugar: { POD: 1.25, PAC: 1.30 },
  corn_syrup_solids: { POD: 0.50, PAC: 1.30 },
  corn_syrup_liquid: { POD: 0.50, PAC: 1.30 },
  honey: { POD: 1.25, PAC: 1.30 },
  maple_syrup: { POD: 1.15, PAC: 1.25 },
  agave_nectar: { POD: 1.50, PAC: 1.80 },
  molasses: { POD: 0.75, PAC: 1.20 },
};

// Egg sizes in grams (USDA standard)
const EGG_SIZES = {
  egg_yolk: {
    small: 14,
    medium: 16,
    large: 17,
    'extra-large': 19,
  },
  whole_egg: {
    small: 43,
    medium: 50,
    large: 57,
    'extra-large': 63,
  },
};

interface IngredientRow {
  key: string;
  grams: number;
  volumetricUnit?: 'cup' | 'tbsp' | 'tsp' | 'fl oz'; // Per-row volumetric unit selection
  eggSize?: 'small' | 'medium' | 'large' | 'extra-large'; // For egg ingredients
}

// Map recipe ingredient names to INGREDIENTS keys
const RECIPE_INGREDIENT_MAP: Record<string, string> = {
  'Heavy Cream': 'heavy_cream_36',
  'Whole Milk': 'whole_milk',
  'Egg Yolks': 'egg_yolk',
  'Granulated Sugar': 'sucrose',
  'Vanilla Extract': 'vanilla_extract',
  'Salt': 'salt',
  'Dutch Cocoa Powder': 'cocoa_powder',
  'Dark Chocolate': 'dark_chocolate_70',
  'Fresh Strawberries': 'strawberry_puree',
  'Peppermint Extract': 'vanilla_extract',
  'Dark Chocolate Chips': 'dark_chocolate_70',
  'Chocolate Sandwich Cookies': 'cookie_pieces',
  'Pistachio Paste': 'nut_paste',
  'Hazelnut Paste': 'nut_paste',
  'Lemon Juice': 'lemon_juice',
  'Lemon Zest': 'lemon_zest',
  'Brown Sugar (Dark)': 'brown_sugar',
  'Unsalted Butter': 'butter_unsalted',
  'Pecans': 'pecan_pieces',
  'Orange Juice': 'orange_juice',
  'Orange Zest': 'lemon_zest',
  'Fresh Raspberries': 'raspberry_puree',
  'Lime Juice': 'lemon_juice',
  'Lime Zest': 'lemon_zest',
  'Water': 'water',
  'Mango Puree': 'mango_puree',
  'Passion Fruit Puree': 'mango_puree',
  'Corn Syrup': 'corn_syrup_liquid',
  'Full-Fat Greek Yogurt': 'greek_yogurt',
  'Skim Milk Powder': 'skim_milk_powder',
  'Corn Syrup Solids': 'corn_syrup_solids',
  'Sweetened Condensed Milk': 'condensed_milk',
  'Instant Espresso Powder': 'cocoa_powder',
  'Toffee Bits': 'cookie_pieces',
  'Full-Fat Coconut Cream': 'coconut_cream',
  'Coconut Milk': 'coconut_milk',
  'Raw Cashews (soaked)': 'nut_paste',
  'Barista Oat Milk': 'whole_milk',
};

export default function App() {
  // View: 'selector' = landing page, 'calculator' = mix calculator
  const [view, setView] = useState<'selector' | 'calculator'>('selector');
  const [selectedCategory, setSelectedCategory] = useState<IceCreamCategory | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<IceCreamRecipe | null>(null);

  // Unit system: 'metric', 'imperial', or 'volumetric'
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial' | 'volumetric'>('metric');
  
  // Custom ingredients database (starts as a copy of INGREDIENTS, but can be modified)
  const [customIngredients, setCustomIngredients] = useState<Record<string, IngredientProfile>>({...INGREDIENTS});
  
  // Dialog state for adding custom ingredient
  const [isAddIngredientOpen, setIsAddIngredientOpen] = useState(false);
  const [newIngredient, setNewIngredient] = useState({
    key: '',
    label: '',
    fat: 0,
    msnf: 0,
    sugar: 0,
    other_solids: 0,
    water: 0,
    protein: 0,
    category: 'Other',
    notes: '',
    density: 1.0,
    volumetricUnit: 'cup' as 'cup' | 'tbsp' | 'tsp',
  });
  
  const [rows, setRows] = useState<IngredientRow[]>([
    { key: 'whole_milk', grams: 500, volumetricUnit: 'cup' },
    { key: 'heavy_cream_36', grams: 300, volumetricUnit: 'cup' },
    { key: 'sucrose', grams: 140, volumetricUnit: 'cup' },
    { key: 'skim_milk_powder', grams: 40, volumetricUnit: 'tbsp' },
    { key: 'egg_yolk', grams: 60, eggSize: 'large' }, // 3 large egg yolks (20g each)
  ]);

  const [results, setResults] = useState({
    mass: 0,
    fatPct: 0,
    msnfPct: 0,
    sugarPct: 0,
    waterPct: 0,
    totalSolidsPct: 0,
    POD: 0,
    PAC: 0,
    flags: [] as string[],
    // Add total grams for nutrition facts
    fatGrams: 0,
    sugarGrams: 0,
    msnfGrams: 0,
    waterGrams: 0,
    otherSolidsGrams: 0,
    proteinGrams: 0,
    // Additional nutrition
    saturatedFatGrams: 0,
    transFatGrams: 0,
    cholesterolMg: 0,
    sodiumMg: 0,
    totalCalories: 0,
    fiberGrams: 0,
    vitaminDMcg: 0,
    calciumMg: 0,
    ironMg: 0,
    potassiumMg: 0,
  });

  useEffect(() => {
    calculateResults();
  }, [rows]);

  const calculateResults = () => {
    let mass = 0;
    let fat = 0, msnf = 0, sugar = 0, other = 0, water = 0, protein = 0;
    let POD_total = 0, PAC_total = 0;
    let saturatedFat = 0, transFat = 0, cholesterol = 0, sodium = 0, calories = 0;
    let fiber = 0, vitaminD = 0, calcium = 0, iron = 0, potassium = 0;

    for (const r of rows) {
      const g = Number(r.grams || 0);
      if (g <= 0) continue;
      const p = customIngredients[r.key];
      mass += g;
      fat += g * (p.fat || 0);
      msnf += g * (p.msnf || 0);
      sugar += g * (p.sugar || 0);
      other += g * (p.other_solids || 0);
      water += g * (p.water || 0);
      protein += g * (p.protein || 0);
      
      // Additional nutrition (these are per 100g in the database)
      saturatedFat += (g / 100) * (p.saturated_fat || 0);
      transFat += (g / 100) * (p.trans_fat || 0);
      cholesterol += (g / 100) * (p.cholesterol || 0);
      sodium += (g / 100) * (p.sodium || 0);
      calories += (g / 100) * (p.calories || 0);
      fiber += (g / 100) * (p.fiber || 0);
      vitaminD += (g / 100) * (p.vitamin_d || 0);
      calcium += (g / 100) * (p.calcium || 0);
      iron += (g / 100) * (p.iron || 0);
      potassium += (g / 100) * (p.potassium || 0);

      if ((p.sugar || 0) > 0 && SWEETENERS[r.key]) {
        const sugarSolids = g * p.sugar;
        POD_total += sugarSolids * SWEETENERS[r.key].POD;
        PAC_total += sugarSolids * SWEETENERS[r.key].PAC;
      }
    }

    const totalSolids = fat + msnf + sugar + other;
    const pct = (x: number) => (mass > 0 ? (100 * x) / mass : 0);

    const fatPct = pct(fat);
    const msnfPct = pct(msnf);
    const sugarPct = pct(sugar);
    const waterPct = pct(water);
    const totalSolidsPct = pct(totalSolids);

    const POD_per_kg = mass > 0 ? (POD_total / mass) * 1000 : 0;
    const PAC_per_kg = mass > 0 ? (PAC_total / mass) * 1000 : 0;

    const flags: string[] = [];
    if (fatPct < 10) flags.push('Fat looks low → can feel icy/thin.');
    if (fatPct > 18) flags.push('Fat looks high → can feel waxy/greasy, muted flavor.');
    if (sugarPct < 12) flags.push('Sugar looks low → likely hard/icy.');
    if (sugarPct > 18) flags.push('Sugar looks high → may be slushy/soft, overly sweet.');
    if (msnfPct < 8) flags.push('MSNF looks low → weaker body, more iciness.');
    if (msnfPct > 12) flags.push('MSNF looks high → risk of lactose sandiness / dry finish.');
    if (totalSolidsPct < 34) flags.push('Total solids low → icier, faster melt.');
    if (totalSolidsPct > 42) flags.push('Total solids high → heavy/chewy/pasty risk.');

    setResults({
      mass,
      fatPct,
      msnfPct,
      sugarPct,
      waterPct,
      totalSolidsPct,
      POD: POD_per_kg,
      PAC: PAC_per_kg,
      flags,
      // Add total grams for nutrition facts
      fatGrams: fat,
      sugarGrams: sugar,
      msnfGrams: msnf,
      waterGrams: water,
      otherSolidsGrams: other,
      proteinGrams: protein,
      // Additional nutrition
      saturatedFatGrams: saturatedFat,
      transFatGrams: transFat,
      cholesterolMg: cholesterol,
      sodiumMg: sodium,
      totalCalories: calories,
      fiberGrams: fiber,
      vitaminDMcg: vitaminD,
      calciumMg: calcium,
      ironMg: iron,
      potassiumMg: potassium,
    });
  };

  const addRow = () => {
    const ingredient = customIngredients['whole_milk'];
    setRows([...rows, { key: 'whole_milk', grams: 0, volumetricUnit: ingredient.volumetricUnit }]);
  };

  const removeRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const updateRow = (index: number, field: 'key' | 'grams' | 'volumetricUnit' | 'eggSize', value: string | number) => {
    const newRows = [...rows];
    if (field === 'key') {
      // When changing ingredient, update the default volumetric unit and egg size
      const ingredient = customIngredients[value as string];
      const isEgg = value === 'egg_yolk' || value === 'whole_egg';
      newRows[index] = { 
        ...newRows[index], 
        [field]: value as string, 
        volumetricUnit: ingredient.volumetricUnit,
        eggSize: isEgg ? 'large' : undefined,
      };
      // If switching to egg, set default grams for large egg
      if (isEgg && EGG_SIZES[value as 'egg_yolk' | 'whole_egg']) {
        newRows[index].grams = EGG_SIZES[value as 'egg_yolk' | 'whole_egg']['large'];
      }
    } else if (field === 'eggSize') {
      // Update grams based on egg size
      const eggKey = newRows[index].key as 'egg_yolk' | 'whole_egg';
      if (EGG_SIZES[eggKey]) {
        newRows[index].eggSize = value as 'small' | 'medium' | 'large' | 'extra-large';
        newRows[index].grams = EGG_SIZES[eggKey][value as 'small' | 'medium' | 'large' | 'extra-large'];
      }
    } else {
      newRows[index] = { ...newRows[index], [field]: value };
    }
    setRows(newRows);
  };

  const reset = () => {
    setRows([
      { key: 'whole_milk', grams: 500, volumetricUnit: 'cup' },
      { key: 'heavy_cream_36', grams: 300, volumetricUnit: 'cup' },
      { key: 'sucrose', grams: 140, volumetricUnit: 'cup' },
      { key: 'skim_milk_powder', grams: 40, volumetricUnit: 'tbsp' },
      { key: 'egg_yolk', grams: 60, eggSize: 'large' }, // 3 large egg yolks
    ]);
  };

  const loadRecipe = (recipeIngredients: { key: string; grams: number }[]) => {
    const newRows = recipeIngredients.map((ing) => {
      const ingredient = customIngredients[ing.key];
      const isEgg = ing.key === 'egg_yolk' || ing.key === 'whole_egg';
      return {
        key: ing.key,
        grams: ing.grams,
        volumetricUnit: ingredient?.volumetricUnit || 'cup',
        eggSize: isEgg ? 'large' : undefined,
      } as IngredientRow;
    });
    setRows(newRows);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Dairy':
        return <Droplet className="w-4 h-4" />;
      case 'Sweetener':
        return <Cookie className="w-4 h-4" />;
      case 'Fruit':
        return <Apple className="w-4 h-4" />;
      case 'Chocolate':
        return <Cookie className="w-4 h-4 text-brown-600" />;
      case 'Mix-ins':
        return <Candy className="w-4 h-4" />;
      case 'Protein powder':
        return <Beef className="w-4 h-4" />;
      case 'Nuts/Seeds':
        return <Nut className="w-4 h-4" />;
      case 'Oils/Fats':
        return <Droplets className="w-4 h-4" />;
      case 'Flavoring':
        return <Sparkles className="w-4 h-4" />;
      case 'Milk solids':
        return <Weight className="w-4 h-4" />;
      default:
        return <FlaskConical className="w-4 h-4" />;
    }
  };

  const getStatusColor = (value: number, min: number, max: number) => {
    if (value >= min && value <= max) return 'bg-green-500/10 text-green-700 border-green-200';
    return 'bg-amber-500/10 text-amber-700 border-amber-200';
  };
  
  // Unit conversion functions
  const gramsToOunces = (grams: number) => grams / 28.3495;
  
  // Volumetric conversions (density-based) - uses per-row unit selection
  // ── Volumetric helpers (pie-app style: snap to clean fractions, fall back to tbsp/tsp) ──
  const FRACS = [
    {v:0,s:''},{v:1/8,s:'⅛'},{v:1/4,s:'¼'},{v:1/3,s:'⅓'},{v:3/8,s:'⅜'},
    {v:1/2,s:'½'},{v:5/8,s:'⅝'},{v:2/3,s:'⅔'},{v:3/4,s:'¾'},{v:7/8,s:'⅞'},{v:1,s:''},
  ];
  const snapFrac = (x: number) => {
    let b=FRACS[0], bd=Math.abs(x-0);
    for(const f of FRACS){const d=Math.abs(x-f.v);if(d<bd){bd=d;b=f;}}
    return b.v===1?{whole:1,fracStr:''}:{whole:0,fracStr:b.s};
  };
  const formatCupsStr = (cups: number): string => {
    if(cups<=0) return '0 tsp';
    if(cups>=0.25){
      const w=Math.floor(cups);
      const{whole:fw,fracStr}=snapFrac(cups-w);
      const t=w+fw;
      const cs=t>0?`${t}${fracStr} cup${t>1?'s':''}`:fracStr?`${fracStr} cup`:'';
      if(!fracStr&&cups-w>0.01){
        const tbr=(cups-w)*16; const wt=Math.floor(tbr);
        const{whole:ttw,fracStr:tf}=snapFrac(tbr-wt); const tt=wt+ttw;
        const ts=tt>0?`${tt}${tf} tbsp`:tf?`${tf} tbsp`:'';
        return cs&&ts?`${cs} + ${ts}`:cs||ts||'0 tsp';
      }
      return cs||'0 tsp';
    }
    const tbsp=cups*16;
    if(tbsp>=1){
      const w=Math.floor(tbsp);
      const{whole:fw,fracStr}=snapFrac(tbsp-w);
      const t=w+fw;
      return t>0?`${t}${fracStr} tbsp`:fracStr?`${fracStr} tbsp`:'0 tsp';
    }
    const tsp=cups*48;
    const w=Math.floor(tsp);
    const{whole:fw,fracStr}=snapFrac(tsp-w);
    const t=w+fw;
    return t>0?`${t}${fracStr} tsp`:fracStr?`${fracStr} tsp`:'¼ tsp';
  };
  const gramsToVolumetric = (grams: number, ingredientKey: string, _rowUnit?: 'cup' | 'tbsp' | 'tsp' | 'fl oz') => {
    const ing = customIngredients[ingredientKey];
    if (!ing) return { value: grams, unit: 'g', formatted: `${grams.toFixed(1)} g` };
    const density = ing.density || 1.0;
    const cups = grams / (density * 236.588);
    return { value: cups, unit: 'cups', formatted: formatCupsStr(cups) };
  };
  
  const formatAmount = (grams: number, ingredientKey?: string, rowUnit?: 'cup' | 'tbsp' | 'tsp' | 'fl oz', eggSize?: 'small' | 'medium' | 'large' | 'extra-large') => {
    // Check if this is an egg ingredient
    if (ingredientKey && (ingredientKey === 'egg_yolk' || ingredientKey === 'whole_egg') && eggSize && EGG_SIZES[ingredientKey]) {
      const sizeGrams = EGG_SIZES[ingredientKey][eggSize];
      const count = grams / sizeGrams;
      return count.toFixed(1);
    }
    
    if (unitSystem === 'metric') {
      return grams.toFixed(1);
    } else if (unitSystem === 'imperial') {
      return gramsToOunces(grams).toFixed(2);
    } else if (unitSystem === 'volumetric' && ingredientKey) {
      const vol = gramsToVolumetric(grams, ingredientKey, rowUnit);
      return vol.formatted; // e.g. "½ cup", "2 tbsp", "¼ tsp"
    }
    return grams.toFixed(1);
  };
  
  const getUnitLabel = (ingredientKey?: string, _rowUnit?: 'cup' | 'tbsp' | 'tsp' | 'fl oz', eggSize?: 'small' | 'medium' | 'large' | 'extra-large') => {
    // Check if this is an egg ingredient
    if (ingredientKey && (ingredientKey === 'egg_yolk' || ingredientKey === 'whole_egg') && eggSize) {
      return eggSize;
    }
    if (unitSystem === 'metric') return 'g';
    if (unitSystem === 'imperial') return 'oz';
    if (unitSystem === 'volumetric') return ''; // unit is embedded in the formatted string
    return 'g';
  };

  // Calculate total volume in mL
  const calculateTotalVolumeML = () => {
    let totalML = 0;
    for (const row of rows) {
      const ing = customIngredients[row.key];
      const grams = Number(row.grams || 0);
      if (grams > 0 && ing) {
        const density = ing.density || 1.0;
        totalML += grams / density;
      }
    }
    return totalML;
  };

  // Format total mass based on unit system
  const formatTotalMass = (totalGrams: number) => {
    if (unitSystem === 'metric') {
      return { value: totalGrams.toFixed(1), unit: 'g' };
    } else if (unitSystem === 'imperial') {
      return { value: gramsToOunces(totalGrams).toFixed(2), unit: 'oz' };
    } else if (unitSystem === 'volumetric') {
      const totalML = calculateTotalVolumeML();
      // Convert to cups
      const cups = totalML / 236.588;
      return { value: cups.toFixed(2), unit: 'cups' };
    }
    return { value: totalGrams.toFixed(1), unit: 'g' };
  };
  
  // Add custom ingredient
  const handleAddCustomIngredient = () => {
    if (!newIngredient.key || !newIngredient.label) {
      alert('Please provide both an ingredient ID and name');
      return;
    }
    
    // Validate that fractions sum to ~1.0 (allow slight tolerance)
    const sum = newIngredient.fat + newIngredient.msnf + newIngredient.sugar + newIngredient.other_solids + newIngredient.water;
    if (Math.abs(sum - 1.0) > 0.02) {
      alert(`Warning: Component fractions sum to ${sum.toFixed(3)}, should be close to 1.0`);
    }
    
    setCustomIngredients({
      ...customIngredients,
      [newIngredient.key]: {
        label: newIngredient.label,
        fat: newIngredient.fat,
        msnf: newIngredient.msnf,
        sugar: newIngredient.sugar,
        other_solids: newIngredient.other_solids,
        water: newIngredient.water,
        protein: newIngredient.protein,
        category: newIngredient.category,
        notes: newIngredient.notes,
        density: newIngredient.density,
        volumetricUnit: newIngredient.volumetricUnit,
      },
    });
    
    setIsAddIngredientOpen(false);
    setNewIngredient({
      key: '',
      label: '',
      fat: 0,
      msnf: 0,
      sugar: 0,
      other_solids: 0,
      water: 0,
      protein: 0,
      category: 'Other',
      notes: '',
      density: 1.0,
      volumetricUnit: 'cup' as 'cup' | 'tbsp' | 'tsp',
    });
  };

  // Group ingredients by category
  const groupedIngredients = Object.entries(customIngredients).reduce((acc, [key, value]) => {
    if (!acc[value.category]) {
      acc[value.category] = [];
    }
    acc[value.category].push({ key, ...value });
    return acc;
  }, {} as Record<string, Array<{ key: string } & IngredientProfile>>);

  const categoryOrder = ['Dairy', 'Milk solids', 'Sweetener', 'Fruit', 'Chocolate', 'Mix-ins', 'Protein powder', 'Nuts/Seeds', 'Emulsifier', 'Stabilizer/Mix', 'Oils/Fats', 'Flavoring', 'Water', 'Other solids'];

  // Handle selecting a category+recipe from the landing page
  const handleSelectCategory = (category: IceCreamCategory, recipe: IceCreamRecipe) => {
    setSelectedCategory(category);
    setSelectedRecipe(recipe);
    // Pre-load the recipe ingredients into the calculator rows
    const newRows: IngredientRow[] = recipe.ingredients
      .map(ing => {
        const key = RECIPE_INGREDIENT_MAP[ing.name];
        if (!key) return null;
        const profile = customIngredients[key];
        if (!profile) return null;
        return {
          key,
          grams: ing.amount,
          volumetricUnit: profile.volumetricUnit ?? 'cup',
        } as IngredientRow;
      })
      .filter(Boolean) as IngredientRow[];
    if (newRows.length > 0) setRows(newRows);
    setView('calculator');
  };

  // Show landing page
  if (view === 'selector') {
    return (
      <IceCreamTypeSelector
        categories={iceCreamCategories}
        onSelectCategory={handleSelectCategory}
      />
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: 'linear-gradient(135deg, #fdf6e3 0%, #fef3c7 50%, #fde68a 100%)' }}>
      {/* Header bar matching IceCreamTypeSelector */}
      <div className="text-white shadow-lg rounded-2xl mb-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0e7490, #0891b2, #38bdf8)' }}>
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView('selector')}
              className="flex items-center gap-1 text-cyan-100 hover:text-white text-sm mr-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <span className="text-3xl">🍦</span>
            <div>
              <h1 className="text-2xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                {selectedCategory ? selectedCategory.name : 'Ice Cream'} — Mix Calculator
              </h1>
              <p className="text-cyan-100 text-sm">
                {selectedRecipe ? selectedRecipe.name : 'Custom mix'} · edit ingredients below
              </p>
            </div>
          </div>
          <PrintRecipeCard
            recipeName={selectedRecipe ? selectedRecipe.name : 'Custom Mix'}
            categoryName={selectedCategory ? selectedCategory.name : 'Ice Cream'}
            rows={rows.map(r => ({
              label: customIngredients[r.key]?.label ?? r.key,
              grams: r.grams,
              category: customIngredients[r.key]?.category ?? '',
            }))}
            results={results}
            unitSystem={unitSystem}
          />
        </div>
      </div>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Recipe selector row */}
        {selectedCategory && selectedCategory.recipes.length > 1 && (
          <div className="bg-white rounded-2xl shadow-sm px-5 py-3 flex items-center gap-3 flex-wrap">
            <span className="text-sm font-semibold text-gray-600">Recipe:</span>
            <div className="flex flex-wrap gap-2">
              {selectedCategory.recipes.map(recipe => (
                <button
                  key={recipe.id}
                  onClick={() => {
                    setSelectedRecipe(recipe);
                    const newRows: IngredientRow[] = recipe.ingredients
                      .map(ing => {
                        const key = RECIPE_INGREDIENT_MAP[ing.name];
                        if (!key) return null;
                        const profile = customIngredients[key];
                        if (!profile) return null;
                        return { key, grams: ing.amount, volumetricUnit: profile.volumetricUnit ?? 'cup' } as IngredientRow;
                      })
                      .filter(Boolean) as IngredientRow[];
                    if (newRows.length > 0) setRows(newRows);
                  }}
                  className={`text-sm px-3 py-1.5 rounded-full font-medium transition-colors ${
                    selectedRecipe?.id === recipe.id
                      ? 'bg-cyan-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-cyan-50 hover:text-cyan-700'
                  }`}
                >
                  {recipe.emoji} {recipe.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Total Mass Card */}
        <Card className="bg-white rounded-2xl shadow-md border-0">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="text-4xl font-bold text-gray-900">
                  {formatTotalMass(results.mass).value} <span className="text-2xl text-gray-500">{formatTotalMass(results.mass).unit}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">Total mix {unitSystem === 'volumetric' ? 'volume' : 'mass'}</div>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="flex flex-col sm:flex-row gap-2 bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
                  <Button 
                    onClick={() => setUnitSystem('metric')} 
                    variant={unitSystem === 'metric' ? 'default' : 'ghost'}
                    size="sm"
                    className="gap-1 text-xs sm:text-sm flex-1 sm:flex-initial"
                  >
                    <Weight className="w-3 h-3 sm:w-4 sm:h-4" />
                    Metric (g)
                  </Button>
                  <Button 
                    onClick={() => setUnitSystem('imperial')} 
                    variant={unitSystem === 'imperial' ? 'default' : 'ghost'}
                    size="sm"
                    className="gap-1 text-xs sm:text-sm flex-1 sm:flex-initial"
                  >
                    <Weight className="w-3 h-3 sm:w-4 sm:h-4" />
                    Imperial (oz)
                  </Button>
                  <Button 
                    onClick={() => setUnitSystem('volumetric')} 
                    variant={unitSystem === 'volumetric' ? 'default' : 'ghost'}
                    size="sm"
                    className="gap-1 text-xs sm:text-sm flex-1 sm:flex-initial"
                  >
                    <Weight className="w-3 h-3 sm:w-4 sm:h-4" />
                    Volumetric
                  </Button>
                </div>
                <Dialog open={isAddIngredientOpen} onOpenChange={setIsAddIngredientOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Plus className="w-4 h-4" />
                      Custom Ingredient
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add Custom Ingredient</DialogTitle>
                      <DialogDescription>
                        Define a new ingredient by specifying its composition fractions (all values should sum to 1.0)
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="ing-key">Ingredient ID (no spaces)</Label>
                          <Input
                            id="ing-key"
                            value={newIngredient.key}
                            onChange={(e) => setNewIngredient({ ...newIngredient, key: e.target.value.replace(/\s/g, '_').toLowerCase() })}
                            placeholder="e.g., my_custom_cream"
                          />
                        </div>
                        <div>
                          <Label htmlFor="ing-label">Display Name</Label>
                          <Input
                            id="ing-label"
                            value={newIngredient.label}
                            onChange={(e) => setNewIngredient({ ...newIngredient, label: e.target.value })}
                            placeholder="e.g., My Custom Cream"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="ing-category">Category</Label>
                        <Input
                          id="ing-category"
                          value={newIngredient.category}
                          onChange={(e) => setNewIngredient({ ...newIngredient, category: e.target.value })}
                          placeholder="e.g., Dairy, Sweetener, Other"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="ing-fat">Fat (fraction, 0-1)</Label>
                          <Input
                            id="ing-fat"
                            type="number"
                            step="0.001"
                            min="0"
                            max="1"
                            value={newIngredient.fat}
                            onChange={(e) => setNewIngredient({ ...newIngredient, fat: Number(e.target.value) })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="ing-msnf">MSNF (fraction, 0-1)</Label>
                          <Input
                            id="ing-msnf"
                            type="number"
                            step="0.001"
                            min="0"
                            max="1"
                            value={newIngredient.msnf}
                            onChange={(e) => setNewIngredient({ ...newIngredient, msnf: Number(e.target.value) })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="ing-sugar">Sugar (fraction, 0-1)</Label>
                          <Input
                            id="ing-sugar"
                            type="number"
                            step="0.001"
                            min="0"
                            max="1"
                            value={newIngredient.sugar}
                            onChange={(e) => setNewIngredient({ ...newIngredient, sugar: Number(e.target.value) })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="ing-other">Other Solids (fraction, 0-1)</Label>
                          <Input
                            id="ing-other"
                            type="number"
                            step="0.001"
                            min="0"
                            max="1"
                            value={newIngredient.other_solids}
                            onChange={(e) => setNewIngredient({ ...newIngredient, other_solids: Number(e.target.value) })}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="ing-water">Water (fraction, 0-1)</Label>
                        <Input
                          id="ing-water"
                          type="number"
                          step="0.001"
                          min="0"
                          max="1"
                          value={newIngredient.water}
                          onChange={(e) => setNewIngredient({ ...newIngredient, water: Number(e.target.value) })}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Sum: {(newIngredient.fat + newIngredient.msnf + newIngredient.sugar + newIngredient.other_solids + newIngredient.water).toFixed(3)} (should be ~1.0)
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="ing-protein">Protein (fraction, 0-1)</Label>
                          <Input
                            id="ing-protein"
                            type="number"
                            step="0.001"
                            min="0"
                            max="1"
                            value={newIngredient.protein}
                            onChange={(e) => setNewIngredient({ ...newIngredient, protein: Number(e.target.value) })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="ing-density">Density (g/mL)</Label>
                          <Input
                            id="ing-density"
                            type="number"
                            step="0.01"
                            min="0.1"
                            max="2"
                            value={newIngredient.density}
                            onChange={(e) => setNewIngredient({ ...newIngredient, density: Number(e.target.value) })}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="ing-vol-unit">Volumetric Unit</Label>
                        <Select value={newIngredient.volumetricUnit} onValueChange={(value: 'cup' | 'tbsp' | 'tsp') => setNewIngredient({ ...newIngredient, volumetricUnit: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cup">Cup</SelectItem>
                            <SelectItem value="tbsp">Tablespoon</SelectItem>
                            <SelectItem value="tsp">Teaspoon</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="ing-notes">Notes (optional)</Label>
                        <Input
                          id="ing-notes"
                          value={newIngredient.notes}
                          onChange={(e) => setNewIngredient({ ...newIngredient, notes: e.target.value })}
                          placeholder="e.g., custom blend"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsAddIngredientOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddCustomIngredient}>
                        Add Ingredient
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button onClick={addRow} className="gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                  <Plus className="w-4 h-4" />
                  Add Ingredient
                </Button>
                <Button onClick={reset} variant="outline" className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ingredients Table */}
        <Card className="bg-white rounded-2xl shadow-md border-0">
          <CardHeader>
            <CardTitle>Ingredients</CardTitle>
            <CardDescription>Add and adjust ingredients for your ice cream mix</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rows.map((row, index) => {
                const ingredient = customIngredients[row.key];
                return (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
                  >
                    <div className="flex-1 min-w-0 sm:min-w-[200px]">
                      <Select value={row.key} onValueChange={(value: string) => updateRow(index, 'key', value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryOrder.filter(cat => groupedIngredients[cat]).map((category) => (
                            <SelectGroup key={category}>
                              <SelectLabel className="flex items-center gap-2">
                                {getCategoryIcon(category)}
                                {category}
                              </SelectLabel>
                              {groupedIngredients[category]
                                ?.sort((a, b) => a.label.localeCompare(b.label))
                                .map((ing) => (
                                  <SelectItem key={ing.key} value={ing.key}>
                                    {ing.label}
                                  </SelectItem>
                                ))}
                            </SelectGroup>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Amount and unit controls - flex row on mobile and desktop */}
                    <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                      {/* Egg ingredients show count, others show amount */}
                      {(row.key === 'egg_yolk' || row.key === 'whole_egg') ? (
                        <div className="w-32">
                        <div className="relative">
                          <Input
                            type="number"
                            min="0"
                            step="0.5"
                            value={formatAmount(row.grams, row.key, row.volumetricUnit, row.eggSize)}
                            onChange={(e) => {
                              const count = Number(e.target.value);
                              const eggKey = row.key as 'egg_yolk' | 'whole_egg';
                              const size = row.eggSize || 'large';
                              if (EGG_SIZES[eggKey]) {
                                updateRow(index, 'grams', count * EGG_SIZES[eggKey][size]);
                              }
                            }}
                            className="text-right pr-10"
                            placeholder="0"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none">
                            #
                          </span>
                        </div>
                      </div>
                      ) : (
                        <div className="w-32">
                        <div className="relative">
                          <Input
                            type="number"
                            min="0"
                            step="0.1"
                            value={formatAmount(row.grams, row.key, row.volumetricUnit, row.eggSize)}
                            onChange={(e) => {
                              const inputValue = Number(e.target.value);
                              let gramsValue = inputValue;
                              
                              // Convert volumetric to grams if in volumetric mode
                              if (unitSystem === 'volumetric' && row.key) {
                                const ing = customIngredients[row.key];
                                if (ing) {
                                  const density = ing.density || 1.0;
                                  const unit = row.volumetricUnit || ing.volumetricUnit;
                                  let mL = 0;
                                  
                                  switch (unit) {
                                    case 'cup':
                                      mL = inputValue * 236.588;
                                      break;
                                    case 'tbsp':
                                      mL = inputValue * 14.787;
                                      break;
                                    case 'tsp':
                                      mL = inputValue * 4.929;
                                      break;
                                    case 'fl oz':
                                      mL = inputValue * 29.574;
                                      break;
                                  }
                                  gramsValue = mL * density;
                                }
                              } else if (unitSystem === 'imperial') {
                                // Convert ounces to grams
                                gramsValue = inputValue * 28.3495;
                              }
                              
                              updateRow(index, 'grams', gramsValue);
                            }}
                            className="text-right pr-10"
                            placeholder="0"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 pointer-events-none">
                            {getUnitLabel(row.key, row.volumetricUnit, row.eggSize)}
                          </span>
                        </div>
                      </div>
                      )}

                      {/* Egg size selector for eggs */}
                      {(row.key === 'egg_yolk' || row.key === 'whole_egg') && (
                        <div className="w-32">
                        <Select 
                          value={row.eggSize || 'large'} 
                          onValueChange={(value: string) => updateRow(index, 'eggSize', value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                            <SelectItem value="extra-large">XL</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      )}

                      {/* Volumetric unit selector for non-eggs */}
                      {unitSystem === 'volumetric' && row.key !== 'egg_yolk' && row.key !== 'whole_egg' && (
                        <div className="w-24">
                          <Select 
                            value={row.volumetricUnit || ingredient.volumetricUnit} 
                            onValueChange={(value: string) => updateRow(index, 'volumetricUnit', value as 'cup' | 'tbsp' | 'tsp' | 'fl oz')}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cup">cup</SelectItem>
                              <SelectItem value="fl oz">fl oz</SelectItem>
                              <SelectItem value="tbsp">tbsp</SelectItem>
                              <SelectItem value="tsp">tsp</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div className="hidden md:block w-32">
                        <Badge variant="secondary" className="text-xs">
                          {ingredient.category}
                        </Badge>
                      </div>

                      <div className="hidden lg:block flex-1 min-w-0">
                        <p className="text-sm text-gray-500 truncate">{ingredient.notes}</p>
                      </div>

                      <Button
                        onClick={() => removeRow(index)}
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 mt-4">
              💡 Tip: Eggs show as count (small/medium/large/XL). In volumetric mode, choose cups/tbsp/tsp for each ingredient!
            </p>
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="bg-white rounded-2xl shadow-md border-0">
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>Mix composition analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className={`p-4 rounded-lg border-2 ${getStatusColor(results.fatPct, 12, 16)}`}>
                <div className="text-3xl font-bold">{results.fatPct.toFixed(2)}%</div>
                <div className="text-sm mt-1">Fat</div>
                <div className="text-xs mt-1 opacity-70">Target: 12–16%</div>
              </div>

              <div className={`p-4 rounded-lg border-2 ${getStatusColor(results.sugarPct, 14, 16)}`}>
                <div className="text-3xl font-bold">{results.sugarPct.toFixed(2)}%</div>
                <div className="text-sm mt-1">Sugar solids</div>
                <div className="text-xs mt-1 opacity-70">Target: 14–16%</div>
              </div>

              <div className={`p-4 rounded-lg border-2 ${getStatusColor(results.msnfPct, 9, 11)}`}>
                <div className="text-3xl font-bold">{results.msnfPct.toFixed(2)}%</div>
                <div className="text-sm mt-1">MSNF</div>
                <div className="text-xs mt-1 opacity-70">Target: 9–11%</div>
              </div>

              <div className={`p-4 rounded-lg border-2 ${getStatusColor(results.waterPct, 0, 100)}`}>
                <div className="text-3xl font-bold">{results.waterPct.toFixed(2)}%</div>
                <div className="text-sm mt-1">Water</div>
              </div>

              <div className={`p-4 rounded-lg border-2 ${getStatusColor(results.totalSolidsPct, 36, 40)}`}>
                <div className="text-3xl font-bold">{results.totalSolidsPct.toFixed(2)}%</div>
                <div className="text-sm mt-1">Total solids</div>
                <div className="text-xs mt-1 opacity-70">Target: 36–40%</div>
              </div>

              <div className="p-4 rounded-lg border-2 bg-blue-500/10 text-blue-700 border-blue-200">
                <div className="text-lg font-bold">
                  POD {results.POD.toFixed(1)} / PAC {results.PAC.toFixed(1)}
                </div>
                <div className="text-xs mt-1">Sweetness / Softness</div>
                <div className="text-xs mt-1 opacity-70">Relative to sucrose</div>
              </div>
            </div>

            {results.flags.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-700">⚠️ Warnings</h4>
                <div className="flex flex-wrap gap-2">
                  {results.flags.map((flag, i) => (
                    <Badge key={i} variant="outline" className="bg-amber-50 text-amber-800 border-amber-300">
                      {flag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-50 rounded-lg space-y-2">
              <p className="text-sm font-semibold text-gray-700">
                📊 Typical premium targets
              </p>
              <p className="text-sm text-gray-600">
                Fat 12–16% • Sugar 14–16% • MSNF 9–11% • Total solids 36–40%
              </p>
              <p className="text-xs text-gray-500 mt-2">
                POD = sweetness (sucrose=1). PAC = freezing point depression / softness (sucrose=1). 
                Higher PAC → softer at freezer temps.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Nutrition Facts */}
        <Card className="bg-white rounded-2xl shadow-md border-0">
          <CardHeader>
            <CardTitle>Nutrition Facts</CardTitle>
            <CardDescription>Total grams of each component in your mix</CardDescription>
          </CardHeader>
          <CardContent>
            <NutritionFacts
              mass={results.mass}
              fatGrams={results.fatGrams}
              sugarGrams={results.sugarGrams}
              msnfGrams={results.msnfGrams}
              waterGrams={results.waterGrams}
              otherSolidsGrams={results.otherSolidsGrams}
              proteinGrams={results.proteinGrams}
              saturatedFatGrams={results.saturatedFatGrams}
              transFatGrams={results.transFatGrams}
              cholesterolMg={results.cholesterolMg}
              sodiumMg={results.sodiumMg}
              totalCalories={results.totalCalories}
              fiberGrams={results.fiberGrams}
              vitaminDMcg={results.vitaminDMcg}
              calciumMg={results.calciumMg}
              ironMg={results.ironMg}
              potassiumMg={results.potassiumMg}
              unitSystem={unitSystem}
              totalVolumeML={calculateTotalVolumeML()}
            />
          </CardContent>
        </Card>

        {/* POD/PAC Scales */}
        <PODPACScales
          POD={results.POD}
          PAC={results.PAC}
        />

        {/* Footer Note */}
        <Card className="bg-white rounded-2xl shadow-sm border-0">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Note:</span> These are engineering defaults. Brands vary. 
              For label-accurate results, use exact nutrition information from your product labels.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
