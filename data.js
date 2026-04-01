// ================== CONFIG KE DATABASE ==================
const url = "https://opensheet.elk.sh/1leYp4Pagt5PSO7QRbnH5wzmb7mUp6THboJ53Yxa-CE8/Sheet1";

// ================== FUNGSI TAMPILKAN SEMUA DATA ==================
async function tampilkanSemua() {
  const hasilElement = document.getElementById("hasil");
  
  try {
    hasilElement.innerHTML = "Sedang mengambil semua data... ⏳";
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.length > 0) {
      // Membuat tabel manual dengan atribut border agar garis terlihat tanpa CSS
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
    hasilElement.innerHTML = "Masukkan ID dulu ya ❗";
    return;
  }

  try {
    hasilElement.innerHTML = "Loading... ⏳";

    const response = await fetch(url);
    const data = await response.json();
    const hasil = data.find(item => item.id && String(item.id).trim().toLowerCase() === inputId.toLowerCase());

    if (hasil) {
      hasilElement.innerHTML = `
        <h3>Hasil Pencarian:</h3>
        ID: ${hasil.id} <br>
        Tanggal: ${hasil.tanggal} <br>
        Wilayah: ${hasil.wilayah} <br>
        Kecamatan: ${hasil.kecamatan} <br>
        Nama Toko: ${hasil.nama_toko} <br>
        Jumlah: ${hasil.jumlah} <br>
        No Surat: ${hasil.no_surat}
      `;
    } else {
      hasilElement.innerHTML = "Data tidak ditemukan ❌";
    }

  } catch (error) {
    hasilElement.innerHTML = "Gagal mengambil data ⚠️";
  }
}

// ================== ENTER UNTUK CARI ==================
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("inputId");
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      cariData();
    }
  });
});