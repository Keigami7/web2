[19.55, 24/10/2026] Fadlan fulki liyanan: // a. Segitiga (sama kaki/umum dengan alas, tinggi, dan 3 sisi)
function segitiga(alas, tinggi, sisiA, sisiB, sisiC) {
  const luas = 0.5 * alas * tinggi;
  const keliling = sisiA + sisiB + sisiC;
  console.log("=== Segitiga ===");
  console.log("Luas     :", luas);
  console.log("Keliling :", keliling);
}

// b. Persegi panjang
function persegiPanjang(p, l) {
  console.log("=== Persegi Panjang ===");
  console.log("Luas     :", p * l);
  console.log("Keliling :", 2 * (p + l));
}

// c. Prisma segitiga
function prisma(alas, tinggiSegitiga, sisiA, sisiB, sisiC, tinggiPrisma) {
  const luasAlas = 0.5 * alas * tinggiSegitiga;
  const kelilingAlas = sisiA + sisiB + sisiC;
  const luasPermukaan = 2 * luasAlas + kelilingAlas * tinggiPrisma;
  const volume = luasAl…