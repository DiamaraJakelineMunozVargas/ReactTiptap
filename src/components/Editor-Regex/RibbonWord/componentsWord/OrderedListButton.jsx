import React from 'react'
import RibbonSplitButton from '../RibbonSplitButton'
import OrderedListMenu from '../OrderedListMenu'
import { ListOrdered } from 'lucide-react'

const OrderedListButton = ({editor}) => {
  return (
  <RibbonSplitButton
    icon={<ListOrdered size={14} />}
    active={editor.isActive("orderedList")}
    title="Lista enumerada"
    onMainClick={() =>
        editor.chain().focus().toggleOrderedList().run()
    }
>
    {({ closeMenu }) => (
        <OrderedListMenu
            editor={editor}
            closeMenu={closeMenu}
        />
    )}
</RibbonSplitButton>
  )
}

export default OrderedListButton
