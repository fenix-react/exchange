import React, {Component} from 'react'
import classes from './Modal.module.css'
import {Link} from 'react-router-dom'

class Modal extends Component {

    render() {

        return (
            <div className={classes.Modal}>
                <div className={classes.contentCont}>
                    <h4 dir='rtl'>کاربر احمق لطفا 2fa خودت رو فعال کن از لینک زیر:</h4>
                    <Link to='/2fa'>2FA</Link>
                </div>
            </div>
        )
    }
}

export default Modal