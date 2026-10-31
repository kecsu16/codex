# Növekedési pályák

Magyar, React + TypeScript kutatási prototípus rendelésre gyártó kisvállalkozások 24 hónapos pályáinak összevetésére. Minden beépített adat szintetikus. A böngészőben fut, backend, regisztráció, API-kulcs és külső adatküldés nélkül. A telepítéshez npm hálózati hozzáférés szükséges; a kész alkalmazás külső szolgáltatást nem használ.

## Letöltés saját gépre

GitHubon: **Code → Download ZIP**, majd csomagold ki. A kicsomagolt mappát átnevezheted `novekedesi-palyak` névre. A részletes saját gépes útmutató az [INDITAS.txt](INDITAS.txt) fájlban található.

## Indítás

Node.js 22.12+ (ellenőrizve: 24.19.0), npm.

```sh
cd novekedesi-palyak
npm ci
npm test
npm run build
npm run dev -- --host 127.0.0.1 --port 5173
```

A Vite a terminálban jelzi az elérési címet. Éles statikus kiszolgáláshoz a `dist/` könyvtár tartalmát kell szolgáltatni. A fejlesztői szerver nem éles üzemre készült.

## Rövid használat

1. A demó már három pályával indul: alap, értékesítés, létszám.
2. A Kiinduló helyzet alatt add meg a paramétereket és adatforrásukat. A meglévő mentések saját bemeneteiket megőrzik.
3. A Forgatókönyvek alatt kombináld és mentsd a beavatkozásokat. Az „Azonos alapra újraszámolás” gomb kifejezetten lecseréli a mentett pályák kiinduló paramétereit az aktuálisakra.
4. Az Áttekintésben válassz mutatót, diagramot vagy adattáblát; nézd meg a havi korlátokat, hiányokat és a leállási hónapot.
5. Az Érzékenységvizsgálat mindegyik beavatkozást az aktuális alapból számítja, egy feltevést változtatva; a részleges pályákat kizárja a teljes pályák rangsorából. A holtversenyeket egyenlőségjel jelöli.
6. Exportáld a JSON-t az oldal bezárása előtt. Nincs automatikus böngészőtáras mentés. A JSON visszatölthető. A CSV minden ténylegesen számolt hónapot, modellverziót, paramétereket és döntéseket tartalmaz; hiányzó későbbi hónapokat nem hamisít nullára. Elválasztó pontosvessző, tizedesjel vessző, UTF-8 BOM.

A bevitt adat eredete a teljes paraméterkészletre megadható: demonstráció, becslés vagy vállalati adat. Vegyes források részletes auditnyilvántartása későbbi bővítés.

## Szerkezet és átadás

- `src/model.ts`: tiszta determinisztikus számítás, validálás, CSV.
- `src/main.tsx`: helyi állapotú felület, összehasonlítás és érzékenység.
- `src/model.test.ts`: megmaradási, időzítési, betanulási, szélsőeseti és exportszerkezeti tesztek.
- [MODEL.md](MODEL.md): a motor előtt rögzített eseménysorrend, képletek, feltevések, kézi háromhónapos példa.
- [METHODOLOGY.md](METHODOLOGY.md): szakdolgozathoz használható módszertani ismertető és későbbi vállalati ellenőrzés terve.
- [VALIDATION.md](VALIDATION.md): ténylegesen futtatott és csak javasolt ellenőrzések.

Nem készült empirikus kutatás vagy vállalati kalibrálás. A prototípus nem üzleti előrejelzés, a paraméterérzékenység nem empirikus bizonyíték. A pénzállomány változása nem nyereség. A modell nettó, áfa-, adó-, amortizáció- és hitelmentes. Leállítás után nincs behajtási vagy felszámolási modell.
