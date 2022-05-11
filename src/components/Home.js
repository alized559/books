import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import LibraryImage from '../images/library.jpg';
import { GoogleLogout } from 'react-google-login';
import ClientId from '../common/Client';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const booksRef = useRef(null);
  const navigate = useNavigate();

  // Scroll to Books After Search
  const scroll = (ref) => {
    window.scrollTo(0, ref.current.offsetTop);
  };

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

  // Update Books After Search
  const Submit = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setAuthor(event.target.value);
      scroll(booksRef);
    }
  }

  const Logout = () => {
    navigate("/");
  };
  
  return (
    <div>

      <BackgroundContainer>
        <GoogleButton>
          <GoogleLogout
            clientId={ClientId}
            buttonText="Sign out with Google"
            onLogoutSuccess={Logout}
          />
        </GoogleButton>

        <Title>Browse Google Books</Title>

        <BackgroundImage src={LibraryImage} alt="Background Image" />

        <InputContainer>
          <Input type="text" placeholder="Search for an author..." onKeyDown={Submit} />
        </InputContainer>
      </BackgroundContainer>
      
      <BooksContainer ref={booksRef}>
        {books.map((book, key) =>
          <Book key={key}>
            <Link to="/book" state={{ bookId: book.id, title: book.volumeInfo.title, authors: book.volumeInfo.authors,
              pageCount: book.volumeInfo.pageCount, publisher: book.volumeInfo.publisher, language: book.volumeInfo.language,
              pdfLink: book.accessInfo.pdf.acsTokenLink, epubLink: book.accessInfo.epub.acsTokenLink }}>
              <BookImage src={book.volumeInfo.imageLinks.thumbnail} alt="Book Image"/>
            </Link>
            <BookDetail>{book.volumeInfo.publisher}</BookDetail>
            <BookDetail>Released: {book.volumeInfo.publishedDate}</BookDetail>
            {book.volumeInfo.authors
              ? <BookDetail>Authors: <br/> {book.volumeInfo.authors}</BookDetail>
              : ''}
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

const GoogleButton = styled.div`
  position: absolute;
  right: 0;
  margin: 20px 20px 0 0;
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
  border-radius: 20px;
  padding: 10px 10px 10px 25px;
  font-size: 18px;
  width: 400px;
  background: white;
  border: 2px solid red;
  box-sizing: border-box;
  transition: background 0.5s linear 0s;

  &:hover {
    background: #dcdcdc;
  }
`;

const BooksContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 50px;
  justify-content: center;
`;

const Book = styled.div`
  border: 1px solid;
  height: 100%;
  margin: 0 30px 30px 30px;
  padding: 0 10px 0 10px;
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

export default Home;
