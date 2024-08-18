import { StaticImageData } from 'next/image'
import styles from './imageLeftBlock.module.css'
import { ReactNode } from 'react'
import { Image } from '@chakra-ui/react'
import PageBlock from '../../pageBlock/PageBlock'

interface ImageLeftBlockProps {
  imageSrc?: string
  alt?: string,
  title: string,
  content: ReactNode
}

export default function ImageLeftBlock({ imageSrc, title, content, alt }: ImageLeftBlockProps) {
  return <>
    <PageBlock className={styles.about}>
    {/* <div className={`pageBlockContainer ${styles.about}`}> */}
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        {content}
      </div>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src={imageSrc}
          alt={alt}
        />
      </div>
  </PageBlock>
  </>
}