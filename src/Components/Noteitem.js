import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Note = (props) => {
    const { deleteNote } = useContext(noteContext);
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card mx-3 my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash-can mx-2" onClick={() => {
                            try {
                                deleteNote(note._id);
                                props.showAlert("success", "deleted successfully")
                            } catch (error) {
                                props.showAlert("danger", "Some error occured while deleting")
                            } 
                        }}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                    </div>
                    <h6 className="card-text">{note.description}</h6>
                    <h6 className="card-text">{note.Note_data}</h6>
                </div>
            </div>
        </div>
    )
}

export default Note;
