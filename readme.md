# adp-code-test

requires nodeJS 10+  
tested on windows and osx  

## setup
- create a `.env` file in the project root.
- copy the contents of `.example.env` into it,
- replace the placeholder value of `FUSION_API_KEY` with your key.
- adjust the `HTTP_PORT` value as needed or desired.
- run `npm install`

## try it
### tests
```
npm run test
```

### api
```
npm run start
```

- in your browser navigate to  
`http://localhost:3000/iceCreamShops/summaries?location=Alpharetta,GA&limit=5&sortBy=rating`

- or postman  
GET `http://localhost:3000/iceCreamShops/summaries?location=Alpharetta,GA&limit=5&sortBy=rating`

- or curl  
`curl "http://localhost:3000/iceCreamShops/summaries?location=Alpharetta,GA&limit=5&sortBy=rating"`

## TODO
- simple react frontend
- test wireup
- improve wireup with factories or IoC container (stretch)