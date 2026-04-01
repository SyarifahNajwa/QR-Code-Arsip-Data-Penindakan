// ================== CONFIG ==================
const url = "https://opensheet.elk.sh/1leYp4Pagt5PSO7QRbnH5wzmb7mUp6THboJ53Yxa-CE8/Sheet1";

// ================== FUNGSI CARI DATA ==================
async function cariData() {
  const inputElement = document.getElementById("inputId");
  const hasilElement = document.getElementById("hasil");

  let inputId = inputElement.value.trim();

  // Validasi input kosong
  if (!inputId) {
    hasilElement.innerHTML = "Masukkan ID dulu ya ❗";
    return;
  }

  try {
    hasilElement.innerHTML = "Loading... ⏳";

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    console.log("Data dari Sheets:", data); // debug

    // Cari data berdasarkan ID (aman untuk string/angka, trim & lowercase)
    const hasil = data.find(item => item.id && String(item.id).trim().toLowerCase() === inputId.toLowerCase());

    if (hasil) {
      hasilElement.innerHTML = `
        <b>ID:</b> ${hasil.id} <br>
        <b>Tanggal:</b> ${hasil.tanggal} <br>
        <b>Wilayah:</b> ${hasil.wilayah} <br>
        <b>Kecamatan:</b> ${hasil.kecamatan} <br>
        <b>Nama Toko:</b> ${hasil.nama_toko} <br>
        <b>Jumlah:</b> ${hasil.jumlah} <br>
        <b>No Surat:</b> ${hasil.no_surat}
      `;
    } else {
      hasilElement.innerHTML = "Data tidak ditemukan ❌";
    }

  } catch (error) {
    console.error("Terjadi error:", error);
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