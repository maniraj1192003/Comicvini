import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const endpoints = [
  { key: 'characters', title: 'Characters', link: '/characters' },
  { key: 'movies', title: 'Movies', link: '/movies' },
  { key: 'powers', title: 'Powers', link: '/powers' },
  { key: 'concepts', title: 'Concepts', link: '/concepts' },
];

const ComicCardPage = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const results = {};
    endpoints.forEach((endpoint) => {
      results[endpoint.key] = {
        deck: `Explore ${endpoint.title} from Comicvine`, 
      };
    });
    setData(results);
  }, []);

  return (
    <div
      className="container p-4 bg-dark text-white rounded shadow-lg border border-warning mt-4"
      style={{ fontFamily: "'Comic Sans MS', cursive, sans-serif" }}
    >
      <h2
        className="mb-4 text-warning text-center"
        style={{ textShadow: '2px 2px red' }}
      >
        Comicvine Explorer
      </h2>

      <div className="row">
        {endpoints.map(({ key, title, link }) => {
          const item = data[key];
          return (
            <div className="col-md-6 col-lg-3 mb-4" key={key}>
              <Link to={link} className="text-decoration-none text-white">
                <div className="card bg-secondary h-100 shadow-sm border border-warning">
                  <div className="card-body">
                    <h5 className="card-title text-warning">{title}</h5>
                    <p className="card-text">
                      {item?.deck || 'Explore this category to learn more.'}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComicCardPage;
