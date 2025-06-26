class Base64{
    static #textEncoder = new TextEncoder();
    static #textDecoder = new TextDecoder();
    encode = (str) => btoa(String.fromCharCode(...Base64.#textEncoder.encode(str)));
    decode = (str) => Base64.#textDecoder.decode(Uint8Array.from(atob(str), c => c.charCodeAt(0)));

    encodeUrl = (str) => this.encode(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    decodeUrl = (str) => this.decode(str.replace(/\-/g, '+').replace(/\_/g, '/'));

    jwtEncodeBody = (header, payload) => this.encodeUrl(JSON.stringify(header)) + '.' + this.encodeUrl(JSON.stringify(payload));
    jwtDecodePayload = (jwt) => JSON.parse(this.decodeUrl(jwt.split('.')[1]));

    encodeCredentials = (login, password) => this.encode(login + ":" + password);
    decodeCredentials = (cred) => {
        const decoded = this.decode(cred);
        const index = decoded.indexOf(':');
        return {
            login: decoded.slice(0, index),
            password: decoded.slice(index + 1)
        };
    };
}