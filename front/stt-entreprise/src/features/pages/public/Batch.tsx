import { useState } from "react";
import { transcribeFile } from "../../../api/transcribeApi";
import { useAuthToken } from "../../../auth/authToken";

interface FormDataTranscription {
  file?: File,
  diarization: boolean,
  minPeople: number,
  maxPeople: number,
  languages: string[]
}

function Transcribe() {
  // const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormDataTranscription>({
    file: undefined,
    diarization:true,
    minPeople: 0,
    maxPeople: 0,
    languages: ["en"]
  });
  
  const [isHidden, setHidden] = useState(false);
  const toggleVisibility = () =>{
    setHidden(prev => !prev);
    setError("");
    // formData.minPeople = 0
    // formData.maxPeople = 0
    formData.diarization = isHidden
  } 

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      formData.file = e.target.files[0];
      setFileName(e.target.files[0].name);
      setError("");
      console.log(formData)
      // setFile(e.target.files[0]);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'minPeople' || name === 'maxPeople' ? Number(value) : value, }));
    setError("");
    console.log(formData)
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>)=> {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    formData.languages = options;
    setError("");
    console.log(formData)
  };

  // const [success, setSuccess] = useState<string>();
  const token = useAuthToken()
  // console.log("token token double "+token)
  const [error, setError] = useState<string>();
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) {
      setError("File cannot be blank. Field required.");
      return;
    };
  
    const fd = new FormData();
    fd.append('file', formData.file);
    // fd.append('metadata', JSON.stringify({
    //   languages: formData.languages,
    //   maxPeople: formData.maxPeople,
    //   diarization: formData.diarization,
    //   minPeople: formData.minPeople
    // }));
    
    const metadataJson = JSON.stringify({
      languages: formData.languages,
      diarization: formData.diarization,
      maxPeople: Number(formData.maxPeople),
      minPeople: Number(formData.minPeople)
    });
    console.log(metadataJson)
    fd.append('metadata', new Blob([metadataJson], { type: 'application/json' }));

    try {
      // console.log("bouton pressed")
      const response = await transcribeFile(fd, token);
      const data = response.data;
      console.log(data)

      // if (!response.ok) {
      //   setError(data.error || "Unkown error happened.");
      // }
    } catch (error) {
      console.error(error);
      setError("Error connecting to the server.");
    }
  }


  return (
      <div>
        <div className="col-12">
            <h2 className="page-title mb-0">File upload</h2>
            <p className="text-muted">
                Many supported audio and video file
            </p>
            <div className="row mb-4">
            <div className="col-md-12">
              <div className="card shadow mb-4">
                <div className="card-header">
                  <strong>Dropzone</strong>
                </div>
                <div className="card-body">
                  <form action="/file-upload" onSubmit={handleUpload}>
                    <div className="dropzone bg-light rounded-lg mb-5 col-12 p-0" id="tinydash-dropzone">
                      <label htmlFor="upload" className="mx-auto w-100 p-5" style={{ cursor: "pointer"}}>
                          <div className="dz-message needsclick">
                              <div className="circle circle-lg bg-primary">
                                    <i className="fe fe-upload fe-24 text-white"></i>
                                  <input type="file" id="upload" accept="audio/*,video/*"  onChange={handleFileChange} hidden/>
                              </div>
                                <h5 className="text-muted mt-4">{fileName ? fileName : "Click here to upload"}</h5>
                          </div>
                      </label>
                    </div>
                    <div className="col-12 container row mx-0 custom-switch d-flex mb-4">
                      <div className="col-lg-4 col-md-4 col-xs-12">
                        <input type="checkbox" className="form-control custom-control-input" id="customSwitch1" onClick={toggleVisibility}/>
                        <label className="custom-control-label" htmlFor="customSwitch1">Disable diarization
                          <span className="fe fe-info fe-16 ml-2 text-secondary" title="Let the AI knows how many people are in the conversation."></span>
                        </label>
                      </div>
                      {!isHidden && (
                        <>
                          <div className="col-lg-4 col-md-4 col-xs-12">
                            <label htmlFor="min_people">Min. people</label>
                            <input type="number" className="form-control" name="minPeople" onChange={handleChange} value={formData.minPeople} required/>
                          </div>
                          <div className="col-lg-4 col-md-4 col-xs-12">
                            <label htmlFor="max_people">Max. people</label>
                            <input type="number" className="form-control" name="maxPeople"  onChange={handleChange} value={formData.maxPeople} required/>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="form-group col-12 mb-4">
                      <label className="mb-0">File language(s)</label>
                      {!isHidden && <p className="text-muted">Only 1 language between the speaker(s).</p>}
                      {isHidden && <p className="text-muted">Maximum is 4 languages.</p>}
                      <select className="form-control select2-multi" id="multi-select2" multiple  onChange={handleSelectChange} value={formData.languages} required>
                          <optgroup label="America">
                            <option value="en">English</option>
                            <option value="br">Brazil</option>
                          </optgroup>
                          <optgroup label="Europe">
                            <option value="fr-FR">French</option>
                            <option value="fr-CA">French Canada</option>
                          </optgroup>
                        </select>
                    </div>
                    <div className="form-group col-md-12">
                      {error &&
                        <div className="alert alert-danger" role="alert">
                          <span className="fe fe-minus-circle fe-16 mr-2"></span>{error}
                        </div>
                      }
                      <button type="submit" className="btn mb-2 btn-primary btn-lg btn-block">Transcribe</button>
                    </div>
                  </form>
                  <div className="d-none" id="uploadPreviewTemplate">
                    <div className="card mt-1 mb-0 shadow-none border">
                      <div className="p-2">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <img data-dz-thumbnail src="#" className="avatar-sm rounded bg-light" alt=""/>
                          </div>
                          <div className="col pl-0">
                            <a href="javascript:void(0);" className="text-muted font-weight-bold" data-dz-name></a>
                            <p className="mb-0" data-dz-size></p>
                          </div>
                          <div className="col-auto">
                            <a href="" className="btn btn-link btn-lg text-muted" data-dz-remove>
                              <i className="dripicons-cross"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Transcribe;