# Introduction to the FileMaker Data API - JavaScript demo #

This code generates a single page web application which will connect to a FileMaker server and retrieve data through the FileMaker Data API.

## Just make it work ##

If you navigate to the folder `/dist` and then open `index.html` in your browser it will connect to my FileMaker server and display the chart as I did in the DevCon session.

## Installation ##

To connect the app to your own FMS you need to follow a few more steps.

1. Ensure that the FileMaker Data API is enabled on your FileMaker Server (see EnableDataAPI.mov for a walk-through of the process)
2. Upload ITG01Demo.fmp12 to your FileMaker server (username: Admin, password: Admin)
3. Using your favourite text editor open `src/js/index.js` and update the settings for fmConnection
    ```javascript
    let fmConnection = new FileMakerDataAPI({
       'server': 'https://your.server.here',
       'username': 'DataAPIReadOnly',
       'password': 'Qwerty1!',
       'database': 'ITG01Demo'
    });
    ``` 
4. To build the output from source you'll need to have node.js and npm installed. You can check to see if you have them installed by opending a command prompt and typing `node --version`. If you get an error visit [https://nodejs.org/en/download/](https://nodejs.org/en/download/).  
5. Open a terminal, navigate to the folder you have the demo and then
    ```
        npm install
        npm run build
    ``` 
    This will regenerate the content of the `/dist` folder with the changes you have made.
    
Feel free to modify the src in any way you like :-)

## But it doesn't work ##

If you open the console in your browser you should see any errors which occur in there - use those as a starting point to debug what's going wrong.

You **will** need to make a configuration change on your FileMaker server to work around Cross-Origin issues. Take a look at [this blog post](https://msdev.co.uk/fms-cross-origin) for details on how to do that.

## Contact Details ##
Steve Winter  
Matatiro Solutions  
steve@msdev.co.uk