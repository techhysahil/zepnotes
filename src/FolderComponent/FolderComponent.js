import React, { Component } from 'react'
import NotesComponent from './../NotesComponent';
import {uniqueId} from './../utils/helper';
import './FolderComponent.css';

class FolderComponent extends Component {
	constructor(props) {
		super(props)
	    this.state = {
	    	showDirectories : true,
	    	activeDirectoryId : null,
	    	activeNoteId : null,
	    	editDirectories : false,
	     	directories : [] 
	    }
	    this.openNotes = this.openNotes.bind(this);
	    this.searchDirectories = this.searchDirectories.bind(this);
	    this.openDirectoryList = this.openDirectoryList.bind(this);
	    this.addNote = this.addNote.bind(this);
	    this.updateDirectoryName= this.updateDirectoryName.bind(this);
	    this.enableEditdirectory=this.enableEditdirectory.bind(this);
	    this.disableEditdirectory=this.disableEditdirectory.bind(this);
	    this.addNewDirectory = this.addNewDirectory.bind(this);
	    this.showNoteContent = this.showNoteContent.bind(this);
	    this.removeNote = this.removeNote.bind(this);
	}

	componentWillReceiveProps(nextProps) {
	    let directoriesCopy = JSON.parse(JSON.stringify(this.state.directories));
	    if(nextProps.currentNoteData){
	    	directoriesCopy = directoriesCopy.map((directory) => {
	    		let directoryCopy = {
	    			id : directory.id,
					name : directory.name,
					imgName : directory.imgName,
					timestamp : directory.timestamp,
					notes : []
	    		};
				if(directory.id === this.state.activeDirectoryId){
					directory.notes.forEach((note) => {
						if(note.id === this.state.activeNoteId){
							note.subtitle = nextProps.currentNoteData;
							note.text = nextProps.currentNoteDataAsText
						}
						directoryCopy.notes.push(note)
					});
				}else{
					directoryCopy.notes = directory.notes;
				}
				return directoryCopy;
			})
	    }
		this.setState({
			directories : directoriesCopy
		})
	}

	showNoteContent(content,noteid,directid,timestamp){
		this.setState({
			activeNoteId : noteid
		},() => {
			this.props.showNoteContent(content,noteid,directid,timestamp)
		})
		
	}

	updateDirectoryName(e,directoryId){
		e.stopPropagation();
		let directoryCopy = JSON.parse(JSON.stringify(this.state.directories));
		directoryCopy.map((directory) => {
			if(directory.id === directoryId){
				directory.name = e.target.value;
			}
			return directory;
		})
		this.setState({
			directories : directoryCopy
		})
	}


	addNewDirectory(){
		let directoryCopy = JSON.parse(JSON.stringify(this.state.directories));
		directoryCopy.unshift({
				id : uniqueId().randomUUID(6),
				name : "defaultName",
				imgName : "fa-rocket",
				timestamp : new Date(),
				notes : []
		})
		this.setState({
			directories : directoryCopy,
			
		}, () =>{
			this.setState({
				editDirectories : true
			})
		})
	}

	enableEditdirectory(){
		this.setState({
			editDirectories : true
		})
	}

	disableEditdirectory(){
		this.setState({
			editDirectories : false
		})
	}

	openNotes(directory){
		if(!this.state.editDirectories){
			this.setState({
				showDirectories : false,
				activeDirectoryId : directory.id
			})
		}
	}

	openDirectoryList(){
		this.setState({
			showDirectories : true,
			activeDirectoryId : null
		})
	}

	addNote(directoyId, noteObj){
		let directoryCopy = JSON.parse(JSON.stringify(this.state.directories));
		directoryCopy.map((directory) => {
			if(directory.id === directoyId){
				directory.notes.unshift(noteObj)
			}
			return directory;
		})
		this.setState({
			directories : directoryCopy
		},() => {
			this.props.enableEditing();
		})
	}

	removeNote(noteId){
		let directoryCopy = JSON.parse(JSON.stringify(this.state.directories));
		directoryCopy = directoryCopy.map((directory) => {
			if(directory.id === this.state.activeDirectoryId){
				directory.notes = directory.notes.filter((note) => {
					return note.id !== noteId
				})
			}
			return directory;
		})
		this.setState({
			directories : directoryCopy
		})
	}

	searchDirectories(e){
		this.setState({
			searchTxt : e.target.value
		})
	}

	searchedDirectories(){
		let directories = [];
		let searchStr = this.state.searchTxt && this.state.searchTxt.toLowerCase();

		if(searchStr){
			directories = this.state.directories
							.filter(directory => directory.name && directory.name.toLowerCase().indexOf(searchStr) > -1)
		}else{
			directories = this.state.directories
		}

		return directories;
	}

	render(){
		



		return(
			<div className="directory-wrapper">
				{
					this.state.showDirectories ?(
						<div>
							<div className="control-wrapper">
								<span className="setting">
									<i className="fa fa-cog"></i>
								</span>
								<span className="search">
									<input type="text" placeholder="Search" value={this.state.searchTxt} onChange={this.searchDirectories} />
									<i className="fa fa-search"></i>
								</span>
								<span className="add-item" onClick={this.addNewDirectory}>
									<i className="fa fa-plus"></i>
								</span>
							</div>

							<div className="edit-wrapper">
								<span className="txt">My Spaces</span>
								{
									!this.state.editDirectories?
										(<span className="edit" onClick={this.enableEditdirectory}>Edit</span>):
										(<span className="done" onClick={this.disableEditdirectory}>Done</span>)
								}
							</div>

							<div className="directory-container">
								{
									
									this.state.directories.length>0 ? (this.searchedDirectories().map((directory,index) => {
											return(
												<div key={directory.id} className="directory" onClick={() => this.openNotes(directory)}>
													<i className={"left-icon fa "+ directory.imgName }></i>
													{
														this.state.editDirectories ? 
														(<input className="edit-directory" type="text" placeholder="Search" value={directory.name} onChange={(e) => this.updateDirectoryName(e, directory.id)} />) :
														(<span className="directory-name">{directory.name}</span>)
													}
													<i className="fa fa-angle-right"></i>
												</div>
											)
										})	
									) : (<div className="no-item">No Directories...</div>)
								}
							</div>
						</div>
					) : <NotesComponent 
							directories={this.state.directories}
							activeDirectoryId={this.state.activeDirectoryId}
							openDirectyList={this.openDirectoryList}
							addNote={this.addNote}
							removeNote={this.removeNote}
							showNoteContent={this.showNoteContent}
						/>
				}

			</div>
		)
	}
}

export default FolderComponent