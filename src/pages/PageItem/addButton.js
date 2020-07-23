import React from 'react'
import {Redirect} from 'react-router-dom'

const Button = ()=>{

    const onSubmit = ()=>{
        console.log('redirect home')
        return(
            <Redirect to={'/'}/>
        )
    }

    return (
        
        <form onSubmit={onSubmit}>
            <div style={{marginBottom: '5rem'}}>Ваш поиск не дал результатов</div>
              <fieldset>
                <fieldset className="form-group">
                  <button
                    className="btn btn-lg pull-xs-left btn-primary"
                    type={"submit"}
                  >
                    Вернуться
                  </button>
                </fieldset>
              </fieldset>
            </form>
    )
}

export default Button