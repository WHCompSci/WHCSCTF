from Crypto.Util.number import bytes_to_long

e = 3

def verify(message, signature, n):
    sig = pow(signature, e, n)

    return hex(sig)[-len(message):] == message.hex()

print("Custom RSA verifier loaded.")
