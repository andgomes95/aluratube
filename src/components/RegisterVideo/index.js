import React from "react";
import { StyledRegisterVideo } from "./styles";

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
