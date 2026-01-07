import type { FormDataTranscription, SettingsModalProps } from "../../api/transcription";


const StreamingSettings: React.FC<SettingsModalProps> = ({ settings, setSettings }) => {
    const updateSetting = <K extends keyof FormDataTranscription>( key: K, value: FormDataTranscription[K]) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    return(
        <>
            <button className="circle circle-md bg-white border-primary" type='button' data-toggle="modal" data-target=".modal-full">
                <span className="fe fe-settings fe-16 text-primary"></span>
            </button>
            
            <div className="modal fade modal-full" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered mt-0 pt-0" role="document">
                    <div className="modal-content">
                        <div className="modal-body text-center m-0 p-0">
                            <div className="row justify-content-center">
                                <div className="col-12">
                                    <div className="">
                                        <p className="h4 mb-0 mt-5">Streaming Settings</p>
                                        <p>Enable/DIsable some features</p>
                                        <hr className=""/>
                                        <div className="list-group mb-5 shadow text-left">
                                            <div className="list-group-item">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <strong className="mb-0">Use saved settings</strong>
                                                        <p className="text-muted mb-0">If you previously saved your settings, use this to load it.</p>
                                                    </div>
                                                    <div className="col-auto">
                                                        <div className="custom-control custom-switch">
                                                            <input type="checkbox" className="custom-control-input" id="savedSettings" />
                                                            <label className="custom-control-label" htmlFor="savedSettings"></label>
                                                        </div>
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>

                                        <strong className="mb-0">Language</strong>
                                        <p></p>
                                        <div className="list-group mb-5 shadow text-left">
                                            <div className="list-group-item">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <strong className="mb-0">Language</strong>
                                                        <p className="text-muted mb-0">Main language used in the audio.</p>
                                                    </div>
                                                    <div className="col-auto">
                                                        <div className="custom-control custom-switch">
                                                            <select className="form-control" id="language"
                                                            value={settings.mainLanguage}
                                                            onChange={(e) => updateSetting('mainLanguage', e.target.value)}
                                                            >
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
                                                    </div> 
                                                </div>
                                            </div>

                                            <div className="list-group-item">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <strong className="mb-0">Use alternative languages</strong>
                                                        <p className="text-muted mb-0">Other languages that might be used.</p>
                                                    </div> 
                                                    <div className="col-auto">
                                                        <div className="custom-control custom-switch">
                                                            <input type="checkbox" className="custom-control-input" id="useAlternativeLanguages"
                                                            checked={settings.useAlternativeLanguages}
                                                            onChange={(e) => updateSetting('useAlternativeLanguages', e.target.checked)}
                                                            />
                                                            <label className="custom-control-label" htmlFor="useAlternativeLanguages"></label>
                                                        </div>
                                                    </div> 
                                                </div>
                                            </div>

                                            <div className="list-group-item">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <strong className="mb-0">Alternative languages</strong>
                                                        <p className="text-muted mb-0">Main language used in the audio.</p>
                                                    </div>
                                                    <div className="col-auto">
                                                        <div className="custom-control custom-switch">
                                                            <select className="form-control" id="alternativeLanguages" multiple
                                                            disabled={!settings.useAlternativeLanguages}
                                                            value={settings.alternativeLanguages}
                                                            onChange={(e) => {
                                                                const selected = Array.from(e.target.selectedOptions, option => option.value);
                                                                updateSetting('alternativeLanguages', selected);
                                                            }}>
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
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>

                                        <strong className="mb-0">Others</strong>
                                        <p>All streaming features.</p>
                                        <div className="list-group mb-5 shadow text-left">
                                            <div className="list-group-item">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <strong className="mb-0">Punctuation</strong>
                                                        <p className="text-muted mb-0">Add automaticly punctuation to the result.</p>
                                                    </div> 
                                                    <div className="col-auto">
                                                        <div className="custom-control custom-switch">
                                                            <input type="checkbox" className="custom-control-input" id="withAutomaticPunctuation"
                                                            checked={settings.withAutomaticPunctuation}
                                                            onChange={(e) => updateSetting('withAutomaticPunctuation', e.target.checked)}
                                                            />
                                                            <label className="custom-control-label" htmlFor="withAutomaticPunctuation"></label>
                                                        </div>
                                                    </div> 
                                                </div>
                                            </div>

                                            <div className="list-group-item">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <strong className="mb-0">Profanity filter</strong>
                                                        <p className="text-muted mb-0">Prevent from using explicit word(s).</p>
                                                    </div> 
                                                    <div className="col-auto">
                                                        <div className="custom-control custom-switch">
                                                            <input type="checkbox" className="custom-control-input" id="filterProfanity"
                                                            checked={settings.filterProfanity}
                                                            onChange={(e) => updateSetting('filterProfanity', e.target.checked)}
                                                            />
                                                            <label className="custom-control-label" htmlFor="filterProfanity"></label>
                                                        </div>
                                                    </div> 
                                                </div>
                                            </div>

                                            <div className="list-group-item">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <strong className="mb-0">Voice Activity Timeout Seconds</strong>
                                                        <p className="text-muted mb-0">Set how many seconds after the speaker stops talking to end the stream.</p>
                                                    </div> 
                                                    <div className="col-auto">
                                                        <div className="custom-control custom-switch">
                                                            <input type="number" className="form-control" size={1} min="5" max="120"
                                                            value={settings.voiceActivityTimeoutSeconds}
                                                            onChange={(e) => updateSetting('voiceActivityTimeoutSeconds', Number(e.target.value))}
                                                            />
                                                        </div>
                                                    </div> 
                                                </div>
                                            </div>

                                            <div className="list-group-item">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <strong className="mb-0">Use adaptation phrase</strong>
                                                        <p className="text-muted mb-0">You can </p>
                                                    </div> 
                                                    <div className="col-auto">
                                                        <div className="custom-control custom-switch">
                                                            <input type="checkbox" className="custom-control-input" id="useSpeechContext"
                                                            checked={settings.useSpeechContexts}
                                                            onChange={(e) => updateSetting('useSpeechContexts', e.target.checked)}
                                                            />
                                                            <label className="custom-control-label" htmlFor="useSpeechContext"></label>
                                                        </div>
                                                    </div> 
                                                </div>
                                            </div>

                                            <div className="list-group-item">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <strong className="mb-0">Boost adaptation</strong>
                                                        <p className="text-muted mb-0">Set how many seconds after the speaker stops talking to end the stream.</p>
                                                    </div> 
                                                    <div className="col-auto">
                                                        <div className="custom-control custom-switch">
                                                            <input type="number" className="form-control" size={1} min="0" max="20"
                                                            disabled={!settings.useSpeechContexts}
                                                            value={settings.boostSpeechContexts}
                                                            onChange={(e) => updateSetting('boostSpeechContexts', Number(e.target.value))}
                                                            />
                                                        </div>
                                                    </div> 
                                                </div>
                                            </div>

                                            <div className="list-group-item">
                                                <div className="row align-items-center">
                                                    <div className="col-12">
                                                        <strong className="mb-0">Phrases</strong>
                                                        <p className="text-muted">Add sentences/words separated by comma.</p>
                                                    </div> 
                                                    <div className="col-12">
                                                        <div className="custom-control custom-switch p-0">
                                                            <input type="text" className="form-control"
                                                            disabled={!settings.useSpeechContexts}
                                                            placeholder="e.g. Grok, xAI, React, TypeScript"
                                                            value={settings.speechContextsPhrases.join(', ')}
                                                            onChange={(e) => {
                                                                const phrases = e.target.value
                                                                .split(',')
                                                                .map(p => p.trim())
                                                                .filter(p => p.length > 0);
                                                                updateSetting('speechContextsPhrases', phrases);
                                                            }}
                                                            />
                                                        </div>
                                                    </div> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <button aria-label="" type="button" className="close mb-4" data-dismiss="modal" aria-hidden="true">
                                            <span className="fe fe-x-circle fe-32 text-danger"></span>
                                        </button>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StreamingSettings;