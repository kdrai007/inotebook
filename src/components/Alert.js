import React from 'react'

function Alert(props) {
    const captilize = (word) => {
        if (word === "danger") {
            word = "error"
        }

        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1)

    }
    return (
        <div style={{ height: '60px' }}>
            {props.alert && <div className={`alert alert-${props.alert.types} alert-dismissible fade show`} role="alert">
                <strong>{captilize(props.alert.types)}</strong> :{captilize(props.alert.msg)}

                {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
            </div>}
        </div>
    )
}

export default Alert
