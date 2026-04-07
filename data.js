// ================== CONFIG KE DATABASE ==================
const url = "https://opensheet.elk.sh/1leYp4Pagt5PSO7QRbnH5wzmb7mUp6THboJ53Yxa-CE8/Sheet1";

// ================== FUNGSI PEMBANTU: BUAT TABEL ==================
// Dipakai oleh semua fungsi agar tampilan seragam
function buatTabel(data, judul) {
  let html = `<h3>${judul} (${data.length} data)</h3>`;
  html += '<table border="1" cellpadding="5" cellspacing="0" style="text-align: center; width: 100%;">';
  html += `
    <thead>
      <tr>
        <th>ID</th>
        <th>Tanggal</th>
        <th>Wilayah</th>
        <th>Kecamatan</th>
        <th>Jenis Pelanggaran</th>
        <th>Nama Tempat</th>
        <th>Jumlah</th>
        <th>No Surat</th>
      </tr>
    </thead>
    <tbody>`;

  data.forEach(item => {
    html += `
      <tr>
        <td>${item.id || ""}</td>
        <td>${item.tanggal || ""}</td>
        <td>${item.wilayah || ""}</td>
        <td>${item.kecamatan || ""}</td>
        <td>${item.jenis_pelanggaran || ""}</td>
        <td>${item.nama_tempat || ""}</td>
        <td>${item.jumlah || ""}</td>
        <td>${item.no_surat || ""}</td>
      </tr>`;
  });

  html += "</tbody></table>";
  return html;
}

// ================== FUNGSI CARI DATA (PENCARIAN UMUM) ==================
async function cariData() {
  const inputElement = document.getElementById("inputId");
  const hasilElement = document.getElementById("hasil");
  let kataKunci = inputElement.value.trim().toLowerCase();

  if (!kataKunci) {
    hasilElement.innerHTML = "Silahkan masukkan kata kunci pencarian 🔍";
    return;
  }

  try {
    hasilElement.innerHTML = "Mencari data... ⏳";
    const response = await fetch(url);
    const data = await response.json();

    // FILTER CERDAS
    const hasilFilter = data.filter(item => {
      const id = String(item.id || "").toLowerCase();
      const tanggal = String(item.tanggal || "").toLowerCase();
      const wilayah = String(item.wilayah || "").toLowerCase();
      const kecamatan = String(item.kecamatan || "").toLowerCase();
      const noSurat = String(item.no_surat || "").toLowerCase();

      // LOGIKA BARU:
      // 1. Jika ID sama persis dengan kata kunci (Exact Match)
      // 2. ATAU jika kolom lain mengandung kata kunci (Partial Match)
      return id === kataKunci || 
             tanggal.includes(kataKunci) || 
             wilayah.includes(kataKunci) ||
             kecamatan.includes(kataKunci) ||
             noSurat.includes(kataKunci);
    });

    if (hasilFilter.length > 0) {
      hasilElement.innerHTML = buatTabel(hasilFilter, `Hasil Pencarian: "${kataKunci}"`);
    } else {
      hasilElement.innerHTML = `Data "${kataKunci}" tidak ditemukan ❌`;
    }
  } catch (error) {
    hasilElement.innerHTML = "Gagal mengambil data ⚠️";
  }
}

// ================== FUNGSI FILTER PER MAP ==================
async function tampilkanMap(nomorMap) {
  const hasilElement = document.getElementById("hasil");
  
  try {
    hasilElement.innerHTML = `Mengambil data Map ${nomorMap}... ⏳`;
    const response = await fetch(url);
    const data = await response.json();

    // Filter berdasarkan kolom 'map' di spreadsheet kamu
    const dataMap = data.filter(item => String(item.map) === String(nomorMap));

    if (dataMap.length > 0) {
      hasilElement.innerHTML = buatTabel(dataMap, `Isi Arsip: Map ${nomorMap}`);
    } else {
      hasilElement.innerHTML = `Data untuk Map ${nomorMap} belum tersedia atau kolom 'map' tidak ditemukan di Sheet.`;
    }
  } catch (error) {
    hasilElement.innerHTML = "Gagal memuat data Map ⚠️";
  }
}

// ================== FUNGSI TAMPILKAN SEMUA ==================
async function tampilkanSemua() {
  const hasilElement = document.getElementById("hasil");
  try {
    hasilElement.innerHTML = "Memuat seluruh database... ⏳";
    const response = await fetch(url);
    const data = await response.json();
    hasilElement.innerHTML = buatTabel(data, "Semua Data Arsip");
  } catch (error) {
    hasilElement.innerHTML = "Gagal memuat data ⚠️";
  }
}

// ================== EVENT LISTENER ==================
document.addEventListener("DOMContentLoaded", function () {
  // Sekarang kosong, tidak memanggil tampilkanSemua() di awal agar halaman bersih
  const input = document.getElementById("inputId");
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      cariData();
    }
  });
});