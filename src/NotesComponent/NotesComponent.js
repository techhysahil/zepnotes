import React, { Component } from 'react'
import './NotesComponent.css';
import {uniqueId} from './../utils/helper';

class NotesComponent extends Component {
	constructor(props) {
		super(props)
	    this.state = {
	     	searchTxt : ""
	    }
	    this.goBack = this.goBack.bind(this);
	    this.addNotes = this.addNotes.bind(this);
	    this.searchNotes = this.searchNotes.bind(this);
	    this.showNoteContent = this.showNoteContent.bind(this);
	}

	componentDidMount() {}

	componentWillReceiveProps(nextProps){}

	showNoteContent(content,noteid,directid){
		this.props.showNoteContent(content,noteid,directid)
	}

	addNotes(){
		let noteObj = {
     			id : uniqueId().randomUUID(6),
     			title : "Note Title",
     			subtitle : "Add content here ...",
     			text : "Add content here ..."
     		}
		this.props.addNote(this.props.activeDirectoryId, noteObj)
	}

	goBack(){
		this.props.openDirectyList();
	}

	searchNotes(e){
		this.setState({
			searchTxt : e.target.value
		})
	}

	searchedNotes(){
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
			notes = activeDirectory[0].notes.filter((notes) => {
				if(notes.title && notes.title.toLowerCase().indexOf(searchStr) > -1){
					return notes;
				}
			})
		}else{
			notes = activeDirectory.length>0 ? activeDirectory[0].notes :[]
		}

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
					this.searchedNotes().map((note,index) => {
						return(
							<div key={note.id} className="notes" onClick={() => {
									this.showNoteContent(note.subtitle,note.id,this.props.activeDirectoryId)
								}}>
								<div className="title">{note.title}</div>
								<div className="subtitle">{note.text}</div>
							</div>
						)
					})	
				}
			</div>
		)
	}
}

export default NotesComponent
