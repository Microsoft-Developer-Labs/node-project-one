# Node.js Authentication Website Project
Feel free to copy and share.

As many people know, Apache, ASP.NET & Node.js are huge website servers for developers. Apache handles simple requests and responses, Node controls requests and responses and so does ASP.NET. In this project were going to focus on the authentication requests and responses in Node.js so you people won't have to!

## What authentication does to your website
1. Sign up/Login forms time accessible.
(NOTE: Time accessible is if a user logs in, and stays logged in for specified time period. If they exceeded the maximum, log them out.)
2. Control login time

As said in #1, if the user is logged in for a specific time period, they won't be logged out.

## Why does authentication need to be tied with https://?
HTTPS secures this method of signing in and signing up. This way hackers can't steal valuable information.
HTTPS can be used in a self-signed certificate, or a bought copy.

## How to install authentication packages
There are thousands of Node.js packages and counting! [See Node.js Packages Here](https://www.npmjs.com/)

To install the authentication method we're going to have:

`npm install passport`

`npm install passport-local`

Make sure you install the rest of the packages that come with the project just by typing `npm install [package]`

&copy; Microsoft Corporation 2018. All rights reserved.
