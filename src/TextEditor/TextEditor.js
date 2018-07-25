/* eslint-disable import/first */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Moment from 'react-moment';
import $ from 'jquery';
window.$ = $;
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';
// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditor from 'react-froala-wysiwyg';

import './TextEditor.css';
import './TextEditor.css';

class TextEditor extends Component {
	constructor(props) {
		super(props)
	    this.state={
	    	content: this.props.currentNoteData || ""
	    }
	    
    	this.handleEditorChange=this.handleEditorChange.bind(this);
    	this.enableEditing = this.enableEditing.bind(this);
    	this.disableEditing = this.disableEditing.bind(this);
    	this.showNoteList = this.showNoteList.bind(this);
	}
	handleEditorChange(model) {
		var domNode = document.getElementsByClassName('fr-wrapper');
		this.props.updateNoteContent(model,domNode[0].innerText);
	}

	showNoteList(){
		this.props.updateShowNote();
	}

	enableEditing(){
		this.props.enableEditing()
	}

	disableEditing(){
		this.props.disableEditing()
	}

	

	render(){
		let isMobile  = false;
		if(document.body.clientWidth < 780){
			isMobile = true;
		}

		// User has not selected any Note
		if(!this.props.showNote){
			return (<div className={"editor-wrapper"+(isMobile ? " hide" : "")}>
				<div className="no-data">Select Note to View Content...</div>
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
						this.props.editNoteContent ? 
							(<span className="done" onClick={this.disableEditing}>Publish</span>):
							(<span className="edit" onClick={this.enableEditing}>Edit</span>)
					}
					</React.Fragment>
				</div>
				{
					this.props.editNoteContent ? 
			            (<FroalaEditor 
			            	tag='textarea'
			            	model={this.props.currentNoteData}
			            	onModelChange={this.handleEditorChange}
			              />):
			            (
			            	<div className="show-note-data">
			            		<span className="timestamp">
									<Moment format="YYYY-MM-DD HH:mm">{this.props.currentNoteTimestamp}</Moment>
								</span>
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
