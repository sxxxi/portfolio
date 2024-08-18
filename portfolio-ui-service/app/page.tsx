'use client';
import styles from './page.module.css'
import Hero from './components/pageBlocks/hero/hero'
import ImageLeftBlock from './components/pageBlocks/imageLeftBlock/imageLeftBlock'
import ColumnText from './components/pageBlocks/columnText/columnText'
import Projects, { Project } from './components/pageBlocks/projects/projects'
import { ProjectCardProps } from './components/pageBlocks/projects/project/projectCard'
import PageBlock from './components/pageBlock/PageBlock'
import { Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import JwtService from './service/jwt.service';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import IconButton from './components/IconButton/IconButton';

export default function Home() {
  const {push} = useRouter()
  const [projects, setProjects] = useState([])  

  useEffect(() => {
    fetch('/api/projects/get-all').then(res =>
      res.json()
    ).then(data => {
      setProjects(data.projects)
    }).catch(err => {
      setProjects([])
      console.log(err);
    })
  }, [])

  useEffect(() => {
    console.log(projects)
  }, [projects])

  return (
    <main className={styles.main}>
      <Hero
        // bgSrc='/img/chipi.jpg'
        buttons={
          <>
            <IconButton icon='/img/github-mark-white.svg' href='https://github.com/sxxxi' width={40}></IconButton>
            <IconButton icon='/img/linkedin.png' href='https://www.linkedin.com/in/seiji-akakabe' width={50}></IconButton>
          </>
        }>
        <h1>Seiji Akakabe</h1>
        <h3>Software Developer</h3>
      </Hero>

      <ColumnText 
        title={"About"}
        body={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor felis in mauris feugiat iaculis. Donec at fermentum ante. Morbi accumsan lorem sed varius sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor felis in mauris feugiat iaculis. Donec at fermentum ante. Morbi accumsan lorem sed varius sagittis"}
      />

      <ImageLeftBlock
        imageSrc='/img/traf.jpg'
        title={"Education"}
        content={
          <>
            <h3>Sheridan College</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor felis in mauris feugiat iaculis. 
              Donec at fermentum ante. Morbi accumsan lorem sed varius sagittis. Lorem ipsum dolor sit amet, consectetur 
              adipiscing elit. Aliquam auctor felis in mauris feugiat iaculis. Donec at fermentum ante. 
              Morbi accumsan lorem sed varius sagittis.</p>
          </>
        }
      />

      <Projects containerBgSrc={'/img/mountain.webp'} content={projects}></Projects>

      <PageBlock
        // bgSrc='/img/chipi.jpg'
        // bgSize='cover'
      >
        <h2>Contact</h2> 
         <a type='email' href='mailto:akakabeseiji0@gmail.com'>akakabeseiji0@gmail.com</a><br></br>
        <Link href={'/admin/create'}>Admin Dashboard</Link>
      </PageBlock>
    </main>
  )
}




