# Ellenőrzési jegyzőkönyv

Ténylegesen végrehajtva 2026. október 31-én, Node.js 24.19.0 környezetben.

## Sikeresen lefuttatott ellenőrzések

- `npm ci --no-audit --no-fund --fetch-retries=0 --fetch-timeout=15000`: lockfájlból tiszta újratelepítés sikeres.
- `npm test`: **10 teszt sikeres, 0 hibás, 0 kihagyott**. Részletes esetek a `src/model.test.ts` fájlban. A megmaradási teszt több vevői/szállítói késedelem és induló pénz kombinációját végigjárja.
- Kézi példa: 3 hónapban záró pénz 700, 1200, 1700 Ft, havonta 500 Ft működési eredmény, 1000 Ft követelés és 200 Ft szállítói tartozás; automatikus tesztben is egyeztetve.
- `npm run build`: TypeScript-ellenőrzés és Vite production build sikeres. Nem blokkoló figyelmeztetés: a diagramkönyvtárat is tartalmazó JS-csomag nagyobb 500 kB-nál (kb. 636 kB tömörítetlenül, 193 kB gzip).
- Tényleges Chromium böngészős próba a helyben futó Vite alkalmazáson: kezdőképernyő és három diagramvonal; 24 soros adattábla; induló pénz módosítása; új forgatókönyv mentése; azonos alapra újraszámolás; JSON letöltése, tartalmi ellenőrzése és visszatöltése; CSV letöltése és metaadatainak ellenőrzése; érzékenységi táblázat; módszertani nézet.
- 390 px széles mobilnézet: nincs teljes oldalas vízszintes túlcsordulás, a mobilmenü és navigáció működik. 1440 px asztali nézetben és mobilon képernyőkép készült, az asztali képet vizuálisan is ellenőriztük.
- A fenti böngészős folyamat során nem keletkezett JavaScript-kivétel.

## Futtatási környezetből eredő, feloldott problémák

A sandbox blokkolta a hálózati kapcsolatokat és a `tsx` CLI IPC-socketjét. A csomagtelepítés a támogatott jogosultsági útvonalon, TLS-ellenőrzéssel történt. A tesztparancs `node --import tsx src/model.test.ts`, amely közvetlenül futtatja a Node teszteket, IPC nélkül. Az első `node --test` parancs egyetlen fájlszintű eredményt jelentett ebben a környezetben; a végleges közvetlen futtatás mind a 10 név szerinti tesztet kiírja. Ez a dokumentum a végleges futtatásról számol be.

## Nem végrehajtott, későbbi ellenőrzések

Valós vállalati adatgyűjtés és történeti kalibrálás; független vállalati validálás; Safari/Firefox és fizikai mobileszközök tesztje; teljes képernyőolvasós akadálymentességi audit; többváltozós érzékenység; nagyobb, valós importállományokon végzett robusztussági vizsgálat. Ezekhez nem társul sikerességi állítás. A környezet publikálása és új feladatban történő visszaállítása nem volt ellenőrizve.
