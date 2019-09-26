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
        question: "How many Ski Resorts are in Suedtirol? (2)",
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
}`
    }
];

export {exercises};
