import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CssReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { StyledFavorite } from "../src/components/Favorites";

export default function HomePage() {
  const estilosDaHomePage = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  };
  const [searchFilter,setSearchFilter] = React.useState("");
  return (
    <>
      <CSSReset />
      <div style={estilosDaHomePage}>
        <Menu searchFilter={searchFilter} setSearchFilter={setSearchFilter}/>
        <Header />
        <Timeline searchFilter={searchFilter} playlists={config.playlists} />
        <Favorites favorites={config.favorites} />
      </div>
    </>
  );
}

const StyledHeader = styled.div`
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

const StyledBanner = styled.div`
  .banner {
    height: 230px;
    width: 100%;
    background-image: url("background.jpg");
    background-repeat: repeat;
    background-attachment: scroll;
    
  }
`;

function Header() {
  return (
    <>
      <StyledBanner>
        <div className="banner"></div>
      </StyledBanner>
      <StyledHeader>
        
        <section className="user-info">
          <img src={`https://github.com/${config.github}.png`} />
          <div>
            <h2>{config.name}</h2>
            <p>{config.job}</p>
          </div>
        </section>
      </StyledHeader>
    </>
  );
}

function Timeline({searchFilter, ...props}) {
  const playlistNames = Object.keys(props.playlists);
  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = props.playlists[playlistName];
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos.filter((video)=>{
                return video.title.toLowerCase().includes(searchFilter.toLowerCase())
              }).map((video) => {
                return (
                  <a href={video.url} key={video.url}>
                    <img src={video.thumb} />
                    <spam>{video.title}</spam>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}

function Favorites(props){
  const favorites = props.favorites;
  const favoriteTitle = "Favorites";
  return (
    <StyledFavorite>
      <section>
      <h2>{favoriteTitle}</h2>
        <div>
          {favorites.map((favorite)=>{
            return (
              <a href={favorite.aluratube}>
                <img src={`https://github.com/${favorite.github}.png`} />
                <spam>{favorite.github}</spam>
              </a>
            );
          })}

        </div>
      </section>
    </StyledFavorite>
  );
}
