var ObjectVersions = require('mongoose').model('ObjectVersion');

module.exports = {

  query: function(req, res, next) {
    console.log("the req.query is ", req.query);
    console.log(req.query.objectType === "objectTypes");
    var objectType = req.query.objectType
    var timestamp = parseInt(req.query.timestamp)
    var timestampArray =[" "]
    var uniqueTimestampArray

    if (req.query.objectType && !req.query.timestamp) {
      objectType = req.query.objectType
      ObjectVersions.find({object_type:objectType})
                    .exec(function (err, objectversions) {
                      if (err) {
                        res.status(400).send(err);
                      };
                      for (var i = 0; i < objectversions.length; i++) {
                        timestampArray.push(objectversions[i]["timestamp"])
                        uniqueTimestampArray = timestampArray.filter((v, i, a) => a.indexOf(v) === i)
                      }
                      res.status(200).json(uniqueTimestampArray)
                    })

    }else if (req.query.timestamp) {

      ObjectVersions.find({object_type:objectType, timestamp:timestamp})
                    .exec(function (err, objectversions) {
                      if (err) {
                        res.status(400).send(err);
                      };
                      console.log(objectversions);
                      res.status(200).json(objectversions)
                    })
    }else{
      var objectTypeArray = [" "]
      var uniqueObjectTypesArray
      ObjectVersions.find()
                    .exec(function(err, objectversions) {
                      if (err) {
                        res.status(400).send(err);
                      }

                      for (var i = 0; i < objectversions.length; i++) {
                        objectTypeArray.push(objectversions[i]["object_type"]);
                      }
                        uniqueObjectTypesArray = objectTypeArray.filter((v, i, a) => a.indexOf(v) === i)
                        res.status(200).json(uniqueObjectTypesArray)
                    })
    }

  },

  uploadFile: function(req, res, next) {
    var objectTypeArray = [" "]
    var objectTypes

    var objectVersion = new ObjectVersions(req.body)
    objectVersion.save(function (err) {
      if (err) {
        return res.status(400).send(err);
      }
      ObjectVersions.find()
                    .exec(function(err, objectversions) {

                      for (var i = 0; i < objectversions.length; i++) {
                        objectTypeArray.push(objectversions[i]["object_type"])
                      }
                        objectTypes = objectTypeArray.filter((v, i, a) => a.indexOf(v) === i)
                        res.status(200).json(objectTypes)
                    })

    })



  }

}
