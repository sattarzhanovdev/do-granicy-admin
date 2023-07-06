import React from 'react'
import { Components } from '../../components'
import { GetNews } from '../../helpers'
import c from './main.module.scss'
import { useNavigate } from 'react-router-dom'
import { API } from '../../api'

const Main = () => {

  const [ value, setValue ] = React.useState('')
  const [ searchResult, setSearchResult ] = React.useState(null)

  const { news } = GetNews()

  const Navigate = useNavigate()

  const searching = () => {
    const res = news?.filter(item => item?.item?.title?.toLowerCase().includes(value.toLowerCase())) 
    res && setSearchResult(res);
    setValue('')
  }

  React.useEffect(() => {
    searching()
    setValue('')
    setTimeout(() => {
      searching()
      setValue('')
    }, 1000)

  }, [])

  return (
    <div className={c.main}>
      <Components.Title text={'Новости'} />
      
      <div className={c.news}>
        <div className={c.up}>
          <form>
            <input 
              type="text"
              placeholder='Поиск'
              onChange={e => setValue(e.target.value)}
            />
            <button onClick={e => {
              e.preventDefault()
              searching()
            }}>Поиск</button>
          </form>
          <button
            onClick={() => {
              Navigate('/add/')
            }}
          >
            <span>+</span> добавить новость
          </button>
        </div>
        <div className={c.cards}>
          {
            searchResult?.length === 0 ?
            <h3>Ничего нет!</h3> :
            searchResult?.map((item, i) => (
              <Components.Card 
                key={i}
                id={item.item.id}
                image={item.item.image}
                title={item.item.title}
                desc={item.item.desc}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Main