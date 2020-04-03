# Credentials Library

Library to interact with Verifiable Credentials

The Zenroom VM is used : https://github.com/lorena-ssi/zenroom-lib

## Add an organization

```javascript
    const credentials = require('credential-lib')
    let org = new credentials.Organization("did:lor:lab:1000")
    let keypair = await zenroom.newKeyPair('issuerID')
    await org.signCredential(keypair, 'issuerID', 'did:lor:lab:1000', 'https://github.com/lorena-ssi/lorena-gov/orgs/labtest/' + issuerID +'.md')

    const pubKey = keypair['issuerID'].keypair.public_key
    let check = await org.verifyCredential('issuerID', pubKey)
    // check is True
```
This is the process so far.
1. First we create an org object with the DID associated to it.
2. Then we create a new Keypait with Zenroom (or maybe we can reuse any key previously sotred in your wallet.)
3. We can now Sign the credential.
4. Verify

Json Result
```json
{
  "@context": [ "https://www.w3.org/2018/credentials/v1" ],
  "type": [ "VerifiableCredential", "Organization" ],
  "issuer": "did:lor:lab:1000",
  "issuanceDate": "2020-04-03T07:09:26.781Z",
  "credentialSubject":
    {
        "@type": "Organization",
        "id": "did:lor:lab:1000" 
    },
  "proof": {
    "type": "Curve448-Goldilocks",
    "proofPurpose": "assertionMethod",
    "verificationMethod": "https://github.com/lorena-ssi/lorena-gov/orgs/labtest/1000.md",
    "signature": "....."
  }
}
```

## Set the member of this organizatio0n

```javascript
    let org = new credentials.Organization("did:lor:lab:1000")
    org.name('Caelum Labs')

    let developer = new credentials.Persona('did:lor:lab:1001')
    developer.fullName('John','Smith', 'Matrix')

    org.member('developer', developer)
    
    // Now you can sign it and send it.
```

## Create one action

```javascript
    let action = new credentials.Action("did:lor:lab:1000", 20)
    
    let agent = new credentials.Persona('did:lor:lab:1001')
    action.agent(agent)

    
    // Now you can sign it and send it.
```