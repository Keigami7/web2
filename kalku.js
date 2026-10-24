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
[19.55, 24/10/2026] Fadlan fulki liyanan: /* =====================================================
   LATIHAN 4 - VIEW (SQL Server)
   ASUMSI STRUKTUR TABEL (sesuaikan dengan tabel kamu):
   TUnit(KodeUnit, NamaUnit)
   TSupplier(KodeSupplier, NamaSupplier, Telepon, Komisi)
   TMasterBuku(KodeBuku, Judul, KodeSupplier, HargaBeli,
               HargaJual, Margin, IsActive)
   TdetailMasterBukuUnit(KodeUnit, KodeBuku, Instock,
               MinStock, MaxStock)
   ===================================================== */

-- ================= SOAL 1 =================
-- SCHEMABINDING: wajib nama 2 bagian (dbo.xxx) dan tanpa SELECT *
CREATE VIEW dbo.vw_ReorderBuku
WITH SCHEMABINDING
AS
SELECT
    u.KodeUnit,
    u.NamaUnit,
    b.KodeBuku,
    b.Judul,
    s.KodeSupplier,
    s.NamaSupplier,
    s.Telepon,
    d.Instock,
    d.MinStock,
    d.MaxStock,
    (d.MaxStock - d.Instock) AS EstimasiOrder   -- jumlah yang harus di-order
FROM dbo.TdetailMasterBukuUnit d
JOIN dbo.TMasterBuku b ON d.KodeBuku     = b.KodeBuku
JOIN dbo.TUnit       u ON d.KodeUnit     = u.KodeUnit
JOIN dbo.TSupplier   s ON b.KodeSupplier = s.KodeSupplier
WHERE d.Instock <= d.MinStock;                  -- stok kritis
GO

-- Tes: filter per unit
SELECT * FROM dbo.vw_ReorderBuku WHERE KodeUnit = 'U01';
GO

-- ================= SOAL 2 =================
-- Column-level: kolom Komisi & Margin TIDAK disertakan
-- Row-level   : hanya buku aktif (WHERE IsActive = 1)
-- WITH CHECK OPTION: INSERT/UPDATE lewat view harus tetap memenuhi WHERE
CREATE VIEW dbo.vw_KatalogKasir
AS
SELECT
    KodeBuku,
    Judul,
    KodeSupplier,
    HargaJual,
    IsActive
FROM dbo.TMasterBuku
WHERE IsActive = 1
WITH CHECK OPTION;
GO

-- Keamanan: kasir hanya boleh akses view, bukan tabel aslinya
CREATE ROLE role_kasir;
GRANT SELECT, INSERT, UPDATE ON dbo.vw_KatalogKasir TO role_kasir;
DENY  SELECT, INSERT, UPDATE, DELETE ON dbo.TMasterBuku TO role_kasir;
GO

-- Tes WITH CHECK OPTION (akan GAGAL karena IsActive = 0 melanggar view)
-- UPDATE dbo.vw_KatalogKasir SET IsActive = 0 WHERE KodeBuku = 'B001';