import { useEffect, useRef, useState, type ChangeEvent } from "react";
import Textarea from "../../../../components/others/Textarea";
import { sumDefault, summarize, type Summary } from "../../../../api/summary";
import { useLocation, useNavigate } from "react-router-dom";
import { transcribeShortFile } from "../../../../api/transcription";
import { useTranscript } from "../../../../auth/useTranscript";
import Loading from "../../../../components/others/Loading";
import axios from "axios";
import { useToast } from "../../../../auth/ToastProvider";
import SaveButton from "./SaveButton";
import { useAuth0 } from "@auth0/auth0-react";

export default function Summary() {
  const { setError } = useToast();

  const { user } = useAuth0();
  const hasRun = useRef(false);

  const navigate = useNavigate();

  const location = useLocation();
  const [formData, setFormData] = useState<Summary>();
  const { fileDuration, transType, type:longTransType, formDataTranscript, liveTranscript } = location.state || {};
  
  const { startTranscription, status, isLoading: transLoading, isPolling, setIsLoading, setIsPolling, hideLoadingPanel } = useTranscript();
  // const { token, loading:tokenLoad } = useAuthToken();
  useEffect(() =>{
    // if (tokenLoad || !token) return;
    if (!longTransType) setIsLoading(false);

    // dev seulement
    if (hasRun.current) return;
    hasRun.current = true;
    // 

    if (user?.sub) {
      updateFormData("auth0_id", user.sub);
    }

    if (formDataTranscript) {
      const file = formDataTranscript.get('file');
      updateFormData("title", (file) ? file.name : "");
      updateFormData("file", (file) ? file.name : "");
      updateFormData("language", formDataTranscript.get('language'));
      updateFormData("transcription_type", transType);
      updateFormData("file_duration", fileDuration);
      if (transType === "Live" && liveTranscript) {
        updateFormData("content", liveTranscript);
      }
    }

    const transcript = async () => {
      try {
        if (longTransType === "long") {
          startTranscription(formDataTranscript);
          // console.log(formDataTranscript);
          // console.log(longTransType+" hono");
        }
        else if (longTransType === "short") {
          await transcribeShortFile(formDataTranscript)
            .then((response)=> {
              console.log(response);
              updateFormData("content", response.data)
              setIsLoading(false)
            })
            .catch((error: any) => {
              setError(error)
            });

          // console.log(formDataTranscript);
          // console.log(longTransType+" hono");
        }
      } catch (err: any) {
        setError(err.response?.data?.error || 'Error transcribing file. Try again.');
      }
    }
    
    transcript()
  }, [longTransType, formDataTranscript, transType, liveTranscript]);

  useEffect(() => {
    updateFormData("content", status?.transcript ? status?.transcript : "")
  }, [status])

  const updateFormData = <K extends keyof Summary>(field: K, value: Summary[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(formData);
  };

  const handleGoalChange = (goal: string) => {
    updateFormData("goal", goal);
  };

  const [bar, setBar] = useState<number>(5);
  const handleLengthChange = (length: string) => {
    let value = 5;
    if (length === "short") value = 33;
    else if (length === "medium") value = 66;
    else if (length === "long") value = 100;

    updateFormData("length", length);
    setBar(value);
  };

  const handleAdditionalInstruction = (e: ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData("additional_instruction", e.target.value);
  };

  const [summary, setSummary ] = useState<string>("");
  const handleSummary = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await summarize(formData.content, formData.goal, formData.length, formData.additional_instruction);
      const data = res.data;
      setSummary(data);
      updateFormData("content", formData.content);
      updateFormData("summary", data);

      // console.log(data);
    } catch (error: any) {
      // setError(error.message);
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data); 
      } else {
        setError("Unknown error. Maybe the API Key has been revoked, please contact the admin just in case.");
      }
    }
    // console.table(formData);
  };

  const handleExport= () => {
    navigate("/public/layout/export", {
      state: {
        Summary: formData
      },
    });
  };


  if (transLoading) {
    return <Loading/>
  }
  return (
    <div className="d-flex justify-content-center">
      {isPolling && hideLoadingPanel==false && <>
        <div className="col-xs-12 col-md-9 col-lg-9">
          <div className="row text-center vh-100">
            {status?.status === 'ERROR' && status.error && <div className="alert alert-danger" role="alert">
              <span className="fe fe-minus-circle fe-16 mr-2"></span>{status.error}
            </div>}
            <div className="col-xs-12 offset-md-2 col-md-8 offset-lg-2 col-lg-8 p-0">
              <p className="h1 mb-0">Transcribing your file...</p>
              <p className="text-muted mb-5">Can take time depending on your file.</p>

              {!status?.progress && <p className="h1">Processing...</p>}
              {status?.progress && <p className="h1">{status?.progress}%</p>}
              <div className="progress mb-4">
                <div className="progress-bar" role="progressbar" style={{width: status?.progress+"%"}}  aria-valuenow={status?.progress} aria-valuemin="5" aria-valuemax="100"></div>
              </div>
              <p className="h3">Status: {status?.status}</p>
              <button type="button" className="btn btn-danger rounded-pill mx-1" onClick={() => setIsPolling(false)}>Cancel</button>
              {/* <button type="button" className="btn btn-warning rounded-pill mx-1 text-white" onClick={() => setHideLoadingPanel(true)}>Hide panel</button> */}
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
                <form onSubmit={handleSummary} className="container row m-0">
                  <div className="col-12 mb-4">
                    {/* title */}
                    <Textarea fs={45} mh={10} ml={200} class="text-primary" onChange={(value) => updateFormData("title", value)} value={formData.title} ph="Title" name=""></Textarea> 
                    <Textarea fs={22} mh={10} ml={200} class="text-muted" onChange={(value) => updateFormData("subtitle", value)} value={formData.subtitle} ph="Subtitle" name=""></Textarea>
                  </div>
                  <div className="col-md-12 mb-5">
                    {summary &&
                      <>
                        <p className="text-danger text-center" style={{textDecoration: "underline"}}>Summary result</p>
                        <Textarea fs={16} mh={500} ml={10000000} class="" name="" ph="" onChange={(value) => updateFormData("summary", value)} value={summary}></Textarea>
                      </>
                    }
                    {!summary && <Textarea fs={16} mh={500} ml={10000000} class="" name="" ph="" onChange={(value) => updateFormData("content", value)} value={formData.content}></Textarea> }
                  </div>
                  <div className="col-12 mb-5">
                    <div className="text-center d-flex justify-content-center align-items-center">
                      <div className="bg-dark p-1 rounded-pill">
                        <a className="btn btn rounded-pill mx-1 text-light" type="button" onClick={handleExport}>
                          <span className="fe fe-info fe-16 mr-1"></span>
                          <span>Download/Export</span>
                        </a>
                        {!summary && <button className="btn btn-primary rounded-pill mx-1 text-light" type="button">
                          <span className="fe fe-info fe-16 mr-1"></span>AI Summary
                        </button>}
                        <SaveButton transcription={formData}/>
                      </div>
                    </div>
                  </div>

                  {!summary && <div className="container mb-4">
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
                          
                          {/* <input type="radio" className="" id="Long" name="length" required onChange={() => handleLengthChange("long")}/>
                          <label htmlFor="Long">Long</label> */}
                        </div>
                        <div className="offset-md-3 col-md-6 offset-lg-3 col-lg-6 col-xs-12 p-0">
                          <div className="progress">
                            <div className="progress-bar" role="progressbar" style={{width: bar+"%"}}  aria-valuenow={bar} aria-valuemin="5" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* {!formData.transcription_type && <div className="offset-md-3 col-md-6 offset-lg-3 col-lg-6 col-xs-12 p-0 mb-5 text-center">
                        <label htmlFor="language">Language</label>
                        <select className="form-control" id="language" onChange={(e) => updateFormData("language", e.target.value)}>
                            <optgroup label="America">
                                <option value="en" selected>English</option>
                                <option value="br">Brazil</option>
                            </optgroup>
                            <optgroup label="Europe">
                                <option value="fr">French</option>
                            </optgroup>
                        </select>
                      </div>} */}

                      <div className="col-12 d-flex justify-content-center">
                        <div className="col-md-10 col-lg-10 col-xs-12">
                          <div className="mb-4">
                            <label htmlFor="add_content">Additional instructions (Optional)</label>
                            <textarea name="" id="add_content" className="form-control" style={{minHeight: 200, resize: "none", fontSize: "18px"}} onChange={handleAdditionalInstruction}></textarea>
                          </div>

                          <div className="container row m-0 text-center">
                            <p className="col-md-9 col-lg-9 col-xs-12">AI can make mistake, the content can be inaccurate.</p>
                            <button type="submit" className="btn btn-primary rounded-pill btn-md col-md-3 col-lg-3 col-xs-12">
                              <span className="mx-1 fe fe-send"></span>Generate
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}