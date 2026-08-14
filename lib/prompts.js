export function buildExplainPrompt(rankedMandis, farmerProfile) {
  const best = rankedMandis[0];
  const others = rankedMandis.slice(1, 3);

  return `You are a helpful farm advisor. Explain in simple, friendly language (max 5 lines) why ${best.mandiName} is the best mandi for this farmer.

Farmer: ${farmerProfile.name}, ${farmerProfile.district} district
Crop: ${farmerProfile.crop}, Quantity: ${farmerProfile.quantity} quintals

BEST MANDI: ${best.mandiName}
  - Headline Price: ₹${best.headlinePrice}/qtl
  - Transport Cost: ₹${best.transportCostPerQtl}/qtl (${best.distanceKm} km)
  - Market Fee: ₹${best.marketFeePerQtl}/qtl
  - Commission: ₹${best.commissionPerQtl}/qtl
  - Loading: ₹${best.loadingChargePerQtl}/qtl
  - NET REALIZATION: ₹${best.netPerQtl}/qtl
  - TOTAL EARNING: ₹${best.totalNet.toLocaleString('en-IN')}

ALTERNATIVES:
${others.map((m) => `- ${m.mandiName}: ₹${m.netPerQtl}/qtl net (₹${(best.netPerQtl - m.netPerQtl).toFixed(0)} less per qtl)`).join('\n')}

Rules:
1. Use simple language a farmer can understand
2. Never invent prices or data not given above
3. Explain WHY the best mandi wins (lower transport, lower fees, etc.)
4. State the total extra earning vs next-best mandi
5. Keep it to 4-5 short sentences
6. Do not use jargon`;
}
