import React from 'react'
import cl from './NotFoundBlock.module.scss'
import { useNavigate } from 'react-router-dom'

function NotFoundBlock() {
  const navigate = useNavigate()
  return (
    <div>
        <h1 className={cl.root}>
            <span>☹</span>
            <br />
            Not Found
            <p>Unfortunately</p>
        </h1>

        <span className={cl.back} onClick={() => navigate(-1)}>Вернуться назад</span>
    </div>
  )
}

export default NotFoundBlock