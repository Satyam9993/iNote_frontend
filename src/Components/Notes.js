import React, { useContext, useEffect, useRef , useState } from 'react'
import Note from './Noteitem';
import NoteContext from "../context/notes/noteContext";
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const { notes, getNotes, editNote} = useContext(NoteContext)
    const navigate = useNavigate()
    useEffect(() => {
        if(localStorage.getItem('token')){
        getNotes();
        // eslint-disable-next-line
        }else{
            navigate('/login')
        }
    }, [])

    const ref = useRef(null);

    //updating note function
    const updateNote = (currentNote) => {
        try {
            ref.current.click()
            setNote({etitle : currentNote.title, edescription : currentNote.description, eNote_data : currentNote.Note_data, eid : currentNote._id})
        } catch (error) {
            props.showAlert("danger", "Something went wrong!");
        }
    }

    const [note, setNote] = useState({eid:'',etitle: '', edescription:'', eNote_data : ''})

    const handleEdit = (e)=>{
        try {
            e.preventDefault();
            editNote(note.eid, note.etitle, note.edescription, note.eNote_data);
            props.showAlert("success", "Successfully updated");
        } catch (error) {
            props.showAlert("danger", "Something went wrong!");
        }
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]:e.target.value});
    }
    return (
        <div className="container row my-4">
            {/* modal */}

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title*</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="titleHelp" value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" aria-describedby="edesciptionHelp" value={note.edescription}  onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eNote_data" className="form-label">Note</label>
                                    <input type="text" className="form-control" id="eNote_data" name="eNote_data" aria-describedby="edesciptionHelp" value={note.eNote_data}  onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                            <button disabled={(note.etitle.length < 3 || note.edescription.length < 3 || note.eNote_data.length < 3)?true:false} type="button" className="btn btn-primary" onClick={handleEdit} data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <h3 className="text-center">Your Notes</h3>
            {notes.length === 0&&<h4 className="my-3">No Notes Available</h4>}
            {notes.map((note) => {
                return <Note key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>
            })}
        </div>
    )
}

export default Notes
