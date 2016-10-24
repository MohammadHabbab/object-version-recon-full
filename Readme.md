# Object Versioning Reconstruction

## Introduction

This project takes a CSV file of N-rows for the following objects:
ObjectA: {property1, property2, property3}

ObjectB: {property1, property2, property3}

.

..

...

ObjectZ: {property1, property2, property3}

```

object_id | object_type | timestamp | object_changes
:-------: | :---------: | :--------: | :------------
 1        |  ObjectA    |  412351252 | {property1: "value", property3: "value"}
 1        |  ObjectB    |  456662343 | {property1: "value"}
 1        |  ObjectA    |  467765765 | {property1: "altered value", property2: "value"}
 2        |  ObjectA    |  451232123 | {property2: "value"}
...       |  ...        |  ...       | ...

```

The CSV columns are:

 - **object_id:** is a unique identifier per-object type.
 - **object_type:** denotes the object type.
 - **timestamp:** needs no explaination
 - **object_changes:** the properties changed for specified object at **timestamp**.

The app will allow users to upload the CSV file and then query the system about the states of objects at specific timestamp.

## Improvements from earlier version

Had initially did this as the frontend for the object versioning reconstruction app (for more information of the earlier version, see [here](https://github.com/RenchChua/object-version-recon-back)).

After reading the suggestion from Jordan's email, I wondered if I can combine both the frontend and the backend into a complete app. After some exploration, I found a library, [Papa Parse](http://papaparse.com/), that I thought could allow me to accomplish what I wanted to do.

After incorporating the Papa Parse library, I am now able to process CSV files and query the properties of each object at particular timestamps. I am also able to process more than just one file. This is an improvement from the earlier limitation that I had faced.

The MVP version of the app is deployed at [https://renchchua.github.io/object-version-recon-full/](https://renchchua.github.io/object-version-recon-full/).

## Improved full-stack version

After realising that there is value in letting other users (i.e. not the person who uploaded the CSV) query the various object versions, I connected the app to a backend server and hosted the whole app on Heroku. It is linked up to a mongo database using MLabs. The app is deployed at [https://fast-wave-66187.herokuapp.com/](https://fast-wave-66187.herokuapp.com/).

I have already uploaded two csv files (testdata and testdata2). There are two more csv files that haven't been uploaded (testdata3 and testdata4), which can be used to test the app. They can be uploaded via the frontend interface (i.e. the same interface that allows the user to upload files) or with calls to the api endpoints at https://fast-wave-66187.herokuapp.com/api. The methods are as follow:

  * GET 'https://fast-wave-66187.herokuapp.com/api' to get the array of unique object types already uploaded
  * GET 'https://fast-wave-66187.herokuapp.com/api?=' + [object type (e.g. 'ObjectA')] to get all the timestamps related to the particular object type being queried
  * GET 'https://fast-wave-66187.herokuapp.com/api?=' + [object type (e.g. 'ObjectA')] + '&timestamp=' + [timestamp (i.e. the actual timestamp you want to query)] to get the property of the object queried at the timestamp queried
  * POST 'https://fast-wave-66187.herokuapp.com/api' where the req.body is an array of json objects that is parsed from the uploaded csv file

## Using the app

This repo contains two test CSV files in the public folder. At the deployed frontend, upload either one of the test CSV files. The object types of the uploaded CSV file will then appear as options that you can choose. Once you choose the object type you want to query, the options for timestamps will appear. Choose the timestamp you want to query. The object states of the object and timestamp selected will be returned.

## Tech Stack

 - Mongoose
 - Express
 - React
 - Node.js


## Libraries used
 - jquery
 - Papa Parse
