const prefixes = `PREFIX : <http://noi.example.org/ontology/odh#>
PREFIX dc: <http://purl.org/dc/terms/>
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xml: <http://www.w3.org/XML/1998/namespace>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX obda: <https://w3id.org/obda/vocabulary#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX schema: <http://schema.org/>
`;

`
{
en: '',
de: '',
it: '',
}
`


const exercises = [
    /*Q0*/
    {
        question: {
            en: 'Which is a typical summer activity in South Tyrol?',
            de: 'Was ist eine typische Sommeraktivität in Südtirol?',
            it: 'Qual è una tipica attività estiva in Alto Adigen',
        },
        choices: {
            'A': 'Eisklettern',
            'B': 'Radfahren Radtouren',
            'C': 'Skitouren',
            'D': 'Rodeln'
        },
        correct: 'B',
        sparql: `
${prefixes}
CONSTRUCT {
 ?act :season ?at ; :name ?t.
}
WHERE {
  ?act a :Activity ; rdfs:label ?t ; :activityType ?at . FILTER (?at = 'Winter' || ?at='Sommer')
}`
    },
    /*Q1*/
    {
        question: {
            en: 'Which is a typical winter activity in South Tyrol?',
            de: 'Was ist eine typische Winteraktivität in Südtirol?',
            it: 'Qual è una tipica attività invernale in Alto Adige?',
        },
        choices: {
            'A': 'Badeseen Freibäder',
            'B': 'Radfahren Radtouren',
            'C': 'Skitouren',
            'D': 'Bergsteigen'
        },
        correct: 'C',
        sparql: `
${prefixes}
CONSTRUCT {
 ?act :season ?at ; :name ?t.
}
WHERE {
  ?act a :Activity ; rdfs:label ?t ; :activityType ?at . FILTER (?at = 'Winter' || ?at='Sommer')
}`
    },
    /*Q2*/
    {
        question: {
            en: 'How many ski resorts are in South Tyrol?',
            de: 'Wie viele Skigebiete gibt es in Südtirol?',
            it: 'Quanti comprensori sciistici ci sono in Alto Adige?',
        },
        choices: {
            'A': '1 -10',
            'B': '11 - 20',
            'C': '21 - 30',
            'D': '31 - 40'
        },
        correct: 'C',
        sparql: `
${prefixes}
CONSTRUCT {
?s a schema:SkiResort ; rdfs:label ?name .
}
WHERE {
?s a schema:SkiResort ; rdfs:label ?name .
}`,
    },
    /*Q3*/
    {
        question: {
            en: 'Which is the highest ski resort in South Tyrol?',
            de: 'Welches ist der höchste Skiort Südtirols?',
            it: 'Quale è la località sciistica più alta dell\'Alto Adige?\n',
        },
        choices: {
            'A': {
                'en': 'Merano 2000 ski area',
                'de': ' Skigebiet Meran 2000',
                'it': 'Località sciistica Merano 2000'
            },
            'B': {
                'en': 'Sulden ski area',
                'de': 'Skigebiet Sulden',
                "it": 'Località sciistica Solda'
            },
            'C': {
                en: 'Vigiljoch ski area',
                de: 'Skigebiet Vigiljoch',
                it: 'Località sciistica Monte S. Vigilio'
            },
            'D': {
                en: 'Klausberg ski area',
                de: 'Skigebiet Klausberg',
                it: 'Località sciistica Klausberg'
            }
        },
        correct: 'B',
        sparql: `
${prefixes}
CONSTRUCT {
?s a schema:SkiResort ; :name ?name ; schema:elevation ?el .
}
WHERE {
?s a schema:SkiResort ; rdfs:label ?name ; geo:asWKT ?pos ; schema:elevation ?el .
}
ORDER BY DESC(?el)
LIMIT 10`
    }
    ,
    /*Q4*/
    {
        question: {
            en: 'Where is the \'Sulden ski area\' located?',
            de: 'Wo befindet sich das \'Skigebiet Sulden\'?',
            it: 'Dove si trova la \'Località sciistica Solda\'?',
        },
        choices: {
            'A': 'Vinschgau',
            'B': 'Meraner Land',
            'C': 'Bruneck und Umgebung',
            'D': 'Südtirols Süden'
        },
        correct: 'A',
        sparql: `
${prefixes}

CONSTRUCT 
{
 ?s a schema:SkiResort ; rdfs:label ?name ; geo:asWKT ?pos ; schema:elevation ?el ; schema:isPartOf ?a. ?a a :Area.  ?a rdfs:label ?areaName; schema:isPartOf ?r . ?r a :Region; rdfs:label ?regionName .
}
 WHERE {
 {  ?s a schema:SkiResort ; rdfs:label ?name ; geo:asWKT ?pos ; schema:elevation ?el ; schema:isPartOf ?a. ?a a :Area.  ?a rdfs:label ?areaName; schema:isPartOf ?r . ?r a :Region; rdfs:label ?regionName .
    FILTER (?name = "Sulden ski area")
  }
}`
    }
    ,
    /*Q5*/
    {
        question: {
            en: 'How many youth hostels are there in South Tyrol?',
            de: 'Wie viele Jugendherbergen gibt es in Südtirol?',
            it: 'Quanti ostelli della gioventù ci sono in Alto Adige?',
        },
        choices: {
            'A': '1-3',
            'B': '4-6',
            'C': '7-9',
            'D': '10-12'
        },
        correct: 'B',
        sparql: `
${prefixes}

CONSTRUCT 
{
 ?s a schema:Hostel ; schema:name ?name .
}
 WHERE {
 {  ?s a schema:Hostel ; schema:name ?name .
  }
}`
    }
    ,
    /* Q6 */
    {
        question: {
            en: 'Where is the youth hostel \'Casa per Ferie\' located?',
            de: 'Wo befindet sich das Jugendherberge \'Casa per Ferie\'?',
            it: 'Dove si trova l\'ostello della gioventù "Casa per Ferie"?',
        },
        choices: {
            'A': 'Bolzano',
            'B': 'Braies',
            'C': 'Salorno',
            'D': 'Merano'
        },
        correct: 'B',
        sparql: `
${prefixes}

CONSTRUCT 
{
?s a schema:Hostel .
  ?s schema:name ?hostelName .
  ?s schema:address ?add .
  ?add schema:addressLocality ?loc .
}
 WHERE {
  ?s a schema:Hostel .
  ?s schema:name ?hostelName .
  ?s schema:address ?add .
  ?add schema:addressLocality ?loc .
  FILTER (LANG(?hostelName) = 'en')
  FILTER (LANG(?loc) = 'en')}`
    },
/* Q7 */
    {
        question: {
            en: 'Which city has the second largest number of accommodations?',
            de: 'Welche Stadt hat die zweitgrößte Anzahl von Unterkünften?',
            it: 'Quale città ha il secondo maggior numero di alloggi?',
        },
        choices: {
            'A': 'Bolzano',
            'B': 'Braies',
            'C': 'Salorno',
            'D': 'Merano'
        },
        correct: 'B',
        sparql: `
${prefixes}

CONSTRUCT 
{
?s a schema:Hostel .
  ?s schema:name ?hostelName .
  ?s schema:address ?add .
  ?add schema:addressLocality ?loc .
}
 WHERE {
  ?s a schema:Hostel .
  ?s schema:name ?hostelName .
  ?s schema:address ?add .
  ?add schema:addressLocality ?loc .
  FILTER (LANG(?hostelName) = 'en')
  FILTER (LANG(?loc) = 'en')}`
    },
];

export {exercises};
