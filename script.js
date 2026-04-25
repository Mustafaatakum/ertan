let veriler = JSON.parse(localStorage.getItem('kasa_v8')) || [];

function sayfaAc(id) {
    document.querySelectorAll('.sayfa-icerik').forEach(s => s.classList.add('hidden'));
    document.getElementById('sayfa-' + id).classList.remove('hidden');
    if(id === 'liste') tabloGuncelle();
}

function tabloGuncelle() {
    const tbody = document.getElementById('kasa-tbody');
    let toplam = 0;
    tbody.innerHTML = '';
    
    veriler.forEach((islem, i) => {
        if(islem.tur === 'Gelir') toplam += islem.tutar; else toplam -= islem.tutar;
        tbody.innerHTML += <tr class="border-b font-medium">
            <td class="p-3 text-[10px] font-black \">\</td>
            <td>\</td>
            <td class="text-right font-black">\ ₺</td>
            <td class="text-center"><button onclick="sil(\)">❌</button></td>
        </tr>;
    });
    document.getElementById('toplam-alan').innerText = toplam.toLocaleString() + ' ₺';
    document.getElementById('toplam-alan').className = toplam >= 0 ? "mt-4 text-3xl font-bold text-green-400" : "mt-4 text-3xl font-bold text-red-400";
}

function kayitYap() {
    const ad = document.getElementById('input-ad').value;
    const tutar = parseFloat(document.getElementById('input-tutar').value);
    const tur = document.getElementById('input-tur').value;

    if(!ad || isNaN(tutar)) return alert("Eksik bilgi!");

    veriler.push({ tur, ad, tutar });
    localStorage.setItem('kasa_v8', JSON.stringify(veriler));
    document.getElementById('input-ad').value = '';
    document.getElementById('input-tutar').value = '';
    sayfaAc('liste');
}

function sil(i) { if(confirm("Silinsin mi?")) { veriler.splice(i, 1); localStorage.setItem('kasa_v8', JSON.stringify(veriler)); tabloGuncelle(); } }
function kasaSifirla() { if(confirm("Her şey silinsin mi?")) { veriler=[]; localStorage.removeItem('kasa_v8'); location.reload(); } }

tabloGuncelle();
