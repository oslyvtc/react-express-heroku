To run app:
1. Download or clone project
2. Open twitterApp folder and run: npm install
3. Run: node server.js
4. Run: npm start

To run test:
1. npm test

To deploy to Heroku
Run:
1. heroku login
2. heroku create $APP_NAME --buildpack https://github.com/mars/create-react-app-buildpack.git
3. git push heroku master