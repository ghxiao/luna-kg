import {SPARQLClient} from "./sparql";
import {drawRDFGraph, drawSparqlGraph} from "./sparql_vis";
import Vue from "vue";
import {exercises} from "./exercises"

const app = new Vue({
    el: '#app',
    data: {
        quiz: exercises[0],
        selected: "",
        status: 0,
        score: 0,
        message: "",
        quizIndex: 0,
        totalQuestions: exercises.length,
        lang: 'en',
        endpoint: new SPARQLClient('http://localhost:8080/sparql')
    },
    methods: {
        calcScore(status, right) {
            // status:
            //  0: never tried
            //  1: first try
            //  2. done!
            if (status === 0) {
                if (right) {
                    this.status = 2;
                    this.message = "<img src='bingo.png' height='180px'> <br> You get 20 points!";
                    this.loadKG(this.quiz.sparql);
                    return 20;
                } else {
                    this.status = 1;
                    this.message = "<img src='thinking.jpg' height='180px'> <br> This is wrong, but you can check the graph and retry!";
                    this.loadKG(this.quiz.sparql);
                    return 0;
                }
            } else if (status === 1) {
                if (right) {
                    this.status = 2;
                    this.message = "<img src='bingo.png' height='180px'> <br> Great! You get 10 points!";
                    return 10;
                } else {
                    this.status = 2;
                    this.message = "<img src='cry.jpg' height='180px'> <br> Sorry. You get 0 points!";
                    return 0;
                }
            } else if (status === 2) {
                return 0;
            } else {
                return 0;
            }
        },
        finished() {
            return this.status === 2 && this.quizIndex + 1 === this.totalQuestions;
        },
        showNextDisabled() {
            return this.status !== 2 || this.finished();
        },
        next() {
            this.quizIndex++;
            this.quiz = exercises[this.quizIndex];
            this.status = 0;
            this.message = "";
            this.selected = 0;
        },
        loadKG(constructQuery) {
            this.endpoint
                .construct(constructQuery)
                .then(
                    result => {
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
                        drawRDFGraph(result, document.getElementById("kg-canvas"), prefixes)
                    }
                );
        },
        final_message() {
            if (this.finished()) {
                return "Congratulations! Now you win a prize!"
            } else {
                return "";
            }
        },
        localize(obj) {
            if (this.isString(obj)) {
                return obj;
            } else {
                return obj[this.lang];
            }
        },
        isString(s) {
            return s.constructor === String;
        }
    }
});

window.app = app;



