const base64 = new Base64();

QUnit.module('Base64', (hooks) => {
    QUnit.test('encoder', (assert) => {
        assert.equal(base64.encode('Петрику'), '0J/QtdGC0YDQuNC60YM=');
        assert.equal(base64.encode('Мій логін є: !@#$%^&*продт'), '0JzRltC5INC70L7Qs9GW0L0g0ZQ6ICFAIyQlXiYq0L/RgNC+0LTRgg==');
        assert.equal(base64.encode(''), '');
    });

    QUnit.test('decoder', (assert) => {
        assert.equal(base64.decode('8J+QlPCfpZo'), '🐔🥚');
        assert.equal(base64.decode(''), '');
    });

    QUnit.test('encoderUrl', (assert) => {
        assert.equal(base64.encodeUrl('Петрику'), '0J_QtdGC0YDQuNC60YM');
        assert.equal(base64.encodeUrl('Мій логін є: !@#$%^&*продт'), '0JzRltC5INC70L7Qs9GW0L0g0ZQ6ICFAIyQlXiYq0L_RgNC-0LTRgg');
        assert.equal(base64.encodeUrl(''), '');
    });

    QUnit.test('decoderUrl', (assert => {
        assert.equal(base64.decodeUrl('8J-QlPCfpZo'), '🐔🥚');
        assert.equal(base64.decodeUrl(''), '');
    }));

    QUnit.test('JWT decoder', (assert => {
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBenVyZVB2MzExIiwic3ViIjoiMzJkMGY2MDItOGZmZS00NmM2LWEwZDItYzU5ZGY1ZDllZDQ1IiwiYXVkIjoiU2VsZlJlZ2lzdGVyZWQiLCJpYXQiOjE3NTA3NzcyODIzLCJleHAiOjE3NTA3NzczMTIzLCJuaWQiOiJqYyIsIm5hbSI6ItCf0LXRgNGC0LjQutGDINCfJ9GP0YLQvtGH0LrRltC9In0.86eAgeEcQBQGsoBj4ubFoFTINLDEt4UEK9R4k0A5pjY";
        var payload = base64.jwtDecodePayload(token);
        assert.equal(payload.nam, "Пертику П'яточкін");
        token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBenVyZVB2MzExIiwic3ViIjoiMzJkMGY2MDItOGZmZS00NmM2LWEwZDItYzU5ZGY1ZDllZDQ1IiwiYXVkIjoiU2VsZlJlZ2lzdGVyZWQiLCJpYXQiOjE3NTA3NzcyODIzLCJleHAiOjE3NTA3NzczMTIzLCJuaWQiOiJqYyIsIm5hbSI6ItCf0LXRgNGC0LjQutGDINCfJ9GP0YLQvtGH0LrRltC9In0/.86eAgeEcQBQGsoBj4ubFoFTINLDEt4UEK9R4k0A5pjY";
        assert.throws(() => base64.jwtDecodePayload(token));
    }));
    
    QUnit.test('JWT encode', (assert => {
        const header = { "alg": "HS256", "typ": "JWT" };
        const payload = { "loggedInAs": "admin", "iat": 1422779638 };

        var jwt = base64.jwtEncodeBody(header,payload);
        assert.equal(jwt, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9");
    }));

    QUnit.test("encode cred", (assert =>{
        const login = "stas";
        const password = "1234:";

        var cred = base64.encodeCredentials(login, password);
        assert.equal(cred, "c3RhczoxMjM0Og==");
    }));

    QUnit.test("decode cred", (assert =>{
        const user = { "login" : "stas", "password" : "1234:" };
        var cred = base64.decodeCredentials("c3RhczoxMjM0Og==");
        console.log(cred);
        assert.deepEqual(cred, user);
    }));
});