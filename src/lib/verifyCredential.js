'use strict'

/**
 * Is this thing a string?
 *
 * @param {*} value to check
 * @returns {boolean} whether it is a string
 */
function isString (value) {
  return typeof value === 'string' || value instanceof String
}

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
  let proof
  if (isString(credential.proof.signature)) {
    proof = JSON.parse(credential.proof.signature)
  } else {
    proof = credential.proof.signature
  }
  const publicKey = []
  publicKey[issuer] = { public_key: pubKey }
  const check = await zenroom.checkSignature(issuer, publicKey, proof, 'verifier')
  return (check.signature === 'correct')
}

module.exports = verifyCredential
