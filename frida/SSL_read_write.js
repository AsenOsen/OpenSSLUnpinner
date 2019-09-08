
SSL_READ_FUNC_ADDR = 0x753e68ff84
SSL_WRITE_FUNC_ADDR = 0x753e690204


Interceptor.attach(ptr(SSL_WRITE_FUNC_ADDR), {
	onEnter: function(args){
		var buf = args[1]
		var len = args[2].toInt32()
		var data = Memory.readByteArray(buf, len)
		console.log("[SSL_write]")
		console.log(data)
	}
})


Interceptor.attach(ptr(SSL_READ_FUNC_ADDR), {
	onEnter: function(args){
		this.buf = args[1]
		this.len = args[2].toInt32()
	},
	onLeave: function(retval){
		var data = Memory.readByteArray(this.buf, this.len)
		console.log("[SSL_read]")
		console.log(data)
	}
})