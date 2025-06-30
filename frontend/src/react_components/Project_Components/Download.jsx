import React from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Download = (rootElementId ,DownloadFileName) => {
    const DownloadFileDocuments=()=>{
        const input =document.getElementById(rootElementId);
        html2canvas(input).then((canvas)=>{
            const imgData= canvas.toDataUrl("image/png");
            const pdf =new jsPDF("p","pt","a4");
            pdf.addImage(imgData,"JPEG",10,50);
            pdf.save(`${DownloadFileName}`);
        })
    }
  return (
    <div>
      <p>Download</p>
      <button className='bg-green-400 w-[70%] h-10' onClick={DownloadFileDocuments}>download</button>
    </div>
  )
}

export default Download;