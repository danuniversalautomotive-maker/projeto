// react/components/header/MenuHeaderDesktop.jsx
import React, { useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import json from '../../defaultPropsDesktop.json'
import MenuFirstLevel from './menuFirstLevel/MenuFirstLevel'
import MenuItemsBottom from './menuBottom/MenuItemsBottom'

const CSS_HANDLES = [
  'menuCustom',
  'menuCustomContent',
  'container',
  'menuCustomBottom',
  // novos
  'menuTrigger',
  'menuDropdown',
]

const MenuHeaderDesktop = (props) => {
  const { menuFirstLevel, menuItemsBottom, menuItemsBottomVisible } = props
  const handles = useCssHandles(CSS_HANDLES)
  const [open, setOpen] = useState(false)

  return (
    
    <div>
      <nav
        className={handles.menuCustom}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {/* Gatilho único do menu */}
        <button
          type="button"
          className={handles.menuTrigger}
          aria-haspopup="true"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span>Departamentos</span>
          <span aria-hidden="true">▾</span>
        </button>

        {/* Dropdown com o primeiro nível */}
        {open && Array.isArray(menuFirstLevel) && menuFirstLevel.length > 0 && (
          <div className={handles.menuDropdown}>
            <div className={handles.menuCustomContent}>
              <div className={handles.container}>
                <MenuFirstLevel menuFirstLevel={menuFirstLevel} />
              </div>
            </div>
          </div>
        )}
      </nav>

      {menuItemsBottom && menuItemsBottomVisible && (
        <div className={handles.menuCustomBottom}>
          <div className={handles.container}>
            <MenuItemsBottom menuBottom={menuItemsBottom} />
          </div>
        </div>
      )}
    </div>
  )
}

MenuHeaderDesktop.defaultProps = json

MenuHeaderDesktop.schema = {
  title: 'Custom Menu Header',
  description: 'Gerenciador de Menu Header',
  type: 'object',
  properties: {
    menuFirstLevel: {
      title: 'Menu primeiro nível TESTE',
      type: 'array',
      items: { type: 'object' },
    },
    menuItemsBottomVisible: {
      title: 'Menu items bottom visible',
      type: 'boolean',
      default: true,
    },
    menuItemsBottom: {
      title: 'Menu items bottom',
      type: 'array',
      items: {
        type: 'object',
        properties: {
          text: { title: 'Menu item texto', type: 'string' },
          href: { title: 'Menu item link', type: 'string' },
        },
      },
    },
  },
}

export default MenuHeaderDesktop