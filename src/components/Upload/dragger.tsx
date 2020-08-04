import React, { useState } from "react";
import classNames from "classnames";

interface DraggerProps {
  onFile: (files: FileList) => void;
}

const Dragger: React.FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  const [dragOver, setDragOver] = useState(false);
  const classes = classNames("lemon-uploader-dragger", {
    "is-dragover": dragOver,
  });
  const handleDrag = (e: React.DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };
  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault()
      setDragOver(false)
      //得到拖动后的文件
      onFile(e.dataTransfer.files)
  }
  return (
    <div
      className={classes}
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default Dragger;
