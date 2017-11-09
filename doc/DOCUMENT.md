# ts-dva

## Introduction

This project is a web application on mobile platform, we can use it to read technology news on V2EX. In addition to acknowledge infomation, we can get weather data for our health.

## Technology Stack

In this project, I used TypeScript to build more robust, secure and scalable web application. Unlike Vanilla JS, TypeScipt provides more powerful type checking and type infering in static and more language features.

I also used webpack, postcss, babel which tool chain is combined with. We can compile our code, hot replace modules and pack our business code in memory and so on.

Last but not least, React and Antd-mobile are the hero of dva. The concise UI is combined with these, so that I can fix my attention on build the appropriate structure of project.

## Problem and Solution

When I used the api of third-party, I encountered a problem: The broswer disallowed me with get data resource from cross origin. This is a deadly because the data is spirit of this project. So I run a proxy server writed by NodeJS in local and it monitor the same port of dev server.

So if I want to get data resource, I firstly send a request to my local proxy server. This action is allowed because the dev server and proxy monitor same port in local, they are in same origin. And then, proxy server send the raw request from broswer to remote server, This is also legal because only request from broswer has the limit of cross origin. When remote server response some date, proxy transmit these to broswer, done!

It looks like have solved my problem, really? Oops, The protocol of apies are different.Some one are HTTP and the other are HTTPS. So If I send a HTTP request to a remote server can only accept HTTPS, the remote server will response status code 301, which means you need to request again with HTTPS. Because proxy server just tranmit data, it tranmit 301 to broswer, and broswer will send HTTPS request to remote server directly. BOOM, "Cross-Origin-Is-Not-Allowed"! So the proxy need to transmit or deal with by oneself according to status code in response.

Done!

## API

V2EX (JSON) :

- "/topic/show.json?id=" : get specific topic
- "/topics/show.json?node_id=" : get all topic in one node
- "/replies/show.json" : get all replies in one topic

Weather (XML) :

- "/WeatherApi?citykey=" : get data of specific city

**That's all, thank you.**
