import * as React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'
import { Image } from 'vtex.store-image'

import json from './defaultPropsDesktop.json'

const CSS_HANDLES = [
  'level',
  'newMenuCustom',
  'menuCustomContent',
  'container',
  'arrowFirstLevel',
  'textFirstLevel',
  'iconImage', 
]

const Item = ({
  level,
  hasLevel,
  menuLevel,
  __editorItemTitle,
  href,
  icon,
  iconWidth,
  hasLevelBanners = false,
  banner,
}) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <>
    
      <Link to={href} className={`${handles.level}-link`}>
        {icon && (
          <div className={`${handles.iconImage} ${handles.iconImage}-${level}`}>
            <Image
              src={icon}
              loading={level === 0 ? 'eager' : 'lazy'}
              fetchpriority={level === 0 ? 'high' : 'low'}
              width={iconWidth || ''}
            />
          </div>
        )}
        <span className={handles.textFirstLevel}>
          {__editorItemTitle}
          {hasLevel && level > 0 && menuLevel && menuLevel.length > 0 && (
            <div className={handles.arrowFirstLevel} />
          )}
        </span>
      </Link>

      {hasLevel && menuLevel && menuLevel.length > 0 && (
        <div className={`${handles.level}-container-${level}`}>
          <div className={`${handles.level}-container-${level}--wrapper`}>
            {level !== 0 && (
              <div className={`${handles.level}-top-header`}>
                <p className={`${handles.level}-top-header-text`}>
                  <Link to={href} className={`${handles.level}-top-header-text-link`}>
                    {__editorItemTitle}
                  </Link>
                </p>
              </div>
            )}
            <div className={`${handles.level}-${level}--wrapper`}>
              <div className={`${handles.level}-${level}--list`}>
                <ul className={`${handles.level}-${level}`}>
                  {menuLevel.map((el, index) => (
                    <li
                      key={`level-${level}-${index}`}
                      className={`${handles.level}-item-${level} ${handles.level}-item`}
                    >
                      <Item level={level + 1} {...el} />
                    </li>
                  ))}
                </ul>
              </div>
              {hasLevelBanners && banner && (
                <Image
                  src={banner}
                  loading={level === 0 ? 'eager' : 'lazy'}
                  fetchpriority={level === 0 ? 'high' : 'low'}
                  width={347}
                  height={334}
                />
              )}
            </div>
          </div>
        </div>
      )}

    </>
  )
}

const MenuHeader = (props) => {
  const { menuLevel } = props
  const { handles } = useCssHandles(CSS_HANDLES)

  const items = menuLevel
    ? menuLevel.filter((el) => el.__editorItemTitle !== '')
    : []

  return (
    items &&
    items.length > 0 && (
      <nav className={handles.newMenuCustom}>
        <div className={handles.container}>
          {/* Botão fixo que renderiza as categorias reais via menuLevel */}
          <div className={`${handles.level}-index`}>
            <Item
              level={0}
              __editorItemTitle="Departamentos"
              href="#"
              hasLevel={true}
              menuLevel={items}
            />
          </div>
        </div>
      </nav>
    )
  )
}

MenuHeader.defaultProps = json

MenuHeader.schema = {
  title: 'Menu Lateral Personalizado',
  description: 'Categorias dentro do botão fixo "Departamentos"',
  type: 'object',
  properties: {
    menuLevel: {
      title: 'Categorias exibidas dentro do botão Departamentos',
      type: 'array',
      default: MenuHeader.defaultProps.menuLevel,
      items: {
        type: 'object',
        properties: {
          __editorItemTitle: {
            title: 'Nome da categoria',
            type: 'string',
          },
          href: {
            title: 'Link da categoria',
            type: 'string',
          },
          icon: {
            title: 'Ícone da categoria',
            type: 'string',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },
          hasLevel: {
            title: 'Possui subcategorias?',
            type: 'boolean',
            default: false,
          },
          menuLevel: {
            title: 'Subcategorias',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                __editorItemTitle: {
                  title: 'Nome da subcategoria',
                  type: 'string',
                },
                href: {
                  title: 'Link da subcategoria',
                  type: 'string',
                },
                hasLevel: {
                  title: 'Possui sub-subcategorias?',
                  type: 'boolean',
                  default: false,
                },
                menuLevel: {
                  title: 'Sub-subcategorias (nível 3)',
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      __editorItemTitle: {
                        title: 'Nome da sub-subcategoria',
                        type: 'string',
                      },
                      href: {
                        title: 'Link da sub-subcategoria',
                        type: 'string',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}


export default MenuHeader