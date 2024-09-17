const KM_PER_AU = 149597870.7; // 1 AU in kilometers

export const kilometersToAu = (km: number) => {
  return km / KM_PER_AU;
};
