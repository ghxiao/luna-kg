import {Parser as SparqlParser} from "sparqljs";
import _ from 'lodash';
import {Parser as N3Parser} from "n3";

import {DataSet, Network} from "vis-network";

function drawRDFGraph(g, container, prefixes) {
    //N3Parser.parse(g);
    const parser = new N3Parser();
    const parsedGraph = parser.parse(g);

    const subjects = parsedGraph.map(dp => dp.subject.id);
    const objects = parsedGraph.map(dp => dp.object.id);
    const subjectsAndObjects = _.uniqBy(_.union(subjects, objects));

    const nodes = new DataSet(subjectsAndObjects.map(t => createNode(t, prefixes)));
    const edges = new DataSet(parsedGraph.map(tp => createGraphEdge(tp, prefixes)));

    const data = {
        nodes: nodes,
        edges: edges
    };

    const options = {
        edges: {
            color: 'black'
        },
        nodes: {
            //inheritColors: false
        }
    };
    return new Network(container, data, options);
}

function createGraphEdge(tp, prefixes) {
    return {
        from: tp.subject.id,
        to: tp.object.id,
        label: getShortIriForm(tp.predicate.id, prefixes),
        arrows: 'to',
        color: 'black'
    };
}

function drawSparqlGraph(q, container) {
    const sparqlParser = new SparqlParser();
    const parsedQuery = sparqlParser.parse(q);

    const prefixes = parsedQuery.prefixes;

    prefixes['xsd'] = 'http://www.w3.org/2001/XMLSchema#';

    const subjects = parsedQuery.where[0].triples.map(tp => tp.subject);

    const objects = parsedQuery.where[0].triples.map(tp => tp.object);

    const subjectsAndObjects = _.uniqBy(_.union(subjects, objects));

    const nodes = new DataSet(subjectsAndObjects.map(t => createNode(t, prefixes)));

    const edges = new DataSet(parsedQuery.where[0].triples.map(function (tp) {
        return createEdge(tp, prefixes)
    }));

    const data = {
        nodes: nodes,
        edges: edges
    };

    const options = {
        edges: {
            color: 'black'
        },
        nodes: {
            //inheritColors: false
        }
    };
    const network = new Network(container, data, options);
    return network;
}


function createNode(rdfTerm, prefixes) {

    if (rdfTerm.startsWith("?")) {
        // variable
        return {
            id: rdfTerm,
            label: rdfTerm,
            shape: 'ellipse',
            color: {border: 'red', background: 'white'}
            //color: {color: 'red', opacity: 0.3}
        };
    } else if (rdfTerm.startsWith("\"")) {
        // literal
        return {
            id: rdfTerm,
            label: getLabel(rdfTerm, prefixes),
            shape: 'box',
            color: {color: 'blue', opacity: 0.3}
        };
    } else if (rdfTerm.startsWith("_:")) {
        // BNodes
        return {
            id: rdfTerm,
            label: getLabel(rdfTerm, prefixes),
            shape: 'box'
        };
    } else {
        // iri
        return {
            id: rdfTerm,
            label: getLabel(rdfTerm, prefixes),
            shape: 'ellipse',
            color: {color: 'blue', opacity: 0.3}
        };
    }
}

function getShortIriForm(iri, prefixes) {
    if (iri === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type') {
        return 'a';
    }
    for (const key in prefixes) {
        // skip loop if the property is from prototype
        if (!prefixes.hasOwnProperty(key)) continue;

        const value = prefixes[key];
        if (iri.startsWith(value)) {
            return key + ":" + iri.substring(value.length)
        }
    }
    return iri;
}

function getLabel(rdfTerm, prefixes) {
    if (rdfTerm.startsWith("\"")) {
        // literal
        if (rdfTerm.indexOf("^^") > 0) {
            const idx = rdfTerm.indexOf("^^");
            return rdfTerm.substring(1, idx-1);
            //return rdfTerm.substring(0, idx) + "^^" + getShortIriForm(rdfTerm.substring(idx + 2), prefixes);
        } else {
            return rdfTerm;
        }

    } else if (rdfTerm.startsWith("_:")) {
        // BNodes
        return rdfTerm;
    } else {
        let shortIriForm = getShortIriForm(rdfTerm, prefixes);
        // HACK
        if(shortIriForm.startsWith(":data")){
            return "";
        } else
        return shortIriForm;
    }
}

function createEdge(tp, prefixes) {
    return {
        from: tp.subject,
        to: tp.object,
        label: getShortIriForm(tp.predicate, prefixes),
        arrows: 'to',
        color: 'black'
    };
}

export {drawRDFGraph, drawSparqlGraph}
