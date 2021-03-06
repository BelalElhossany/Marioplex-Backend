# :headphones: Marioplex Spotify clone back-end

## Marioplex node js server is a clone to spotify music streaming server, which tries to mimic the spotify server capability in handling different requests, and integrating external APIs, databases and much more features.

### Marioplex back end server features:
<ul>
<li> :key: Authentication and authorization </li>
<li> :lock_with_ink_pen: OAuth2 facebook authentication and authorization </li>
<li> :unlock: Forget your password no problem you can reset it by just a click</li>
<li> :file_folder: Mongodb as a service  </li>
<li> :gear: Integrating with google API  </li>
<li> :musical_note: Media straming all day and night with different qualities to choose from  </li>
<li> :stop_button: Encrypted media to keep it safe from illegal downloads  </li>
<li> :e-mail: Mailing service, get confirmation mail whenever you
 <ul>
<li>Sign up</li>
<li>Froget you password</li>
<li>Promoted to be premium user</li>
<li>Updated your profile info</li>
</ul>
 </li>
<li> :moneybag: Privileges for our awesome premium users   </li>
<li> :musical_score: Feel bored just create your own playlist with only the best songs you like    </li>
<li> :thought_balloon: reorder your songs in your playlist however you like</li>
<li> :crystal_ball: Like randomness then we got your back with our great shuffle feature to feel the thrill of listening to the unknown    </li>
<li> :arrows_counterclockwise: The song is on fire then let it on repeat till you hate it    </li>
<li> :art: Dreamed of being an artist then be one and upload your songs and watch as users fall in love with them    </li>
<li> :earth_africa: Follow your favourite users and artists and be notified whenever the upload something or create albums and playlists    </li>
<li> :satellite: Get notifications whenever
 <ul>
 <li> some user viewed you profile (Facebook can learn something or two from us)</li>
 <li> artist you follow uploaded a new album/track</li>
 <li>some user followed you</li>
 <li>some user followed your playlist, and get a sense of how many people have the same musical taste as you</li>
</ul>     
</li>
<li> :link: Customize every detail about your profile</li>
<li> :mag_right: Search for your beloved track/artist/user/albums/playlist by using our fuzzy search engine and get the top results and best match possible</li>
<li> :pensive: Deleted a playlist by mistake ? Don't worry my child you can always recover it from our deleted playlist</li>
<li> :desktop_computer: Your homepage is specially customized for you and your taste with a spoon of the most populat tracks/artists in your area</li>
<li> :leaves: Your recently played songs are always stored so you will never miss them</li>
<li> :notes: Tracks are ordered based on different categories to always find the best category for you</li>
<li> :chart_with_upwards_trend: Statistics for uploaded songs and albums. number of listeners and likes per
day, month, and year. also we didn't forget to add our beloved artist statistics which include number of followers per day, month and year </li>
<li> :broken_heart: you can always delete your account when you get bored or spammed by our emails, but please don't we will miss you </li>

</ul>

![intro](static/intro.gif) 


## Best of all, It is totally free and open-sourced
### want to try it yourself


### run for developers <br/>
#### first install the devDependencies and dependencies by running
> npm install
#### then set node enviroment to be running in development , if you are on  linux run
> export NODE_ENV=development
#### if you are on windows run
> set NODE_ENV=development
#### then run the nodeJS seerver <br/>
> node server.js
### run for production

#### first install only the dependecies by running
> npm install --only=prod
#### then set node enviroment to be running in production , if you are on  linux run
> export NODE_ENV=production
#### if you are on windows run
> set NODE_ENV=production
#### then run the nodeJS seerver <br/>
> node server.js

### environmental variables
> Be sure to add your information in .env file
#### .env file should have
> CONNECTION_STRING,SPOTIFY_EMAIL,SPOTIFY_EMAIL_PASSWORD,SPOTIFY_PASSWORD_IN_APP,LIMIT,GENRE_LIMIT,FACEBOOK_APP_ID,FACEBOOK_APP_SECRET,google_drive_access_token,google_drive_refresh_token,google_drive_scope,google_drive_client_id,google_drive_project_id,google_drive_client_secret,type,project_id,private_key_id,private_key,client_email,client_id,auth_uri,token_uri,auth_provider_x509_cert_url,client_x509_cert_url,android_project_id,android_private_key_id,android_private_key,android_client_email,android_client_id,android_auth_uri,android_token_uri,android_auth_provider_x509_cert_url and android_client_x509_cert_url

## generate seeds
### first install node-mongo-seeds globally by running
> npm install -g node-mongo-seeds
### then generate the seeds on the default database by running
> seed

## migrations 


### install migrate-mongoose globally 
> npm install migrate-mongoose -g

### to run all migrations run 
> migrate up 

### to run specific migration run
> migrate up [name of migration to run]

### to get more info about migrate-mongoose run
> migrate -h

## to generate apidoc 
>use npm install
> or npm install -g apidoc

### generate in folder ApiDocumentation (run in its path)
>npx apidoc -i .\code -e node_modules -o .\Html 

## to run unit test 
### to run only for source file (in project path)
>  jest -c  --coverage --collectCoverageFrom=source/*.js
### to run for all files  (in project path)
>  jest -c  --coverage 
### can also use 
> jest --runInBand ./tests --coverage
