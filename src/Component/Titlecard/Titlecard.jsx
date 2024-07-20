/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import "./Titlecard.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";
const Titlecard = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);

  const cardRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjJkMjQzYTg4MDM3NzdiZTNmZTZjYzVhMDAwNWQxMiIsIm5iZiI6MTcyMTQ1ODMxOS45NzgwODYsInN1YiI6IjY2OWI1ZDE1NzlkNjFlMTk3ODhiOTg0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V-4xxAmOQxBDFDn5f3PrElh3VwgMQETeSK45NNGtX2U",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardRef.current.scrollLeft += event.deltaY;
  };
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results))
      .catch((err) => console.error(err));
    cardRef.current.addEventListener("wheel", handleWheel);
  }, []);
  return (
    <div className="title-card">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Titlecard;
