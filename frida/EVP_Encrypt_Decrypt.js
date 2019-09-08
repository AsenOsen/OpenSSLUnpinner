
EVP_EncryptUpdate_FUNC_ADDR = 0x754b2ddbe8
EVP_DecryptUpdate_FUNC_ADDR = 0x754b2ddea0


Interceptor.attach(ptr(EVP_EncryptUpdate_FUNC_ADDR), {
	onEnter: function(args){
		var buf = args[3]
		var len = args[4].toInt32()
		var data = Memory.readByteArray(buf, len)
		console.log("[EVP_EncryptUpdate]")
		console.log(data)
	}
})

Interceptor.attach(ptr(EVP_DecryptUpdate_FUNC_ADDR), {
	onEnter: function(args){
		this.buf = args[1]
		this.len = args[4].toInt32()
	},
	onLeave: function(retval){
		var data = Memory.readByteArray(this.buf, this.len)
		console.log("[EVP_DecryptUpdate]")
		console.log(data)
	}
})