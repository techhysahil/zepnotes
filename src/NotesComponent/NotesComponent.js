import React, { Component } from 'react';
import Moment from 'react-moment';
import './NotesComponent.css';
import { uniqueId, SortArrayOfObj } from './../utils/helper';

class NotesComponent extends Component {
	constructor(props) {
		super(props)
	    this.state = {
	     	searchTxt : ""
	    }
	    this.goBack = this.goBack.bind(this);
	    this.addNotes = this.addNotes.bind(this);
	    this.removeNote = this.removeNote.bind(this);
	    this.searchNotes = this.searchNotes.bind(this);
	    this.showNoteContent = this.showNoteContent.bind(this);
	}

	componentDidMount() {}

	componentWillReceiveProps(nextProps){}

	showNoteContent(content,noteid,directid,timestamp){
		this.props.showNoteContent(content,noteid,directid,timestamp)
	}

	addNotes(){
		let noteObj = {
     			id : uniqueId().randomUUID(6),
     			title : "",
     			timestamp : Date.now(),
     			subtitle : "",
     			text : ""
     		}
		this.props.addNote(this.props.activeDirectoryId, noteObj)
	}

	removeNote(e, noteId){
		e.stopPropagation();
		this.props.removeNote(noteId);
	}

	goBack(){
		this.props.openDirectyList();
	}

	searchNotes(e){
		this.setState({
			searchTxt : e.target.value
		})
	}

	processNotes(){
		let activeDirectory =[];
		let notes = [];
		let searchStr = this.state.searchTxt && this.state.searchTxt.toLowerCase();

		if(this.props.activeDirectoryId){
			activeDirectory = this.props.directories.filter((item) => {
				return item.id === this.props.activeDirectoryId
			})	
		}else{
			return [];
		}

		

		if(searchStr){
			notes = activeDirectory[0].notes
						.filter(notes => notes.title && notes.title.toLowerCase().indexOf(searchStr) > -1)
		}else{
			notes = activeDirectory.length>0 ? activeDirectory[0].notes :[]
		}

		notes = SortArrayOfObj(notes,"timestamp");

		return notes;
	}

	render(){
		return(
			<div className="notes-wrapper">
				<div className="control-wrapper">
					<span className="search">
						<input type="text" placeholder="Search" value={this.state.searchTxt} onChange={this.searchNotes} />
						<i className="fa fa-search"></i>
					</span>
					<span className="add-item" onClick={this.addNotes}>
						<i className="fa fa-plus"></i>
					</span>
				</div>

				<div className="back-wrapper" onClick={this.goBack}>
					<i className="fa fa-angle-left"></i>
					<span className="txt">Back</span>
				</div>
				{
					this.processNotes().length > 0 ? this.processNotes().map((note,index) => {
						return(
							<div key={note.id} className="notes" onClick={() => {
									this.showNoteContent(note.subtitle,note.id,this.props.activeDirectoryId,note.timestamp)
								}}>
								<div className="title">{note.title}</div>
								<div className="subtitle">{note.text}</div>
								<span className="timestamp">
									<Moment fromNow>{note.timestamp}</Moment>
								</span>
								<i className="fa fa-trash-o" onClick={(e) => this.removeNote(e,note.id)}></i>
							</div>
						)
					})	: (<div className="no-item">
						No Notes Available<br />
						Click on <i className="fa fa-plus"></i> to add new Notes
					</div>)
				}
			</div>
		)
	}
}

export default NotesComponent
