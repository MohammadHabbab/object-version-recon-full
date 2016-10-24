var ObjectVersions = require('mongoose').model('ObjectVersion');

module.exports = {

  query: function(req, res, next) {
    var objectType
    var timestamp

    ObjectVersions.find()
                  .exec(function (err, objectversions) {
                    if (err) {
                      res.status(400).send(err);
                    };
                    res.status(200).json(objectversions)
                  })


    if (req.query.objectType) {
      objectType = req.query.objectType


    }else if (req.query.timestamp) {
      timestamp = req.query.timestamp
    }

  },

  uploadFile: function(req, res, next) {
    let objectTypeArray = [" "]
    let objectTypes

    var objectVersion = new ObjectVersions(req.body)
    objectVersion.save(function (err) {
      if (err) {
        return res.status(400).send(err);
      }
      ObjectVersions.find()
                    .exec(function(err, objectversions) {
                      console.log("finding");

                      for (var i = 0; i < objectversions.length; i++) {
                        objectTypeArray.push(objectversions[i]["object_type"])
                      }
                        objectTypes = objectTypeArray.filter((v, i, a) => a.indexOf(v) === i)
                        console.log("the log in the find execute is ", objectTypes);
                        res.status(200).json(objectTypes)
                    })

    })



  }

}
