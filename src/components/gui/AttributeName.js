import React from "react"

const AttributeName = (props) => {
    return (
        <div className="attr-name">
            <label htmlFor="attr-radius">{props.name}</label>
        </div>
    )
}

export default AttributeName