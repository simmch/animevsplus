import React from 'react'
import spinner from '../../assets/images/spinner.gif'

const Spinner = () => {
    return (
        <div>
            <img
                alt="spinner"
                src={spinner}
                style={{ width: "100px", margin: "auto", display: "block", position: "relative", right: "120px" }}
            />
        </div>
    )
}

export default Spinner;
