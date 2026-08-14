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

export function rankMandis(mandis, quantity, ratePerKm = 2.8) {
  const results = mandis.map((mandi) => calculateNetRealization(mandi, quantity, ratePerKm));
  results.sort((a, b) => b.netPerQtl - a.netPerQtl);
  return results.map((r, i) => ({
    ...r,
    rank: i + 1,
    isRecommended: i === 0,
  }));
}
