import React from 'react'
import c from './add.module.scss'
import { API } from '../../api'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../App'
import { useForm } from 'react-hook-form'
import { CircularProgress } from '@mui/material'

const Add  = () => {
  const [ active, setActive ] = React.useState(false)
  const [ value, setValue ] = React.useState(0)
  const [ dep, setDep ] = React.useState(0)
  const [ newsData, setNewsData ] = React.useState([])
  const Navigate = useNavigate()

  const { 
    register,
    handleSubmit,
    reset
  } = useForm()

  const cyrillicToLatin = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh", з: "z", и: "i",
    й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t",
    у: "u", ф: "f", х: "kh", ц: "ts", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y",
    ь: "", э: "e", ю: "yu", я: "ya",
    А: "A", Б: "B", В: "V", Г: "G", Д: "D", Е: "E", Ё: "Yo", Ж: "Zh", З: "Z", И: "I",
    Й: "Y", К: "K", Л: "L", М: "M", Н: "N", О: "O", П: "P", Р: "R", С: "S", Т: "T",
    У: "U", Ф: "F", Х: "Kh", Ц: "Ts", Ч: "Ch", Ш: "Sh", Щ: "Sch", Ъ: "", Ы: "Y",
    Ь: "", Э: "E", Ю: "Yu", Я: "Ya"
  };

  const postNew = (data) => {	
    setActive(!active)
    const latin = data.title.replace(/./g, char => cyrillicToLatin[char] || char);

    const regex = /[%]20/g;

    const replacedText = latin.replace(regex, '—');
    console.log(replacedText);

    const storageRef = ref(storage, `${data.file[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, data.file[0]);
    uploadTask.on("state_changed",
    (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setValue(progress);
    },
    (error) => {
      alert(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
          API.postNews(
            {
              ...data,
              image: downloadURL,
              themes: newsData,
              latin: replacedText
            }
          ).then(() => {
            Navigate('/')
          })

        });
    })
  }

  React.useEffect(() => {
    setNewsData(newsData)
  }, [dep])

  return (
    <form 
      className={c.add}
      onSubmit={handleSubmit(data => postNew(data))}
    >
      <div>
        <span>Название</span>
        <input 
          type="text"
          placeholder='Название'
          {...register('title')}
        />
      </div>
      <div>
        <span>Описание</span>
        <input 
          type="text"
          placeholder='Описание'
          {...register('desc')}
        />
      </div>
      {
        newsData.map((item, i) => (
          <div className={c.topic} key={i}>
            <div>
              <span>Под-тема</span>
              <input 
                type="text" 
                placeholder='Под-тема'
                onChange={e => {
                  newsData[i].topic = e.target.value
                }}
              />
            </div>
            <div>
              <span>Текст</span>
              <input 
                type="text" 
                placeholder='Текст'
                onChange={e => {
                  newsData[i].text = e.target.value
                }}
              />
            </div>
          </div>
        ))
      }
      <li
        onClick={() => {
          newsData.push({topic: '', text: ''})
          setDep(Math.random())
        }}
      >
        Создать под-тему
      </li>
      <div>
        <span>Фотография</span>
        <input 
          type="file" 
          className={c.file}
          {...register('file')}
        />
      </div>
      <button type='submit'>
        Добавить
      </button>

      { 
        active ?
        <div className={c.loader}>
          <CircularProgress determinate value={value} />
          <h3>Подождите...</h3>
        </div> :
        null
      }

    </form>
  )
}

export default Add 