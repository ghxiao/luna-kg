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

const exercises = [
    /*0*/
    {
        question: " Which is a typical summer activity in Suedtirol?",
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
    /*0*/
    {
        question: " Which is a typical winter activity in Suedtirol?",
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
    /*1*/
    {
        question: "How many ski resorts are in Suedtirol?",
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
    /*2*/
    {
        question: "Which one is the highest?",
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
    /*3*/
    {
        question: "Where is 'Sulden ski area' located?",
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
];

export {exercises};
