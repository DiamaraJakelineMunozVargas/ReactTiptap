import React from 'react'
import Select from 'react-select'

const UnderlineSelect = ({editor}) => {
  return (
    <Select className='basic-single'
     onChange={(e) => editor.chain().focus().setUnderlineStyle(e.value).run()}> 
          
  
    </Select>
  )
}

export default UnderlineSelect
