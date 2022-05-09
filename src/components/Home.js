import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Home = () => {
  
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (author !== null) {
      fetch("https://www.googleapis.com/books/v1/volumes?q=inauthor:" + author)
      .then((response) => response.json())
      .then((data) => setBooks(data.items)); 
    } else {
      fetch("https://www.googleapis.com/books/v1/volumes?q=search+terms")
      .then((response) => response.json())
      .then((data) => setBooks(data.items)); 
    }
  }, [author]);

  const Submit = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setAuthor(event.target.value);
    }
  }
  
  return (
    <div>
      <InputContainer>
        <Input type="text" placeholder="Search for an author..." onKeyDown={Submit} />
      </InputContainer>
      
      {books.map((book, key) =>
        <img key={key} src={book.volumeInfo.imageLinks.thumbnail} alt="Book Image"/>
      )}
    </div>
  );
}

const InputContainer = styled.div`
  text-align: center;
  margin-top: 10px;
`;

const Input = styled.input`
  border: 2px solid black;
  border-radius: 7px;
  padding: 10px;
  font-size: 18px;
`;

// const BooksContainer = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

export default Home;
