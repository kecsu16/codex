# Módszertani ismertető és vállalati ellenőrzési terv

## Kutatási cél és eljárás

A prototípus a „Növekedési korlátok és alkalmazkodási válaszok a kis- és középvállalkozásokban – eltérő növekedési pályák összehasonlító vizsgálata” témájához készült. A központi kérdés az, milyen feltételezések mellett javítja egy beavatkozás a teljesítést, és mikor helyezi át a korlátot a termelési kapacitásról a finanszírozásra vagy fordítva. Az elemzés tárgya egy rendelésre gyártó vállalat egyszerűsített működése, nem a vállalat egészének minősítése.

A módszer diszkrét időlépésű, determinisztikus, mechanizmusokat feltáró szimuláció. Az időtáv 24 hónap; a paraméterezés változatlan bemenetek mellett azonos eredményre vezet. A modell követi a rendelésállomány, pénzállomány, vevőkövetelések és kötelezettségek alakulását. A teljesítést a rendelés, az effektív kapacitás és az azonnali költségekre rendelkezésre álló pénz minimuma határozza meg. A betanulás fokozatos termelékenység-növekedést és időleges mentorálási terhet jelent. A pénz és eredmény elkülönül, a fizetési határidők lejárati sorokban szerepelnek. A részletes formalizálást a MODEL.md tartalmazza.

Az alapforgatókönyv változatlan működését az értékesítésbővítéssel, létszámfelvétellel, folyamatfejlesztéssel és ezek kombinációival lehet összevetni. Az értelmezhető összehasonlítás feltétele azonos kezdeti állomány és azonos külső paraméterek használata. A felület ezért mentett paraméterpillanatokat használ, és jelzi az eltérő kiinduló alapot. A teljes és fizetési hiány miatt megszakadt pályákat külön kell kezelni: a csonka összeg nem 24 havi kimenet.

A vizsgálandó állítások a kapacitás és forgótőke kölcsönhatására, a kereslet kapacitás nélküli bővítésére, a betanítás rövid távú terhére és a fejlesztés időzítési hatására vonatkoznak. Ezek a mechanizmusok a modell szerkezetének részei; a szimuláció önmagában nem igazolja valós vállalatokban az állítások érvényességét. A megállapításokat „a megadott feltételezések mellett” kell értelmezni. A prototípushoz nem használtunk valós vállalati vagy iparági adatot, és nem állítunk szakirodalommal nem alátámasztott általános kutatási eredményt.

## Érzékenység és robusztusság

A felület a vevői fizetési késedelmet, havi rendelésnövekedést és betanulási időt egyenként változtatja, a többi paramétert rögzítve. Az összevetés összesített működési eredmény, összes teljesítés vagy legkisebb pénzállomány alapján történhet. E három cél eltérő sorrendet eredményezhet; nincs általános legjobb stratégia. A későbbi elemzésben többváltozós rácsvizsgálat, paraméter-interakciók és bizonytalansági tartományok szükségesek; ezek nem részei a jelenlegi felületnek.

## Szükséges vállalati adatgyűjtés

- Rendelésazonosító, dátum, mennyiség, határidő, törlés és teljesítés; eltérő termékeknél dokumentált egyenérték-egység.
- Számlák nettó értéke, kiállítás, esedékesség és tényleges pénzügyi teljesítés; szállítóknál ugyanez.
- Havi nyitó és záró pénz, induló követelések és kötelezettségek korosítása, készlet. A nem nulla kezdő tételekhez a prototípust bővíteni kell.
- Anyagfelhasználás, változó költség, fix költség, teljes munkáltatói költség és beruházási pénzkiadás elkülönítve.
- Létszám, belépési idő, munkaidő, műszak, termelékenység, mentorálási idő, kiesések és fejlesztési dátumok.

Az adatokat anonimizálni kell; minden változó mértékegységét, forrását, becslési módját és hiányát külön adatjegyzékben kell rögzíteni. A jelenlegi eredetjelölés paraméterkészlet-szintű, részletes vállalati auditot nem helyettesít.

## Kalibrálás és független ellenőrzés

1. A vizsgálat előtt rögzítendő a vállalat beválasztása, időszak, célváltozók és elfogadható hibatartományok. Legalább 18–30 hónap adatsor indokolt a tervezett 12–18 havi kalibrálás és 6–12 havi ellenőrzés elkülönítéséhez; rendelkezésre állás hiányában szűkebb következtetés fogalmazható meg.
2. Az első időszakból becsülhető kapacitás, fizetési késedelem, költség és betanulási görbe. A valós késedelmek eloszlását nem szabad észrevétlenül egy egész hónapos állandóval azonosítani; a közelítés hibáját mérni kell.
3. A paramétereket rögzíteni kell a későbbi tesztidőszak megtekintése előtt. Az ellenőrzéshez ténylegesen megfigyelt kereslet és létszámbeavatkozás használható; a jelenlegi exponenciális keresletmodell időben változó adatbevitelhez bővítést igényel.
4. A kalibrálásra nem használt időszakon mérendő a teljesítés, rendelésállomány és pénz havi abszolút hibája, az első likviditási probléma időzítési hibája és a korlátjelzések egyezése. Nullás adatoknál százalékos hibamutató nem megfelelő. A hiányzó és megszakadt hónapokat külön kell jelenteni.
5. Egyszerű változatlan működésű referencia, gördülő időbeli ellenőrzés, majd lehetőség szerint második vállalat adjon összehasonlítási alapot. A tesztadatokra utólag illesztett modellhez új független ellenőrzés szükséges.

Az empirikus validálás, tényleges adatgyűjtés, többváltozós érzékenység és szakirodalmi elhelyezés jövőbeli kutatási feladat, nem elvégzett vizsgálat.
