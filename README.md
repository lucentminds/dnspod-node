# dnspod-node

A dnspod.com client for nodejs

dnspod-node is a client of [dnspod.com](http://www.dnspod.com).


## Quick Examples

```javascript
var DNSPod = require( 'dnspod-node' );
var dnspod = new DNSPod( 'my@email.com', 'base64pass' );

dnspod.on( 'error', function( event, err ){
	console.log( err );
	process.exit();
});

// Log in and update the A record ip on a sub domain.
dnspod.on( 'authenticated', function() {
	dnspod.getSubdomain( 'domain.com', 'subdomain', function( error, record ){
		
		if( record == null ) {
			console.log( 'record is null' );
			return;
		}
		
		record.value = '192.168.1.1';
		
		dnspod.putRecord( record, function( error, result ) {
			
			if( error ) {
				console.log( error );
				return;
			}
			
			console.log( result );
		} );
	} );
});

```



## License

This software is licensed under the BSD License.
