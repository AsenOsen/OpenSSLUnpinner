## What is it?

Frida tools, binaries and signatures (Zignatures) for implementing universal SSLUnpinning in OpenSSL-based projects.
More - https://xakep.ru/2019/09/12/ssl-sniffing/

## Structure

- **bin/** - `libcrypto` and `libssl` binaries compiled as OpenSSL and BoringSSL projects
- **sig/** - radare2 Zignatures signatures created from bin/ binaries
- **frida/** - Frida scripts with variants of universal SSLUnPinning
