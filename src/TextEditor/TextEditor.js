import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
    	this.showNoteList = this.showNoteList.bind(this);
	}
	handleEditorChange(e) {
		var domNode = ReactDOM.findDOMNode(this);
		this.props.updateNoteContent(e.target.getContent(),domNode.innerText);
	}

	showNoteList(){
		this.props.updateShowNote();
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
		let isMobile  = false;
		if(document.body.clientWidth < 780){
			isMobile = true;
		}

		// User has not selected any Note
		if(!this.props.showNote){
			return (<div className={"editor-wrapper"+(isMobile ? " hide" : "")}>
				<div className="no-data">Click on notes to view content...</div>
			</div>)
			
		}

		// let content=this.props.currentNoteData

		return(
			<div className={"editor-wrapper"+(isMobile ? " hide" : "")+(isMobile && this.props.showNote ? " showOnMobile" : "")}>
				<div className="header">
					<React.Fragment>
					{	
						isMobile && this.props.showNote && (
								<div className="go-back" onClick={this.showNoteList}>
									<i className="fa fa-angle-left"></i>
									<span className="txt">Back</span>
								</div>
							)
					}
					{
						this.state.editNoteContent ? 
							(<span className="done" onClick={this.disableEditing}>Done</span>):
							(<span className="edit" onClick={this.enableEditing}>Edit</span>)
					}
					</React.Fragment>
				</div>
				{
					this.state.editNoteContent ? 
			            (<TinyMCE
			              content={this.props.currentNoteData}
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
			            			<div dangerouslySetInnerHTML={{ __html: this.props.currentNoteData }} />
			            		}
			            	</div>
			            )
	            }
        	</div>
		)
	}
}

export default TextEditor
