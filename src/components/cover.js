import React from 'react'
import './cover.scss'

export default function Cover({ title, name, city, date, institution }) {
  return (
    <section className="page cover">
      <div className="page__institution">{institution}</div>
      <div className="page__name">{name}</div>
      <div className="page__title">{title}</div>
      <div>
        <div className="page__city">{city}</div>
        <div className="page__date">{date}</div>
      </div>
    </section>
  )
}
