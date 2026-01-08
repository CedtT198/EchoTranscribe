import { useEffect, useRef, useState } from "react";
import Textarea from "../../../../components/Textarea";
import {  type FormDataSummary } from "../../../../api/summary";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../../components/Loading";

function Export() {
  const location = useLocation();
  const { formDataSummary: fd } = location.state || {};
  
  const navigate = useNavigate();
  const hasRun = useRef(false);
  const [formData, setFormData] = useState<FormDataSummary | null>(null);
  useEffect(() => {
    // dev seulement
    if (hasRun.current) return;
    hasRun.current = true;
    // 

    console.log(fd);
    if (fd) {
      setFormData(fd as FormDataSummary);
    } else {
      navigate('/notfound', { replace: true });
    }
  }, [fd, navigate])

  // const [error, setError] = useState<string>("");

  const updateFormData = <K extends keyof FormDataSummary>(field: K, value: FormDataSummary[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(formData);
  };

  const handleTypeChange = (type: string) => {
    updateFormData("type", type);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.table(formData);
  };

  const saveSummary = () => {};

  if (!formData) {
    return (<Loading></Loading>)
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
                      <Textarea fs={45} mh={10} ml={200} class="text-primary d-inline" onChange={(value) => updateFormData("title", value)} value={formData.title} ph="Title" name=""></Textarea> 
                      <Textarea fs={22} mh={10} ml={200} class="text-muted" onChange={(value) => updateFormData("subtitle", value)} value={formData.subtitle} ph="Subtitle" name=""></Textarea>
                  </div>
                  <div className="col-md-12 mb-5">
                      <Textarea fs={16} mh={500} ml={10000000} class="" name="" ph="" onChange={(value) => updateFormData("content", value)} value={formData.content}></Textarea> 
                  </div>
                  <div className="container mb-4">
                    <div className="row">

                      <div className="col-12">
                        <div className="radio-group-rounded">
                          <input type="radio" className="" id="docxs" name="type" required onChange={() => handleTypeChange("docxs")}/>
                          <label htmlFor="docxs">docxs</label>

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