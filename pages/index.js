import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { StyledFavorite } from "../src/components/Favorites";
import {videoService} from "../src/services/videoService.js"


export default function HomePage() {
  const service = videoService();
  const [searchFilter,setSearchFilter] = React.useState("");
  const [playlists,setPlaylists] = React.useState({});

  React.useEffect(()=>{
    service.getAllVideos().then((dados)=>{
      const novasPlaylists ={...playlists};
      dados.data.forEach((video)=>{
        if(!novasPlaylists[video.playlist]){
          novasPlaylists[video.playlist] = [];  
        }
        novasPlaylists[video.playlist].push(video);
      })
     setPlaylists(novasPlaylists);
    })
  },[]);

  const estilosDaHomePage = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  };
 
  return (
    <>
      <div style={estilosDaHomePage}>
        <Menu searchFilter={searchFilter} setSearchFilter={setSearchFilter}/>
        <Header />
        <Timeline searchFilter={searchFilter} playlists={playlists} />
        <Favorites favorites={config.favorites} />
      </div>
    </>
  );
}

const StyledHeader = styled.div`
  background-color: ${({theme})=>theme.backgroundLevel1};
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
                    <span>{video.title}</span>
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
              <a href={favorite.aluratube} key={favorite.aluratube}>
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


