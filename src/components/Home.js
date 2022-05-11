import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import { Link } from "react-router-dom";
import LibraryImage from '../images/library.jpg';

const Home = () => {
  
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (author !== null) {
      fetch("https://www.googleapis.com/books/v1/volumes?q=inauthor:" + author + "&filter=free-ebooks&orderBy=newest")
      .then((response) => response.json())
      .then((data) => setBooks(data.items)); 
    } else {
      fetch("https://www.googleapis.com/books/v1/volumes?q=search+terms&filter=free-ebooks&orderBy=newest")
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
      <BackgroundContainer>
        <Title>Browse Google Books</Title>

        <BackgroundImage src={LibraryImage} alt="Background Image" />

        <InputContainer>
          <Input type="text" placeholder="Search for an author..." onKeyDown={Submit} />
        </InputContainer>
      </BackgroundContainer>
      
      <BooksContainer>
        {books.map((book, key) =>
          <Book key={key}>
            <Link to={{ pathname: `/book?id=${book.id}` }}>
              <BookImage src={book.volumeInfo.imageLinks.thumbnail} alt="Book Image"/>
            </Link>
            <BookDetail>{book.volumeInfo.publisher}</BookDetail>
            <BookDetail>Released: {book.volumeInfo.publishedDate}</BookDetail>
            {book.volumeInfo.authors
              ? <BookDetail>Authors: <br/> {book.volumeInfo.authors}</BookDetail>
              : ''}
            <BookDetail>
              <a href={book.accessInfo.pdf.acsTokenLink} color='blue'>Download</a>
            </BookDetail>
            <BookDetail>
              {book.volumeInfo.ratingsCount
              ? <>Ratings: {book.volumeInfo.ratingsCount}</>
              : <>Ratings: 0</>}
            </BookDetail>
            <BookDetail>
              <StarRatings rating={book.volumeInfo.averageRating} starRatedColor="gold" starDimension="20px"
                numberOfStars={5} name='rating'
              />
            </BookDetail>
          </Book>
        )}
      </BooksContainer>
    </div>
  );
}

const BackgroundContainer = styled.div`
  position: relative;
`;

const Title = styled.h1`
  position: absolute;
  text-align: center;
  width: 100%;
  top: 40%;
  outline: none;
  color: white;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 730px;
  object-fit: cover;
`;

const InputContainer = styled.div`
  position: absolute;
  text-align: center;
  width: 100%;
  top: 50%;
  outline: none;
  color: #FFFFFF;
  font-weight: bold;
  margin-top: 10px;
`;

const Input = styled.input`
  border: 2px solid black;
  border-radius: 20px;
  padding: 10px 10px 10px 25px;
  font-size: 18px;
  width: 400px;
`;

const BooksContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 50px;
`;

const Book = styled.div`
  padding-left: 10px;
`;

const BookImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

const BookDetail = styled.p`
  max-width: 200px;
  font-size: 14px;
`;

// const Link = styled.a`
//   text-decoration: none;
//   color: ${props => props.color === 'blue' ? 'blue' : 'black'};
//   cursor: pointer;
// `;

export default Home;
