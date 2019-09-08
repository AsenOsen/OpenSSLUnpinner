SSL_CTX_set_cert_verify_callback = 0x0
SSL_get_peer_full_cert_chain_else_cond = 0x0
ssl_verify_cert_chain = 0x0 

// убиваем вызов дефолтного callback из SSL_get_peer_full_cert_chain
Memory.protect(ptr(SSL_get_peer_full_cert_chain_else_cond), 8, 'rwx');
Memory.writeByteArray(ptr(SSL_get_peer_full_cert_chain_else_cond), [0x20,0x00,0x80,0xd2,0x20,0x00,0x80,0xd2])

// уничтожаем установку callback-функции
Interceptor.attach(ptr(SSL_CTX_set_cert_verify_callback), {
	onEnter: function(args){ args[1] = ptr("0x0") /* 0x0 == NULLptr */ },
	onLeave: function(retval){}
});

// подменяем реальные сертификаты 
VALID_CERT_CHAIN = 0;
Interceptor.attach(ptr(SSL_get_peer_full_cert_chain), {
	onEnter: function(args){},
	onLeave: function(retval){
		// ссылка на стек структур X509
		var stackDataPtr = Memory.readPointer(retval.add(8))
		// ссылка на первый в стеке сертификат X509
		var firstX509StructPtr = Memory.readPointer(stackDataPtr.add(0))
		// ссылка на поле name первого сертификата - 5-ое поле в структуре
		var firstX509Struct_fieldNamePtr = Memory.readPointer(firstX509StructPtr.add(8*4));
		// значение поля name первого сертификата
		var firstX509Struct_fieldName = Memory.readCString(firstX509Struct_fieldNamePtr)
		// открываем путь для Burp Suite!
		if(firstX509Struct_fieldName.indexOf("PortSwigger") > -1 && VALID_CERT_CHAIN != 0){
			retval.replace(VALID_CERT_CHAIN)
		}
		else{
			VALID_CERT_CHAIN = ptr(retval.toString())
		}
	}
});