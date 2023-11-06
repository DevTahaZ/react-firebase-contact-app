import React from 'react'

const Navbar = ({onOpen, filterContacts}) => {
    
  return (
    <div className='nav'>
        <div className='heading'>
            <div className='title'>
                <img src="firebase.svg" alt="" />
                <h2>Firebase Contact App</h2>
            </div>
            <div className='big-filter'>
                <div className='big-search'>
                    <img src="b-search.svg" alt="" />
                    <input onChange={filterContacts} type="text" placeholder='Search Contact' />
                </div>
                <button onClick={onOpen} className='big-btn'>
                    <img src="add.svg" alt="" />
                </button>
            </div>
        </div>
        <div className='filter'>
            <div className='search'>
                <img src="w-search.svg" alt="" />
                <input onChange={filterContacts} type="text" placeholder='Search Contact' />
            </div>
            <button onClick={onOpen} className='btn'>
                <img src="add.svg" alt="" />
            </button>
        </div>
    </div>
  )
}

export default Navbar