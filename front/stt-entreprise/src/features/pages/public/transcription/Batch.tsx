import { useEffect, useState } from "react";
import { type FormDataTranscription, batchDefault } from "../../../../api/transcription";
import FileSettings from "../../../../components/transcription/FileSettings";
import { useNavigate } from "react-router-dom";

function Transcribe() {

  // const [success, setSuccess] = useState<string>();
  const [error, setError] = useState<string>();
  const [fileName, setFileName] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [size, setSize] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [settings, setSettings] = useState<FormDataTranscription>(batchDefault);
  const navigate = useNavigate();
  useEffect(() => {
    console.log('🔧 Streaming Settings mis à jour :', settings);
  }, [settings]);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (e.target.files && selectedFile) {
      // check if file uploaded is not audio/video
      const isAudio = selectedFile.type.startsWith("audio/");
      const isVideo = selectedFile.type.startsWith("video/");

      if (!isAudio && !isVideo) {
        setError("Audio or Video file only can be uploaded. Try again with the correct file.");
        setFile(null);
        setFileName(null);
        setDuration(0);
        setSize(null);
        return;
      }

      // take file duration
      const url = URL.createObjectURL(selectedFile);
      const mediaElement = selectedFile.type.startsWith("audio/") ? new Audio(url) : document.createElement("video");
      mediaElement.src = url;

      const onLoadedMetadata = () => {
        if (!isNaN(mediaElement.duration) && isFinite(mediaElement.duration)) {
          setDuration(Math.round(mediaElement.duration));
        } else {
          setDuration(0);
        }
        URL.revokeObjectURL(url);
        mediaElement.removeEventListener("loadedmetadata", onLoadedMetadata);
      };

      mediaElement.addEventListener("loadedmetadata", onLoadedMetadata);

      mediaElement.addEventListener("error", () => {
        setError("Cannot read file duration, may be a corrupted file.");
        URL.revokeObjectURL(url);
      });
      
      // take file size
      const sizeInBytes = selectedFile.size;
      let formattedSize: string;

      if (sizeInBytes < 1024) {
        formattedSize = `${sizeInBytes} o`;
      } else if (sizeInBytes < 1024 * 1024) {
        formattedSize = `${(sizeInBytes / 1024).toFixed(1)} Ko`;
      } else if (sizeInBytes < 1024 * 1024 * 1024) {
        formattedSize = `${(sizeInBytes / (1024 * 1024)).toFixed(1)} Mo`;
      } else {
        formattedSize = `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(1)} Go`;
      }

      setSize(formattedSize);
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError("");
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!file) {
      setError("File cannot be blank. Field required.");
      return;
    };
  
    const metadataJson = JSON.stringify(settings);
    const fd = new FormData();
    fd.append('file', file);
    fd.append('metadata', new Blob([metadataJson], { type: 'application/json' }));

    try {
      navigate("/public/layout/summary", {
        state: {
          type: duration < 59 ? "short" : "long",
          formDataTranscript: fd
        },
      });
    } catch (error) {
      console.error(error);
      setError("Error connecting to the server.");
    }
  }


  return (
      <div>
        <div className="col-12">
            <div className="col-12 text-center">
              <p className="h1 page-title mb-0">File upload</p>
              <p className="text-muted">Many supported audio and video file</p>
            </div>
            <div className="col-12 mb-5">
              <div className="text-center d-flex justify-content-center align-items-center">
                <div className="bg-dark p-1 rounded-pill">
                  <button className="btn btn-primary rounded-pill mx-1 text-light" type="button">
                    <span className="fe fe-info fe-16 mr-1"></span>Upload audio
                  </button>
                  <a className="btn btn rounded-pill mx-1 text-light" type="button" href="/public/layout/live">
                    <span className="dot mr-2"></span>Transcribe live audio
                  </a>
                </div>
              </div>
            </div>
            <div className="row mb-4">
            <div className="col-md-12">
              <div className="card shadow mb-4">
                <div className="card-body">
                  <form onSubmit={handleUpload}>
                    <div className="dropzone rounded-lg col-12 p-0 text-center" id="tinydash-dropzone">
                      <label htmlFor="upload" className="mx-auto w-100 pt-5 pb-2 upload">
                        <input type="file" id="upload" accept="audio/*,video/*"  onChange={handleFileChange} hidden/>
                        <p className="h1 text-dark">Audio to text Converter</p>
                        <p className="h6 text-muted mb-5">Automatically convert audio to text.</p>
                        {!fileName && 
                          <>
                            <div className="dz-message needsclick mb-5 pt-5">
                              <a className="btn btn-primary rounded-pill py-3 px-4 text-light mb-3">
                                Upload your File
                                <i className="fe fe-upload-cloud fe-16 text-white mx-2"></i>
                              </a>
                              <h5 className="text-muted">Click or drag here to upload</h5>
                            </div>
                            <p className="font-weight-bold text-dark mb-0">No account needed</p>
                            <p className="text-muted">supports any audio format but only 3 min of length, during free trial.</p>
                          </>}
                          {fileName && 
                          <div className="dz-message needsclick mb-5 pt-5 d-flex flex-column align-items-center">
                              <div className="btn rounded-pill text-dark d-block w-50 mb-3" style={{backgroundColor: "#afd5f0ff", fontSize: 16}}>
                                <span className="d-flex justify-content-between align-items-center">
                                  <span className="fe fe-file fe-16 mx-1"></span>
                                  <span className="mx-1 text-truncate">{fileName}</span>
                                  <button className="btn text-dark"  type="button" id="actionMenuButton" data-toggle="dropdown">
                                    <span className="fe fe-info fe-16"></span>
                                  </button>
                                  <div className="dropdown-menu text-center" aria-labelledby="actionMenuButton">
                                    <span className="dropdown-item">{size}</span>
                                    {duration ? (<span className="dropdown-item">{Math.floor(duration / 60)}min et {duration % 60}sec</span>)
                                    : (<span className="dropdown-item">Unknown</span>)}
                                  </div>
                                </span>
                              </div>
                            <button className="btn btn-primary rounded-pill py-3 px-4 text-light font-weight-bolder" type="submit">Start</button>
                            <FileSettings
                              settings={settings}
                              setSettings={setSettings}>
                            </FileSettings>
                            <p className="h5 text-muted mt-3">
                              or, <a className="text-primary" style={{borderBottom: "1px dotted blue"}}>Select another file</a>
                            </p>
                          </div>}
                      </label>
                    </div>
                      {error &&
                      <div className="form-group col-md-12 mt-5 p-0">
                        <div className="alert alert-danger" role="alert">
                          <span className="fe fe-minus-circle fe-16 mr-2"></span>{error}
                        </div>
                      </div>}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Transcribe;