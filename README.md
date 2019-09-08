## What is it?

Frida tools, binaries and signatures (Zignatures) for implementing universal SSLUnpinning in OpenSSL-based projects.

## Structure

- **bin/** - `libcrypto` and `libssl` binaries compiled as OpenSSL and BoringSSL projects
- **sig/** - radare2 Zignatures signatures created from bin/ binaries
- **frida/** - Frida scripts with variants of universal SSLUnPinning