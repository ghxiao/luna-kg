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
?a a :Activity ; :activityType ?t .
}
WHERE {
?a a :Activity ; :activityType ?t .
}`
    },
    {
        question: "How many Ski Resorts are in Suedtirol?",
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
?s a schema:SkiResort ; rdfs:label ?name ; schema:elevation ?el .
}
WHERE {
?s a schema:SkiResort ; rdfs:label ?name ; geo:asWKT ?pos ; schema:elevation ?el .
}`,
    },
    {
        question: " Which one is the highest?",
        choices: {
            'A': 'Merano 2000 ski area / Skigebiet Meran 2000 / Località sciistica Merano 2000',
            'B': 'Sulden ski area / Skigebiet Sulden / Località sciistica Solda',
            'C': 'Vigiljoch ski area /Skigebiet Vigiljoch / Località sciistica Monte S. Vigilio',
            'D': 'Klausberg ski area / Skigebiet Klausberg /Località sciistica Klausberg'
        },
        correct: 'B',
        sparql: `
${prefixes}
CONSTRUCT {
?s a schema:SkiResort ; rdfs:label ?name ; schema:elevation ?el .
}
WHERE {
?s a schema:SkiResort ; rdfs:label ?name ; geo:asWKT ?pos ; schema:elevation ?el .
}`
    },
    {
        question: " What is the elevation of the highest resort (or a specific one)?",
        choices: {
            'A': 'Merano 2000 ski area / Skigebiet Meran 2000 / Località sciistica Merano 2000',
            'B': 'Sulden ski area / Skigebiet Sulden / Località sciistica Solda',
            'C': 'Vigiljoch ski area /Skigebiet Vigiljoch / Località sciistica Monte S. Vigilio',
            'D': 'Klausberg ski area / Skigebiet Klausberg /Località sciistica Klausberg'
        },
        correct: 'B',
        sparql: `
${prefixes}
CONSTRUCT {
?s a schema:SkiResort ; rdfs:label ?name ; schema:elevation ?el .
}
WHERE {
?s a schema:SkiResort ; rdfs:label ?name ; geo:asWKT ?pos ; schema:elevation ?el .
}`
    }

];

export {exercises};
