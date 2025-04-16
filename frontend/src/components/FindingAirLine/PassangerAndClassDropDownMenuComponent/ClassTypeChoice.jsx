import React from "react";
const ClassTypeChoice = (props) => {        
        return(
            <div class="flex flex-row justify-between py-2">
                <label>{props.label_name}</label>
                <input type="radio" class="h-5 w-5" name="Class_type" value = {props.label_name} onChange={ e => props.handlePassangerAndClassInforsChange(e.target.name, e.target.value)}></input>
            </div>
        );
    
}

export default ClassTypeChoice;