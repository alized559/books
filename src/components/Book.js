import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Book = () => {

  const location = useLocation();
  const canvasRef = useRef();
  const [loaded, setLoaded] = useState(false);
  const [bookId, setBookId] = useState(null);

  // Google books script
  useEffect(() => {
    const scriptTag = document.createElement('script')
    scriptTag.src = 'https://www.google.com/books/jsapi.js';
    scriptTag.addEventListener('load', () => setLoaded(true));
    scriptTag.id = "google-script";
    document.body.appendChild(scriptTag);
    setBookId(location.state.bookId);
  }, []);

  // Create new instance of Default viewer and load book's information to viewer
  useEffect(() => {
    if (!loaded) {
      return;
    } else {
        if (window.viewer) {
          let viewer = new window.google.books.DefaultViewer(canvasRef.current); 
          viewer.load(bookId);
        } else {
          window.google.books.load()
          window.google.books.setOnLoadCallback(() => {
            let viewer = new window.google.books.DefaultViewer(canvasRef.current);
            window.viewer = viewer
            viewer.load(bookId);
          })
        }
  }}, [loaded]);

  return (      
    <div style={{ marginTop: '20px' }}>
      {loaded ?             
        <ViewerFlex> 
          <ViewerCanvas ref={canvasRef} id="viewerCanvas"></ViewerCanvas>
          <RightSide>
            <div>
              <p><span style={{ fontWeight: 'bold' }}>Title:</span> {location.state.title}</p>
              {location.state.authors ? <p><span style={{ fontWeight: 'bold' }}>
                Authors:</span> {location.state.authors}</p> : ''}
              {location.state.pageCount ? <p><span style={{ fontWeight: 'bold' }}>
                Page Count:</span> {location.state.pageCount}</p> : ''}
              {location.state.publisher ? <p><span style={{ fontWeight: 'bold' }}>
                Publisher:</span> {location.state.publisher}</p> : ''}
              <p><span style={{ fontWeight: 'bold' }}>Language:</span> {location.state.language}</p>
              <p>
                {location.state.pdfLink ? <Link href={location.state.pdfLink}>Dawnload Pdf</Link> : ''}<br/>
                {location.state.epubLink ? <Link href={location.state.epubLink}>Dawnload Epub</Link> : ''}
              </p>
            </div>
          </RightSide>
        </ViewerFlex> : 'Something went wrong, try again :('}
    </div>
  );
};

const ViewerCanvas = styled.div`
  width: 600px;
  height: 500px;

  @media only screen and (max-width: 640px) {
    width: 380px;
    height: 280px;
  }
`;

const ViewerFlex = styled.div`
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 945px) {
    flex-direction: column;
    align-items: center;
  }
`;

const RightSide = styled.div`
  margin-left: 14px;
`;

const Link = styled.a`
  text-decoration: none;
  color: blue;
  cursor: pointer;
`;

export default Book;