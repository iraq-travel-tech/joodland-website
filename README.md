# JooLand travel

front end tech stack: 
1. nextjs
2. tailwindcss
3. framermotion

### to run the project locally:

1- clone the repo 

2- open your terminal/cmd in same folder in your pc and run: 
``` 
npm install 
npm i @radix-ui/react-select
```

3- to run the project: 
``` 
npm run dev 
```

4- to deploy and host the project on Girebase hosting:
```
firebase experiments:enable webframeworks    

firebase login
    joodland.iraqtraveltech@gmail.com

firebase init hosting   
    use an existing project
        joodland-iraqtraveltech (joodland-iraqtraveltech)
? Detected an existing Next.js codebase in the current directory, should we use this? (Y/n)       
    Y

? In which region would you like to host server-side content, if applicable? (Use arrow keys)
    europe-west1 (Belgium)  

nvm install 19.8.1

nvm use 19
    Now using node v19.8.1 (npm v9.5.1)

npm install firebase-tools
npm install -g firebase-tools@v11.19.0

firebase deploy
```
Error message:
```
Building a Cloud Function to run this application. This is needed due to:
 • app directory (unstable)
 • advanced redirects

info  - Creating an optimized production build ..
Error: An unexpected error has occurred.

Having trouble? Try again or contact support with contents of firebase-debug.log
info  - Creating an optimized production build 
```