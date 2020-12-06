import React from 'react'
import FormWord from '../components/Forms/FormWord'

const EditWord = (props) => {
    return (
        <div>
             <FormWord action="edit" id={props.match.params.id} />
        </div>
    )
}

export default EditWord
