export const amadeusConfig = {
	"url": "https://test.api.amadeus.com/v1/security/oauth2/token",
	"data": {
		"client_id": process.env.REACT_APP_AMADEUS_CLIENT_ID,
		"client_secret": process.env.REACT_APP_AMADEUS_CLIENT_SECRET,
		"grant_type": process.env.REACT_APP_AMADEUS_GRANT_TYPE
	}
};