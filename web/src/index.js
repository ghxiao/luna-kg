import {SPARQLClient} from "./sparql";
import {drawRDFGraph, drawSparqlGraph} from "./sparql_vis";

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

const constructQuery = 'PREFIX : <http://noi.example.org/ontology/odh#>\n' +
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

const prefixes = {"" : "http://noi.example.org/ontology/odh#",
"schema": "<http://schema.org/>"};

new SPARQLClient('http://localhost:8080/sparql').construct(constructQuery).then(
    result => {
        //debugger;
        drawRDFGraph(result, document.getElementById("mynetwork3"), prefixes)
    }
);

// drawRDFGraph('@prefix c: <http://example.org/cartoons#>.\n' +
//     'c:Tom a c:Cat.\n' +
//     'c:Jerry a c:Mouse;\n' +
//     '        c:smarterThan c:Tom.', document.getElementById("mynetwork3"))


const g = drawSparqlGraph(qAll, document.getElementById("mynetwork4"));

window.g = g;

