# Shohratbaz<sup>*</sup>
Shohratbaz(Fame Addict), a platform to redistribute your content over the internet

Publishing on Medium is the first step, you need to share your content over the internet to get your voice heard.
I am developing Shohratbaz to help myself and any other writers on Medium, to share their contents over related Facebook groups, Linkedin groups, Reddit channels or anywhere else that your content can get attentions.
Starting from Facebook groups, I will add more channels to share and redistribute your content.
Also, it's not just for Medium, you can share anything from links to code snippets, etc. easily

This is an open-source project and it will remain so. I am running an online version of this on Google App Engine
Here you can use Shohratbaz in action https://shohratbaz.appspot.com (<i>Currently my Facebook App is under review, it takes a little time</i>)

<i>*</i> <b>Shohratbaz</b> is a slang in my native language.
<br>
it pronounces like a combination of show(but with an H at the end, like when you say oh)+rat+buzz. It has nothing to do with rat, but maybe something with show and buzz :)
<br>
The best translation comes to my mind for that is: <b>Fame Addict</b>

## How to run
You can run Shohratbaz on your local or on your own server
### Prerequisites 
- Obviously, Node.js and npm installed. Shohratbaz developed with Node.js version 10.16.0 LTS
- You need either have a MongoDB server running, or have a MongoDB ready in the clouds, like MongoDB Atlas.
- You need to create a Facebook App and provide Facebook app id and app secret

### Installation and running
Create a `.env` file, containing these parameters
```
PORT = PORT NUMBER
BASE_URL = BASE URL APP IS RUNNING ON

# MongoDB Database Connection
MONGODB_URI = MONGODB DATABASE URL

# FaceBook App Conf
FACEBOOK_APP_ID = FACEBOOK APP ID
FACEBOOK_APP_SECRET = FACEBOOK APP SECRET
FACEBOOK_CALLBACK_URL = facebook/callback # FACEBOOK CALLBACK URL, DEFAULT IS: facebook/callback
```

Run `npm install`, wait until all modules are installed

Now you can run `npm start` to start the server.

## How to use
Getting to `BASE_URL` you provide, you will lead to a page with a link to Facebook authentication. You need to authorize with your Facebook account. Then you will be redirected to the main page.
![](https://www.googleapis.com/drive/v3/files/1RAAB_4qxZQNXGor_-0owKmnePCYpsDY3?alt=media&key=AIzaSyBed_JQLFI-3eioS00r4nvUH_Op16HDXuI) 

In the main page, you can add `shareable`. Basically, URLs that you want to share, but it can be anything from a code snippet to something you need to keep in mind to share.

Also, there is a text area, you can write what you want to share. You may use links from the shareable list or you can write anything.

Here is an explanation of the sharing panel
![](https://www.googleapis.com/drive/v3/files/1K3OkeGLe4B64YxumXNs3zER2ABHw-JKe?alt=media&key=AIzaSyBed_JQLFI-3eioS00r4nvUH_Op16HDXuI) 

## Features to come
Currently, I'm working on:
- Getting more channels to share: Linkedin groups and Reddit subreddits are next
- A recommendation system that recommends the best places to share your content based on your topics

## Connect with me
Let's connect on [Linkedin](https://www.linkedin.com/in/amiryousefi/) or [Twitter](https://twitter.com/im_amiryousefi)
<br>
You can follow me on [Medium](https://medium.com/@AmirYousefi), I will write a comprehensive tutorial on how to develop Node.js applications like Shohratbaz
