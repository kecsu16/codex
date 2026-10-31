# Növekedési pályák – modell 1.0.0

24 havi, determinisztikus, nettó modell, áfa, adó, hitel, készlet, amortizáció és kezdő követelés/tartozás nélkül. Folytonos mennyiségek (egyenértékű termékegységek), állandó árak. Minden példa szintetikus.

## Eseménysorrend (a motor implementálása előtt rögzített specifikáció)
1. Nyitó pénz; korábbi teljesítések most esedékes vevői bevételei.
2. Korábbi anyagszámlák, az aktuális teljes bér, fix és értékesítési működési költség kifizetése, ebben a sorrendben. Az egyszeri folyamatfejlesztési beruházás külön pénzkiadás. Ha nincs fedezet, csak a rendelkezésre álló pénzt fizetjük ki; a maradékot kategóriánként kimutatjuk, és a hónapban már nincs termelés. A pálya végleg leáll. Későbbi hónapok nem nulla eredmények.
3. Új rendelés = induló havi rendelés × (1+g)^(hó−1), aktív értékesítési beavatkozás szorzójával. Rendeléskészlet = előző záró + új.
4. Kapacitás = max(0, régi létszám − betanítási teher + új létszám × termelékenység) × fajlagos kapacitás × folyamat-szorzó. Új dolgozó termelékenysége az első hónapban p0, L betanulási hónap alatt lineárisan nő; a felvétel utáni L. hónaptól 1. L=0 esetén azonnal 1. Teher csak betanulás alatt. A fejlesztés a kezdő hónaptól D hónapig kiesést okoz, utána javulást; D=0 azonnali javulás.
5. Az előfinanszírozandó egységköltség u = egyéb változó költség + (anyagköltség, ha a szállítói határidő 0). Finanszírozható mennyiség F=pénz/u; u=0 esetén korlátlan. Teljesítés Q=min(rendeléskészlet, kapacitás, F). A nulla hónapos vevői fizetés NEM használható a saját termelésének finanszírozására. Ez konzervatív, körkörösséget elkerülő feltevés. Halasztott anyagszámla fedezetét nem tartalékoljuk: a jövőbeli likviditásra nézve optimista, később fizetési hiányhoz vezethet.
6. Azonnali változó kifizetés Q×u; árbevétel Q×ár. A vevői pénz késleltetett sorba kerül, 0 hónapnál azonnal beérkezik. Halasztott anyagszámla a szállítói sorba kerül. Szállítói késedelem csak az anyagköltségre vonatkozik, egyéb változó költség azonnali.
7. Záró rendelés=nyitó+új−Q; záró pénz=nyitó+bevételek−tényleges kiadások. Működési eredmény=árbevétel−Q×(anyag+egyéb változó)−teljes havi bér−fix−értékesítési működési költség. Beruházás nincs az eredményben. Követelések és kötelezettségek a lejárati sorok összegei, a 24. hónapon túli tételekkel együtt. Hiányos hónap eredménye tartalmazza az esedékes, ki nem fizetett működési költségeket is.

Minimumhoz azonos toleranciával illeszkedő korlátok egyszerre jelennek meg; minden mennyiség nulla esetén ez matematikai egyidejűséget jelez. Finanszírozási probléma az első fizetési hiány VAGY a rendelés és kapacitás által lehetséges termelés pénzhiány miatti korlátozása. Minimum pénz a hónapon belüli kifizetések utáni mélypontot is tartalmazza.

## Értelmezési korlátok
Nincs kereslet-visszacsatolás, rendeléstörlés, szezon, dolgozói fluktuáció, minőségveszteség vagy hitelezési döntés. Leállítás után nincs behajtás vagy felszámolás modellezve. A csonka pályák összesítése csak a megfigyelt hónapokra érvényes, nem hasonlítható automatikusan teljes pályához. A modell érzékenységet vizsgál, nem empirikus bizonyíték és nem biztos előrejelzés. Nincs egészségpontszám vagy általánosan legjobb stratégia.

## Kézzel ellenőrizhető 3 hónap
Kezdő pénz 1000 Ft, rendelés 0, havi új 10 db, növekedés 0%, ár 100 Ft, anyag 20 Ft, egyéb 10 Ft, fix 100 Ft, 1 dolgozó × 10 db, bér 100 Ft; vevő 1 hó, szállító 1 hó; beavatkozás nincs.

| Hó | Új / teljesítés | Árbevétel | Műk. eredmény | Pénzbevétel | Pénzkiadás | Záró pénz | Követelés | Szállító |
|---|---|---|---|---|---|---|---|---|
|1|10 / 10|1000|500|0|300|700|1000|200|
|2|10 / 10|1000|500|1000|500|1200|1000|200|
|3|10 / 10|1000|500|1000|500|1700|1000|200|
