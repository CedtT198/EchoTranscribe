import { useState, useEffect } from "react";
import { findAllQA } from "../api/qa";

interface QAProps {
  about?: string;
}

export default function QA ({ about }: QAProps) {
    const [QAs, setQA] = useState<any[]>([]);
    useEffect(() => {
        let url = `/qa/findAll`;
        if (about) {
            url += `?about=${encodeURIComponent(about)}`;
        }

        const fetchQAs = async () => {
            try {
                const res = await findAllQA(url);
                setQA(res.data);
                // console.log("QAS "+data);
            } catch (err) {
                console.log((err as Error).message);
            }
        };

        fetchQAs();
    }, [about]);

    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="mb-5 pb-5 d-flex flex-column justify-content-center align-items-center">
            <div className="accordion w-75">
                {QAs.map((qa, i) => (
                    <div className="card shadow mb-3 accordion-item-hover" key={qa.id ?? i} style={{borderRadius: "35px"}}>
                        <div className="card-header cursor-pointer text-glow-primary"  onClick={() => toggle(i)} style={{ cursor: "pointer" }}>
                            <div className="row align-items-center">
                                <p className="col-10 m-0 text-center" style={{ fontSize: 14 }}>{qa.question}</p>
                                <p className="col-2 mb-0 text-center">
                                    <span className={`fe fe-${openIndex === i ? "minus" : "plus"} fe-16`}/>
                                </p>
                            </div>
                        </div>

                        {openIndex === i && (
                            <div className="card-body text-center">
                                <p style={{ fontSize: 12 }}>{qa.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}