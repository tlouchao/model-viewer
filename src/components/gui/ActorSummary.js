import React from "react"
import Matrix from "./Matrix"
import placeholderImg from "url-loader?modules!./../../static/imgs/cube-placeholder.png"

const ActorSummary = () => {
    return (
        <div id="actor-summary">
            <div id="actor-summary-header">
                <img id="actor-thumbnail" src={placeholderImg} alt="actor thumbnail" />
                <Matrix />
            </div>
        </div>
    )
}

export default ActorSummary