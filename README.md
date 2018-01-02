# React Native - Cars Store

### App Setup - App only works on iOS for now

#### Node, Watchman
- Ensure Node is version 4 or newer.
- brew install watchman

#### React Native CLI
- npm install -g react-native-cli

##### Create an account at https://stripe.com (necessary for accepting payments) and use test data and test keys:
* Example keys ->
	- secret key: sk_test_7HOdabkmkna9u98INosana0m
	- public key: pk_test_djBsJB6mnsdd328sn89nnnad
* Replace pk_test_rsn6gZfw0gsQUc4tKBUwuMCS on line 16 in CarDetail.js with the new test public key

##### Create a free account for IBM Bluemix (Watson) at https://console.bluemix.net/ and follow instructions adding the Text-to-Speech and Natural Language Understanding services

##### Create .env file with the following variables
* Database:
	- DB_HOST, DB_USER, DB_PASS
* Stripe:
	- STRIPE_SK (Stripe - secret key)

##### Create accessKeys.json with an object using key:value pairs with the following keys from IBM Bluemix
* Natural Language Understanding:
	- NLU_Username, NLU_Password
* Text-to-Speech:
	- TTS_Username, TTS_Password

##### Download and install Xcode from Mac App Store (this will take at least an hour so you will have time to go for lunch)

##### Install Cocoa Pods - on your computer
- sudo gem install cocoapods

##### Install Carthage - on your computer
- brew update
- brew install carthage

##### Install dependencies inside project folder 
- npm install
- cd ios/
- carthage update --platform iOS

##### CREATE postgreSQL database - on your computer
- CREATE DATABASE react_cars;

##### Database setup -> knex - migrate:rollback, migrate:latest, knex seed:run
- from within ios folder cd .. back to React-Native_Cars-Store
- npm run rollback-latest-seed

#### Running App - Navigate in terminal into "React-Native_Cars-Store" folder
- cd api/
- node or nodemon server.js

##### Option 1 - Run from terminal
- Navigate in new terminal window into React-Native_Cars-Store folder
- react-native run-ios (the first run of the project from a fresh install will take a while... you will have time to get a coffee)

##### Option 2 - Alternate Method for running ReactCars
- Open React-Native_Cars-Store folder and then inside ios folder open 'ReactCars.xcworkspace' (white icon) - important! do not use ReactCars.xcodeproj (blue icon) as this one may not work with the 'tipsi-stripe' React Native module
- Project will take a couple of minutes to index
- Inside the xCode from the top left hand corner next to ReactCars > select an ios device simulator or use the one already displayed and then hit the play button to build and run the app

#### Using Microphone for Voice enabled Search
- speak clearly and ensure entire speech is displayed under Results before stopping of the recording
- for IBM Watson Natural Language Processing to work properly the message must be a minimum of 15 characters long... so searching for "A red car" will default to the regular search functionality which can be typed into the search bar. So instead say something like "A red car with 4 doors" or anything else

#### Debugging
- to view console.log() bring the simulator into the main view
- type command + D
- press Debug JS Remotely... will open Chrome Developer tools. 
- right click on screen and press Inspect... this should bring up the tools with Console at the bottom - only console is available.
- update code... ie insert console.log()
- bring the simulator into the main view and press command + R to reload

* I have left a console.log(results) on line 69 in src/views/CarList.js in the speechTextReceived function which starts on line 58 to display the results object from IBM Watson

* If a red error screen appears bring the Chrome developer tools to the forefront and then bring the simulator to the main view. Press command + R to reload
