// $('#uploadFile').change(function(e){
//   var file = e.target.files[0];
//   console.log("the file is ", file);
//
//   var formData = new FormData();
//   formData.append('uploadFile', file);
//   console.log(formData);
//
//   // post
//   $.ajax({
//     url:'http://localhost:1337/csv',
//     type:'post',
//     data: formData,
//     processData: false,
//     contentType: false,
//     success: function (data, status, jqXHR){
//       console.log(data);
//     },
//     crossDomain: true
//   })
// })

import React from "react";
import ReactDOM from "react-dom";

import Layout from "./components/Layout";

const app = document.getElementById('app');
ReactDOM.render(<Layout/>, app);
