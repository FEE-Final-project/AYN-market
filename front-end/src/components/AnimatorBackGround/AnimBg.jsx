import React from 'react'

import './AnimBg.css'

export default function AnimBg({isCategory}) {
  return (
    <div className={isCategory ? "backgroundCategory" : 'background'}>
    <span>🛍</span>
    <span>🎮</span>
    <span>🥋</span>
    <span>💻</span>
    <span>🛠</span>
    <span>📺</span>
    <span>👚</span>
    <span>📸</span>
    <span>💄</span>
    <span>👠</span>
    <span>🎒</span>
    <span>👒</span>
    <span>💍</span>
    <span>👗</span>
    <span>🧦</span>
    <span>🕶</span>
    <span>👖</span>
    <span>☂</span>
    <span>🍴</span>
  </div>
  )
}
