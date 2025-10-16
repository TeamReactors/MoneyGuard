import React from 'react'
import { ThreeDots } from 'react-loader-spinner'
import css from './Loader.module.css'

const Loader = () => {
    return (
        <div className={css.loader}>
            <ThreeDots 
                visible={
                    true
                }
                wrapperStyle={
                    {}
                }
                ariaLabel="three-dots-loading"
            />
        </div>
    )
}

export default Loader
