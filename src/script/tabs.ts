// import React from 'react';
// import ReactDOM from 'react-dom';
import { cardRender } from "./adaptive-card";

console.log("I am here!!");
function handleFileSelect(evt: any) {
  var files = evt.target.files; // FileList object

  // files is a FileList of File objects. List some properties.
  var output = [];
  for (var i = 0, f; f = files[i]; i++) {
    document.getElementById("fileList").innerHTML += '<li>' + f.name + '</li>';
    // alert("I am working!!");
    // output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
    //             f.size, ' bytes, last modified: ',
    //             f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
    //             '</li>');
  }
  //document.getEle mentById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

function handleAPICall() {
  cardRender('S', 'Y');
}
function handleCardRendering() {
  try {

    const files = (<HTMLInputElement>document.getElementById('files')).files;
    const files2 = (<HTMLInputElement>document.getElementById('files2')).files;
    const reader1 = new FileReader();
    const reader2 = new FileReader();

    ////////////////////////////////////////////

    //////////////////////////////////////////







    //var text;
    // if(files.length == 2) {
    //   console.log("File length is 2");
    // } else {
    //   alert("Error!");
    // }
    /////////////////////////////////////////////////////////
    var start = 0;
    var stop = files[0].size - 1;
    var blob = files[0].slice(start, stop + 1);
    reader1.readAsText(blob);

    stop = files2[0].size - 1;
    blob = files2[0].slice(start, stop + 1);
    reader2.readAsText(blob);
    ////////////////////////////////////////////////////////////
    // for (var i = 0; i < files.length; i++) {
    //   var start = 0;
    //   var stop = files[i].size - 1;
    //   var blob = files[i].slice(start, stop + 1);

    //   text += reader.readAsText(blob);
    // }
    /////////////////////////////////
    reader1.onloadend = function (evt) {
      if (evt.target.readyState == FileReader.DONE) { // DONE == 2
        const text1 = evt.target.result.toString();
        reader2.onloadend = function (evt2) {
          if (evt2.target.readyState == FileReader.DONE) {
            const text2 = evt2.target.result.toString();
            cardRender(text1, text2);
          }
        }

      }
    };
    ///////////////////////////////////////////////////////
  } catch (error) {
    console.log("Error in file handling!!");
  }
}

window.onload = () => {
  document.getElementById('files').addEventListener('change', handleFileSelect, false);
  document.getElementById('files2').addEventListener('change', handleFileSelect, false);
  document.getElementById('render').addEventListener('click', handleCardRendering);
  //document.getElementById('render').addEventListener('click', handleAPICall);
};

