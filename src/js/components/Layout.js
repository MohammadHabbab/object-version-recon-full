import React from "react"
import ReactDOM from 'react-dom'
import axios from 'axios'
import {FormControl} from "react-bootstrap";

export default class Layout  extends React.Component {
  constructor() {
    super()
    this.state = {csvInfo:[],
                  object_types:[],
                  chosen_object:[],
                  timestamps:[],
                  properties:[]}
  }

  _uploadFile(e){
    e.preventDefault()
    $('#csvfile').parse({
      config: {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
          let csvInfo = results.data
          this.setState({csvInfo:csvInfo})
          let objectTypeArray = []
          for (var i = 0; i < csvInfo.length; i++) {
            objectTypeArray.push(csvInfo[i]["object_type"])
          }

          let objectTypes = objectTypeArray.filter((v, i, a) => a.indexOf(v) === i)
          objectTypes.unshift(" ")
          this.setState({object_types:objectTypes})
          this.refs.selectedObject.value = " "
          this.refs.selectedTimestamp.value = " "
          this.setState({properties:[]})

          alert("Upload Successful!")
        }.bind(this)
      }
    })
  }

  _selectObject(e){
    let chosenObject = e.target.value
    console.log("The selected object is ", this.refs.selectedObject.value);
    this.setState({chosen_object:chosenObject})
    let csvInfo = this.state.csvInfo
    let timestampsArray = []
    for (var i = 0; i < csvInfo.length; i++) {
      if (csvInfo[i]["object_type"]===chosenObject) {
        timestampsArray.push(csvInfo[i]["timestamp"])
      }
    }
    timestampsArray.unshift(" ")
    this.setState({timestamps:timestampsArray})
  }

  _selectTimestamp(e){
    let csvInfo = this.state.csvInfo
    console.log("The selected object is ", this.refs.selectedTimestamp.value);
    for (var i = 0; i < csvInfo.length; i++) {
      if (csvInfo[i]["object_type"] === this.state.chosen_object && csvInfo[i]["timestamp"]=== parseInt(e.target.value)) {
        this.setState({properties:csvInfo[i]["object_changes"]})
      }this.state.csvInfo[i]
    }
  }

  render() {
    let key = 0
    let object_type=  this.state.object_types.map( object_type=>
        <option key={key++} value={object_type}>{object_type}</option>
      )

    let timestamps= this.state.timestamps.map(timestamp=>
        <option key={key++} value={timestamp}>{timestamp}</option>
    )

    let object_changes = this.state.properties

    return(
      <div>
        <form name="uploadFile" id="uploadFile" onSubmit={this._uploadFile.bind(this)}>
          <input id="csvfile" type="file" ref="uploadedFile"/>
          <input type="submit" value="uploadedFile"/>
        </form>
        <select ref="selectedObject" onChange={this._selectObject.bind(this)}>
          {object_type}
        </select>
        <select ref="selectedTimestamp" onChange={this._selectTimestamp.bind(this)}>
          {timestamps}
        </select>
        <div>
          Object Changes for seleted object and timestamp are: {object_changes}
        </div>
      </div>

    )
  }
}
