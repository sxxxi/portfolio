'use client';
import { Box, VStack } from "@chakra-ui/react"
import ProjectCard, { ProjectCardProps } from "./project/projectCard"
import styles from './projects.module.css'
import { useEffect, useState } from "react"

interface ProjectsProps {
  containerBgSrc?: string,
  content: Project[]
}

export interface Project {
  id: number,
  title: string,
  imagepath?: string,
  description?: string,
  imageLinks?: string[],
  repoLink?: string,
  deployedLink?: string,
}

export default function Projects({ containerBgSrc, content }: ProjectsProps) {
  return <Box className={`pageBlockContainer ${styles.container}`} bgImg={containerBgSrc}>
      <h2 className={styles.title}>Projects</h2>
      <VStack gap={48} w='100%'>
      {
        content.map(p => {
          return <ProjectCard key={p.id} id={p.id} title={p.title} description={p.description} imageLinks={p.imagepath ? [p.imagepath] : []} />
        })
      }
      </VStack>

  </Box>
}