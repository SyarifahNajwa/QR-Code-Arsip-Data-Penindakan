// ================== CONFIG KE DATABASE ==================
const url = "https://opensheet.elk.sh/1leYp4Pagt5PSO7QRbnH5wzmb7mUp6THboJ53Yxa-CE8/Sheet1";

// ================== FUNGSI TAMPILKAN SEMUA DATA ==================
async function tampilkanSemua() {
  const hasilElement = document.getElementById("hasil");
  
  try {
    hasilElement.innerHTML = "Sedang mengambil data... ⏳";
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.length > 0) {
      let htmlTabel = "<h3>Daftar Seluruh Data</h3>";
      htmlTabel += '<table border="1" cellpadding="5" cellspacing="0">';
      htmlTabel += `
        <thead>
          <tr>
            <th>ID</th>
            <th>Tanggal</th>
            <th>Wilayah</th>
            <th>Kecamatan</th>
            <th>Nama Toko</th>
            <th>Jumlah</th>
            <th>No Surat</th>
          </tr>
        </thead>
        <tbody>`;

      data.forEach(item => {
        htmlTabel += `
          <tr>
            <td>${item.id || ""}</td>
            <td>${item.tanggal || ""}</td>
            <td>${item.wilayah || ""}</td>
            <td>${item.kecamatan || ""}</td>
            <td>${item.nama_toko || ""}</td>
            <td>${item.jumlah || ""}</td>
            <td>${item.no_surat || ""}</td>
          </tr>`;
      });

      htmlTabel += "</tbody></table>";
      hasilElement.innerHTML = htmlTabel;
    } else {
      hasilElement.innerHTML = "Tidak ada data di database.";
    }
  } catch (error) {
    console.error(error);
    hasilElement.innerHTML = "Gagal mengambil data ⚠️";
  }
}

// ================== FUNGSI CARI DATA (ID) ==================
async function cariData() {
  const inputElement = document.getElementById("inputId");
  const hasilElement = document.getElementById("hasil");

  let inputId = inputElement.value.trim();

  if (!inputId) {
    // Jika input kosong, tampilkan kembali semua data
    tampilkanSemua();
    return;
  }

  try {
    hasilElement.innerHTML = "Mencari... ⏳";

    const response = await fetch(url);
    const data = await response.json();
    const hasil = data.find(item => item.id && String(item.id).trim().toLowerCase() === inputId.toLowerCase());

    if (hasil) {
      hasilElement.innerHTML = `
        <h3>Hasil Pencarian:</h3>
        <button onclick="tampilkanSemua()">⬅ Kembali ke Semua Data</button><br><br>
        <b>ID:</b> ${hasil.id} <br>
        <b>Tanggal:</b> ${hasil.tanggal} <br>
        <b>Wilayah:</b> ${hasil.wilayah} <br>
        <b>Kecamatan:</b> ${hasil.kecamatan} <br>
        <b>Nama Toko:</b> ${hasil.nama_toko} <br>
        <b>Jumlah:</b> ${hasil.jumlah} <br>
        <b>No Surat:</b> ${hasil.no_surat}
      `;
    } else {
      hasilElement.innerHTML = `Data tidak ditemukan ❌ <br><br> <button onclick="tampilkanSemua()">Lihat Semua Data</button>`;
    }

  } catch (error) {
    hasilElement.innerHTML = "Gagal mengambil data ⚠️";
  }
}

// ================== OTOMATIS JALAN SAAT BUKA WEB ==================
document.addEventListener("DOMContentLoaded", function () {
  // 1. Langsung panggil fungsi tampilkan semua
  tampilkanSemua();

  // 2. Setup event listener untuk Enter
  const input = document.getElementById("inputId");
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      cariData();
    }
  });
});