import React, {useEffect, useState} from 'react';
import './style.css'
import searchIcon from '../../images/icons8-поиск.svg'

const Performances = () => {
  const [performanceList, setPerformanceList] = useState([])
  const [genre, setGenre] = useState('')

  useEffect(() => {
    getAllPerformanceList()
  }, [])

  const getAllPerformanceList = () => {
    fetch('http://localhost:8080/api/all-performances')
      .then(response => response.json())
      .then(data => setPerformanceList(data))
      .catch(error => console.error(error));
  }

  const getPerformanceListByGenre = () => {
    fetch(`http://localhost:8080/api/performances-by-genre/${genre}`)
      .then(response => response.json())
      .then(data => setPerformanceList(data))
      .catch(error => console.error(error));
  }

  const onFilterClick = () => {
    genre ? getPerformanceListByGenre() : getAllPerformanceList()
  }

  return (
    <div className='mainPerformances' id='shows'>
      <div className='header'>
        <span className='h3'>Спектакли</span>
        <div style={{display: "flex", gap: 8, cursor: 'pointer'}}>
          <select value={genre} onChange={event => setGenre(event.target.value)}>
            <option value=''>Выберите жанр</option>
            <option value='трагедия'>трагедия</option>
            <option value='балет'>балет</option>
            <option value='опера'>опера</option>
            <option value='приключения'>приключения</option>
            <option value='детектив'>детектив</option>
            <option value='мюзикл'>мюзикл</option>
            <option value='спектакль для детей'>спектакль для детей</option>
            <option value='драма'>драма</option>
            <option value='комедия'>комедия</option>
            <option value='фантастика'>фантастика</option>
          </select>
          <div
            onClick={onFilterClick}
          >
            <img src={searchIcon} alt='search'/>
          </div>
        </div>

      </div>


      <div className='list'>
        <div className='item' style={{marginBottom: 20}}>
          <span style={{width: '30%'}}>Название</span>
          <span style={{width: '20%'}}>Жанр</span>
          <span style={{width: '10%'}}>Язык</span>
          <span style={{width: '10%'}}>Продолжительность</span>
        </div>
        {
          performanceList.map(perf => {
            // разбить значение duration на части
            const [hours, minutes, seconds] = perf.duration.split(':').map(Number);

            // вычислить общую продолжительность в минутах
            const totalMinutes = hours * 60 + minutes;

            return (
              <div className='item' key={perf.perfomance_id}>
                <span style={{width: '30%'}}>{perf.title}</span>
                <span style={{width: '20%'}}>{perf.genre}</span>
                <span style={{width: '10%'}}>{perf.language}</span>
                <span style={{width: '10%', textAlign: 'center'}}>
                  {/* отобразить продолжительность в формате "чч:мм" */}
                  {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}
                 </span>
              </div>
            )
          })
        }

      </div>
    </div>
  );
};

export default Performances;