import CryptoJS from 'crypto-js';

export class Paziente {
    constructor(nome, cognome, indirizzo, telefono, visite = [], commenti = "", medico = "") {
        this.nome = nome;
        this.cognome = cognome;
        this.indirizzo = indirizzo;
        this.telefono = telefono;
        this.commenti = commenti;
        this.medico = medico;
        this.uniqueId = CryptoJS.MD5(nome+cognome+indirizzo).toString();
        this.visite = visite;
    }

    toObject() {
        return {
            nome: this.nome,
            cognome: this.cognome,
            indirizzo: this.indirizzo,
            telefono: this.telefono,
            commenti: this.commenti,
            medico: this.medico,
            uniqueId: this.uniqueId,
            visite: this.visite
        };
    }
}

export var pazienteConverter = {
    toFirestore: function(paziente) {
        return paziente.toObject();
    },
    fromFirestore: function(snapshot, options) {
        const data = snapshot.data(options);
        return new Paziente(data.nome, data.cognome, data.indirizzo, data.telefono, 
            data.visite, data.commenti, data.medico);
    }
}

