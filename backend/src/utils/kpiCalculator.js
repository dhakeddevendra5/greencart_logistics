// backend/src/utils/kpiCalculator.js
/**
 * Implements the company rules:
 * 1. Late penalty: if delivery_time > base_time + 10 minutes, penalty ₹50 per order
 * 2. Driver fatigue rule: if driver worked > 8 hours in a day, their speed decreases by 30% next day.
 * 3. High-Value bonus: if order value > ₹1000 AND on-time => 10% bonus to order profit.
 * 4. Fuel cost: base ₹5/km, traffic 'High' +₹2/km.
 * 5. Overall profit: sum(order value + bonus - penalties - fuel cost)
 * 6. Efficiency score: (onTime / total) * 100
 *
 * For simulation, we accept:
 * - drivers: array of driver objects
 * - routes: map routeId -> route object
 * - orders: array of orders with assigned_route_id and value_rs
 * - inputs: {availableDrivers, startTime: "HH:MM", maxHours}
 *
 * Returns detailed results
 */
const moment = require('moment');

const calculateSimulation = ({ drivers, routesMap, orders, inputs }) => {
  // Simple round-robin allocation of orders to drivers (respecting maxHours heuristics)
  const availableDrivers = drivers.slice(0, inputs.availableDrivers || drivers.length);
  if (availableDrivers.length === 0) {
    throw new Error('No available drivers for simulation');
  }

  // Track per-driver assigned orders and hours
  const driverState = availableDrivers.map((d) => ({
    id: d.id,
    name: d.name,
    workedTodayHours: d.current_shift_hours || 0,
    past7: d.past_7_days_hours || [],
    assignedOrders: [],
    willHaveFatigueNextDay: (d.current_shift_hours || 0) > 8,
  }));

  const results = [];
  let totalProfit = 0;
  let onTime = 0;
  const fuelBreakdown = {};
  let totalDeliveries = orders.length;

  // assign orders round robin
  let idx = 0;
  for (const order of orders) {
    const driver = driverState[idx % driverState.length];
    idx++;

    const route = routesMap[order.assigned_route_id];
    if (!route) {
      // skip or mark as failed
      results.push({ order_id: order.order_id, status: 'no-route', reason: 'route not found' });
      continue;
    }

    // base_time_minutes from route
    const baseMinutes = route.base_time_minutes;
    // apply fatigue: if driver had >8 hours previously, next day speed -30% => time increases by 30%
    let effectiveBaseTime = baseMinutes;
    if (driver.willHaveFatigueNextDay) {
      effectiveBaseTime = Math.ceil(effectiveBaseTime * 1.3);
    }

    // For simulation we assume delivery_time = base_time + traffic_delay
    let trafficDelay = 0;
    if (route.traffic_level === 'High') trafficDelay += 10;
    else if (route.traffic_level === 'Medium') trafficDelay += 5;

    const deliveryTimeMinutes = effectiveBaseTime + trafficDelay;

    // Compare with base_time + 10 for penalty
    const isLate = deliveryTimeMinutes > (baseMinutes + 10);
    const penalty = isLate ? 50 : 0;
    if (!isLate) onTime++;

    // High value bonus
    const bonus = order.value_rs > 1000 && !isLate ? Math.round(order.value_rs * 0.1) : 0;

    // fuel cost
    let fuelPerKm = 5;
    if (route.traffic_level === 'High') fuelPerKm += 2;
    const fuelCost = Math.round(route.distance_km * fuelPerKm);

    const orderProfit = order.value_rs + bonus - penalty - fuelCost;

    totalProfit += orderProfit;

    // build fuelBreakdown by traffic level
    fuelBreakdown[route.traffic_level] = (fuelBreakdown[route.traffic_level] || 0) + fuelCost;

    // assign to driver
    driver.assignedOrders.push({
      order_id: order.order_id,
      value_rs: order.value_rs,
      route_id: route.route_id,
      delivery_time_minutes: deliveryTimeMinutes,
      isLate,
      penalty,
      bonus,
      fuelCost,
      orderProfit,
    });
  }

  const efficiencyScore = totalDeliveries === 0 ? 0 : Math.round((onTime / totalDeliveries) * 100);

  return {
    summary: {
      totalOrders: totalDeliveries,
      onTime,
      late: totalDeliveries - onTime,
      efficiencyScore,
      totalProfit,
    },
    fuelBreakdown,
    drivers: driverState,
  };
};

module.exports = { calculateSimulation };
