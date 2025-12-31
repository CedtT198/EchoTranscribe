import Quill from "quill";
import { useRef, useEffect } from "react";

interface TEProps {
    minHeight: number;
    fontSize: number;
}

function TextEditor(props: TEProps) {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const quillRef = useRef<Quill | null>(null);

    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                toolbar: [
                        // [{ font: [] }],
                        // [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        // [{ script: 'sub' }, { script: 'super' }],
                        // [{ indent: '-1' }, { indent: '+1' }],
                        // [{ direction: 'rtl' }],
                        // [{ color: [] }, { background: [] }],
                        // [{ align: [] }],
                        ['clean'],
                    ],
                },
            });
        }
        
        quillRef.current.root.style.minHeight = `${props.minHeight}px`;
        
        const editor = quillRef.current.root;
        editor.style.fontFamily = 'monospace';
        editor.style.fontSize = `${props.fontSize}px`; 
        editor.style.lineHeight = '1.4';

        editor.setAttribute('spellcheck', 'false');
    }, []);

    return (
       <div ref={editorRef} style={{ minHeight: props.minHeight }} />
    )
}

export default TextEditor;