import {SPARQLClient} from "./sparql";
import {drawRDFGraph, drawSparqlGraph} from "./sparql_vis";
import Vue from "vue";

const qPrefix = "PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>\n" +
    "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n" +
    "PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>\n";

const qAddress = qPrefix + 'SELECT *\n' +
    'WHERE {\n' +
    ':address_79520478 a :Address ; ' +
    ':hasGeometryInWKT "POINT(...)" ; ' +
    'rdfs:label \'VIA LEONARDO DA VINCI 1/F\'@it ;\n' +
    'rdfs:label \'LEONARDO-DA-VINCI-STRASSE 1/F\'@de ;\n' +
    ':hasHouseNumber \'1/F\' ;\n' +
    ':belongsToMunicipality :municipality_21008 ;  \n' +
    ':belongsToStreet :street_21008_0_8280 .  \n' +
    '}';


const qMunicipality = qPrefix + 'SELECT *\n' +
    'WHERE {\n' +
    ':municipality_21008 a :Municipality ; :hasGeometryInWKT "MULTIPOLYGON(...)" ; ' +
    'rdfs:label \'Bolzano\'@it ;\n' +
    'rdfs:label \'Bozen\'@de ;\n' +
    ' :area 52337186.505577500000000 .\n' +
    '}';

const qStreet = qPrefix + 'SELECT *\n' +
    'WHERE {\n' +
    ':street_21008_0_8280 a :Street ; :hasGeometryInWKT "MULTILINESTRING(...)" ; rdfs:label \'Via Leonardo da Vinci\' ;\n' +
    '  :belongsToMunicipality :municipality_21008 ;  \n' +
    'rdfs:label \'VIA LEONARDO DA VINCI\'@it ;\n' +
    'rdfs:label \'LEONARDO-DA-VINCI-STRASSE \'@de ;\n' +
    '}';

const qAll = qPrefix + 'SELECT *\n' +
    'WHERE {\n' +
    ':address_79520478 a :Address ; ' +
    ':hasGeometryInWKT "POINT(...)" ; ' +
    'rdfs:label \'VIA LEONARDO DA VINCI 1/F\'@it ;\n' +
    'rdfs:label \'LEONARDO-DA-VINCI-STRASSE 1/F\'@de ;\n' +
    ':hasHouseNumber \'1/F\' ;\n' +
    ':belongsToMunicipality :municipality_21008 ;  \n' +
    ':belongsToStreet :street_21008_0_8280 .  \n' +

    ':municipality_21008 a :Municipality ; :hasGeometryInWKT "MULTIPOLYGON(...)" ; ' +
    'rdfs:label \'Bolzano\'@it ;\n' +
    'rdfs:label \'Bozen\'@de ;\n' +
    ' :area 52337186.505577500000000 .\n' +

    ':street_21008_0_8280 a :Street ; :hasGeometryInWKT "MULTILINESTRING(...)" ; rdfs:label \'Via Leonardo da Vinci\' ;\n' +
    '  :belongsToMunicipality :municipality_21008 ;  \n' +
    'rdfs:label \'VIA LEONARDO DA VINCI\'@it ;\n' +
    'rdfs:label \'LEONARDO-DA-VINCI-STRASSE \'@de ;\n' +
    '}';

const q = 'PREFIX : <http://www.semanticweb.org/ding/ontologies/2017/10/untitled-ontology-2#>\n' +
    'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n' +
    'PREFIX geosparql: <http://www.opengis.net/ont/geosparql#>\n' +
    '\n' +
    'SELECT ?wkt\n' +
    'WHERE \n' +
    '{\n' +
    '?oganization a :EducationInstitution ; :hasAddress ?organizationAddress . #?address :hasGeometryInWKT ?wkt. \n' +
    '?pharmacy a :Pharmacy ; :hasAddress ?pharmacyAddress . #?address :hasGeometryInWKT ?wkt. \n' +
    '?organizationAddress :hasStreet ?street.\n' +
    '?pharmacyAddress :hasStreet ?street.\n' +
    '?street :hasGeometryInWKT ?wkt. \n' +
    '}';


// drawSparqlGraph(q, document.getElementById("query"));
//
// drawSparqlGraph(qAddress, document.getElementById("mynetwork1"));
// drawSparqlGraph(qMunicipality, document.getElementById("mynetwork2"));
// drawSparqlGraph(qStreet, document.getElementById("mynetwork3"));

let constructQuery = 'PREFIX : <http://noi.example.org/ontology/odh#>\n' +
    'PREFIX schema: <http://schema.org/>\n' +
    '\n' +
    'CONSTRUCT \n' +
    '  {\n' +
    '<http://noi.example.org/ontology/odh#data/accommodation/745EB990148B974EBB057DF103E5D7D3>  ?p ?o .\n' +
    '}\n' +
    'WHERE {\n' +
    '<http://noi.example.org/ontology/odh#data/accommodation/745EB990148B974EBB057DF103E5D7D3> \n' +
    '?p ?o .\n' +
    '}';

constructQuery = `
PREFIX : <http://noi.example.org/ontology/odh#>
PREFIX dc: <http://purl.org/dc/terms/>
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xml: <http://www.w3.org/XML/1998/namespace>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX obda: <https://w3id.org/obda/vocabulary#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX schema: <http://schema.org/>

CONSTRUCT {
?s a schema:SkiResort ; rdfs:label ?name ; schema:elevation ?el .
}
WHERE {
?s a schema:SkiResort ; rdfs:label ?name ; geo:asWKT ?pos ; schema:elevation ?el .
}
#ORDER BY DESC(?el)
#LIMIT 10 
`

const prefixes = {
    "schema": "http://schema.org/",
    dc: "http://purl.org/dc/terms/",
    geo: "http://www.opengis.net/ont/geosparql#",
    owl: "http://www.w3.org/2002/07/owl#",
    rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    xml: "http://www.w3.org/XML/1998/namespace",
    xsd: "http://www.w3.org/2001/XMLSchema#",
    obda: "https://w3id.org/obda/vocabulary#",
    rdfs: "http://www.w3.org/2000/01/rdf-schema#",
    "": "http://noi.example.org/ontology/odh#",
};


let quiz = [
    {
        question: "How many Ski Resorts are in Suedtirol?",
        choices: {
            'A': '1 -10',
            'B': '11 - 20',
            'C': '21 - 30',
            'D': '31 - 40'
        },
        correct: 'C',
        sparql: `PREFIX : <http://noi.example.org/ontology/odh#>
PREFIX dc: <http://purl.org/dc/terms/>
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xml: <http://www.w3.org/XML/1998/namespace>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX obda: <https://w3id.org/obda/vocabulary#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX schema: <http://schema.org/>

CONSTRUCT {
?s a schema:SkiResort ; rdfs:label ?name ; schema:elevation ?el .
}
WHERE {
?s a schema:SkiResort ; rdfs:label ?name ; geo:asWKT ?pos ; schema:elevation ?el .
}`,
        score: 0
    }
];


// <script src="http://unpkg.com/vue"></script>

// status:
//  0: never tried
//  1: first try
//  2. done!
const app = new Vue({
        el: '#app',
        data: {
            quiz: quiz[0],
            selected: "",
            status: 0,
            score: 0,
            message: "",
        },
        methods: {
            calcScore(status, right) {
                if (status === 0) {
                    if (right) {
                        this.status = 2;
                        this.message = "Congratulations! You get 20 points!";
                        return 20;
                    } else {
                        this.status = 1;
                        this.message = "Sorry, the answer is wrong! But you can check the graph and retry!";
                        return 0;
                    }
                } else if (status === 1) {
                    if (right) {
                        this.status = 2;
                        this.message = "Congratulations! You get 10 points!";
                        return 10;
                    } else {
                        this.status = 2;
                        this.message = "Sorry, the answer is wrong!";
                        return 0;
                    }
                } else if (status === 2) {
                    return 0;
                } else {
                    return 0;
                }
            }
        }
    })
;


new SPARQLClient('http://localhost:8080/sparql')
    .construct(constructQuery)
    .then(
        result => {
            drawRDFGraph(result, document.getElementById("kg"), prefixes)
        }
    );

// drawRDFGraph('@prefix c: <http://example.org/cartoons#>.\n' +
//     'c:Tom a c:Cat.\n' +
//     'c:Jerry a c:Mouse;\n' +
//     '        c:smarterThan c:Tom.', document.getElementById("mynetwork3"))


//const g = drawSparqlGraph(qAll, document.getElementById("mynetwork4"));

//window.g = g;

