import React from 'react'

const orderedStyles = [
  { type: "decimal", label: "1." },
  { type: "upper-alpha", label: "A." },
  { type: "lower-alpha", label: "a." },
  { type: "upper-roman", label: "I." },
  { type: "lower-roman", label: "i." },
]

const OrderedListMenu = ({editor, closeMenu}) => {
  return (
 <div className="flex flex-col p-1">
      {orderedStyles.map((style) => (
        <button
          key={style.type}
          className="px-3 py-2 hover:bg-gray-100 rounded text-left"
          onClick={() => {
            editor.chain().focus().setOrderedStyle(style.type).run();
            closeMenu();
          }}
        >
          {style.label}
        </button>
      ))}
    </div>
  )
}

export default OrderedListMenu
