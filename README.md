Dishcovery - Rezeptblog

von Chanti, Tim, Julian, Niels 


open the website with ng serve --open


Wie schaue ich meine Komponente an, ohne das ich die Komponente in app.component.ts einfügen muss. 

1. Du erstellst deine Komponete mit dem Befehl -> ng generate component "name"" --standalone
    Für was das "--standalone"? Standalone-Komponenten machen Angular flexibler, einfacher und performanter.
    Da unser Projekt bereits bootstrapApplication() nutzt, machen wir das auch :D

2. main.ts anpassen, um mit Komponente zu starten

    folgendes einfügen:
    import { deineKomponente } from 'der Pfad zu deiner Komponente';

    //Diese Zeile ist schon vorhanden, aber wir passen den ersten Paramater an
    bootstrapApplication(deineKomponete, appConfig)
    .catch((err) => console.error(err));

3. Falls du manchmal AppComponent und manchmal deineKomponente testen willst, kannst du einfach in main.ts zwischen diesen Zeilen wechseln:
    bootstrapApplication(AppComponent, appConfig); // Startet die App-Component
    bootstrapApplication(deineKomponete, appConfig); // Startet deine Komponente