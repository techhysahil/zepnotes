import React, { Component } from 'react';
import FolderComponent from './FolderComponent';
import TextEditor from './TextEditor';


import './App.css';
import './../node_modules/font-awesome/css/font-awesome.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentNoteData : "",
      showNote : false,
      currentDirectoryId : null,
      currentNotesId : null
    }

    this.updateNoteContent = this.updateNoteContent.bind(this);
    this.showNoteContent = this.showNoteContent.bind(this);
  }

  updateNoteContent(content){
    this.setState({
      currentNoteData : content
    })
  }

  showNoteContent(content,noteId,directoryId){
    this.setState({
      showNote : true,
      currentNoteData : content
    })
  }
  
  render() {
    return (
      <div className="zepnpotes-wrapper">
        <FolderComponent 
          currentNoteData={this.state.currentNoteData}
          showNoteContent={this.showNoteContent}
        />
        <TextEditor 
          updateNoteContent={this.updateNoteContent}
          showNote={this.state.showNote}
          currentNoteData={this.state.currentNoteData}
        />
      </div>
    );
  }
}

export default App;
