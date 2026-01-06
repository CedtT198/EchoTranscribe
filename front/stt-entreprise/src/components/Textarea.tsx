import { useRef, useState, useEffect } from "react";

interface Props {
    fs: number;
    mh: number;
    ml: number;
    class: string;
    ph: string;
}

function Textarea(props: Props) {
  const textareaRef = useRef(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; 
    textarea.style.height = textarea.scrollHeight + "px";
  };

  return (
    <textarea
      ref={textareaRef}
      className={"form-control text-center p-0 "+props.class}
      placeholder={props.ph}
      rows={1}
      style={{
        minHeight: props.mh,
        fontSize: props.fs,
        resize: "none",
        overflow: "hidden",
        border: "none",
        boxShadow: "none"
      }}
      maxLength={props.ml}
      onInput={handleInput}
    />
  );
}

export default Textarea;
