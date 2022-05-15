import React from "react"

const AttributeName = (props) => {
    return (
        <div className="attr-name">
            <label htmlFor={props.id}>{props.name}</label>
        </div>
    )
}

export default AttributeName