import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'


const AddNote = (props) => {
    const {addNote} = useContext(noteContext)
    const [note, setNote] = useState({title: '', description:'', Note_data : ''})
    const onSubmit = (e)=>{
        try {
            e.preventDefault();
            addNote(note.title, note.description, note.Note_data);
            setNote({title: '', description:'', Note_data : ''});
            props.showAlert("success", "Note added Successfully")
        } catch (error) {
            props.showAlert("danger", "Something went wrong")
        }
        
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]:e.target.value});
    }
    return (
        <div className="container">
            <h3 className="text-center">Add Note</h3>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title*</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="titleHelp" onChange={onChange} value={note.title}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">description</label>
                    <input type="text" className="form-control" id="description" name="description" aria-describedby="desciptionHelp" onChange={onChange} value={note.description}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Note_data" className="form-label">Note</label>
                    <input type="text" className="form-control" id="Note_data" name="Note_data" aria-describedby="desciptionHelp"  onChange={onChange} value={note.Note_data}/>
                </div>
                <button disabled={(note.title.length < 3 || note.description.length < 3 || note.Note_data.length < 3)?true:false} type="submit" className="btn btn-primary" onClick={onSubmit}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
