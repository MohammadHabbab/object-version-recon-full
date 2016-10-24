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

  componentWillMount() {
    axios.get('./api')
         .then(function (response) {
           this.setState({object_types:response.data})

         }.bind(this))
  }

  _uploadFile(e){
    e.preventDefault()
    $('#csvfile').parse({
      config: {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
          let csvInfo = results.data
          let objectTypeArray = []
          for (var i = 0; i < csvInfo.length; i++) {
            objectTypeArray.push(csvInfo[i]["object_type"])
            axios.post('./api', csvInfo[i])
                 .then(function (response) {
                   this.setState({object_types:response.data})
                 }.bind(this))
          }
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
    let chosenObjectForAxios = this.refs.selectedObject.value
    this.setState({chosen_object:chosenObject})
    let csvInfo = this.state.csvInfo
    let timestampsArray = []
    axios.get('./api?objectType=' + chosenObjectForAxios)
         .then(function (response) {
           this.setState({timestamps:response.data})
         }.bind(this))
  }

  _selectTimestamp(e){
    let csvInfo = this.state.csvInfo
    let chosenObjectForAxios = this.refs.selectedObject.value
    let timestampSelected = this.refs.selectedTimestamp.value
    axios.get('./api?objectType=' + chosenObjectForAxios + "&timestamp=" + timestampSelected)
         .then(function (response) {
           let resInfo = response.data[0]
           this.setState({properties:resInfo["object_changes"]})

         }.bind(this))
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
          <input type="submit" value="upload File"/>
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
