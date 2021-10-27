# proof-verify-example

## Requirements

- Nodejs
- npm

## env

A `.env` file is needed in the directory with the following:

```
REACT_APP_BASE_URL=                  #This is the base url value found on the dashboard.
REACT_APP_WEB_CLIENT_ID=             #This is a Web client ID.
BACKEND_CLIENT_ID=                   #This is a Backend client ID with a credential attached to it.
PRIVATE_KEY=                         #This is the private key associated with <BACKEND_CLIENT_ID>.
```

**NOTE** If you decide to attach a credential to `REACT_APP_WEB_CLIENT_ID`, make sure that it uses the same `PRIVATE_KEY` as `BACKEND_CLIENT_ID`. In this demo the `REACT_APP_WEB_CLIENT_ID` and `BACKEND_CLIENT_ID` share the same `PRIVATE_KEY`. Although this is entirely optional.

You can get your client ids and PRIVATE_KEY from the [https://sandbox-usw1.api.loginid.io](https://sandbox-usw1.api.loginid.io).

- Create a .env file in the same directory as you application
- Login or create a new account
- Select Applications on the left
- Click Add Application
- Select Web Application
- Enter your application name and URL
- Capture the CLIENT_ID as REACT_APP_WEB_CLIENT_ID and BASE_URL as REACT_APP_BASE_URL
- Generate a key pair or upload you own
- Capture the PRIVATE_KEY
- Select Applications on the left
- Click Add Application
- Click 'Backend / API'
- Enter your application name and enter the same URL from Web Application
- Capture the CLIENT_ID as BACKEND_CLIENT_ID
- Attach the credential created from key pair generation/upload to your backend application

Here is an example of how the `.env` file should look like (YOURS WILL BE DIFFERENT):

```
REACT_APP_BASE_URL=https://sandbox-usw1.api.loginid.io
REACT_APP_WEB_CLIENT_ID=am_pUlDE1dnKq11qzIkD_KIzqyoK8t-g1dZnUdwzbGehg7p2Q3R8eLa4rNr_x7mlfMadN5GFKkSef4K2UKsoSQ
BACKEND_CLIENT_ID=gbxEg41g6WLPX0ggD19fcu6pnD9q25pcUR8_Wd0swhdiIcFbpACEW7j4QAofxe_-Q8tg8KUfd9H0oPsn4cvMLA
PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AfEGCCqGSM49AwEHBG0wawIBAQQgahNvZS5BKHI1y59p\n5mBfZQ3QM16zRghLfdiCY7KDhI2hRANCAAQyfTeuqPrtqsa2YGsarTkg9fWdq8Ta\nBBmf8PqLBaELtBa7sKE0IEusa0Q+KPSdyeXF3Kii1dYrh2Kf8KQnjJ1v\n-----END PRIVATE KEY-----"
```

**NOTE**: The PRIVATE_KEY is wrapped with quotes and contains \n instead of newline characters.

## How to Run

```
git clone https://github.com/loginid1/proof-verify-example.git
cd proof-verify-example
```

### Installing Dependencies

```
npm install
```

### Running Application

1. Makes sure the `.env` file is properly filled out.
2. Run the back-end server with `npm run server`.
3. Run the front-end server with `npm run dev`.

Project will now be found at [http://localhost:3000](http://localhost:3000).

## How to Run with Docker

AA

1. Create and fill up .env file from above.
2. Enter `docker-compose up`
3. Project will now be found at [http://localhost:3000](http://localhost:3000).

### Features

#### Register Proof

This will register a user on LoginID's server with no set of credentials and then start the proof flow with the
same username. This is needed because proof flow needs a registered user to begin with. If proof fails the same
username may be attempted again.

#### Register Proof and FIDO2

This will register a user on LoginID's server with no set of credentials and then start the proof flow with the
same username. This is needed because proof flow needs a registered user to begin with. It will then attempt to
add a FIDO2 credential to the same username.

If adding a FIDO2 credential fails, verify login will still work. The user cannot attempt to add a FIDO2 credential
again. This is possible just not displayed in this demo.

#### Login with FIDO2

Authenticate with a FIDO2 user. This is to display even if a user has a FIDO2 credential, the same user can go through the verify process as well.

#### Verify

Enters the user into the verify flow that has a `authid` credential associated to it.
