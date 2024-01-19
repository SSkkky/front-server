import { useEffect, useRef, useState } from 'react';
import { useStore } from './store';

import './common.scss';

function App() {
  const elInput = useRef();
  const [alter, setAlter] = useState('');
  const { data, getData, postData, putData, deleteData, status } = useStore();

  useEffect(() => {
    getData()
  }, [])

  if (!status) return <>Loading...</>;

  // 
  const onUpdateHandler = (obj) => {
    console.log("obj :", obj);
    elInput.current.value = obj.name;
    setAlter(obj);
  }

  const onSaveHandler = () => {
    let params = null;
    if (elInput.current.value === '') return;
    console.log(alter)

    if (alter.id !== '') { //id 있음
      params = { id: String(alter.id), name: elInput.current.value }
      putData(params);
      setAlter('');
    } else {
      params = { id: (new Date).getTime(), name: elInput.current.value }
      postData(params);
    }
  }

  const onDeleteHandler = (id) => {
    if (id !== '') deleteData(id)
  }

  /*
  
  const onSaveHandler = () => {
    if (elInput.current.value === '') return;
    const params = { id: (new Date).getTime(), name: elInput.current.value }
    postData(params);
  }
  const onUpdateHandler = (obj) => {
    if (elInput.current.value === '') {
      elInput.current.value = obj.name;
    } else {
      const params = { id: obj.id, name: elInput.current.value }
      putData(params);
    }
  }

  */

  return (
    <div className="App">
      <article className='write'>
        <input type="text" ref={elInput} placeholder='입력해주세요' />
        <button onClick={() => { onSaveHandler() }}>저장</button>
      </article>

      <article className='list'>
        <ul>
          {
            data.map((obj) => {
              return <li key={obj.id}>
                {obj.name}
                <button onClick={() => { onUpdateHandler(obj) }}>수정</button>
                <button onClick={() => { onDeleteHandler(obj.id) }}>삭제</button>
              </li>
            })
          }
        </ul>
      </article>
    </div>
  );
}

export default App;
