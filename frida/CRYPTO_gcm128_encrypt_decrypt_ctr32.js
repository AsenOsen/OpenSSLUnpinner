
CRYPTO_gcm128_encrypt_ctr32_FUNC_ADDR = 0x754b3101e0
CRYPTO_gcm128_decrypt_ctr32_FUNC_ADDR = 0x754b3103fc


Interceptor.attach(ptr(CRYPTO_gcm128_encrypt_ctr32_FUNC_ADDR), {
	onEnter: function(args){
		var buf = args[2]
		var len = args[4].toInt32()
		var data = Memory.readByteArray(buf, len)
		console.log("[CRYPTO_gcm128_encrypt_ctr32]")
		console.log(data)
	}
})

Interceptor.attach(ptr(CRYPTO_gcm128_decrypt_ctr32_FUNC_ADDR), {
	onEnter: function(args){
		this.buf = args[3]
		this.len = args[4].toInt32()
	},
	onLeave: function(retval){
		var data = Memory.readByteArray(this.buf, this.len)
		console.log("[CRYPTO_gcm128_decrypt_ctr32]")
		console.log(data)
	}
})