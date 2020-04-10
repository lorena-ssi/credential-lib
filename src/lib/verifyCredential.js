'use strict'

  /**
   * Verifies the signature for a credential.
   *
   * @param {*} issuer of the credential
   * @param {*} pubKey of the issuer
   * @returns {boolean} whether signature is correct
   */
  const verifyCredential = async (zenroom, credential, pubKey, issuer) => {
    const signedCredential = credential
    const proof = JSON.parse(signedCredential.proof.signature)
    const publicKey = []
    publicKey[issuer] = { public_key: pubKey }
    const check = await zenroom.checkSignature(issuer, publicKey, proof, 'verifier')
    return (check.signature === 'correct')
}

module.exports = verifyCredential 
