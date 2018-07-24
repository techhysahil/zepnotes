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
      currentNotesId : null,
      editNoteContent : true,
      currentNoteTimestamp : null
    }

    this.updateNoteContent = this.updateNoteContent.bind(this);
    this.showNoteContent = this.showNoteContent.bind(this);
    this.updateShowNote = this.updateShowNote.bind(this);
    this.enableEditing = this.enableEditing.bind(this);
    this.disableEditing = this.disableEditing.bind(this);
  }

  updateNoteContent(content,text){
    this.setState({
      currentNoteData : content,
      currentNoteDataAsText : text
    })
  }

  showNoteContent(content,noteId,directoryId,timestamp){
    this.setState({
      showNote : true,
      currentNoteData : content,
      currentNoteTimestamp : timestamp
    })
  }

  enableEditing(){
    this.setState({
      editNoteContent : true
    })
  }

  disableEditing(){
    this.setState({
      editNoteContent : false
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
          enableEditing={this.enableEditing}
        />
        <TextEditor 
          updateNoteContent={this.updateNoteContent}
          showNote={this.state.showNote}
          currentNoteData={this.state.currentNoteData}
          updateShowNote={this.updateShowNote}
          editNoteContent={this.state.editNoteContent}
          enableEditing={this.enableEditing}
          disableEditing={this.disableEditing}
          currentNoteTimestamp={this.state.currentNoteTimestamp}
        />
      </div>
    );
  }
}

export default App;
