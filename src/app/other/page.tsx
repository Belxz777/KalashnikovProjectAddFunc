
import React from 'react';
import Image from 'next/image';
const htmlContent = '<figure class="wp-block-image size-large is-resized"><img decoding="async" loading="lazy" width="1024" height="683" src="http://localhost:10004/wp-content/uploads/2023/11/8accf474b6f3d4176db1685278c7c6e1-1024x683.jpg" alt="" class="wp-image-37" style="aspect-ratio:1.7777777777777777;width:588px;height:auto" srcset="http://localhost:10004/wp-content/uploads/2023/11/8accf474b6f3d4176db1685278c7c6e1-1024x683.jpg 1024w, http://localhost:10004/wp-content/uploads/2023/11/8accf474b6f3d4176db1685278c7c6e1-300x200.jpg 300w, http://localhost:10004/wp-content/uploads/2023/11/8accf474b6f3d4176db1685278c7c6e1-768x512.jpg 768w, http://localhost:10004/wp-content/uploads/2023/11/8accf474b6f3d4176db1685278c7c6e1-1536x1024.jpg 1536w, http://localhost:10004/wp-content/uploads/2023/11/8accf474b6f3d4176db1685278c7c6e1.jpg 1650w" sizes="(max-width: 1024px) 100vw, 1024px" /></figure><p>Единственный естественный спутник Земли. Самый близкий к Солнцу спутник планеты, так как у ближайших к Солнцу планет их нет. Второй по яркости объект на земном небосводе после Солнца и пятый по величине естественный спутник планеты Солнечной системы. Среднее расстояние между центрами Земли и Луны &#8211; 384467 км</p><blockquote class="wp-block-quote"><p>Сделано учениками группы К-21-1</p><cite>Проект от 10.12.22</cite></blockquote>';

const extractContent = (html: string) => {
  const imgRegex = /<img[^>]+src="([^">]+)"/;
  const blockquoteMathc = /<p>(.*?)<\/p>/;
  const blockquoteRegex = /<blockquote.*?>\s*<p>(.*?)<\/p>\s*<cite>(.*?)<\/cite>\s*<\/blockquote>/;
  const blockquoteMatch = html.match(blockquoteRegex);

  const imgMatch = html.match(imgRegex);
  const textMatch = html.match(blockquoteMathc);

  const imageUrl = imgMatch ? imgMatch[1] : '';
  const text = textMatch ? textMatch[1] : '';
const blockquoteContentMade = blockquoteMatch ? blockquoteMatch[1] : "";
const blockquoteContentDate= blockquoteMatch ? blockquoteMatch[2] : "";
  return { imageUrl, text,blockquoteContentMade,blockquoteContentDate};
};

const ContentComponent: React.FC = () => {
  const { imageUrl, text,blockquoteContentMade,blockquoteContentDate } = extractContent(htmlContent);

  return (
    <div>
      <Image src={imageUrl} alt="" width={100} height={100}/>
      <p>{text}</p>
      <p>{blockquoteContentMade}</p>
      <p>{blockquoteContentDate}</p>
    </div>
  );
};

export default ContentComponent;