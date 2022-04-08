# WorldCupCode
# Assignment
```
Napisati javascript program za simlulaciju svetskog prvenstva u fudbalu.

Napraviti grupe po uzoru na žreb za svetsko prvenstvo u Kataru 2022.

Svaku reprezentaciju definišu 2 parametra: Ime, Rang.
Reprezentacije ne mogu deliti isti rang, rang uneti proizvoljno ili sa https://www.fifa.com/fifa-world-ranking/men?dateId=id13603.

Grupna faza se igra u 3 kola po principu svako sa svakim. Pobeda 3 boda, nerešeno 1 bod i poraz ne donosi bodove.
Prioriteti rangiranja ekipa u grupi:
  1. broj bodova
  2. broj bodova && gol razlika (dati/primljeni)
  3. broj bodova && gol razlika (dati/primljeni) && broj postignutih golova
  4. broj bodova && gol razlika (dati/primljeni) && broj postignutih golova && međusobni duel
Ako su ekipe izjednačene posle svih gore navedenih parametara, nasumično izabrati ekipu.

  Grupa A: Katar, Ekvador, Senegal, Holandija
  Grupa B: Engleska, Iran, SAD, Ukrajina
  Grupa C: Argentina, Saudijska Arabija, Meksiko, Poljska
  Grupa D: Francuska, Peru, Danska, Tunis
  Grupa E: Španija, Novi Zeland, Nemačka, Japan
  Grupa F: Belgija, Kanada, Maroko, Hrvatska
  Grupa G: Brazil, Srbija, Švajcarska, Kamerun
  Grupa F: Portugal, Gana, Urugvaj, Južna Koreja

Prve dve ekipe iz grupe idu u eliminacionu fazu, s tim da te dve ekipe ne mogu biti direktni rivali u prvom eliminacionom kolu.
Tokom eliminacione faze ne može biti nerešenog ishoda meča.

Za simulaciju pobednika dovoljno je nasumično izabrati jednu ekipu.

Output treba da sadrži:
  1. sve mečeve grupne faze po kolima i grupama
  2. konačne tabele grupa
  3. sve mečeve eliminacione faze po fazama
  4. pobednika

Primer output-a:
  Grupna faza - I kolo:
    Grupa A:
      Katar 1:0 Ekvador 
      Senegal 2:2 Holandija
    Grupa B:
      Engleska 1:3 Iran
      SAD 0:1 Ukrajina
    ...

  Kraj grupne faze:
    Format: <ime> (<rang>)   <br. pobeda> <br. nerešenih> <br. poraza> <dati golovi>:<primljeni golovi> <bodovi>
    Grupa A: 
    1. Katar (1)           3  0  0  8:3  9
    2. Holandija (4)       2  1  0  6:4  7
    3. Ekvador (9)         2  0  1  3:4  6
    4. Senegal (5)         0  1  2  2:5  1
    ...

  Eliminaciona faza - 1/16 finala:
    (A1)Katar 2:1 (B2)SAD
    (B1)Engleska 0:1 (A2)Holandija
    ...

  Pobednik:
    !!! Holandija !!!


Bonus (opciono):
1. Detaljniji prikaz rezultata meča (rezultat na poluvremenu, produžeci, penali...)
2. Veći međusobni rang povećava šansu za pobedu

Nije dozvoljeno korišćenje dodatnih third party biblioteka (koje već nisu uključene u projekat).
```
### Prerequisites
Installed NODE.js on your system. Refer to https://nodejs.org/en/download/
### Steps to run application (run in command line or terminal):
```
npm install
npm start
```
### Good Luck and Happy Coding
