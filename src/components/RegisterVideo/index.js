import React from "react";
import { createClient } from "@supabase/supabase-js";
import { StyledRegisterVideo } from "./styles";

function getThumbnail(url){
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`
}

function useForm(props){
  const [insertVideo, setInsertVideo] = React.useState(props.initialValues);
  return {
    insertVideo,
    handleChange: (e) => {
      const name = e.target.name;
      setInsertVideo({ ...insertVideo, [name]: e.target.value });
    },
    clearForm(){
      setInsertVideo({});
    }
  };
}

export default function RegisterVideo() {
  const formCadastro = useForm({initialValues: { title: "", url: "" }});
  const [isVideoModalActive, setIsVideoModalActive] = React.useState(false);
  const PROJECT_URL = 'https://enlpoqalfhzzshzbsale.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVubHBvcWFsZmh6enNoemJzYWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMDMwMjAsImV4cCI6MTk4Mzc3OTAyMH0.XGfTvFjHGUFMf0SjtAWOnCLH_NcQ9JEIDszvYZV3r58';
  const supabase = createClient(PROJECT_URL,SUPABASE_KEY);
  return (
    <StyledRegisterVideo>
      <button
        className="add-video"
        onClick={() => {
          setIsVideoModalActive(true);
        }}
      >
        +
      </button>
      {isVideoModalActive && (
        <form onSubmit={(e)=>{
          e.preventDefault();
          supabase.from("video").insert({
            title: formCadastro.insertVideo.title,
            url: formCadastro.insertVideo.url,
            thumb: getThumbnail(formCadastro.insertVideo.url),
            playlist: "animes"
          }).then((oqveio) =>{
            console.log(oqveio)
          }).catch((err)=>{
            console.log(err);
          })
          setIsVideoModalActive(false);
          formCadastro.clearForm();
        }}>
          <div>
            <button
              className="close-modal"
              type="button"
              onClick={() => {
                setIsVideoModalActive(false);
              }}
            >
              x
            </button>
            <input
              placeholder="Titulo do Video"
              type="text"
              name="title"
              value={formCadastro.insertVideo.title}
              onChange={formCadastro.handleChange}
            />
            <input
              placeholder="URL"
              type="url"
              name="url"
              value={formCadastro.insertVideo.url}
              onChange={formCadastro.handleChange}
            />
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      )}
    </StyledRegisterVideo>
  );
}
