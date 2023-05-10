import React, {useEffect, useState} from 'react';
import './style.css'
import starIcon from '../../images/звезда.png'
import starEmptyIcon from '../../images/звезда-пустая.png'
import deleteIconRed from '../../images/удалить-красный.png'
import editIcon from '../../images/редактировать.png'
import saveIcon from '../../images/галочка.png'

const Comments = () => {
  const [commentList, setCommentList] = useState([])
  const [editedComm, setEditedComm] = useState({
    stars: null,
    text: ''
  })

  useEffect(() => {
    getAllComments()
  }, [])

  const getAllComments = () => {
    fetch('http://localhost:8080/api/comments')
      .then(response => response.json())
      .then(data => setCommentList(data))
      .catch(error => console.error(error));
  }

  const addNewComment = (newComm) => {
    fetch('http://localhost:8080/api/new-comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newComm)
    })
      .then(response => response.json())
      .then(data => {
          getAllComments()
        }
      )
      .catch(error => console.error(error))
  }

  const uploadChangedComment = (changedComment) => {
    fetch('http://localhost:8080/api/change-comment', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(changedComment)
    })
      .then(data => {
        getAllComments()
      })
      .catch(error => console.error(error))

  }

  const deleteReview = (id) => {
    fetch(`http://localhost:8080/api/delete-comment/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        getAllComments()
      })
      .catch(error => console.error(error))
  }

  const confirmDelete = () => {
    return window.confirm('Вы уверены, что хотите удалить отзыв?')
  }

  function handleDelete(id) {
    if (confirmDelete()) {
      // выполнить действие для удаления
      deleteReview(id)
    }
  }


  const promptReview = () => {
    const stars = Number(prompt("Сколько звезд вы поставите этому продукту? (от 1 до 5)"));
    const review = prompt("Напишите ваш отзыв о продукте:");

    const newComm = {
      stars: stars,
      commentText: review
    }
    if (newComm.stars && newComm.commentText) {
      addNewComment(newComm)
    }
  }

  const saveEditedComment = (comment) => {
    uploadChangedComment({
      id: comment.comment_id,
      commentText: editedComm.text,
      stars: comment.stars
    })
    setEditedComm({})
  }

  return (
    <div className='mainComments' id='reviews'>
      <div className='wrapper'>
        <span className='h3'>Отзывы</span>
        <button className='transparent-button' onClick={promptReview}>Оставить отзыв +</button>
        <div className='comments'>
          {commentList &&
            commentList.map(comment =>
              <div className='itemComment' key={comment.comment_id}>
                {comment.comment_id !== editedComm.comment_id ?
                  <>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                  <span>
                    {Array.from({length: comment.stars}, (_, index) => (
                      <img src={starIcon} width='20px' alt='*'/>
                    ))}
                    {Array.from({length: 5 - comment.stars}, (_, index) => (
                      <img src={starEmptyIcon} width='20px' alt='*'/>
                    ))}
                  </span>

                      <span style={{fontSize: '22px'}}>{comment.text}</span>
                      {/*<textarea></textarea>*/}
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                      <button
                        className='deleteIcon'
                        onClick={() => {
                          handleDelete(comment.comment_id)
                        }}
                      >
                        <img src={deleteIconRed} alt='delete' width='30px'/>
                      </button>
                      <button
                        className='editIcon'
                        onClick={() => {
                          setEditedComm(comment)
                        }}
                      >
                        <img src={editIcon} alt='edit' width='30px'/>
                      </button>
                    </div>
                  </> :
                  //edit mode
                  <>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                  <span>
                    {Array.from({length: comment.stars}, (_, index) => (
                      <img src={starIcon} width='20px' alt='*'/>
                    ))}
                    {Array.from({length: 5 - comment.stars}, (_, index) => (
                      <img src={starEmptyIcon} width='20px' alt='*'/>
                    ))}
                  </span>

                      {/*<span style={{fontSize: '22px'}}>{comment.text}</span>*/}
                      <textarea
                        value={editedComm.text}
                        onChange={e => {
                          setEditedComm({
                              ...editedComm,
                            text: e.target.value
                            })
                        }}
                      >
                      </textarea>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                      <button
                        className='deleteIcon'
                        onClick={() => {
                          handleDelete(comment)
                        }}
                      >
                        <img src={deleteIconRed} alt='delete' width='30px'/>
                      </button>
                      <button
                        className='editIcon'
                        onClick={() => saveEditedComment(comment)}
                      >
                        <img src={saveIcon} alt='edit' width='30px'/>
                      </button>
                    </div>
                  </>
                }
              </div>
            )
          }
        </div>

      </div>
    </div>
  );
};

export default Comments;