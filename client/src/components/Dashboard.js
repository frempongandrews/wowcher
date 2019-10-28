import React, { Component } from "react";
import laptop from "../assets/laptop.jpeg";
import rightArrow from "../assets/highlights_arrow.png";
import rightArrow1 from "../assets/right-arrow.svg";
import "../css/Dashboard.css";

class Dashboard extends Component {
    render () {
        return (
            <div id="dashboard">
                <div>

                    <section className="preview-image-container"
                    style={{backgroundImage: `url(${laptop})`,
                        backgroundSize: "cover", backgroundRepeat: "no-repeat"}}
                    >
                        {/*<img src={laptop} width="100%" height="auto"/>*/}
                    </section>

                    {/*<section className="preview-image-container">*/}
                        {/*<img src={laptop} width="100%" height="auto"/>*/}
                    {/*</section>*/}

                    <div className="resources-container">

                        <div className="resource-item">
                            <img src={rightArrow1} className="right-arrow"/>
                            <div>
                                <h5 className="title">Orders</h5>
                                <p>100</p>
                            </div>
                        </div>


                        <div className="resource-item">
                            <img src={rightArrow1} className="right-arrow"/>
                            <div>
                                <h5 className="title">Products</h5>
                                <p>100</p>
                            </div>
                        </div>


                        <div className="resource-item">
                            <img src={rightArrow1} className="right-arrow"/>
                            <div>
                                <h5 className="title">Users</h5>
                                <p>100</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default Dashboard;