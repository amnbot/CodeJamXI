import React from 'react'
import { useParams } from 'react-router-dom'

export default function Scene() {
    let { id }= useParams;
    console.log(id);
    return (
    <div>
        <h3>{id}</h3>
    </div>
  )
}
