
import React from 'react';
import mergeImages from 'merge-images';
import coverImage from '../../assets/CoverImage.png';
import T001 from '../../assets/T002.png';

const ImageMerge = () => {
    
 
mergeImages([
    {src:coverImage},
    {src:T001, width:'80px' , height:'80px'}])
  .then(b64 => document.querySelector('img').src = b64);    
    
    
return (
    <div>
        <img src="" alt="test" />
    </div>
  );
};

export default ImageMerge;
