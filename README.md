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

#### NOTE

If you decide to attach a credential to `REACT_APP_WEB_CLIENT_ID`, make sure that it uses the same `PRIVATE_KEY` as `BACKEND_CLIENT_ID`. In this demo the `REACT_APP_WEB_CLIENT_ID` and `BACKEND_CLIENT_ID` share the same `PRIVATE_KEY`. Although this is entirely optional.

Here is an example of how the `.env` file should look like:

```
REACT_APP_BASE_URL=https://directweb.qa.loginid.io
REACT_APP_WEB_CLIENT_ID=am_pUlDE1dnKq11qzIkD_KIzqyoK8t-g1dZnUdwzbGehg7p2Q3R8eLa4rNr_x7mlfMadN5GFKkSef4K2UKsoSQ
BACKEND_CLIENT_ID=gbxEg41g6WLPX0ggD19fcu6pnD9q25pcUR8_Wd0swhdiIcFbpACEW7j4QAofxe_-Q8tg8KUfd9H0oPsn4cvMLA
PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AfEGCCqGSM49AwEHBG0wawIBAQQgahNvZS5BKHI1y59p\n5mBfZQ3QM16zRghLfdiCY7KDhI2hRANCAAQyfTeuqPrtqsa2YGsarTkg9fWdq8Ta\nBBmf8PqLBaELtBa7sKE0IEusa0Q+KPSdyeXF3Kii1dYrh2Kf8KQnjJ1v\n-----END PRIVATE KEY-----"
```

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
3. Run the front-end server with `npm start`.

Project will now be found at [http://localhost:3000](http://localhost:3000).

## How to Run with Docker

1. Create and fill up .env file from above.
2. Enter `docker-compose up`
3. Project will now be found at [http://localhost:3000](http://localhost:3000).

### Features

#### Register with Proof

This will register a user on LoginID's server with no set of credentials and then start the proof flow with the
same username. This is needed because proof flow needs a registered user to begin with. A user is also registered
in our local database.

#### Register with FIDO2

This will register a user using FIDO2. This point of this is to display that even if a user has a FIDO2 credential, the same user can go through the proof process by clicking the `Proof` button. A user is also registered in our local database.

#### Proof

Enters the user into the proof flow. This can be any registered user found in LoginID's database (FIDO2, password, no credentials).

#### Login with FIDO2

Authenticate with a FIDO2 user. This is to display even if a user has a FIDO2 credential, the same user can go through the verify process as well.

#### Verify

Enters the user into the verify flow that has a `authid` credential associated to it.
