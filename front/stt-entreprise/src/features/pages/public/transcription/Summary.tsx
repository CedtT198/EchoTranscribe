import { useEffect, useRef, useState, type ChangeEvent } from "react";
import Textarea from "../../../../components/Textarea";
import { sumDefault, type FormDataSummary } from "../../../../api/summary";
import { useLocation } from "react-router-dom";
import { useAuthToken } from "../../../../auth/useAuthToken";
import { transcribeShortFile } from "../../../../api/transcription";
import { useTranscript } from "../../../../auth/useTranscript";
import Loading from "../../../../components/Loading";

function Summary() {
  const hasRun = useRef(false);

  const location = useLocation();
  const { type, formDataTranscript } = location.state || {};

  const [bar, setBar] = useState<number>(5);
  const [error, setError] = useState<string>("");

  const [formData, setFormData] = useState<FormDataSummary>(sumDefault);
  const updateFormData = <K extends keyof FormDataSummary>(field: K, value: FormDataSummary[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(formData);
  };

  const handleGoalChange = (goal: string) => {
    updateFormData("goal", goal);
  };

  const handleLengthChange = (length: string) => {
    let value = 5;
    if (length === "short") value = 25;
    else if (length === "medium") value = 50;
    else if (length === "long") value = 100;

    updateFormData("length", length);
    setBar(value);
  };

  const handleAdditionalInstruction = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData("additional_instruction", e.target.value);
  };

  const [transcript, setTranscript] = useState<string>("");

  const { startTranscription, status, isLoading: transLoading, isPolling, setIsLoading, transError } = useTranscript();
  const { token, loading:tokenLoad } = useAuthToken();
  useEffect(() =>{
    if (tokenLoad || !token) return;
    if (!type) setIsLoading(false);

    // dev seulement
    if (hasRun.current) return;
    hasRun.current = true;
    // 

    const transcript = async () => {
      try {
        if (type === "long") {
          startTranscription(formDataTranscript, token);
          // console.log(formDataTranscript);
          // console.log(type+" hono");
        }
        else if (type === "short") {
          const  res = await transcribeShortFile(formDataTranscript, token);
          setTranscript(res.data.transcription);
          setIsLoading(false)

          // console.log(formDataTranscript);
          // console.log(type+" hono");
        }
      } catch (err: any) {
        setError(err.response?.data?.error || 'Error transcribing file. Try again.');
      }
    }
    
    transcript()
  }, [type, formDataTranscript, token, tokenLoad]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.table(formData);
  }

  if (transLoading) {
    return (<Loading></Loading>)
  }
  return (
    <div className="d-flex justify-content-center">
      {isPolling &&<>
        <div className="col-xs-12 col-md-9 col-lg-9">
          <div className="row text-center vh-100">
            {status?.status === 'ERROR' && status.error && <div className="alert alert-danger" role="alert">
              <span className="fe fe-minus-circle fe-16 mr-2"></span>{status.error}
            </div>}
            {transError && <div className="alert alert-danger" role="alert">
              <span className="fe fe-minus-circle fe-16 mr-2"></span>{transError}
            </div>}
            <div className="col-xs-12 offset-md-2 col-md-8 offset-lg-2 col-lg-8 p-0">
              <p className="h1 mb-0">Transcribing your file...</p>
              <p className="text-muted mb-5">Can take time depending on your file.</p>

              <p className="h1">{status?.progress}%</p>
              <div className="progress mb-4">
                <div className="progress-bar" role="progressbar" style={{width: bar+"%"}}  aria-valuenow={bar} aria-valuemin="5" aria-valuemax="100"></div>
              </div>
              <p className="h3">Status: {status?.status}</p>
            </div>

          </div>
        </div>
      </>}
      {!isPolling && <div className="col-xs-12 col-md-9 col-lg-9">
        <div className="col-12 text-center">
          <p className="h1 mb-0">Summary section</p>
          <p className="text-muted">Resume your text into useful report or a summary in bullet-points format.</p>
        </div>
        <div className="row mb-4">
          <div className="col-md-12 p-0">
            <div className="card shadow mb-4">
              <div className="card-body">
                <form onSubmit={submit} className="container row m-0">
                  <div className="col-12 mb-4">
                    {/* title */}
                    <Textarea fs={45} mh={10} ml={200} class="text-primary" onChange={(value) => updateFormData("title", value)} value={formData.title} ph="Title" name=""></Textarea> 
                    <Textarea fs={22} mh={10} ml={200} class="text-muted" onChange={(value) => updateFormData("subtitle", value)} value={formData.subtitle} ph="Subtitle" name=""></Textarea>
                  </div>
                  <div className="col-md-12 mb-5">
                    <Textarea fs={16} mh={500} ml={10000000} class="" name="" ph="" onChange={(value) => updateFormData("content", value)} value={transcript}></Textarea> 
                  </div>
                  <div className="col-12 mb-5">
                    <div className="text-center d-flex justify-content-center align-items-center">
                      <div className="bg-dark p-1 rounded-pill">
                        <a className="btn btn rounded-pill mx-1 text-light" type="button" href="/public/layout/export">
                          <span className="fe fe-info fe-16 mr-1"></span>
                          <span>Download/Export</span>
                        </a>
                        <button className="btn btn-primary rounded-pill mx-1 text-light" type="button">
                          <span className="fe fe-info fe-16 mr-1"></span>AI Summary
                        </button>
                        <a className="btn btn rounded-pill mx-1 text-light" type="button" href="">
                          <span className="fe fe-cloud fe-16 mr-1"></span>
                          <span>Save</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="container mb-4">
                    <div className="row">
                      <div className="col-12 text-center mb-3">
                        <p className="h5 card-title mb-0">Summary settings</p>
                        <p className="text-muted"></p>
                      </div>
                      
                      <div className="col-12">
                        <div className="radio-group-rounded">
                          <input type="radio" className="" id="paragraph" name="goal" required onChange={() => handleGoalChange("paragraph")}/>
                          <label htmlFor="paragraph">Paragraph</label>

                          <input type="radio" className="" id="bullet_points" name="goal" required onChange={() => handleGoalChange("bullet_points")}/>
                          <label htmlFor="bullet_points">Bullet points</label>
                          
                          <input type="radio" className="" id="decisional" name="goal" required onChange={() => handleGoalChange("decisional")}/>
                          <label htmlFor="decisional">Decisional</label>
                        </div>
                      </div>

                      <div className="col-12 mt-3 mb-5">
                        <div className="radio-group">
                          <input type="radio" className="" id="short" name="length" required onChange={() => handleLengthChange("short")}/>
                          <label htmlFor="short">Short</label>

                          <input type="radio" className="" id="medium" name="length" required onChange={() => handleLengthChange("medium")}/>
                          <label htmlFor="medium">Medium</label>
                          
                          <input type="radio" className="" id="Long" name="length" required onChange={() => handleLengthChange("long")}/>
                          <label htmlFor="Long">Long</label>
                        </div>
                        <div className="offset-md-3 col-md-6 offset-lg-3 col-lg-6 col-xs-12 p-0">
                          <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{width: bar+"%"}}  aria-valuenow={bar} aria-valuemin="5" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 d-flex justify-content-center">
                        <div className="col-md-10 col-lg-10 col-xs-12">
                          <div className="mb-4">
                            <label htmlFor="add_content">Additional instructions (Optional)</label>
                            <textarea name="" id="add_content" className="form-control" style={{minHeight: 200, resize: "none", fontSize: "18px"}} onChange={handleAdditionalInstruction}></textarea>
                          </div>

                          {error && <div className="alert alert-danger" role="alert">
                            <span className="fe fe-minus-circle fe-16 mr-2"></span>{error}
                          </div>}
                          <div className="container row m-0 text-center">
                            <p className="col-md-9 col-lg-9 col-xs-12">AI can make mistake, the content can be inaccurate.</p>
                            <button type="submit" className="btn btn-primary rounded-pill btn-md col-md-3 col-lg-3 col-xs-12">
                              <span className="mx-1 fe fe-send"></span>Generate
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default Summary;