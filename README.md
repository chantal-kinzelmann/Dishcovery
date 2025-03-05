Dishcovery - Rezeptblog

von Chanti, Tim, Julian, Niels 
________________________________________________________________________________________________________________________
WIE ÖFFNE ICH DAS PROJEKT IM BROWSER?

open the website with ng serve --open
- funktioniert nicht? Bist du im richtigen ordner? - cd Dishcovery/
________________________________________________________________________________________________________________________
WIE ERSTELLE ICH EINE KOMPONENTE?

ng generate component "name" --standalone
________________________________________________________________________________________________________________________
BEZÜGLICH STYLES

- Bitte in den Styles nicht extra eine Schrift angeben. Dies wurde bereits in der app.components.scss gestylt.
- Button ist auch in der Datei gestylt. Muss also nicht jedes mal extra gestylt werden. 
________________________________________________________________________________________________________________________
ICH WILL ROUTING EINFÜGEN! Aber wie?

- gehe in app.routes.ts
    - importiere die Datei auf die du routen möchtest
    - füge sie zu export const routes hinzu:
        { path: 'KomponentenAlias', component: DeineKomponente } 
- Importiere Routerlink in der Datei in der du Routen möchtest. Auch in die imports [] schreiben. 
    - Wenn du das Routing auf einen Button packen willst sieht das dann so aus:
       <button type="button" routerLink="/KomponentenAlias"></button>
    - ohne button
        <a routerLink="/profile" routerLinkActive="active">Profil</a>

<-Fall du das gefühl hast es sollte funktionieren, aber tut es einfach nicht starte den Server neu..->
________________________________________________________________________________________________________________________
ICH WILL ICONS BENUTZEN! Aber wie?

- In der Index.html ist bereits in Link eingebunden der die zugriff auf Icons gibt! :D
- Suche dir auf https://fontawesome.com/icons ein Icon aus
- Wenn du auf das Icon klickst, wird dir direkt das HTML Tag angezeigt. Kann auch direkt so genutzt werden. 




   
