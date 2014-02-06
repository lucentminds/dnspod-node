/**
 * 02-06-2014
 * General Node Module.
 */

var events = require( 'events' );
var https = require( 'https' );
var net = require( 'net' );



var DNSPod = function( email, password, passenc ) {
	this.host = 'www.dnspod.com';
	this.path = '/api/'
	this.email = email;
	this.password = password;
	this.passenc = passenc || 'base64';
	this.mario = null;

	this.headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Accept': 'text/json',
			'User-Agent': 'Node DNSPod Client/0.0.0'
		}

	this.auth();
};// /DNSPod()

DNSPod.area = {
	"0": "Default",
	"20=99": "Palestinian Territory",
	"20=98": "Pakistan",
	"20=91": "Macao",
	"20=90": "Lebanon",
	"20=93": "Maldives",
	"20=92": "Malaysia",
	"20=95": "Myanmar",
	"20=94": "Mongolia",
	"20=97": "Oman",
	"20=96": "Nepal",
	"20=108": "Thailand",
	"20=109": "Timor-Leste",
	"20=102": "Saudi Arabia",
	"20=103": "Singapore",
	"20=100": "Philippines",
	"20=101": "Qatar",
	"20=106": "Taiwan",
	"20=107": "Tajikistan",
	"20=104": "Sri Lanka",
	"20=105": "Syria",
	"20=64": "Azerbaijan",
	"20=65": "Bahrain",
	"20=66": "Bangladesh",
	"20=67": "Bhutan",
	"20=60": "Heard And Mc Donald Islands",
	"20=61": "South Georgia And The South Sandwich Islands",
	"20=62": "Afghanistan",
	"20=63": "Armenia",
	"20=68": "British Indian Ocean Territory",
	"20=69": "Brunei Darussalam",
	"20=192": "Martinique",
	"20=195": "Netherlands Antilles",
	"20=194": "Montserrat",
	"20=88": "Kyrgyzstan",
	"20=89": "Lao",
	"20=197": "Panama",
	"20=82": "Japan",
	"20=83": "Jordan",
	"20=80": "Iraq",
	"20=81": "Israel",
	"20=86": "Korea",
	"20=87": "Kuwait",
	"20=84": "Kazakhstan",
	"20=85": "North Korea",
	"20=119": "Austria",
	"20=118": "Andorra",
	"20=111": "Turkmenistan",
	"20=110": "Turkey",
	"20=113": "Uzbekistan",
	"20=112": "United Arab Emirates",
	"20=115": "Yemen",
	"20=114": "Viet Nam",
	"20=117": "Albania",
	"20=116": "Aland Islands",
	"20=11": "Congo - Brazzaville",
	"20=10": "Comoros",
	"20=13": "Cote D'Ivoire",
	"20=12": "Congo, The Democratic Republic Of The",
	"20=15": "Egypt",
	"20=14": "Djibouti",
	"20=17": "Eritrea",
	"20=16": "Equatorial Guinea",
	"20=19": "Gabon",
	"20=18": "Ethiopia",
	"20=182": "Dominica",
	"20=183": "Dominican Republic",
	"20=180": "Cuba",
	"20=181": "Curacao",
	"20=186": "Grenada",
	"20=187": "Guadeloupe",
	"20=184": "El Salvador",
	"20=185": "Greenland",
	"20=188": "Guatemala",
	"20=189": "Haiti",
	"20=124": "Croatia",
	"20=125": "Czech",
	"20=126": "Denmark",
	"20=127": "Estonia",
	"20=120": "Belarus",
	"20=121": "Belgium",
	"20=122": "Bosnia And Herzegovina",
	"20=123": "Bulgaria",
	"20=128": "European Union",
	"20=129": "Faroe Islands",
	"20=74": "Cyprus",
	"20=51": "Togo",
	"20=191": "Jamaica",
	"20=190": "Honduras",
	"20=193": "Mexico",
	"20=211": "Virgin Islands, U.S.",
	"20=216": "Fiji",
	"20=217": "French Polynesia",
	"20=214": "Australia",
	"20=215": "Cook Islands",
	"20=199": "Saint Barthelemy",
	"20=198": "Puerto Rico",
	"20=218": "Guam",
	"20=219": "Kiribati",
	"20=133": "Gibraltar",
	"20=132": "Germany",
	"20=131": "France",
	"20=130": "Finland",
	"20=137": "Hungary",
	"20=136": "Holy See",
	"20=135": "Guernsey",
	"20=134": "Greece",
	"20=139": "Ireland",
	"20=138": "Iceland",
	"20=55": "Zambia",
	"20=54": "Western Sahara",
	"20=57": "Antarctica",
	"20=56": "Zimbabwe",
	"20=39": "Reunion",
	"20=38": "Nigeria",
	"20=37": "Niger",
	"20=36": "Namibia",
	"20=35": "Mozambique",
	"20=34": "Morocco",
	"20=33": "Mayotte",
	"20=32": "Mauritius",
	"20=31": "Mauritania",
	"20=50": "Tanzania",
	"20=201": "Saint Lucia",
	"20=200": "Saint Kitts And Nevis",
	"20=203": "Saint Pierre And Miquelon",
	"20=202": "Saint Martin",
	"20=205": "Sint Maarten",
	"20=204": "Saint Vincent And The Grenadines",
	"20=207": "Turks And Caicos Islands",
	"20=206": "Trinidad And Tobago",
	"20=209": "United States Minor Outlying Islands",
	"20=208": "United States",
	"20=52": "Tunisia",
	"80=0": "Search Engine",
	"20=9": "Chad",
	"20=8": "Central Africa",
	"20=144": "Latvia",
	"20=145": "Liechtenstein",
	"20=142": "Jersey",
	"20=143": "Kosovo",
	"20=140": "Isle Of Man",
	"20=141": "Italy",
	"20=1": "Angola",
	"20=0": "Algeria",
	"20=3": "Botswana",
	"20=2": "Benin",
	"20=5": "Burundi",
	"20=4": "Burkina Faso",
	"20=7": "Cape Verde",
	"20=6": "Cameroon",
	"20=28": "Madagascar",
	"20=29": "Malawi",
	"20=148": "Macedonia",
	"20=20": "Gambia",
	"20=21": "Ghana",
	"20=22": "Guinea",
	"20=23": "Guinea-Bissau",
	"20=24": "Kenya",
	"20=25": "Lesotho",
	"20=26": "Liberia",
	"20=27": "Libya",
	"20=238": "Argentina",
	"20=239": "Bolivia",
	"20=234": "Tonga",
	"20=235": "Tuvalu",
	"20=236": "Vanuatu",
	"20=212": "American Samoa",
	"20=230": "Pitcairn",
	"20=231": "Samoa",
	"20=232": "Solomon Islands",
	"20=233": "Tokelau",
	"20=149": "Malta",
	"10=0": "Africa",
	"10=1": "Antartica",
	"10=2": "Asia",
	"10=3": "Europe",
	"10=4": "North America",
	"10=5": "Oceania",
	"20=250": "Uruguay",
	"20=251": "Venezuela",
	"20=155": "Poland",
	"20=154": "Norway",
	"20=157": "Romania",
	"20=156": "Portugal",
	"20=151": "Monaco",
	"20=150": "Moldova",
	"20=153": "Netherlands",
	"20=152": "Montenegro",
	"20=213": "Asia Pacific",
	"20=159": "San Marino",
	"20=158": "Russia",
	"20=237": "Wallis And Futuna Islands",
	"20=229": "Papua New Guinea",
	"20=228": "Palau",
	"20=59": "French Southern Territories",
	"20=58": "Bouvet Island",
	"20=210": "Virgin Islands, British",
	"20=223": "New Caledonia",
	"20=222": "Nauru",
	"20=221": "Micronesia, Federated States Of",
	"20=220": "Marshall Islands",
	"20=227": "Northern Mariana Islands",
	"20=226": "Norfolk Island",
	"20=53": "Uganda",
	"20=224": "New Zealand",
	"20=249": "Suriname",
	"20=248": "Peru",
	"20=245": "French Guiana",
	"20=244": "Falkland Islands (Malvinas)",
	"20=247": "Paraguay",
	"20=246": "Guyana",
	"20=241": "Chile",
	"20=240": "Brazil",
	"20=243": "Ecuador",
	"20=242": "Colombia",
	"20=160": "Serbia",
	"20=161": "Slovakia",
	"20=162": "Slovenia",
	"20=163": "Spain",
	"20=164": "Svalbard & Jan Mayen Islands",
	"20=225": "Niue",
	"20=166": "Switzerland",
	"20=167": "Ukraine",
	"20=168": "United Kingdom",
	"20=169": "Anguilla",
	"20=30": "Mali",
	"20=147": "Luxembourg",
	"20=48": "Sudan",
	"20=49": "Swaziland",
	"20=46": "Somalia",
	"20=47": "South Africa",
	"20=44": "Seychelles",
	"20=45": "Sierra Leone",
	"20=42": "Sao Tome And Principe",
	"20=43": "Senegal",
	"20=40": "Rwanda",
	"20=41": "Saint Helena",
	"10=6": "South American",
	"20=179": "Costa Rica",
	"20=178": "Cayman Islands",
	"20=177": "Canada",
	"20=176": "Bonaire, Saint Eustatius And Saba",
	"20=175": "Bermuda",
	"20=174": "Belize",
	"20=173": "Barbados",
	"20=172": "Bahamas",
	"20=171": "Aruba",
	"20=170": "Antigua And Barbuda",
	"20=146": "Lithuania",
	"20=76": "Hong Kong",
	"20=79": "Iran, Islamic Republic Of",
	"20=78": "Indonesia",
	"20=73": "Cocos (Keeling) Islands",
	"20=72": "Christmas Island",
	"20=71": "China",
	"20=70": "Cambodia",
	"20=77": "India",
	"20=196": "Nicaragua",
	"20=75": "Georgia",
	"20=165": "Sweden"
};// /area{}

DNSPod.prototype.getExternalIp = function ( fnCallback ) {
	var self = this,
	message = '',
	client;
	
	client = net.connect({
		host: 'ns1.dnspod.net',
		port: 6666
	})
	.on( 'data', function( data ) {
		message = message.concat( data.toString() );
		client.end();
	})
	.on( 'end', function() {
		fnCallback( null, message );
	})
	.on('error', function( err ) {
		fnCallback( err, null );
	});
	return self;
};// /getExternalIp()

DNSPod.prototype.__proto__ = events.EventEmitter.prototype;



DNSPod.prototype.trigger = function( strType ) {
	var args = Array.prototype.slice.call( arguments, 1 );
	var oEvent = {
		type: strType,
		target: this
	};

	this.emit.apply( this, [strType, oEvent].concat( args ) );
	return this;
};// /trigger()

DNSPod.prototype._serialize = function( o ) {
	var n, a = [];

	for( n in o ) {
		a.push( n.concat( '=',o[n] ) );
	}// /for()

	return a.join( '&' );
};// /_serialize()

DNSPod.prototype._httpsRequest = function( oOptions, cBody, fnCallback ) {
	var n, self = this;
	var oSettings = {
		host: this.host,
		port: 443,
		headers: this.headers
	};// /oSettings
	
	for( n in oOptions ) {
		oSettings[n] = oOptions[n];
	}// /for()

	var req = https.request( oSettings, function( res ) {
		var cBuffer = '';

		res.on( 'data', function( buffer ) {
			cBuffer = cBuffer.concat( buffer.toString() );
		});

		res.on( 'end', function(){
			var oResult;
			
			try {
				oResult = JSON.parse( cBuffer );
			}
			catch( err ) {
				fnCallback.call( self, err, cBuffer );
				return;
			}

			fnCallback.call( self, null, oResult );
		} );
	});
	
	if( cBody ) {
		req.write( cBody );
	}

	req.end();

	req.on( 'error', function( err ) {
		console.error( 'err' );
		console.error( err );
		console.error( ' ' );
		fnCallback.call( self, err, null );
	});

};// /_httpsRequest()

DNSPod.prototype._get = function( cMethod, oParams, fnCallback ) {
	var self = this;
	var cParams = ( typeof oParams == 'string' ) ?oParams :this._serialize( oParams );
	var options = {
		path: this.path.concat( cMethod,'?',cParams ),
		method: 'GET',
	};// /options
	
	this._httpsRequest( options, '', fnCallback );

};// /_get()

DNSPod.prototype._put = function( cPath, oData, fnCallback ) {
	var self = this;
	var cBody = ( typeof oData == 'string' ) ?oData :JSON.stringify( oData );
	var options = {
		path: this.path.concat( cPath ),
		method: 'PUT',
	};// /options
	
	this._httpsRequest( options, cBody, fnCallback );

};// /_put()

DNSPod.prototype.auth = function(){
	var pass = new Buffer( this.password, this.passenc ).toString();
	
	this._get( 'auth', {email:this.email, password:pass}, function( err, result ){

		if( err ) {
			this.trigger( 'error', err );
			return;
		}

		if( result.error ) {
			this.trigger( 'error', {message:result.error, method:'auth', result:result } );
			return;
		}

		this.mario = result.mario;
		this.headers.Cookie = 'mario='.concat( this.mario );

		this.emit( 'authenticated' );
	} );
};// /auth()

DNSPod.prototype.search = function( cTerm, fnCallback ){
	this._get( 'search', {term:cTerm}, function( err, result ){
		if( err ) {
			fnCallback( err, null );
			return;
		}

		if( result.error ) {
			fnCallback( {message:result.error, method:'search', result:result } );
			return;
		}

		fnCallback( null, result );
	} );
};// /search()

DNSPod.prototype.getRecords = function( cDomain, fnCallback ){
	this._get( 'records/'.concat( cDomain ), {}, function( err, result ){
		if( err ) {
			fnCallback( err, null );
			return;
		}

		if( result.error ) {
			fnCallback( {message:result.error, method:'getRecords', result:result } );
			return;
		}

		fnCallback( null, result );
	} );
};// /getRecords(

DNSPod.prototype.getSubdomain = function( cDomain, cSubdomain, fnCallback ){
	var i, l, record = null;
	this.getRecords( cDomain, function( error, result ) {
		if( error ) {
			fnCallback( error, result );
			return;
		}

		for( i = 0, l = result.length; i < l; i++ ) {
			if( result[i].sub_domain == cSubdomain ) {
				record = new DNSPod.DNSPodReccord( cDomain, result[i] );
				break;
			}
		}// /for()
		
		fnCallback( null, record );
	} );
};// /getSubdomain()

DNSPod.prototype.putRecord = function( oRecord, fnCallback ){
	var i, l;
	var id = oRecord.id;
	var domain = oRecord.domain;
	var params = 'sub_domain record_type value mx ttl'.split( ' ' );
	var oData;
	
	if( oRecord.constructor === DNSPod.DNSPodReccord ) {
		oData = oRecord.toJSON();
	}
	else {
		oData = {
			area: '0',
			sub_domain: '',
			record_type: '',
			value: ''
		};// /oData{}
	
		for( i = 0, l = params.length; i < l; i++ ) {
			if( oRecord[ params[i] ] ) {
				oData[ params[i] ] = oRecord[ params[i] ];
			}
		}// /for()
		
	}
	
	this._put( 'records/'.concat( domain,'/',id ), oData, function( err, result ){
		if( err ) {
			fnCallback( err, null );
			return;
		}

		if( result.error ) {
			fnCallback( {message:result.error, method:'putRecord', result:result } );
			return;
		}

		fnCallback( null, result );
	} );
};// /putRecord()

DNSPod.DNSPodReccord = function( cDomain, oData ) {
	var param, value, params = DNSPod.DNSPodReccord.params;
	
	this.domain = cDomain;
	this.area = '0';
	this.sub_domain = '';
	this.record_type = '';
	this.value = '';
	
	for( n in oData ) {
		this[n] = oData[n];
	}// /for()
	
	for( i = 0, l = params.length; i < l; i++ ) {
		param = params[i];
		if( oData[ param ] ) {
			value = oData[ param ];
			
			if( param == 'area' ) {
				value = DNSPod.DNSPodReccord.areaCode( value );
			}
			this[ param ] = value;
		}
	}// /for()
	
};// /DNSPod.DNSPodReccord()

DNSPod.DNSPodReccord.areaCode = function( cArea ) {
	var n, c;
	
	if( ( /^\d/ ).test( cArea ) ) {
		return cArea;
	}
	
	c = cArea.toLowerCase();
	for( n in DNSPod.area ) {
		if( DNSPod.area[n].toLowerCase() == c ) {
			return n;
		}
	}// /for()
	
	return '0';
};// /areaCode()

DNSPod.DNSPodReccord.params = 'area sub_domain record_type value mx ttl'.split( ' ' );

DNSPod.DNSPodReccord.prototype.toJSON = function() {
	var i, l, n, o = {}, params = DNSPod.DNSPodReccord.params;
	
	for( i = 0, l = params.length; i < l; i++ ) {
		n = params[i];
		o[n] = this[n];
	}// /for()
	
	return JSON.stringify( o );		
};// /toJSON()


exports = module.exports = DNSPod;