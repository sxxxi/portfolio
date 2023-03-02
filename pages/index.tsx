import { Inter } from '@next/font/google'
import { StickyHeaderLayout } from '@/components/PageLayouts'
import Link from 'next/link';
import { ReactNode } from 'react';

const skills = new Map<string, string[]>([
  [
    "Programming Languages",
    ["Kotlin", "Java", "C/C#", "Rust", "Javascript/Typescript"],
  ],
  [
    "Web Technologies",
    ["React", "NextJS", "HTML/CSS", "MySQL", "ExpressJS", "Spring Boot"],
  ],
  [
    "Systems Programming",
    [
      "Data Structures",
      "Algorithmic thinking",
      "Software Design Patterns",
      "UNIX Processes",
    ],
  ],
  ["Other", ["Android", "Unity"]],
]);




const projects = [
  {
    title: "Running pete",
    description: "My game development project",
    link: "https://sxxxi.itch.io/running_pete",
    tech: ['C#', 'Unity']
  },
  {
    title: "sushi-place-api",
    description: "My attempt at utilizing ExpressJS and Typescript to create a simple restaurant order system.",
    link: "https://github.com/sxxxi/sushi-place-api",
    tech: ['Typescript', 'ExpressJs']
  },
];

export default function Home() {
  return (
    <>
      <StickyHeaderLayout title={"Seiji Akakabe"}>
        <SkillsSection skills={skills} />
        <EducationSection />
        <ProjectsSection projects={projects} />
      </StickyHeaderLayout>
    </>
  );
}

type WordBeansProps = {
  words: string[]
}
const WordBeans = ({ words }: WordBeansProps) => {
  return (
    <div className='flex flex-row flex-wrap'>
      {words.map((w, index) => 
        <span key={index} className=' m-1 p-1 rounded-md text-sm bg-slate-200 drop-shadow-md'>{w}</span>
      )}
    </div>
  );
}

type LabeledChildrenProps = {
  title: string,
  children: ReactNode
}
const PageSection = ({ title, children }: LabeledChildrenProps) => {
  return (
    <section>
      <h1 className='text-2xl font-bold'>{title}</h1>
      <div className='p-4 bg-slate-50 rounded-md space-y-4'>{children}</div>
    </section>
  );
}

const LabeledContent = ({ title, children }: LabeledChildrenProps) => {
  return (
    <div className={"bg-white rounded-md relative drop-shadow-md p-4"}>
      <h2 className='font-semibold text-xl'>{title}</h2>
      <div>{children}</div>
    </div>
  );
}

type SkillsSectionProps = {
  skills: Map<string, string[]>
}
const SkillsSection = ({ skills }: SkillsSectionProps) => {
  return (
    <PageSection title={'Skills'}>
      {Array.from(skills).map(([key, val], si) => 
        <LabeledContent title={key} key={si}>
          <WordBeans words={val} />
        </LabeledContent>
      )}
    </PageSection>
  );
}

const EducationSection = () => {
  return (
    <PageSection title={"Education"}>
      <LabeledContent title={"Sheridan College"}>
        <div className="flex flex-row justify-between">
          <span>Software Development and Network Engineering</span>
          <span>2020 ~ 2023</span>
        </div>
      </LabeledContent>
    </PageSection>
  );
}

type Project = {
  title: string,
  description: string,
  link: string,
  tech: string[]
}
type ProjectsSectionProps = {
  projects: Project[]
}
const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  return (
    <PageSection title={"Projects"}>
      {projects.map((p, i) => {
        return(
          <div key={i} className=" bg-white rounded-md relative drop-shadow-md hover:invert">
            <Link href={p.link} className="absolute w-full h-full" target='_blank'></Link> 
            <div className='p-4 flex flex-col'>
              <span className="text-xl font-semibold">{p.title}</span>
              <span>{p.description}</span>
              <WordBeans words={p.tech} />
            </div>
          </div>
        );
      })}
    </PageSection>
  );
};


























