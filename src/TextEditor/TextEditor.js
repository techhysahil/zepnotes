import React, { Component } from 'react'
import TinyMCE from 'react-tinymce';

import './TextEditor.css';

class TextEditor extends Component {
	constructor(props) {
		super(props)
	    this.state={
	    	editNoteContent : false,
	    	content: this.props.currentNoteData || ""
	    }
	    
    	this.handleEditorChange=this.handleEditorChange.bind(this);
    	this.enableEditing = this.enableEditing.bind(this);
    	this.disableEditing = this.disableEditing.bind(this);
	}
	handleEditorChange(e) {
		this.props.updateNoteContent(e.target.getContent());
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

	

	render(){
		if(!this.props.showNote){
			return (<div className="editor-wrapper">
				<div className="no-data">Click on notes to view content...</div>
			</div>)
			
		}

		let content="<p>"+this.props.currentNoteData+"</p>"

		return(
			<div className="editor-wrapper">
				<div className="header">
					{
						this.state.editNoteContent ? 
							(<span className="done" onClick={this.disableEditing}>Done</span>):
							(<span className="edit" onClick={this.enableEditing}>Edit</span>)
					}
				</div>
				{
					this.state.editNoteContent ? 
			            (<TinyMCE
			              content={content}
			              config={{
			                plugins: 'autolink link image lists print preview',
	                		toolbar: 'undo redo | bold italic | alignleft aligncenter alignright| image |',
			                statusbar: false,
			                menubar : false,
			                inline:true
			              }}
			              onChange={this.handleEditorChange}
			            />):
			            (
			            	<div className="show-note-data">
			            		{
			            			<div dangerouslySetInnerHTML={{ __html: content }} />
			            		}
			            	</div>
			            )
	            }
        	</div>
		)
	}
}

export default TextEditor
