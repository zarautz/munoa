export class BabelService {
    language: string;
    messages: any = {};

    constructor() {
        this.language = 'eu';
        this.messages = {
            'app': {
                'eu': 'Zarautz App',
                'es': 'Zarautz App',
                'en': 'Zarautz App',
                'fr': 'Zarautz App'
            },
            'loading': {
                'eu': 'Eguneratzen...',
                'es': 'Actualizando...',
                'en': 'Updating...',
                'fr': 'Mise à jour...'
            },
            'error__connection': {
                'eu': 'Ezin izan dira datu berriak jaso. Ziurtatu konektatuta zaudela.',
                'es': 'No se pueden cargar nuevos datos. Compruebe la conexión.',
                'en': 'Can\'t load new data. Check your connection.',
                'fr': 'Impossible de charger de nouvelles données. Vérifiez votre connexion.'
            },
            'error__retry': {
                'eu': 'Berriro saiatu',
                'es': 'Volver a intentar',
                'en': 'Retry',
                'fr': 'Réessayez'
            },
            'error__gmaps': {
                'eu': 'Arazoren bat izan da mapa osatzerakoan',
                'es': 'Ha habido algún problema al crear el mapa',
                'en': 'There was a problem creating the map',
                'fr': 'Il y avait un problème de création de la carte'
            },
            'list__results': {
                'eu': 'emaitza',
                'es': 'resultados',
                'en': 'results',
                'fr': 'résultats'
            },
            'list__no_results': {
                'eu': 'Ez dago emaitzarik',
                'es': 'No hay resultados',
                'en': 'No results found',
                'fr': 'Aucun résultat'
            },
            'list__no_favorites': {
                'eu': 'Oraindik ez duzu faboritorik atal honetan',
                'es': 'No tienes favoritos en este apartado',
                'en': 'You don\'t have favorites in this section',
                'fr': 'Vous n\'avez pas de favoris dans cette section'
            },
            'filter__name': {
                'eu': 'Izena',
                'es': 'Nombre',
                'en': 'Name',
                'fr': 'Nom'
            },
            'filter__price': {
                'eu': 'Prezioa',
                'es': 'Precio',
                'en': 'Price',
                'fr': 'Prix'
            },
            'filter__type': {
                'eu': 'Mota',
                'es': 'Tipo',
                'en': 'Type',
                'fr': 'Catégorie'
            },
            'filter__search': {
                'eu': 'Bilatu',
                'es': 'Buscar',
                'en': 'Search',
                'fr': 'Rechercher'
            },
            //
            // Meta
            //
            'meta__lastUpdated': {
                'eu': 'Azken eguneraketa',
                'es': 'Actualización',
                'en': 'Last updated',
                'fr': 'Actualisée'
            },
            'meta__sources': {
                'eu': 'Informazio jatorriak',
                'es': 'Fuentes',
                'en': 'Sources',
                'fr': 'Sources'
            },
            //
            // News
            //
            'news': {
                'eu': 'Berriak',
                'es': 'Noticias',
                'en': 'News',
                'fr': 'Nouvelles'
            },
            //
            // Events
            //
            'events': {
                'eu': 'Agenda',
                'es': 'Agenda',
                'en': 'Events',
                'fr': 'Activités'
            },
            'event__count': { // % events
                'eu': 'lotutako ekitaldi',
                'es': 'eventos relacionados',
                'en': 'related events',
                'fr': 'événements liés'
            },
            'event__targetAge.children': {
                'eu': 'Haurrentzat',
                'es': 'Para niños',
                'en': 'For children',
                'fr': 'Pour les enfants'
            },
            'event__targetAge.adult': {
                'eu': 'Helduentzat',
                'es': 'Para adultos',
                'en': 'For adults',
                'fr': 'Pour les adultes'
            },
            'event__filter__type__exhibition': {
                'eu': 'Erakusketak',
                'es': 'Exposiciones',
                'en': 'Exhibitions',
                'fr': 'Expositions'
            },
            'event__filter__type__other': {
                'eu': 'Bestelakoak',
                'es': 'Otros',
                'en': 'Other',
                'fr': 'Autre'
            },
            //
            // Forecast
            //
            'forecast': {
                'eu': 'Eguraldia eta itsasoa',
                'es': 'Pronóstico',
                'en': 'Forecast',
                'fr': 'Prévision'
            },
            //
            // Tides
            //
            'tides__level__high': {
                'eu': 'Goian',
                'es': 'Alta',
                'en': 'High',
                'fr': 'Haute'
            },
            'tides__level__low': {
                'eu': 'Behean',
                'es': 'Baja',
                'en': 'Low',
                'fr': 'Basse'
            },
            //
            // Traffic
            //
            'traffic': {
                'eu': 'Trafikoa',
                'es': 'Tráfico',
                'en': 'Traffic information',
                'fr': 'Le traffic'
            },
            //
            // Health
            //
            'health': {
                'eu': 'Osasun zerbitzuak',
                'es': 'Servicios sanitarios',
                'en': 'Health care',
                'fr': 'Santé'
            },
            'health__pharmacies__duty': {
                'eu': 'Guardiako farmaziak',
                'es': 'Farmacias de guardia',
                'en': 'Pharmacies on duty',
                'fr': 'Pharmacies de garde'
            },
            //
            // Places
            //
            'places': {
                'eu': 'Lekuak',
                'es': 'Lugares',
                'en': 'Places',
                'fr': 'Lieux'
            },
            //
            // Point Of Interest
            //
            'poi': {
                'eu': 'Zer ikusi',
                'es': 'Qué ver',
                'en': 'What to see',
                'fr': 'Que voir'
            },
            //
            // Settings
            //
            'settings': {
                'eu': 'Aukerak',
                'es': 'Configuración',
                'en': 'Settings',
                'fr': 'Réglages'
            },
            'settings__about': {
                'eu': 'Aplikazioari buruz',
                'es': 'Acerca de',
                'en': 'About',
                'fr': 'About'
            },
            'settings__about__privacy': {
                'eu': 'Pribatutasun politika',
                'es': 'Política de privacidad',
                'en': 'Privacy policy',
                'fr': 'Politique de confidentialité'
            },
            'settings__about__opensource': {
                'eu': 'Open source',
                'es': 'Open source',
                'en': 'Open source',
                'fr': 'Open source'
            },
            'settings__about__build': {
                'eu': 'Build-a',
                'es': 'Build',
                'en': 'Build',
                'fr': 'Build'
            },
            'settings__about__version': {
                'eu': 'Bertsioa',
                'es': 'Versión',
                'en': 'Version',
                'fr': 'Version'
            },
            'settings__data': {
                'eu': 'Datuak',
                'es': 'Datos',
                'en': 'Data',
                'fr': 'Données'
            },
            'settings__data__cache': {
                'eu': 'Datuak ezabatu',
                'es': 'Borrar datos',
                'en': 'Clear data',
                'fr': 'Effacer les données'
            },
            'settings__general': {
                'eu': 'Orokorrak',
                'es': 'Generales',
                'en': 'General',
                'fr': 'Général'
            },
            'settings__language': {
                'eu': 'Hizkuntza',
                'es': 'Idioma',
                'en': 'Language',
                'fr': 'Langue'
            },
            'settings__language__en': {
                'eu': 'English',
                'es': 'English',
                'en': 'English',
                'fr': 'English'
            },
            'settings__language__es': {
                'eu': 'Castellano',
                'es': 'Castellano',
                'en': 'Castellano',
                'fr': 'Castellano'
            },
            'settings__language__eu': {
                'eu': 'Euskara',
                'es': 'Euskara',
                'en': 'Euskara',
                'fr': 'Euskara'
            },
            'settings__language__fr': {
                'eu': 'Français',
                'es': 'Français',
                'en': 'Français',
                'fr': 'Français'
            },
            'settings__other': {
                'eu': 'Bestelakoak',
                'es': 'Otros',
                'en': 'Other',
                'fr': 'Autres'
            },
            'settings__profile': {
                'eu': 'Perfila',
                'es': 'Perfil',
                'en': 'Profile',
                'fr': 'Profil'
            },
            'settings__profile__tourist': {
                'eu': 'Zarautzera bisitan nator',
                'es': 'Quiero conocer Zarautz',
                'en': 'I want to discover Zarautz',
                'fr': 'Je veux découvrir Zarautz'
            },
            'settings__profile__zarautz': {
                'eu': 'Zarautzen bizi naiz',
                'es': 'Vivo en Zarautz',
                'en': 'I live in Zarautz',
                'fr': 'J\'habite à Zarautz'
            },
            'settings__profile__wizard': {
                'eu': 'Informazio hau eduki egokituak erakusteko erabiliko dugu',
                'es': 'Emplearemos esta información para mostrarte contenidos adaptados',
                'en': 'We will use this information to show you adapted content',
                'fr': 'Nous allons utiliser cette information pour vous montrer contenu adapté'
            },
            'settings__profile__tourist__explanation': {
                'eu': 'Zarautzera oporretan edo asteburu pasa bazatoz, gure herria deskubritu dezakezu aplikazio honekin. Zarautzen egin eta ikusi ditzakezunak eta Zarauzko gida osotua topatuko dituzu bertan.',
                'es': 'Si vienes a Zarautz de vacaciones o a pasar el fin de semana, con esta aplicación puedes descubrir nuestro pueblo. En ella encontrarás una guía completa de Zarautz, así como actividades que puedes ver y realizar.',
                'en': 'If you come to spend a weekend or on holidays to Zarautz, you can use this app to find out what\'s interesting in our town. You will find a complete guide of Zarautz, as well as activities you can see or join.',
                'fr': 'Vous venez un weekend à Zarautz ou vous voulez y passer vos vacances? Avec cette application vous pourrez découvrir notre ville. Vous y trouverez un guide complet de Zarautz, ainsi qu\'un agenda des activités auxquelles vous pouvez participer.'
            },
            'settings__profile__zarautz__explanation': {
                'eu': 'Herriko orainkaria, Zarauzko albiste eta ekitaldiak eguneratuta topatuko dituzu aplikazio honetan. Bestalde Zarauzko gida, bilatzen dituzun tokiak klik batez eskura izateko.',
                'es': 'Noticiario local, en esta aplicación encontrarás noticias y actividades actualizadas de Zarautz. Por otra parte la guía de Zarautz, para tener al alcance de un click los lugares que buscas.',
                'en': 'Zarautz’s breaking news and updated activities that are taking place in the town. On the other hand, Zarautz’s guide so that you can find easily what you are looking for.',
                'fr': 'Apprenez les dernières nouvelles et les activités actuelles de Zarautz, ou consultez le guide de nore ville afin de trouver facilement ce que vous cherchez.'
            },
            //
            // Tides
            //
            'tides': {
                'eu': 'Mareak',
                'es': 'Mareas',
                'en': 'Tides',
                'fr': 'Marées'
            },
            //
            // Weather
            //
            'weather': {
                'eu': 'Eguraldia',
                'es': 'El tiempo',
                'en': 'Weather',
                'fr': 'Météo'
            },
            'weather__uv__title': {
                'eu': 'Kontuz gaur UV izpiekin',
                'es': 'Cuidado hoy con los rayos UV',
                'en': 'Protect yourself from UV today',
                'fr': 'Protegez-vous des rayons UV aujourd\'hui'
            },
            'weather__uv__orange': {
                'eu': 'Eguzkitako betaurrekoak jantzi eta erabil ezazu SPF 30+ duen krema. Arropa eta txapela jantzi eguzkitik babestu ahal izateko, eta saia zaitez ahalik eta eguzki-izpi gutxien jasotzen, goizeko 11etatik arratsaldeko 16ak bitartean.',
                'es': 'Usa crema solar SPF 30+ y gafas de sol. Ponte ropa y sombrero que te proteja de los rayos solares, e intenta estar lo menos expuesto al sol posible entre las 11h y las 16h de la tarde.',
                'en': 'Wear sunglasses and use SPF 30+ sunscreen, cover the body with sun protective clothing and a wide-brim hat, and reduce time in the sun from three hours before to three hours after solar noon.',
                'fr': 'Réduire l\'exposition entre 11 h et 16 h. Appliquer un écran solaire de haute protection (indice de 30 à 50), porter un chapeau et des lunettes de soleil, et se placer à l\'ombre.'
            },
            'weather__uv__red': {
                'eu': 'SPF 30+ko krema erabil ezazu, kamiseta, eguzkitako betaurrekoak eta txapela. Ez zaitez eguzkipean luzaroan egon.',
                'es': 'Usa crema solar SPF 30+, ponte una camiseta, gafas de sol, y un sombrero. No estés expuesto al sol durante largos periodos de tiempo.',
                'en': 'Wear SPF 30+ sunscreen, a shirt, sunglasses, and a hat. Do not stay out in the sun for too long.',
                'fr': 'Sans protection, la peau sera endommagée et peut brûler. L\'exposition au soleil peut être dangereuse entre 11 h et 16 h; la recherche de l\'ombre est donc importante. Sont recommandables le port de vêtements longs, d\'un chapeau et de lunettes de soleil, ainsi que l\'application d\'un écran solaire de très haute protection (indice + 50).'
            },
            'weather__uv__violet': {
                'eu': 'Arreta jartzeaz gain, kontuan har ezazu eguzkitako betaurrekoak eta SPF 30+ duen krema erabili beharko duzula. Hortaz gain, manga luzeko kamiseta, prakak eta txapela jantzi. Azkenik, saia zaitez ahalik eta eguzki-izpi gutxien jasotzen, goizeko 11etatik arratsaldeko 16ak bitartean.',
                'es': 'Además de tomar todas las precauciones, ten en cuenta que es importante que lleves gafas de sol y cremas solar SPF 30+. Cubre tu cuerpo con una camiseta de manga larga, unos pantalones y un sombrero. Por último, intenta estar lo menos expuesto al sol posible entre las 11h y las 16h de la tarde.',
                'en': 'Take all precautions, including: wear sunglasses and use SPF 30+ sunscreen, cover the body with a long-sleeve shirt and trousers, wear a very broad hat, and avoid the sun from three hours before until three hours after solar noon.',
                'fr': 'La peau non protégée sera endommagée et peut brûler en quelques minutes. Toute exposition au soleil est dangereuse, et en cas de sortie il faut se couvrir absolument (chapeau, lunettes de soleil, application d\'un écran solaire de très haute protection d\'indice + 50).'
            },
            //
            // Turismo Bulegoa
            //
            'info': {
                'eu': 'Turismo Bulegoa',
                'es': 'Oficina de Turismo',
                'en': 'Tourist Office',
                'fr': 'Office de Tourisme'
            },
            //
            // Places groups
            //
            // HEALTH
            'placesGroup__health__pharmacy': {
                'eu': 'Farmaziak',
                'es': 'Farmacias',
                'en': 'Pharmacies',
                'fr': 'Pharmacies'
            },
            'placesGroup__health__health_care': {
                'eu': 'Osasun zerbitzuak',
                'es': 'Servicios sanitarios',
                'en': 'Health care',
                'fr': 'Soins de santé'
            },
            'placesGroup__health__dentist': {
                'eu': 'Dentistak',
                'es': 'Dentistas',
                'en': 'Dentists',
                'fr': 'Dentistes'
            },
            'placesGroup__health__doctor': {
                'eu': 'Medikuak',
                'es': 'Médicos',
                'en': 'Doctors',
                'fr': 'Docteurs'
            },
            'placesGroup__health__other': {
                'eu': 'Bestelakoak',
                'es': 'Otros',
                'en': 'Other',
                'fr': 'Autre'
            },
            // PLACES
            'placesGroup__places__wifi': {
                'eu': 'Wi-Fia',
                'es': 'Wi-Fi',
                'en': 'Wi-Fi',
                'fr': 'Wi-Fi'
            },
            'placesGroup__places__atm': {
                'eu': 'Kutxazainak',
                'es': 'Cajeros',
                'en': 'ATMs',
                'fr': 'DABs'
            },
            'placesGroup__places__food': {
                'eu': 'Elikadura',
                'es': 'Alimentación',
                'en': 'Food',
                'fr': 'Alimentation'
            },
            'placesGroup__places__eating': {
                'eu': 'Non jan',
                'es': 'Donde comer',
                'en': 'Where to eat',
                'fr': 'Où manger'
            },
            'placesGroup__places__lodging': {
                'eu': 'Non lo egin',
                'es': 'Donde dormir',
                'en': 'Where to sleep',
                'fr': 'Où dormir'
            },
            'placesGroup__places__drinking': {
                'eu': 'Tabernak',
                'es': 'Bares',
                'en': 'Bars',
                'fr': 'Bars'
            },
            'placesGroup__places__shopping': {
                'eu': 'Dendak',
                'es': 'Tiendas',
                'en': 'Shopping',
                'fr': 'Magasins'
            },
            'placesGroup__places__sports': {
                'eu': 'Kirolak',
                'es': 'Deporte',
                'en': 'Sport',
                'fr': 'Sport'
            },
            'placesGroup__places__parking': {
                'eu': 'Parking',
                'es': 'Parkings',
                'en': 'Parkings',
                'fr': 'Parkings'
            },
            'placesGroup__places__transport': {
                'eu': 'Garraiobideak',
                'es': 'Transportes',
                'en': 'Transport',
                'fr': 'Transport'
            },
            'placesGroup__places__recycling': {
                'eu': 'Birziklaketa',
                'es': 'Reciclaje',
                'en': 'Recycling',
                'fr': 'Recyclage'
            },
            'placesGroup__places__police': {
                'eu': 'Polizia',
                'es': 'Policía',
                'en': 'Police',
                'fr': 'Police'
            },
            // POIs
            'placesGroup__poi__poi': {
                'eu': 'Interes guneak',
                'es': 'Puntos de interés',
                'en': 'Points of interest',
                'fr': 'Points d\'intérêt'
            },
            'placesGroup__poi__nature': {
                'eu': 'Natura',
                'es': 'Naturaleza',
                'en': 'Nature',
                'fr': 'Nature'
            },
            'placesGroup__poi__culture': {
                'eu': 'Kultur guneak',
                'es': 'Centros culturales',
                'en': 'Cultural centers',
                'fr': 'Centres culturels'
            },
            'placesGroup__poi__sculpture': {
                'eu': 'Eskulturak',
                'es': 'Esculturas',
                'en': 'Sculptures',
                'fr': 'Sculptures'
            },
            'placesGroup__poi__architecture': {
                'eu': 'Arkitektura',
                'es': 'Arquitectura',
                'en': 'Architecture',
                'fr': 'Architecture'
            },
            'placesGroup__poi__children': {
                'eu': 'Haurrentzat',
                'es': 'Para niños',
                'en': 'For children',
                'fr': 'Pour les enfants'
            },
            //
            // Other
            //
            'murkil': {
                'eu': 'Murkileko kidea',
                'es': 'Socio de Murkil',
                'en': 'Murkil member',
                'fr': 'Murkil membre'
            }
        };
    }

    setLanguage(language: string) {
        this.language = language;
    }

    translate(messageKey: string) {
        if (messageKey in this.messages) {
            return this.messages[messageKey][this.language];
        } else {
            return messageKey;
        }
    }
}
