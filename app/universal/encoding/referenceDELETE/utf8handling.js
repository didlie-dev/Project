function encodeString(input) {
    return btoa(encodeURIComponent(input));
}

function decodeString(encoded) {
    return decodeURIComponent(atob(encoded));
}

///more efficient method for new browsers:
function encodeString1(input) {
    const encoder = new TextEncoder();
    const encoded = encoder.encode(input);
    return btoa(String.fromCharCode(...encoded));
}

function decodeString1(encoded) {
    const decoded = atob(encoded);
    const bytes = new Uint8Array(decoded.split('').map(char => char.charCodeAt(0)));
    const decoder = new TextDecoder();
    return decoder.decode(bytes);
}

//lets just go with great JSON object that sends the numeric value of each character:

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
        return this encoder.encode(input);
    }

    // Decode a JSON string to a Uint8Array
    JSONtoARRAY(json) {
        return new Uint8Array(JSON.parse(json));
    }
}

// const encoder = new UTF8toJSON();