import styles from '@/styles/Ui.module.css';
import Image from 'next/image';
import Link from 'next/link';

export function Button({children, onClick, type, form}: any) {
  return (
    <button 
      onClick={onClick} 
      className={styles.butones_light}
      type={type}
      form={form}
      >
      {children}
    </button>
  );
}

export function IconButton({src, alt, width=30, height=30, href="", target='_blank'}: any) {
  return (
    <a href={href} target={target} className='hover:invert hover:opacity-50 transition-all duration-300'>
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
      ></Image>
    </a>
  );
}

// type SlidingImagesProps = {
//   slideWidth: number,
//   slideHeight: number,
//   images: Array
// }
// export function SlidingImages({slideWidth, slideHeight=slideWidth}: any) {
//   const images -== 
//   return (
//     <>
//       {/* Slideshow */}
//       <div className={`w-[${slideWidth}] flex flex-col bg-red-100`}>
//         <div className={``}>
//           <Image width={slideWidth} height={slideHeight} src={src} alt={alt} />

//         </div>
//         <div>
//           wll
//         </div>
//       </div>
//     </>
//   );
// }