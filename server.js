import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

let diakok = [
  { id: 101, nev: "Kovács Péter", szak: "Szoftverfejlesztő" },
  { id: 102, nev: "Nagy Anna", szak: "Hálózatépítő" }
];

app.get('/api/diakok', (req, res) => {
  res.status(200).json(diakok);
});

app.listen(PORT, () => {
  console.log(`A szerver fut: http://localhost:${PORT}`);
});

app.post('/api/diakok', (req, res) => {
  const ujDiak = {
    id: diakok.length > 0 ? diakok[diakok.length - 1].id + 1 : 101,
    nev: req.body.nev,
    szak: req.body.szak
  };

  diakok.push(ujDiak);
  res.status(201).json(ujDiak);
});

app.put('/api/diakok/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const diak = diakok.find(d => d.id === id);

  if (!diak) {
    return res.status(404).json({ uzenet: "A keresett diák nem található!" });
  }

  diak.nev = req.body.nev || diak.nev;
  diak.szak = req.body.szak || diak.szak;

  res.status(200).json(diak);
});

app.delete('/api/diakok/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = diakok.findIndex(d => d.id === id);

  if (index === -1) {
    return res.status(404).json({ uzenet: "A törlendő diák nem található!" });
  }

  diakok.splice(index, 1);
  res.status(204).send();
});
