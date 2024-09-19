#DECENTRALIZED  WEBRTC DATA APPLICATION FOR WEB CONTENT DELIVERY AND APPLICATION DEVELOPMENT
This application is a great starting place to build a phpdesktop based, or simple php/javascript application using webrtc for cryptocurrency development, decentralized website content delivery, self-hosted content, etc. This example was built on phpdesktop, but runs on any php server (newest version)


#THIS APPLICATION WAS WRITTEN ON TOP OF MY _3P php FRAMEWORK
# Secure _3p PHP Application

This is a template for the creation of secure PHP applications using _3p. Simply clone this repository. Your application will reside in the /app folder. Follow all the steps below to secure your specific site according to the URL, REQUEST logic, and file requirements, as stated in the steps below.

### Also check out /app/README.md for instructions on using _3p with your application.

<hr>

```
***********************
******* didlie ********
(c) Isaac Jacobs - 2013
***********************
****** Lic. MIT *******
***********************
```

# Secure PHP Application, a framework.

1) Fork this as a template

2) go to the htaccess and phpini files in ./readonly and edit them to fit your website, redirect ideas have been commented in, and all file extension handling and http -to- https redirects should be defined

3) your application code will be in the ./app folder and should be accessed via an index.php file in this folder

4) the text file 'registry' must contain a complete list of every file in your website root

5) This function in the 'request' class must be hard coded with all allowed GET and POST keys and allowed types and other restrictions you want to make on data sent from client to server.

```
public function filter_request(){
        //filter SUPERGLOBALS
        //$GLOBALS
        //$_SERVER
        //$_REQUEST
        //$_POST
        //$_GET
        //$_FILES
        //$_ENV
        //$_COOKIE
        //$_SESSION
    }
```
  6) This function in the ./root/index.php must be edited when your app is deployed on a public server.

```
  function set_error_reporting(){
    error_reporting(E_ALL);//comment out after deployment
    ini_set('display_errors', 1);//comment out after deployment
}
```
  7) Possible solutions to avoiding the deletion of openssl certificates written to the root directory:
    - edit the openssl.capath variable in php.ini to be in a higher directory (included)
    - functionally avoid files with the certificate extension

### This template works by handling every request to the server, rewriting .htaccess and php.ini on every instance of a request, filtering all Superglobals sent from the client, validating all files in the website root by referencing the ./root/registry to see what files you want to be there, and finally ends the php script execution (after your app code was executed) redundently to resist auto crawler load testing.
