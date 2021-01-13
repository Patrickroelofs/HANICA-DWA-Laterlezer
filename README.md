# Laterlezer | Caracal

![image](https://github.com/HANICA-DWA/sep2020-project-caracal/raw/c366e3cb0c201c7e2425d6f604ff91140915a16a/documents/bsFEmSzQqr.gif?raw=true)

## Wat is LaterLezer

LaterLezer is een tool die het lezen van artikelen beschikbaar en gemakkelijk maakt voor onderzoekers. Dit doet LaterLezer door de gebruiker de mogelijkheid te geven artikelen te kunnen toevoegen aan een persoonlijke bibliotheek, deze artikelen, zoals een website, worden door het systeem opgeschoond en verwijdert van onnodige data zoals advertenties en pagina styling. Met LaterLezer kan de gebruiker ervoor zorgen dat de artikelen die zijn opgeslagen op een logische volgorde gesorteerd worden door middel van folders en tags. LaterLezer heeft ook een browserextensie daarmee zal het voor de gebruiker makkelijker worden om websites te kunnen opslaan in een klik en ze in zijn persoonlijke bibliotheek te zetten.



## Project

Dit project is gemaakt als onderdeel van de ICT studie op de [HAN](https://www.han.nl/), de originele [opdracht](https://github.com/HANICA-DWA/sep2020-project-caracal/blob/new-readme/opdracht/LaterLezer.docx) beschrijft het idee dat vanuit de opdrachtgever kwam. Het 9 weken durende project heeft geresulteerd in een product dat hier opgeslagen staat.



## Installatie

Een gedetailleerd uitleg met beelden wordt besproken in de [Software Guidebook; Operation & Support](https://github.com/HANICA-DWA/sep2020-project-caracal/wiki/Software-Guidebook#operation-and-support) hoofdstuk.

*Zorg ervoor dat de server, client en extension op eigen terminals draaien, de extension is optioneel en is niet verplicht in de werking van de app.*

### Server

```
cd lezerserver
npm install
node ./app.js

// de server zal nu draaien op localhost:3000
```



### Client

```
cd lezerapp
npm install
npm run build:tailwind
npm start

// de client zal nu draaien op localhost:3001
```



### Extension

De extension is niet verplicht voor de werking van app.

```
cd extension
npm install
npm run build:tailwind

-> Maak een .env file in de extension folder met de code;
INLINE_RUNTIME_CHUNK=false

npm run build
-> Plaats de build folder als extension in je Chromium browser

// de extension zal nu draaien op localhost:3002
```



## Roadmap

Toekomstige features zijn beschreven als user stories onder [Issues](https://github.com/HANICA-DWA/sep2020-project-caracal/issues).

## Documentatie

- [Plan van Aanpak](https://github.com/HANICA-DWA/sep2020-project-caracal/wiki/Plan-van-Aanpak)
- [Software Guidebook](https://github.com/HANICA-DWA/sep2020-project-caracal/wiki/Software-Guidebook)
