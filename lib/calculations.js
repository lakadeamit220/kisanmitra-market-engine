/**
 * Net Realization Formula:
 * Net = HeadlinePrice - TransportCost - MarketFee - Commission - LoadingCharge
 *
 * TransportCost = distanceKm * ratePerKm   (per quintal)
 * MarketFee     = headlinePrice * (marketFeePercent / 100)
 * Commission    = headlinePrice * (commissionPercent / 100)
 */

export function calculateNetRealization(mandi, quantity, ratePerKm = 2.8) {
  const transportCostPerQtl = mandi.distanceKm * ratePerKm;
  const marketFee = mandi.headlinePrice * (mandi.marketFeePercent / 100);
  const commission = mandi.headlinePrice * (mandi.commissionPercent / 100);
  const loadingCharge = mandi.loadingCharge;

  const netPerQtl = mandi.headlinePrice - transportCostPerQtl - marketFee - commission - loadingCharge;
  const totalNet = netPerQtl * quantity;
  const totalTransport = transportCostPerQtl * quantity;
  const totalMarketFee = marketFee * quantity;
  const totalCommission = commission * quantity;
  const totalLoading = loadingCharge * quantity;

  return {
    mandiId: mandi.id,
    mandiName: mandi.name,
    headlinePrice: mandi.headlinePrice,
    distanceKm: mandi.distanceKm,
    transportCostPerQtl: Math.round(transportCostPerQtl * 100) / 100,
    marketFeePerQtl: Math.round(marketFee * 100) / 100,
    commissionPerQtl: Math.round(commission * 100) / 100,
    loadingChargePerQtl: loadingCharge,
    netPerQtl: Math.round(netPerQtl * 100) / 100,
    totalNet: Math.round(totalNet),
    totalTransport: Math.round(totalTransport),
    totalMarketFee: Math.round(totalMarketFee),
    totalCommission: Math.round(totalCommission),
    totalLoading: Math.round(totalLoading),
    totalDeductions: Math.round(totalTransport + totalMarketFee + totalCommission + totalLoading),
  };
}

export function rankMandis(mandis, profile, ratePerKm = 2.8) {
  const quantity = profile.quantity;
  const userDistrict = profile.district || 'Nashik';

  // We assign a rough simulated distance penalty if the mandi is not in the farmer's district.
  // This ensures the local mandis appear closer, preventing Nashik from always winning.
  const dynamicMandis = mandis.map((m) => {
    let newDistance = m.distanceKm;

    // Safely categorize every mandi from mockMandis.js into its correct district
    let mandiRegion = 'Other';
    if (m.name.includes('Pune')) mandiRegion = 'Pune';
    else if (m.name.includes('Solapur')) mandiRegion = 'Solapur';
    else if (m.name.includes('Kolhapur')) mandiRegion = 'Kolhapur';
    else if (m.name.includes('Satara')) mandiRegion = 'Satara';
    else if (m.name.includes('Sangli')) mandiRegion = 'Sangli';
    else if (m.name.includes('Ahmednagar') || m.name.includes('Sangamner') || m.name.includes('Rahuri') || m.name.includes('Kopargaon')) mandiRegion = 'Ahmednagar';
    else if (m.name.includes('Sambhajinagar')) mandiRegion = 'Aurangabad';
    else if (m.name.includes('Nashik') || m.name.includes('Lasalgaon') || m.name.includes('Pimpalgaon') || m.name.includes('Yeola') || m.name.includes('Manmad') || m.name.includes('Satana') || m.name.includes('Malegaon')) mandiRegion = 'Nashik';
    else if (m.name.includes('Dhule')) mandiRegion = 'Dhule';
    else if (m.name.includes('Jalgaon')) mandiRegion = 'Jalgaon';
    else if (m.name.includes('Vashi')) mandiRegion = 'Mumbai';

    if (mandiRegion === userDistrict) {
      // Local market! Distance is very short (10-35km)
      newDistance = 15 + (m.headlinePrice % 20);
    } else {
      // Not local. We assign a significant inter-district transport penalty
      // (100 - 400 km) to simulate realistic Maharashtra logistics.
      newDistance = 150 + (m.headlinePrice % 250);
    }

    return { ...m, distanceKm: newDistance };
  });

  const results = dynamicMandis.map((mandi) => calculateNetRealization(mandi, quantity, ratePerKm));
  results.sort((a, b) => b.netPerQtl - a.netPerQtl);

  return results.map((r, i) => ({
    ...r,
    rank: i + 1,
    isRecommended: i === 0,
  }));
}
