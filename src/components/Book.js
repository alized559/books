import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

const Book = () => {

  const location = useLocation();
  const canvasRef = useRef();
  const [loaded, setLoaded] = useState(false);  
  const book_Id = window.location.href.substring(window.location.href.indexOf('=') + 1);

  useEffect(() => {      
    const scriptTag = document.createElement('script')                
    scriptTag.src = 'https://www.google.com/books/jsapi.js';       
    scriptTag.addEventListener('load', () => setLoaded(true));      
    scriptTag.id = "google-script";
    document.body.appendChild(scriptTag);
  }, []);

  useEffect(() => {            
    if (!loaded) {
      return;
    } else {
        if (window.viewer) {
          let viewer = new window.google.books.DefaultViewer(canvasRef.current); 
          viewer.load(book_Id);                
        } else {
          window.google.books.load()                             
          window.google.books.setOnLoadCallback(() => {                 
            let viewer = new window.google.books.DefaultViewer(canvasRef.current);         
            window.viewer = viewer      
            viewer.load(book_Id);       
          })
        }              
  }}, [loaded]);

  return (      
    <div>
      {loaded ?             
      <div>                
        <div ref={canvasRef} id="viewerCanvas" style={{ width: '600px', height: '500px' }}></div>            
        </div> : ''}
    </div>
  );
};

export default Book;