
async function sendData() {
  const formData = new URLSearchParams();
  const formArvosanat = document.querySelector("#kurssiarvosanat").value;
  formData.append("kurssiarvosanat", formArvosanat)

  try {
    const response = await fetch("http://localhost:3000/lataa", {
      method: "POST",
      body: formData,
    });
    // TODO: kirjoita vastaus html:ään ja tyhjennä lomake

    const data = await response.json();
    if (data.viesti === "ok") {
      document.getElementById("lataustulos").innerHTML = "Lisätty onnistuneesti"
    }
    else {
      document.getElementById("lataustulos").innerHTML = "Lisäys ei onnistunut"
    }

  } catch (e) {
    // TODO: kirjoita vastaus html:ään
    console.error(e);
  }
}

async function search() {
  const formKurssi = document.querySelector("#kurssi").value.trim();  // trim() poistaa turhat välilyönnit
  const formOpiskelija = document.querySelector("#opiskelija").value.trim();

  // Tarkistetaan, että molemmat kentät on täytetty
  if (!formKurssi || !formOpiskelija) {
    console.log('Ei löytynyt');
    return;  // Lopetetaan funktio, jos kentät ovat tyhjiä
  }

  const formData = new URLSearchParams();
  formData.append("kurssi", formKurssi);
  formData.append("opiskelija", formOpiskelija);

  try {
    const response = await fetch("http://localhost:3000/hae", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
let vastaus =""
    if (Array.isArray(data) && data.length === 0) {
      console.log('Ei tuloksia');
    } else if (Array.isArray(data) && data.length > 0) {
      console.log('Onnistui');
      data.forEach(item => {
        vastaus+= `Nimi: ${item.opiskelija}, Kurssi: ${item.kurssi}, Arvosana: ${item.arvosana} ` 
      });
    } else {
      console.log('Ei');
    }
    document.getElementById("hakutulos").innerHTML = vastaus;

  } catch (e) {

    console.error(e);
  }
}

// Take over form submissions
document.querySelector("#lisaa").addEventListener("submit", (event) => {
  event.preventDefault();
  sendData();
});

document.querySelector('#haku').addEventListener('submit', (event) => {
  event.preventDefault();
  search();
});
