// Haversine formula: prithvi gol hai, isliye do points ke beech seedhi (flat) doori
// nahi nikalte. Ye formula "great-circle distance" (gole par sabse chhota raasta) deta hai.
const EARTH_RADIUS_KM = 6371;

const toRadians = (degrees) => (degrees * Math.PI) / 180;

// pointA aur pointB dono [latitude, longitude] format mein hain. Result kilometers mein.
export function haversineKm(pointA, pointB) {
  const [lat1, lon1] = pointA;
  const [lat2, lon2] = pointB;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
}

// Victim ke paas wali team dhoondho.
// Pehle sirf available teams (jo "Deployed" nahi hain) dekhte hain.
// Agar sab deployed hain, to saari teams mein se sabse paas wali de dete hain.
export function findNearestTeam(victimCoords, teams) {
  if (!victimCoords || !teams || teams.length === 0) return null;

  const available = teams.filter((team) => team.status !== 'Deployed');
  const pool = available.length > 0 ? available : teams;

  let best = null;
  for (const team of pool) {
    const distanceKm = haversineKm(victimCoords, team.coords);
    if (best === null || distanceKm < best.distanceKm) {
      best = { team, distanceKm };
    }
  }
  return best;
}