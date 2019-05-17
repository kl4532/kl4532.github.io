# Project intro

This project use two API-s(openAQ and wikiAPI) to provide results of 10 most polluted cities in selected country for particular pollution parameter, also selected by the user.

Project was created during recruiting process for junior Frontend developer.

## Getting Started

This is static page, after downloading this project just open index.html file to start it.

## User Guide

As a user, you want application to print 10 most polluted cities in selected country(sometimes there is less in API database).
For that purpose user must input country and select pollution, then click *Search*.

Sometimes API need some more time to respond(5-20s).

## How program works

1. After user input and submit, program proceed to validation of it. If it fails,
proper information is sent to the User. If validation succeed program goes to 2.
2. Second stage is calling API using input data provided by the User. For that purpose fetch async method was used.
  - First, *openAQ* API is called, which after sorting, sends 10 most polluted cities in choosen country and for choosen      parameter.
  - Then, with a use of previous data, call for *wikiAPI* is made. At this time the result data is text
  description of each city from previous call.
During API processing, received results are rendered by using DOM manipulation.
3. Additionaly recent input data is memorized in input field and select tag, by saving it in browser localStorage. So after refreshing page last user choice is visible.

## Author


* **Korneliusz Łukasiak**
