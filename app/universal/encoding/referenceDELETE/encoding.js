class UTF8toJSON {
    constructor() {
        this.encoder = new TextEncoder();
        this.decoder = new TextDecoder();
    }

    // Encode a string to a Uint8Array and then to JSON
    TXTtoJSON(input) {
        const encoded = this.encoder.encode(input);
        return JSON.stringify(Array.from(encoded));
    }

    // Decode a JSON string to a Uint8Array and then to a UTF-8 string
    JSONtoTXT(json) {
        const byteArray = new Uint8Array(JSON.parse(json));
        return this.decoder.decode(byteArray);
    }

    // Encode UTF-8 string to Uiny8Array
    UTF8toARRAY(string) {
        return this.encoder.encode(input);
    }

    // Decode a JSON string to a Uint8Array
    JSONtoARRAY(json) {
        return new Uint8Array(JSON.parse(json));
    }
}

// const encoder = new UTF8toJSON();