import React from 'react'
import RibbonSplitButton from './RibbonSplitButton'
import { List } from 'lucide-react'
import BulletListMenu from './BulletListMenu'
const BulletListButton = ({editor}) => {
  return (
  <RibbonSplitButton
    icon={<List size={14} />}
    active={editor.isActive("bulletList")}
    title="Lista con viñetas"
    onMainClick={() =>
        editor.chain().focus().toggleBulletList().run()
    }
>
    {({ closeMenu }) => (
        <BulletListMenu
            editor={editor}
            closeMenu={closeMenu}
        />
    )}
</RibbonSplitButton>
  )
}

export default BulletListButton
