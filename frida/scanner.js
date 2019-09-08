Process.enumerateModules({
	onMatch: function(module){

		if(module.name == "libcrypto.so"){
			Module.enumerateExports(module.name, { 
				onMatch: function(e) { 
					if(e.name == "CRYPTO_gcm128_decrypt_ctr32")
						console.log("CRYPTO_gcm128_decrypt_ctr32: " + e.address)
					if(e.name == "CRYPTO_gcm128_encrypt_ctr32")
						console.log("CRYPTO_gcm128_encrypt_ctr32: " + e.address)
					if(e.name == "EVP_EncryptUpdate")
						console.log("EVP_EncryptUpdate: " + e.address)
					if(e.name == "EVP_DecryptUpdate")
						console.log("EVP_DecryptUpdate: " + e.address)
			    },
			    onComplete: function(){}
			})
		}

		if(module.name == "libssl.so"){
			Module.enumerateExports(module.name, { 
				onMatch: function(e) { 
					if(e.name == "SSL_write")
						console.log("SSL_write: " + e.address)
					if(e.name == "SSL_read")
						console.log("SSL_read: " + e.address)
					if(e.name == "SSL_CTX_set_cert_verify_callback")
						console.log("SSL_CTX_set_cert_verify_callback: " + e.address)
					if(e.name.indexOf("verify_cert_chain") > -1)
						console.log("ssl_verify_cert_chain: " + e.address)
			    },
			    onComplete: function(){}
			})
		}
		
	},
	onComplete: function(module){}
})