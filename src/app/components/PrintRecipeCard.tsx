import { Printer } from 'lucide-react';

interface PrintRow {
  label: string;
  grams: number;
  category: string;
}

interface PrintResults {
  mass: number;
  fatPct: number;
  msnfPct: number;
  sugarPct: number;
  waterPct: number;
  totalSolidsPct: number;
  POD: number;
  PAC: number;
  totalCalories: number;
  fatGrams: number;
  proteinGrams: number;
  sugarGrams: number;
}

interface PrintRecipeCardProps {
  recipeName: string;
  categoryName: string;
  rows: PrintRow[];
  results: PrintResults;
  unitSystem: 'metric' | 'imperial' | 'volumetric';
}

export function PrintRecipeCard({
  recipeName,
  categoryName,
  rows,
  results,
  unitSystem,
}: PrintRecipeCardProps) {

  const handlePrint = () => {
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    const ingredientRows = rows.map(row => {
      const oz = (row.grams / 28.3495).toFixed(1);
      return `
        <tr>
          <td style="padding:6px 8px;border-bottom:1px solid #f0f0f0;font-size:13px;color:#1f2937;">${row.label}</td>
          <td style="padding:6px 8px;border-bottom:1px solid #f0f0f0;font-size:13px;text-align:right;font-weight:600;color:#0e7490;">${row.grams}g</td>
          <td style="padding:6px 8px;border-bottom:1px solid #f0f0f0;font-size:13px;text-align:right;color:#6b7280;">${oz} oz</td>
          <td style="padding:6px 8px;border-bottom:1px solid #f0f0f0;font-size:12px;text-align:right;color:#9ca3af;">${((row.grams / results.mass) * 100).toFixed(1)}%</td>
        </tr>`;
    }).join('');

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Ice Cream Sensei — ${recipeName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #fff; color: #1f2937; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .no-print { display: none !important; }
    }
    .page { max-width: 720px; margin: 0 auto; padding: 32px 24px; }
    .header { background: linear-gradient(135deg, #0e7490, #0891b2, #38bdf8); color: white; border-radius: 12px; padding: 20px 24px; margin-bottom: 24px; display: flex; align-items: center; gap: 16px; }
    .header-icon { font-size: 40px; }
    .header-title { font-size: 22px; font-weight: 700; font-family: Georgia, serif; }
    .header-sub { font-size: 13px; opacity: 0.85; margin-top: 2px; }
    .header-date { margin-left: auto; font-size: 12px; opacity: 0.75; white-space: nowrap; }
    .section { margin-bottom: 20px; }
    .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #6b7280; margin-bottom: 8px; padding-bottom: 4px; border-bottom: 2px solid #f3f4f6; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
    .grid-5 { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
    .stat-card { background: #f8fafc; border-radius: 8px; padding: 12px; text-align: center; border: 1px solid #e5e7eb; }
    .stat-value { font-size: 22px; font-weight: 700; color: #0e7490; }
    .stat-label { font-size: 11px; color: #6b7280; margin-top: 2px; }
    .stat-card.highlight { background: linear-gradient(135deg, #ecfeff, #f0f9ff); border-color: #a5f3fc; }
    table { width: 100%; border-collapse: collapse; }
    thead tr { background: #f8fafc; }
    thead th { padding: 8px; font-size: 11px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; text-align: left; border-bottom: 2px solid #e5e7eb; }
    thead th:not(:first-child) { text-align: right; }
    tfoot tr td { padding: 8px; font-size: 13px; font-weight: 700; border-top: 2px solid #0e7490; color: #0e7490; }
    tfoot tr td:not(:first-child) { text-align: right; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 20px; font-size: 11px; font-weight: 600; background: #ecfeff; color: #0e7490; border: 1px solid #a5f3fc; margin-left: 8px; }
    .footer { margin-top: 24px; padding-top: 12px; border-top: 1px solid #f0f0f0; font-size: 11px; color: #9ca3af; display: flex; justify-content: space-between; }
    .print-btn { display: block; margin: 0 auto 24px; padding: 10px 28px; background: linear-gradient(135deg, #0e7490, #0891b2); color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; }
    .print-btn:hover { opacity: 0.9; }
  </style>
</head>
<body>
  <div class="page">
    <button class="print-btn no-print" onclick="window.print()">🖨️ Print / Save as PDF</button>

    <div class="header">
      <div class="header-icon">🍦</div>
      <div>
        <div class="header-title">${recipeName}</div>
        <div class="header-sub">Ice Cream Sensei · ${categoryName}</div>
      </div>
      <div class="header-date">${date}</div>
    </div>

    <div class="section">
      <div class="section-title">Mix Analysis</div>
      <div class="grid-5">
        <div class="stat-card highlight">
          <div class="stat-value">${results.fatPct.toFixed(1)}%</div>
          <div class="stat-label">Fat</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${results.sugarPct.toFixed(1)}%</div>
          <div class="stat-label">Sugar</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${results.msnfPct.toFixed(1)}%</div>
          <div class="stat-label">MSNF</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">${results.waterPct.toFixed(1)}%</div>
          <div class="stat-label">Water</div>
        </div>
        <div class="stat-card highlight">
          <div class="stat-value">${results.totalSolidsPct.toFixed(1)}%</div>
          <div class="stat-label">Total Solids</div>
        </div>
      </div>
    </div>

    <div class="grid-2">
      <div class="section">
        <div class="section-title">Freezing Properties</div>
        <div class="grid-2">
          <div class="stat-card">
            <div class="stat-value">${results.POD.toFixed(2)}</div>
            <div class="stat-label">POD (Sweetness)</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${results.PAC.toFixed(2)}</div>
            <div class="stat-label">PAC (Softness)</div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="section-title">Totals</div>
        <div class="grid-2">
          <div class="stat-card highlight">
            <div class="stat-value">${results.mass.toFixed(0)}g</div>
            <div class="stat-label">Total Batch</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${results.totalCalories.toFixed(0)}</div>
            <div class="stat-label">kcal</div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Ingredients <span class="badge">${rows.length} items</span></div>
      <table>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th style="text-align:right">Grams</th>
            <th style="text-align:right">Ounces</th>
            <th style="text-align:right">% of Mix</th>
          </tr>
        </thead>
        <tbody>${ingredientRows}</tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td style="text-align:right">${results.mass.toFixed(0)}g</td>
            <td style="text-align:right">${(results.mass / 28.3495).toFixed(1)} oz</td>
            <td style="text-align:right">100%</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div class="footer">
      <span>Ice Cream Sensei · icecreamsensei.com</span>
      <span>Targets: Fat 12–16% · Sugar 14–16% · MSNF 9–11% · Total Solids 36–40%</span>
    </div>
  </div>
</body>
</html>`;

    const win = window.open('', '_blank', 'width=800,height=900');
    if (win) {
      win.document.write(html);
      win.document.close();
    }
  };

  return (
    <button
      onClick={handlePrint}
      className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all bg-white border-2 border-cyan-200 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-400 shadow-sm"
    >
      <Printer className="w-4 h-4" />
      Save / Print Recipe
    </button>
  );
}
