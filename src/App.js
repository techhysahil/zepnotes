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
      currentNoteDataAsText : "",
      showNote : false,
      currentDirectoryId : null,
      currentNotesId : null
    }

    this.updateNoteContent = this.updateNoteContent.bind(this);
    this.showNoteContent = this.showNoteContent.bind(this);
    this.updateShowNote = this.updateShowNote.bind(this);
  }

  updateNoteContent(content,text){
    this.setState({
      currentNoteData : content,
      currentNoteDataAsText : text
    })
  }

  showNoteContent(content,noteId,directoryId){
    this.setState({
      showNote : true,
      currentNoteData : content
    })
  }

  updateShowNote(){
    this.setState({
      showNote : false
    })
  }
  
  render() {
    return (
      <div className="zepnpotes-wrapper">
        <FolderComponent 
          currentNoteData={this.state.currentNoteData}
          showNoteContent={this.showNoteContent}
          currentNoteDataAsText={this.state.currentNoteDataAsText}
        />
        <TextEditor 
          updateNoteContent={this.updateNoteContent}
          showNote={this.state.showNote}
          currentNoteData={this.state.currentNoteData}
          updateShowNote={this.updateShowNote}
        />
      </div>
    );
  }
}

export default App;
