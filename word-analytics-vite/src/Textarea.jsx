import { useState } from "react";
import Warning from "./Warning";

export default function Textarea() {
  const [text, setText] = useState("");
  //const [showWarning, setShowWarning] = useState(false);
  const [warningText, setWarningText] = useState("");

  const handleChange = (e) => {
    let newText = e.target.value;
    // validation - basic check just two checks: <script> and '@'
    // we could have used regex for more sophisticated
    if (newText.includes("<script>")) {
      setWarningText("Warning: No script tag allowed!");
      // setShowWarning(true);
      newText = newText.replace("<script>", "");
    } else if (newText.includes("@")) {
      setWarningText("Warning: No @ symbol allowed!");
      // setShowWarning(true);
      newText = newText.replace("@", "");
    } else {
      setWarningText("");
    }

    setText(newText);
  };

  return (
    <div className="textarea">
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Enter your text..."
        spellCheck="false"
      />
      <Warning warningText={warningText} />
    </div>
  );
}
