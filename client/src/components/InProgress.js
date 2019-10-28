import React, { Component } from "react";
import manPointingLeft from "../assets/man-pointing-left.jpg";
import "../css/InProgress.css"


class InProgress extends Component {

    returnSectionName = () => {
        const { pathname } = this.props.location;
        return pathname.slice(1).replace("-", " ");
    };

    render () {

        return (
            <div id="in-progress">
                <div className="in-progress-inner-container">

                    {/*<p>{this.props.location.pathname.slice(1)} in progress (show nice image)</p>*/}

                    <div className="coming-soon-container">
                        <div>
                            <p> {this.returnSectionName()} Section under construction</p>
                            <h4>Coming Soon</h4>
                        </div>
                    </div>

                    <div className="image-container">
                       <img src={manPointingLeft}/>
                    </div>

                </div>
            </div>
        )
    }
}

export default InProgress;