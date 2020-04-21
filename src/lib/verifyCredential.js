'use strict'

/**
 * Verifies the signature for a credential.
 *
 * @param {*} zenroom to use
 * @param {*} credential to verify
 * @param {*} pubKey of the issuer
 * @param {*} issuer of the credential
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
