import { useEffect, useRef, useState } from "react";
import Textarea from "../../../../components/others/Textarea";
import {  type Summary } from "../../../../api/summary";
import { useLocation, useNavigate } from "react-router-dom";
import { download, exportDefault, type FormDataToExport } from "../../../../api/export";
import Loading from "../../../../components/others/Loading";

function Export() {
  const location = useLocation();
  const { Summary: fd } = location.state || {};
  const [error, setError] = useState<string>("");
  
  const navigate = useNavigate();
  const hasRun = useRef(false);
  const [formDataTranscription, setFormDataTranscription] = useState<Summary | null>(null);
  const [formData, setFormData] = useState<FormDataToExport>(exportDefault);
  useEffect(() => {
    // dev seulement
    if (hasRun.current) return;
    hasRun.current = true;
    // 

    console.log(fd);
    if (fd) {
      setFormDataTranscription(fd as Summary);
      formData.transcription = fd;
    } else {
      navigate('/notfound', { replace: true });
    }
  }, [fd, navigate])

  // const [error, setError] = useState<string>("");

  const updateFormData = <K extends keyof Summary>(field: K, value: Summary[K]) => {
    setFormDataTranscription((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(formDataTranscription);
  };

  const handleTypeChange = (type: string) => {
    formData.type = type;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.table(formData);
    
    try {
      await download(formData);
    } catch (err: any) {
      setError(err);
    }
  };

  const saveSummary = () => {};

  if (!formDataTranscription) {
    return <Loading />
  }
  return (
    <div className="d-flex justify-content-center">
      <div className="col-xs-12 col-md-9 col-lg-9">
        <div className="col-12 text-center">
          <p className="h1 mb-0">Download/Export</p>
          <p className="text-muted">Export your your transcription into many file format.</p>
        </div>
        <div className="row mb-4">
          <div className="col-md-12 p-0">
            <div className="card shadow mb-4">
              <div className="card-body">
                <form onSubmit={submit} className="container row m-0">
                  <div className="col-12 mb-4">
                    {/* title */}
                      <Textarea fs={45} mh={10} ml={200} class="text-primary d-inline" onChange={(value) => updateFormData("title", value)} value={formDataTranscription.title} ph="Title" name=""></Textarea> 
                      <Textarea fs={22} mh={10} ml={200} class="text-muted" onChange={(value) => updateFormData("subtitle", value)} value={formDataTranscription.subtitle} ph="Subtitle" name=""></Textarea>
                  </div>
                  <div className="col-md-12 mb-5">
                      <Textarea fs={16} mh={500} ml={10000000} class="" name="" ph="" onChange={(value) => updateFormData("content", value)} value={formDataTranscription.content}></Textarea> 
                  </div>
                  <div className="container mb-4">
                    <div className="row">

                      <div className="col-12">
                        <div className="radio-group-rounded">
                          <input type="radio" className="" id="docx" name="type" required onChange={() => handleTypeChange("docx")}/>
                          <label htmlFor="docx">docx</label>

                          <input type="radio" className="" id="pdf" name="type" required onChange={() => handleTypeChange("pdf")}/>
                          <label htmlFor="pdf">pdf</label>
                          
                          <input type="radio" className="" id="txt" name="type" required onChange={() => handleTypeChange("txt")}/>
                          <label htmlFor="txt">txt</label>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <div className="text-center d-flex justify-content-center align-items-center">
                      <div className="bg-dark p-1 rounded-pill">
                        <a className="btn btn rounded-pill mx-1 text-light" type="button" onClick={saveSummary}>
                          <span className="fe fe-info fe-16 mr-1"></span>
                          <span>Save</span>
                        </a>
                        <button className="btn btn-primary rounded-pill mx-1 text-light" type="submit">
                          <span className="fe fe-info fe-16 mr-1"></span>Export
                        </button>
                      </div>
                    </div>
                    
                    {error && <div className="alert alert-danger" role="alert">
                      <span className="fe fe-minus-circle fe-16 mr-2"></span>{error}
                    </div>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Export;